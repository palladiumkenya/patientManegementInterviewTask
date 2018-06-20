<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 20 Jun 2018 22:01:03 +0300.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class PatientsKinDatum
 * 
 * @property int $id
 * @property int $patient_meta_data_id
 * @property string $next_of_kin_name
 * @property string $next_of_kin_phone
 * @property string $next_of_kin_id_number
 * @property string $deleted_at
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\PatientsMetaDatum $patients_meta_datum
 *
 * @package App\Models
 */
class PatientsKinDatum extends Eloquent
{
	use \Illuminate\Database\Eloquent\SoftDeletes;

	protected $casts = [
		'patient_meta_data_id' => 'int'
	];

	protected $fillable = [
		'patient_meta_data_id',
		'next_of_kin_name',
		'next_of_kin_phone',
		'next_of_kin_id_number'
	];

	public function patients_meta_datum()
	{
		return $this->belongsTo(\App\Models\PatientsMetaDatum::class, 'patient_meta_data_id');
	}
}
