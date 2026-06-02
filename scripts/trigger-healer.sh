#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Default HEALER_URL if not provided in the environment
HEALER_ENDPOINT="${HEALER_URL:-https://self-healer.onrender.com/run-tests}"

echo "Triggering tests at Healer service: ${HEALER_ENDPOINT}"

# Create a temporary file for response body
RESPONSE_FILE=$(mktemp)

# Clean up temporary file on exit
trap 'rm -f "$RESPONSE_FILE"' EXIT

# Perform the POST request and capture HTTP status code
HTTP_STATUS=$(curl -s -o "$RESPONSE_FILE" -w "%{http_code}" \
  -X POST \
  -H "Content-Type: application/json" \
  "$HEALER_ENDPOINT")

# Check if the request was successful (HTTP 200 OK)
if [ "$HTTP_STATUS" -ne 200 ]; then
  echo "Error: Healer service returned status code $HTTP_STATUS"
  if [ -s "$RESPONSE_FILE" ]; then
    echo "Response body:"
    cat "$RESPONSE_FILE"
  fi
  exit 1
fi

RESPONSE_CONTENT=$(cat "$RESPONSE_FILE")

# Pretty print response and extract success flag using jq if available
if command -v jq >/dev/null 2>&1; then
  echo "Healer response:"
  echo "$RESPONSE_CONTENT" | jq .
  
  SUCCESS=$(echo "$RESPONSE_CONTENT" | jq -r '.success')
else
  echo "Healer response: $RESPONSE_CONTENT"
  # Fallback: parse success field using grep/sed if jq is not installed
  SUCCESS=$(echo "$RESPONSE_CONTENT" | grep -o '"success"\s*:\s*[a-z]*' | head -n 1 | cut -d: -f2 | tr -d '[:space:]"')
fi

if [ "$SUCCESS" != "true" ]; then
  echo "Tests failed on Healer service."
  exit 1
fi

echo "Tests passed successfully on Healer service!"
