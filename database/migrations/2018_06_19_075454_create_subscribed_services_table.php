<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSubscribedServicesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('subscribed_services', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('originator')->nullable()->index();
			$table->string('app_id')->nullable();
			$table->string('app_pass')->nullable();
			$table->string('user_id')->nullable();
			$table->string('ucm_org_id')->nullable();
			$table->string('keyword')->nullable();
			$table->string('shortcode')->nullable();
			$table->string('org_id')->nullable();
			$table->string('username')->nullable();
			$table->string('password')->nullable();
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
		Schema::drop('subscribed_services');
	}

}
