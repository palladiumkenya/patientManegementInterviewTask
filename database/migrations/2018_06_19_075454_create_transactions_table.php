<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTransactionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('transactions', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('status')->nullable();
			$table->integer('org_id')->nullable();
			$table->string('dst_address')->nullable()->index();
			$table->string('src_address')->nullable();
			$table->string('message')->nullable();
			$table->string('response_code', 191)->nullable()->index();
			$table->string('response_desc')->nullable();
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
		Schema::drop('transactions');
	}

}
