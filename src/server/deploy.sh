#!/bin/sh

cd FindYourPet

docker kill frontendfyp
docker kill backendfyp

docker rm frontendfyp
docker rm backendfyp

docker rmi findyourpet/frontendfyp
docker rmi findyourpet/backendfyp

docker-compose up -d frontend
docker-compose up -d backend
