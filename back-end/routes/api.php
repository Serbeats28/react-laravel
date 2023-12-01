<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\StudentController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/create',[StudentController::class, 'create']);
Route::get('/read',[StudentController::class, 'read']);
Route::get('/retrieve/{id}',[StudentController::class, 'retrieve']);
Route::post('/update',[StudentController::class, 'update']);
Route::delete('/delete/{id}',[StudentController::class, 'delete']);