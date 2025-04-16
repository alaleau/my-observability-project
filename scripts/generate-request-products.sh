#!/bin/bash

url1="http://localhost:3000/api/products"

while true; do
  echo "Sending request to $url1"
  curl -X GET "$url1"

  sleep $(awk -v min=0.5 -v max=2 'BEGIN{srand(); print min+rand()*(max-min)}')
done