#!/bin/sh

sed -e "s/@@BACKEND_HOST@@/${BACKEND_HOST}/g" \
    -e "s/@@BACKEND_PORT@@/${BACKEND_PORT}/g" \
    /etc/nginx/nginx.conf.tpl > /etc/nginx/nginx.conf

nginx -g 'daemon off;'
