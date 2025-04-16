#!/bin/bash

while true; do

  url="http://localhost:3001/api/stocks/1"
  echo "Sending request to $url"
  curl -X GET "$url"

  sleep $(awk -v min=0.5 -v max=1 'BEGIN{srand(); print min+rand()*(max-min)}')
done