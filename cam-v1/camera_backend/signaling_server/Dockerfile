FROM ubuntu
WORKDIR /signaling_server
COPY ./bin/server ./bin/server
COPY ./config.ini ./config.ini
CMD [ "./bin/server","-C","./config.ini" ]

EXPOSE 3000