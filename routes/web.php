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
        

		
		

		Route::get('return-view/list-organization', 'Admin\OrganizationController@index');

		Route::get('return-view/all-users', 'Admin\SettingController@users');

 

 

		Route::post('register-new-organization', 'Auth\RegisterController@registerOrganization');









        Route::get('return-view/dashboard', 'Account\HomeController@index');


       


        Route::get('return/all-users', 'Account\SettingController@users');

        






