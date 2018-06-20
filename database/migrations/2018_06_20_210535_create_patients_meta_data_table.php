<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePatientsMetaDataTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('patients_meta_data', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('first_name', 50)->nullable();
			$table->string('second_name', 50)->nullable();
			$table->string('id_number', 50)->nullable()->index();
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
		Schema::drop('patients_meta_data');
	}

}
