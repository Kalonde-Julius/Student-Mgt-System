<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

Laravel is accessible, powerful, and provides tools required for large, robust applications.

<span> Instructions for running this web app on your PC via Laravel Herd </span> <br/>:

1) Inside your Laravel Herd folder via CMD/terminal, locate your project directory: <br/> 
cd student <br/>.

2) Clean the old vendor and cache via cmd in your project folder (student): <br/>
rmdir /s /q vendor 2>$null <br/>
del composer.lock 2>$null <br/>
composer clear-cache <br/>
rmdir /s /q vendor <br/>
del composer.lock <br/>

3) Installing PHP dependencies via cmd: <br/>
composer install

4) Rename .env.example to .env <br/>

5) Generating app key: <br/>
php artisan key:generate <br/>

6) Installing Node dependencies: <br/>
npm install <br/>

7) Fixing vulnerabilities: <br/>
npm audit fix <br/>

8) Open .env & confirm: <br/>
DB_CONNECTION=sqlite <br/>
DB_DATABASE=database/database.sqlite <br/>

9) Running migrations & seeding the db: <br/>
php artisan migrate <br/>
php artisan migrate --seed <br/>

10) Clearing caches: <br/>
php artisan config:clear <br/>
php artisan cache:clear <br/>
php artisan route:clear <br/>

11) npx update-browserslist-db@latest <br/>

12) Starting Vite dev server: <br/>
npm run dev <br/>

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
