FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD="testmysql"
ENV MYSQL_DATABASE="affiliate"
ENV MYSQL_USER="kiyo"
ENV MYSQL_PASSWORD="testmysql"

COPY ./config/my.conf /etc/mysql/conf.d/my.cnf

EXPOSE 3306