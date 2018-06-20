<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 20 Jun 2018 22:01:03 +0300.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Department
 * 
 * @property int $id
 * @property string $name
 * @property int $level_id
 * @property string $deleted_at
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\DepartmentLevel $department_level
 * @property \Illuminate\Database\Eloquent\Collection $users
 *
 * @package App\Models
 */
class Department extends Eloquent
{
	use \Illuminate\Database\Eloquent\SoftDeletes;

	protected $casts = [
		'level_id' => 'int'
	];

	protected $fillable = [
		'name',
		'level_id'
	];

	public function department_level()
	{
		return $this->belongsTo(\App\Models\DepartmentLevel::class, 'level_id');
	}

	public function users()
	{
		return $this->hasMany(\App\Models\User::class, 'depart_id');
	}
}
