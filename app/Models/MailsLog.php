<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 19 Jun 2018 07:58:56 +0300.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class MailsLog
 * 
 * @property int $id
 * @property string $message_id
 * @property string $to
 * @property \Carbon\Carbon $send_at
 * @property string $deleted_at
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @package App\Models
 */
class MailsLog extends Eloquent
{
	use \Illuminate\Database\Eloquent\SoftDeletes;
	protected $table = 'mails_log';

	protected $dates = [
		'send_at'
	];

	protected $fillable = [
		'message_id',
		'to',
		'send_at'
	];
}
