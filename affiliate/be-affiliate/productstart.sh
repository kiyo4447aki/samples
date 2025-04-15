#!/bin/bash

docker run --name api_container -p 8080:8080 -d api_gunicorn