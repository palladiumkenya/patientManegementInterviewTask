<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Organization;
use Exception, Log, Auth, DB, Hash;
use App\Http\Requests\setpassword;
use App\Models\OrganizationLevels;
use Illuminate\Support\Facades\Validator;

class LoginRouterController extends Controller {


    /*
    |--------------------------------------------------------------------------
    | router Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home creen. 
    |
    */

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        
    }


     /**
     * Where to redirect users after login.
     *
     * @var string
     */

    public function routeUser()
    {
       
       $org_type = Organization::where('id', User::where('email', Auth::user()->email)->value('org_id'))->value('type');

       if ($org_type === '1'){
           
           return redirect('return-view/admin-dashboard'); 
          
           
        }
       elseif ($org_type === '2') {

           return redirect('return-view/dashboard');
           
          
        }
       else{

           return redirect('login');
           Log::error("User: " . Auth::user()->email . " NOT FOUND");
       }
    }


     /**
     * 
     * Get the user who has the same token and change status to verified i.e. 1
     */
      public function verify($token)
      { 
        try 
          {
              if (User::where('verification_token', '=', $token)->exists())
                {
                    $user_id = User::where('verification_token', '=', $token)->value('id');

                    return view('auth.passwords.newUserReset', compact('user_id'));
                }
             else 
                {
                    return redirect('login');
                }
          } 
        catch (Exception $e) 
          {
                return redirect('login');
          }
         
      }


      public function setPassword(setpassword $request)
      {
        try 
         {
            DB::beginTransaction();
            $user = User::find($request->user_id);

            $user->password = Hash::make($request->password);
            $user->verified = 1;
            $user->verification_token = NULL;
            $user->save();

            DB::commit();
            return redirect('login')->with('info', 'Your account is active');
          
         } 
        catch (Exception $e) 
         {
            Log::error($e);
            DB::rollback();
            return redirect('login')->with('message', 'Ooops! Something Went Wrong.'); 
         }


            
      }

}
