<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePatientsEnrollmentDetailsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('patients_enrollment_details', function(Blueprint $table)
		{
			$table->increments('id');
			$table->unsignedInteger('patient_meta_data_id');
			$table->foreign('patient_meta_data_id')->references('id')->on('patients_meta_data');
			$table->string('enrollment_number', 191)->nullable();
			$table->softDeletes();
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('patients_enrollment_details');
	}

}
