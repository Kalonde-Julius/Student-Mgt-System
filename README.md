<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

To run this web app using Laravel Herd:

1) In your Laravel herd folder, cd create a folder &name it student. Then copy and paste all the files extracted from the downloaded zip folder from Giithub.

2) Clean the old vendor and cache via cmd in your project folder (student):
rmdir /s /q vendor 2>$null
del composer.lock 2>$null
composer clear-cache
rmdir /s /q vendor
del composer.lock

3) Installing PHP dependencies via cmd:
composer install

4) Rename .env.example to .env

5) Generating app key:
php artisan key:generate

6) Installing Node dependencies:
npm install

7) Fixing vulnerabilities:
npm audit fix

8) Open .env & confirm:
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite

9) Running migrations & seeding the db:
php artisan migrate
php artisan migrate --seed

10) Clearing caches:
php artisan config:clear
php artisan cache:clear
php artisan route:clear

11) npx update-browserslist-db@latest

12) Starting Vite dev server:
npm run dev

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
