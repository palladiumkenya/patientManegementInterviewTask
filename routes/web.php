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
Route::auth();

Route::get('/', function () {
    return view('auth.login');
});


Route::get('route-login-request', 'Auth\LoginRouterController@routeUser');
Route::post('password-set', 'Auth\LoginRouterController@setPassword');
Route::post('register-user', 'Auth\RegisterController@register');
Route::get('email-verification-check/{token}', 'Auth\LoginRouterController@verify');


		Route::get('return-view/admin-dashboard', 'Admin\HomeController@index');
        

		
		

		Route::get('return-view/list-departments', 'Admin\DepartmentController@index');
		
		Route::get('return-view/list-patient-details', 'Admin\SettingController@users');
		

		Route::get('return-view/all-users', 'Admin\SettingController@users');

		Route::post('register-new-organization', 'Auth\RegisterController@registerOrganization');












        Route::get('return-view/dashboard', 'Account\HomeController@index');
        
        Route::get('return/patient-records', 'Account\PatientController@index');
        Route::get('return/deleted-patients', 'Account\PatientController@deletedPatients');
        Route::get('return/patients-below-age', 'Account\PatientController@belowAge');
        
        

        Route::get('view/more-about-patient', 'Account\PatientController@viewMore');


        Route::post('register-patient', 'Account\PatientController@store');
        Route::post('update-patient-details', 'Account\PatientController@update');
        Route::post('delete-patient-data', 'Account\PatientController@destroy');
        
        


        Route::get('return/all-users', 'Account\SettingController@users');

        






