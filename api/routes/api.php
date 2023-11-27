<?php

use App\Http\Controllers\Api\FormController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(FormController::class)->group(function (){
    Route::get('/forms', 'index');
    Route::post('/form', 'store');
});
