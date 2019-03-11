user  nginx;
worker_processes  1;
error_log  /dev/stderr info;
pid        /var/run/nginx.pid;

events {
  worker_connections  1024;
}

http {

  gzip on;
  gzip_min_length  256;
  gzip_proxied     any;
  gzip_comp_level 4;
  gzip_types  text/css text/javascript text/xml text/plain text/x-component application/javascript application/json application/xml application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;
  gzip_vary on;

  include     /etc/nginx/mime.types;
  include     /etc/nginx/proxy.conf;
  default_type  application/octet-stream;

  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

  access_log  /dev/stdout main;

  sendfile        on;
  tcp_nopush      on;

  keepalive_timeout  65;

  root            /usr/share/nginx/html;
  index           index.html;

  server {
    listen 80;
    
    location ~ ^/api.* {
      proxy_pass      http://@@BACKEND_HOST@@:@@BACKEND_PORT@@;
    }

    location ~* .(jpg|jpeg|svg|png|gif|ico|css|js|ttf|woff|woff2)$ {
      expires 365d;
    }

    location = /health {
      return 200 'OK';
      add_header Content-Type text/plain;
    }

    location / {
      gzip_static on;
      try_files $uri $uri/ /index.html;
    }
  }
  
}
