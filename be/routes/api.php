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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', 'LoginController@login');
Route::post('register', 'RegisterController@register');

//Medical conditions
Route::get('conditions', 'MedicalConditionController@index');
Route::get('conditions/{condition}', 'MedicalConditionController@show');
Route::post('conditions/new', 'MedicalConditionController@store');
Route::post('conditions/user/new', 'MedicalConditionController@storeUserCondition');
Route::post('conditions/user/del', 'MedicalConditionController@deleteUserCondition');
Route::post('conditions/edit/{condition}', 'MedicalConditionController@update');
Route::post('conditions/del/{condition}', 'MedicalConditionController@delete');
Route::get('condition/{id}', 'MedicalConditionController@showForUser');
Route::post('condition/user/{conditions}', 'MedicalConditionController@updateUserConditions');

//Medical units
Route::get('units', 'MedicalUnitsController@index');
Route::get('unitTypes', 'MedicalUnitsController@getTypes');
Route::get('units/{unit}', 'MedicalUnitsController@show');
Route::post('units/new', 'MedicalUnitsController@store');
Route::post('units/edit/{unit}', 'MedicalUnitsController@update');
Route::post('units/del/{unit}', 'MedicalUnitsController@delete');

//Medics
Route::get('medics', 'MedicController@index');
Route::get('specializations', 'MedicController@getSpecializations');
Route::get('unitMedics/{unitID}', 'MedicController@getUnitMedics');
Route::get('medics/{medic}', 'MedicController@show');
Route::post('medics/new', 'MedicController@store');
Route::post('medics/edit/{medic}', 'MedicController@update');
Route::post('medics/del/{medic}', 'MedicController@delete');
Route::post('medics/comments', 'MedicController@getComments');
Route::post('medics/addComment', 'MedicController@postComment');

//Users
Route::get('users', 'UserController@index');
Route::get('users/{user}', 'UserController@show');
Route::post('users/new', 'UserController@store');
Route::post('users/edit/{user}', 'UserController@update');
Route::post('users/del/{user}', 'UserController@delete');
