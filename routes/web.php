<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DoubleResultsController;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard',[DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/catalogador',[DashboardController::class,'catalogador']);

    Route::prefix('/service')->group(function(){
        Route::get("/brancoduplo",[DashboardController::class,'brancoduplo']);
        Route::get("/doublezeroloss",[DashboardController::class,'doublezeroloss']);
        Route::get("/brancosemgale",[DashboardController::class,'brancosemgale']);
        Route::get("/doublesemgale",[DashboardController::class,'doublesemgale']);
        Route::get("/crashvelas10x",[DashboardController::class,'crashvelas10x']);
        Route::get("/snippertools",[DashboardController::class,'snippertools']);
        
    });

    Route::post('/apostar/blaze',[DashboardController::class,'apostarblaze']);
    Route::put("/connect/blaze",[DashboardController::class,'connectBlaze']);
});
Route::get('/limpar',[DashboardController::class,'limpar']);
Route::get('/api/results/double/{results}',[DoubleResultsController::class,'getResults']);
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
