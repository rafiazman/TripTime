<?php

/*
 * Broadcast Routes
 */
// https://laravel.com/docs/7.x/sanctum#authorizing-private-broadcast-channels
Broadcast::routes(['middleware' => ['auth:sanctum']]);

/*
 * Authentication Controllers
 */
Route::post('/login', 'Auth\LoginController@login');
Route::post('/register', 'Auth\RegisterController@register');
Route::get('/logout', 'Auth\LoginController@logout');

/*
 * ActivityController
 */
Route::get('/activity/{activity}/notes', 'ActivityController@showNotes');
Route::post('/activity/{activity}/notes', 'ActivityController@addNote');
Route::patch('/activity/{activity}/notes', 'ActivityController@updateNote');

Route::post('/activity/{activity}/join', 'ActivityController@addUser');
Route::delete('/activity/{activity}', 'ActivityController@destroy');

/*
 * MessageController
 */
Route::get('/trip/{trip}/messages', 'MessageController@index');
Route::post('/trip/{trip}/messages', 'MessageController@create');

/*
 * TravelController
 */
Route::get('/travel/{travel}/notes', 'TravelController@showNotes');
Route::post('/travel/{travel}/notes', 'TravelController@addNote');
Route::patch('/travel/{travel}/notes', 'TravelController@updateNote');

Route::post('/travel/{travel}/join', 'TravelController@addUser');
Route::delete('/travel/{travel}', 'TravelController@destroy');

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
Route::post('/trip/{trip}/activities', 'TripController@addActivity');
Route::patch('/trip/{trip}/activities', 'TripController@updateActivity');

Route::get('/trip/{trip}/travels', 'TripController@showTravels');
Route::post('/trip/{trip}/travels', 'TripController@addTravel');
Route::patch('/trip/{trip}/travels', 'TripController@updateTravel');

/*
 * TripInviteController
 */
Route::get('/trip/{trip}/invites', 'TripInviteController@index');
Route::post('/trip/{trip}/invite', 'TripInviteController@createInvitationLink');
Route::post('/join/{uuid}', 'TripInviteController@joinByInvitationLink');

/*
 * UserController
 */
Route::get('/user', 'UserController@show');
Route::match('head', '/user/email/{user:email}', 'UserController@checkExists');
Route::match('head', '/user/name/{user:name}', 'UserController@checkExists');


