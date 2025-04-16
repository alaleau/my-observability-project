#!/bin/bash

while true; do

  url="http://localhost:3002/api/recommendations/$((RANDOM % 20 + 1))"
  echo "Sending request to $url1"
  curl -X GET "$url"

  sleep $(awk -v min=0.5 -v max=1 'BEGIN{srand(); print min+rand()*(max-min)}')
done