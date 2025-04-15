#!/usr/bin/env bash

chmod -f 644 /record/*
find /record -name "*.*" -mtime +8 --delete

