<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateScheduledMessagesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('scheduled_messages', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('org_id');
			$table->string('message')->nullable();
			$table->string('answer')->nullable();
			$table->string('subscribed_services_id')->nullable();
			$table->string('scheduled_at')->nullable();
			$table->string('counter')->default('0');
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
		Schema::drop('scheduled_messages');
	}

}
