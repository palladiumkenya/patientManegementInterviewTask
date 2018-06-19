<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 19 Jun 2018 07:58:56 +0300.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class CampaignDetail
 * 
 * @property int $id
 * @property int $counter
 * @property int $statum_org_id
 * @property int $daily_counter
 * @property int $status
 * @property int $campaign_id
 * @property int $msg_id
 * @property int $org_id
 * @property string $src_address
 * @property string $dst_address
 * @property string $message
 * @property string $datereceived
 * @property string $linkid
 * @property string $traceid
 * @property string $service_id
 * @property string $subscribed_services_id
 * @property \Carbon\Carbon $sent_time
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @package App\Models
 */
class CampaignDetail extends Eloquent
{
	protected $casts = [
		'counter' => 'int',
		'statum_org_id' => 'int',
		'daily_counter' => 'int',
		'status' => 'int',
		'campaign_id' => 'int',
		'msg_id' => 'int',
		'org_id' => 'int'
	];

	protected $dates = [
		'sent_time'
	];

	protected $fillable = [
		'counter',
		'statum_org_id',
		'daily_counter',
		'status',
		'campaign_id',
		'msg_id',
		'org_id',
		'src_address',
		'dst_address',
		'message',
		'datereceived',
		'linkid',
		'traceid',
		'service_id',
		'subscribed_services_id',
		'sent_time'
	];
}
