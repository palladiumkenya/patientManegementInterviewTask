<?php

/**
 * Created by Reliese Model.
 * Date: Fri, 15 Jun 2018 04:56:22 +0000.
 */

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * Class User
 * 
 * @property int $id
 * @property string $email
 * @property string $password
 * @property string $permissions
 * @property \Carbon\Carbon $last_login
 * @property string $first_name
 * @property string $last_name
 * @property \Carbon\Carbon $last_login_at
 * @property string $last_login_ip
 * @property string $org_id
 * @property int $verified
 * @property string $verification_token
 * @property string $remember_token
 * @property string $deleted_at
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @package App\Models
 */
class User extends Authenticatable
{
	use Notifiable;

	use \Illuminate\Database\Eloquent\SoftDeletes;

	protected $casts = [
		'verified' => 'int'
	];

	protected $dates = [
		'last_login',
		'last_login_at'
	];

	protected $hidden = [
		'password',
		'verification_token',
		'remember_token'
	];

	protected $fillable = [
		'email',
		'password',
		'permissions',
		'last_login',
		'first_name',
		'last_name',
		'last_login_at',
		'last_login_ip',
		'org_id',
		'verified',
		'verification_token',
		'remember_token'
	];
}
