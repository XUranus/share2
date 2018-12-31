# share
single page file upload & share web application
 - Ant Design
 - php

# Install
require:
 - php7.0
 - yarn(install by run `sudo npm -g i yarn`)
```
git clone https://github.com/XUranus/share2.git
cd share2
```
config your php server url in `src/config.js`,then start build
```
yarn install
yarn build
```
move `api` folder to `build` folder,then set `build` folder as your site root,config upload directory, wheather allow guest to delete and admin token in `/api/config.php`

# Security and upload size
You can disable php engine in upload directory by adding this to httpd.conf. And don't forget to change the directory to yours.
```
<Directory "/var/www/share/upload">
  php_flag engine off
</Directory>
```

`php.ini` need to be changed in order to upload large files(default only 2MB). You can change them as you want. For example:
```
file_uploads = On
upload_max_filesize = 200M
post_max_size = 200M
max_execution_time = 600
max_input_time = 600
memory_limit = 200M
```

allow guest who know hacker technique will able to delete files, config `$ALLOW_GUEST_DELETE` only disable the delete button(may be fixed in latter version)