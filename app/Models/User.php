<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 19 Jun 2018 07:58:56 +0300.
 */

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * Class User
 * 
 * @property int $id
 * @property string $email
 * @property string $password
 * @property \Carbon\Carbon $last_login
 * @property string $first_name
 * @property string $last_name
 * @property \Carbon\Carbon $last_login_at
 * @property string $last_login_ip
 * @property string $org_id
 * @property string $remember_token
 * @property string $deleted_at
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property bool $verified
 * @property string $verification_token
 *
 * @package App\Models
 */
class User extends Authenticatable
{
	use \Illuminate\Database\Eloquent\SoftDeletes, Notifiable;

	protected $casts = [
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
		'password',
		'last_login',
		'first_name',
		'last_name',
		'last_login_at',
		'last_login_ip',
		'org_id',
		'remember_token',
		'verified',
		'verification_token'
	];
}
