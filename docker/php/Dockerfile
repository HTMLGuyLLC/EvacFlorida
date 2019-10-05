FROM php:7.3-fpm

# Set working directory
WORKDIR /var/www

USER root

# Set timezone
RUN ln -sf /usr/share/zoneinfo/America/New_York /etc/timezone

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libxml2-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    nano \
    vim \
    unzip \
    git \
    libzip-dev \
    libcurl4-openssl-dev \
    curl

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/* && apt autoremove

# Install extensions
RUN docker-php-ext-install pdo sqlite curl xml mbstring

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy existing application directory contents
#COPY . /var/www

# Copy existing application directory permissions
#COPY --chown=www-data:www-data . /var/www
#RUN chown www-data:www-data -R /var/www/*
#RUN chown www-data:www-data /var/www/.env

# Change current user to www
USER www-data

# Expose port 9000 and start php-fpm server
EXPOSE 9000

CMD ["php-fpm"]