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
Route::get('/trip/{trip}/activities', 'TripController@showActivities');

/*
 * UserController
 */
Route::post('/login', 'UserController@login');
Route::post('/register', 'UserController@register');
Route::get('/logout', 'UserController@logout');

Route::get('/user', 'UserController@show');
Route::match('head', '/user/email/{user:email}', 'UserController@checkExists');
Route::match('head', '/user/name/{user:name}', 'UserController@checkExists');
