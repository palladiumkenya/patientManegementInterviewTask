<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 19 Jun 2018 07:58:56 +0300.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class SubscribedService
 * 
 * @property int $id
 * @property string $originator
 * @property string $app_id
 * @property string $app_pass
 * @property string $user_id
 * @property string $ucm_org_id
 * @property string $keyword
 * @property string $shortcode
 * @property string $org_id
 * @property string $username
 * @property string $password
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @package App\Models
 */
class SubscribedService extends Eloquent
{


	protected $fillable = [
		'originator',
		'app_id',
		'app_pass',
		'user_id',
		'ucm_org_id',
		'keyword',
		'shortcode',
		'org_id',
		'username',
		'password'
	];
}
