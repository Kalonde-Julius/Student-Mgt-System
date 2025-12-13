<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::controller(StudentController::class)->group(function () {
    Route::get('/students', 'index')->name('students.index');
    Route::get('/students/create', 'create')->name('students.create');
    Route::post('/students', 'store')->name('students.store');
    Route::get('/students/{id}/edit', 'edit')->name('students.edit');
    Route::put('/students/{id}', 'update')->name('students.update');
  // Route::get('/students/show/{id}', 'show')->name('students.show');
 //   Route::delete('/students/delete/{id}', 'destroy')->name('students.destroy');

    // Uncomment these when you implement show/edit/update/delete
    /*
    Route::get('/students/{student}', 'show')->name('students.show');
    Route::get('/students/{student}/edit', 'edit')->name('students.edit');
    Route::put('/students/{student}', 'update')->name('students.update');
    Route::delete('/students/{student}', 'destroy')->name('students.destroy');
    */
});

Route::inertia('/teachers', 'Teachers/Index')->name('teachers.list');

Route::fallback(function () {
    return Inertia::render('Errors/NotFound');
});

require __DIR__.'/auth.php';
