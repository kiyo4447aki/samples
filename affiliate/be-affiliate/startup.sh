#!/bin/bash
pip install -r requirements.txt
gunicorn --config gunicorn.py main:app
