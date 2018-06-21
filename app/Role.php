<?php

/**
 * Created by Reliese Model.
 * Date: Fri, 15 Jun 2018 04:56:22 +0000.
 */

namespace App;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class RoleUser
 * 
 * @property int $user_id
 * @property int $role_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @package App\Models
 */
class RoleUser extends Eloquent
{
	public $incrementing = false;

	protected $casts = [
		'user_id' => 'int',
		'role_id' => 'int'
	];
}
