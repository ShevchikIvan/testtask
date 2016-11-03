FROM node

RUN apt-get update && apt-get install -y \
    npm

RUN npm install -g gulp

ADD . /var/www
WORKDIR /var/www
COPY package.json /usr/src/app/

RUN npm install


RUN ls -la

CMD ["gulp", "run"]
