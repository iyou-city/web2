FROM nginx:alpine

ADD ./default.conf /etc/nginx/conf.d
ADD ./dist/web /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]