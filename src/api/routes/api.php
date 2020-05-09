<?php

/*
 * Authentication Controllers
 */
Route::post('/login', 'Auth\LoginController@login');
Route::post('/register', 'Auth\RegisterController@register');
Route::get('/logout', 'Auth\LoginController@logout');

/*
 * UserController
 */
Route::get('/user', 'UserController@show');
Route::match('head', '/user/email/{user:email}', 'UserController@checkExists');
Route::match('head', '/user/name/{user:name}', 'UserController@checkExists');

/*
 * TripController
 */
Route::get('/trips', 'TripController@index');
Route::post('/trips', 'TripController@store');

Route::get('/trips/past', 'TripController@pastTrips');
Route::get('/trips/current', 'TripController@currentTrips');
Route::get('/trips/future', 'TripController@futureTrips');

Route::get('/trip/{trip}', 'TripController@show');
Route::post('/trip/{trip}/users', 'TripController@addUser');
Route::get('/trip/{trip}/activities', 'TripController@showActivities');
Route::get('/trip/{trip}/travels', 'TripController@showTravels');


