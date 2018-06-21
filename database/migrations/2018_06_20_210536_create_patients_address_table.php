<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePatientsAddressTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('patients_address', function(Blueprint $table)
		{
			$table->increments('id');
			$table->unsignedInteger('patient_meta_data_id');
			$table->foreign('patient_meta_data_id')->references('id')->on('patients_meta_data');
			$table->string('village', 191)->nullable();
			$table->string('ward', 191)->nullable();
			$table->string('subcounty', 191)->nullable();
			$table->string('county', 191)->nullable();
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
		Schema::drop('patients_address');
	}

}
