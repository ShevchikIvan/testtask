FROM node

RUN apt-get update && apt-get install -y \
    npm

RUN npm install -g gulp

WORKDIR /var/www
ADD . /var/www

RUN npm install


RUN ls -la

EXPOSE 8081
EXPOSE 35729

CMD ["gulp", "run"]