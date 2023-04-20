FROM node:19.8
WORKDIR /app
COPY . .
RUN yarn install 
EXPOSE 3000
CMD [ "yarn","start","0.0.0.0:3000" ]