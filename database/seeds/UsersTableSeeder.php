<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Department;
use App\Models\DepartmentLevel;

class UsersGenerate extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
 
        $level = new DepartmentLevel;
        $level->level_id = 1;
        $level->save();

        $level = new DepartmentLevel;
        $level->level_id = 2;
        $level->save();


    	$department = new Department;
        $department->name = "Base Organization";
		$department->level_id = 1;
		$department->save();

		$department = new Department;
        $department->name = "Department";
		$department->level_id = 2;
		$department->save();


		$user = new User;
        $user->email = "admin@admin.com";
		$user->depart_id = 1;
        $user->first_name = "Admin";
		$user->last_name = "Account";
	    $user->verified = 1;
		$user->save();


		$user = new User;
        $user->email = "depart@depart.com";
		$user->depart_id = 2;
        $user->first_name = "Test";
		$user->last_name = "User";
	    $user->verified = 1;
		$user->save();

       
    }

}
