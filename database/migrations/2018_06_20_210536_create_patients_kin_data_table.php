<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePatientsKinDataTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('patients_kin_data', function(Blueprint $table)
		{
			$table->increments('id');
			$table->unsignedInteger('patient_meta_data_id');
			$table->foreign('patient_meta_data_id')->references('id')->on('patients_meta_data');
			$table->string('next_of_kin_name', 191)->nullable();
			$table->string('next_of_kin_phone', 191)->nullable();
			$table->string('next_of_kin_id_number', 191)->nullable()->index();
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
		Schema::drop('patients_kin_data');
	}

}
