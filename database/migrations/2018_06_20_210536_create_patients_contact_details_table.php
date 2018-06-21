<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePatientsContactDetailsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('patients_contact_details', function(Blueprint $table)
		{
			$table->increments('id');
			$table->unsignedInteger('patient_meta_data_id');
			$table->foreign('patient_meta_data_id')->references('id')->on('patients_meta_data');
			$table->bigInteger('cell_phone')->nullable();
			$table->string('email', 191)->nullable();
			$table->integer('alternative_cell_number')->nullable();
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
		Schema::drop('patients_contact_details');
	}

}
