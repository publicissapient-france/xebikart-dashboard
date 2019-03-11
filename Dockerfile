FROM nginx:1.14

ADD config/nginx.conf.tpl /etc/nginx/nginx.conf.tpl
ADD config/proxy.conf /etc/nginx/proxy.conf
ADD build/ /usr/share/nginx/html/

ADD start.sh /start.sh

RUN chmod +x /start.sh && chmod -R 755 /etc/nginx/ && chown -R nginx:nginx /etc/nginx/

EXPOSE 80

CMD [ "/start.sh" ]
