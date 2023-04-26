FROM node:19.8 as builder
WORKDIR /app
COPY . .
RUN yarn install 


FROM nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build/ .
COPY ./.nginx/nginx.conf /etc/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]