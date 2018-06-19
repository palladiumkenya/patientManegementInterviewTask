<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 19 Jun 2018 07:58:56 +0300.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ScheduledMessage
 * 
 * @property int $id
 * @property int $org_id
 * @property string $message
 * @property string $answer
 * @property string $subscribed_services_id
 * @property string $scheduled_at
 * @property string $counter
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @package App\Models
 */
class ScheduledMessage extends Eloquent
{
	protected $casts = [
		'org_id' => 'int'
	];

	protected $fillable = [
		'org_id',
		'message',
		'answer',
		'subscribed_services_id',
		'scheduled_at',
		'counter'
	];
}
