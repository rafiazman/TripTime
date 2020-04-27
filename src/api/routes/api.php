<?php

use Illuminate\Support\Facades\Route;

/*
 * TripController
 */
Route::get('/trips', 'TripController@index');
Route::get('/trips/past', 'TripController@pastTrips');
Route::get('/trips/current', 'TripController@currentTrips');
Route::get('/trips/future', 'TripController@futureTrips');

Route::get('/trip/{trip}', 'TripController@show');

/*
 * UserController
 */
Route::post('/login', 'UserController@login');
Route::post('/register', 'UserController@register');
Route::get('/logout', 'UserController@logout');

Route::get('/user', 'UserController@show');
