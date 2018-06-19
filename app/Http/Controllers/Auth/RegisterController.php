<?php


namespace App\Http\Controllers\Auth;


use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use App\Http\Requests\organizationCreate;
use App\Models\Organization;
use App\Http\Requests\registerNewUser;

use Jrean\UserVerification\Traits\VerifiesUsers;
use Jrean\UserVerification\Facades\UserVerification;
use Illuminate\Http\Request;
use DB, Mail, Auth, Exception, Log;



class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to

 
    | provide this functionality without requiring any additional code.
    |
    */


    use RegistersUsers;
    use VerifiesUsers;


    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }



    public function register(registerNewUser $request)
    {
         try 
         {
            DB::beginTransaction();
            
            $user = new User;
            $user->first_name = $request->first_name;
            $user->last_name = $request->second_name;
            $user->email = $request->email;
            $user->password = bcrypt(str_random(15));
            $user->verification_token = str_random(30);
            $user->org_id = Auth::user()->org_id;
            $user->save();

            UserVerification::generate($user);
            UserVerification::send($user, 'Account Verification Mail');

            DB::commit();
            return back()->withAlert('Register successfully, please verify your email.');

         } 
        catch (Exception $e) 
         {
            Log::error($e);
            DB::rollback(); 
            return back()->with('message', 'Ooops! Something Went Wrong!');
         }
        
      
    }




    public function registerOrganization(organizationCreate $request)
    {
        try 
         {
            DB::beginTransaction();

           $organization = new Organization;
           $organization->name = $request->name;
           $organization->type = 2;
           $organization->parent = 1;
           $organization->save();


           $user = new User;
           $user->first_name = $request->first_name;
           $user->last_name = $request->second_name;
           $user->email = $request->email;
           $user->password = bcrypt(str_random(15));
           $user->verification_token = str_random(30);
           $user->org_id = $organization->id;
           $user->save();

           UserVerification::send($user, 'Account Verification Mail');
           
           DB::commit();
           return back()->with('info', "New Profile Created");
            
         } 
        catch (Exception $e) 
         {
            Log::error($e);
            DB::rollback(); 
            return back()->with('message', 'Ooops! Something Went Wrong!');
         }
       


    }
}