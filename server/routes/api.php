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

Route::group(['middleware'=>'authUser'], function (){
    Route::get('todos/{user}', 'TodoController@index');
    Route::get('todos/{user}/{todo}', 'TodoController@show');
    Route::post('todos/{user}', 'TodoController@store');
    Route::put('todos/{user}/{todo}', 'TodoController@update');
    Route::delete('todos/{user}/{todo}', 'TodoController@delete');
});


Route::post('register', 'Auth\RegisterController@register');
Route::post('login', 'Auth\LoginController@login');

