<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 19 Jun 2018 07:58:56 +0300.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class OrganizationLevel
 * 
 * @property int $id
 * @property string $level_name
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @package App\Models
 */
class OrganizationLevel extends Eloquent
{
	protected $fillable = [
		'level_name'
	];
}
