#!/bin/sh

npm run build

docker build . -t registry.panim.one/nasa-frontend:0.0.1 -f ./Dockerfile --progress=plain --no-cache

npm clean
