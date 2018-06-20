<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/add-member', 'HomeController@addMember');

Route::get('/patients/deleted', 'HomeController@deletedPatients');

Route::get('/patients/below-15', 'HomeController@belowAge');

Route::post('/save/patient', 'HomeController@savePatient');

Route::post('/update/contacts', 'HomeController@updateContacts');

Route::get('/profile/{id}', 'HomeController@profile');
