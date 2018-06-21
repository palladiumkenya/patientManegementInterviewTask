<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 20 Jun 2018 22:01:03 +0300.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class DepartmentLevel
 * 
 * @property int $id
 * @property string $level_id
 * @property string $deleted_at
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \Illuminate\Database\Eloquent\Collection $departments
 *
 * @package App\Models
 */
class DepartmentLevel extends Eloquent
{
	use \Illuminate\Database\Eloquent\SoftDeletes;

	protected $fillable = [
		'level_id'
	];

	public function departments()
	{
		return $this->hasMany(\App\Models\Department::class, 'level_id');
	}
}
