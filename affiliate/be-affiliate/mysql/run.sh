#!/bin/bash

docker run --name container_mysql -d -v $PWD/db-8-0:/var/lib/mysql -p 3306:3306 mysql:1