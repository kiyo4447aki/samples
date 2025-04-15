FROM mysql

EXPOSE 3306

COPY ./conf.d/my.cnf /etc/mysql/conf.d/my.cnf

ENV TZ=Asia/Tokyo

CMD ["mysqld"]