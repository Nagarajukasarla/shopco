import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  image: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
}

export interface User {
  name: string;
  email: string;
  addresses: Address[];
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addAddress: (address: Address) => void;
  orders: Order[];
  placeOrder: (items: OrderItem[], total: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('shopco_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('shopco_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('shopco_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('shopco_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('shopco_orders', JSON.stringify(orders));
  }, [orders]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple mock authentication
    if (email && password) {
      setUser({
        name: email.split('@')[0].toUpperCase(),
        email: email,
        addresses: [
          {
            fullName: email.split('@')[0].toUpperCase(),
            street: '123 Fashion Blvd',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States'
          }
        ]
      });
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    if (name && email && password) {
      setUser({
        name: name,
        email: email,
        addresses: []
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addAddress = (address: Address) => {
    if (user) {
      setUser({
        ...user,
        addresses: [...user.addresses, address]
      });
    }
  };

  const placeOrder = (items: OrderItem[], total: number) => {
    const newOrder: Order = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      items,
      total,
      status: 'Pending'
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        addAddress,
        orders,
        placeOrder
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
