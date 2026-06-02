#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Checking database connection variables..."

# Check required environment variables
for var in DB_HOST DB_PORT DB_USER DB_PASSWORD DB_NAME; do
  if [ -z "${!var}" ]; then
    echo "Error: Environment variable $var is not set."
    exit 1
  fi
done

# Check if psql is installed, and try to install it if missing
if ! command -v psql >/dev/null 2>&1; then
  echo "psql command line tool is not installed. Attempting to install..."
  
  if command -v apt-get >/dev/null 2>&1; then
    echo "Using apt-get to install postgresql-client..."
    sudo apt-get update && sudo apt-get install -y postgresql-client
  elif command -v apk >/dev/null 2>&1; then
    echo "Using apk to install postgresql-client..."
    apk add --no-cache postgresql-client
  elif command -v brew >/dev/null 2>&1; then
    echo "Using Homebrew to install libpq..."
    brew install libpq
    brew link --force libpq
  else
    echo "Error: psql is not installed and no supported package manager (apt-get, apk, brew) was found."
    exit 1
  fi

  # Double check if installation succeeded
  if ! command -v psql >/dev/null 2>&1; then
    # Homebrew libpq might need path addition if linking failed or wasn't forced
    if [ -d "/opt/homebrew/opt/libpq/bin" ]; then
      export PATH="/opt/homebrew/opt/libpq/bin:$PATH"
    elif [ -d "/usr/local/opt/libpq/bin" ]; then
      export PATH="/usr/local/opt/libpq/bin:$PATH"
    fi
    
    if ! command -v psql >/dev/null 2>&1; then
      echo "Error: Installation completed but psql is still not found in PATH."
      exit 1
    fi
  fi
  echo "psql installed successfully."
fi

SQL_FILE="src/db.sql"
if [ ! -f "$SQL_FILE" ]; then
  echo "Error: SQL file not found at $SQL_FILE"
  exit 1
fi

echo "Connecting to PostgreSQL database and executing $SQL_FILE..."

# Execute the SQL file using psql
# We pass the password via the PGPASSWORD environment variable
PGPASSWORD="$DB_PASSWORD" psql \
  -h "$DB_HOST" \
  -p "$DB_PORT" \
  -U "$DB_USER" \
  -d "$DB_NAME" \
  -f "$SQL_FILE"

echo "Database migrations/seeding executed successfully!"
