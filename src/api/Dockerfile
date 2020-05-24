FROM php:7.4-fpm-alpine

WORKDIR /var/www/html

RUN docker-php-ext-install pdo pdo_mysql
COPY --from=composer /usr/bin/composer /usr/bin/composer
RUN composer install
