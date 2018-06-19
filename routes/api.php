<?php

use Illuminate\Http\Request;

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




#Receives sms subscription service request 
Route::post('api/version1/promotion/sms-request', 'Admin\ProcessorController@index');

#Receives stop service request
Route::post('api/version1/stop-service/sms-request', 'Admin\ProcessorController@stopService');

#Receive data from DB
Route::post('api/subscription/receive-data-from-db', 'Admin\SmsProcessorController@recieveSmsData');
