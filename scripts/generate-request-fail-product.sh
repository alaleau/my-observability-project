#!/bin/bash

while true; do

  url="http://localhost:3000/api/products/20"
  echo "Sending request to $url1"
  curl -X GET "$url" -w "%{http_code}" -o /dev/null

  sleep $(awk -v min=4 -v max=5 'BEGIN{srand(); print min+rand()*(max-min)}')
done