<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCampaignDetailsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('campaign_details', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('counter')->nullable();
			$table->integer('statum_org_id')->nullable();
			$table->integer('daily_counter')->nullable();
			$table->integer('status')->nullable();
			$table->bigInteger('campaign_id')->nullable()->index();
			$table->bigInteger('msg_id')->nullable();
			$table->bigInteger('org_id')->nullable();
			$table->string('src_address')->nullable();
			$table->string('dst_address')->nullable()->index();
			$table->string('message')->nullable()->index();
			$table->string('datereceived')->nullable();
			$table->string('linkid')->nullable();
			$table->string('traceid')->nullable();
			$table->string('service_id')->nullable();
			$table->string('subscribed_services_id', 191)->nullable();
			$table->dateTime('sent_time')->nullable();
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
		Schema::drop('campaign_details');
	}

}
