#!/bin/bash

url1="http://localhost:3000/api/products"

while true; do

  url="http://localhost:3000/api/products/$((RANDOM % 18 + 1))"
  echo "Sending request to $url1"
  curl -X GET "$url"

  sleep $(awk -v min=0.5 -v max=2 'BEGIN{srand(); print min+rand()*(max-min)}')
done