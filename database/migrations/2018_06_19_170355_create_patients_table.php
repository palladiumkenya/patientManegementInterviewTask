<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePatientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->increments('id');
			$table->string('first_name');
			$table->string('last_name');
			$table->string('phone_number');
			$table->string('altphone')->nullable();			
            $table->string('email')->unique();
			$table->string('marital_status')->nullable();
			$table->string('relationship')->nullable();
			$table->string('county')->nullable();
			$table->string('subcounty')->nullable();
			$table->string('ward')->nullable();
			$table->string('village')->nullable();
			$table->string('gender')->nullable();
			$table->string('id_number')->nullable();
			$table->string('comments')->nullable();			
			$table->string('is_patient')->nullable();
			$table->string('is_deleted')->nullable();
			$table -> integer('next_of_kin') -> unsigned() -> default(0);
			$table->foreign('next_of_kin')->references('id')->on('users');
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
        Schema::dropIfExists('patients');
    }
}
