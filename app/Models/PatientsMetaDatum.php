<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 20 Jun 2018 22:01:03 +0300.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class PatientsMetaDatum
 * 
 * @property int $id
 * @property string $first_name
 * @property string $second_name
 * @property string $id_number
 * @property string $deleted_at
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \Illuminate\Database\Eloquent\Collection $patients_addresses
 * @property \Illuminate\Database\Eloquent\Collection $patients_contact_details
 * @property \Illuminate\Database\Eloquent\Collection $patients_enrollment_details
 * @property \Illuminate\Database\Eloquent\Collection $patients_kin_data
 *
 * @package App\Models
 */
class PatientsMetaDatum extends Eloquent
{
	use \Illuminate\Database\Eloquent\SoftDeletes;

	protected $fillable = [
		'first_name',
		'second_name',
		'id_number'
	];

	public function patients_addresses()
	{
		return $this->hasMany(\App\Models\PatientsAddress::class, 'patient_meta_data_id');
	}

	public function patients_contact_details()
	{
		return $this->hasMany(\App\Models\PatientsContactDetail::class, 'patient_meta_data_id');
	}

	public function patients_enrollment_details()
	{
		return $this->hasMany(\App\Models\PatientsEnrollmentDetail::class, 'patient_meta_data_id');
	}

	public function patients_kin_data()
	{
		return $this->hasMany(\App\Models\PatientsKinDatum::class, 'patient_meta_data_id');
	}
}
