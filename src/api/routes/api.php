<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/trips', 'TripController@index');
Route::get('/trips/past', 'TripController@pastTrips');
Route::get('/trips/current', 'TripController@currentTrips');
Route::get('/trips/future', 'TripController@futureTrips');

Route::post('/login', 'UserController@login');
Route::post('/register', 'UserController@register');
Route::get('/logout', 'UserController@logout');

Route::get('/user', 'UserController@show');
