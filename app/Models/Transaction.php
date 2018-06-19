<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 19 Jun 2018 07:58:56 +0300.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Transaction
 * 
 * @property int $id
 * @property int $status
 * @property int $org_id
 * @property string $dst_address
 * @property string $src_address
 * @property string $message
 * @property string $response_code
 * @property string $response_desc
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @package App\Models
 */
class Transaction extends Eloquent
{
	protected $casts = [
		'status' => 'int',
		'org_id' => 'int'
	];

	protected $fillable = [
		'status',
		'org_id',
		'dst_address',
		'src_address',
		'message',
		'response_code',
		'response_desc'
	];
}
