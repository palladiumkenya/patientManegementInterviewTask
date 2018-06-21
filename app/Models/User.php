<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 20 Jun 2018 22:01:03 +0300.
 */

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * Class User
 * 
 * @property int $id
 * @property string $email
 * @property int $depart_id
 * @property string $password
 * @property \Carbon\Carbon $last_login
 * @property string $first_name
 * @property string $last_name
 * @property \Carbon\Carbon $last_login_at
 * @property string $last_login_ip
 * @property string $remember_token
 * @property bool $verified
 * @property string $verification_token
 * @property string $deleted_at
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Department $department
 *
 * @package App\Models
 */
class User extends Authenticatable
{
	use \Illuminate\Database\Eloquent\SoftDeletes, Notifiable;

	protected $casts = [
		'depart_id' => 'int',
		'verified' => 'bool'
	];

	protected $dates = [
		'last_login',
		'last_login_at'
	];

	protected $hidden = [
		'password',
		'remember_token',
		'verification_token'
	];

	protected $fillable = [
		'email',
		'depart_id',
		'password',
		'last_login',
		'first_name',
		'last_name',
		'last_login_at',
		'last_login_ip',
		'remember_token',
		'verified',
		'verification_token'
	];

	public function department()
	{
		return $this->belongsTo(\App\Models\Department::class, 'depart_id');
	}
}
