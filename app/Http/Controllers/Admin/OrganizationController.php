<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Organization;
use App\Models\SubscribedService;
use Illuminate\Http\Request;
use Auth, Cache, DB, Exception;
use App\Http\Requests\subscriptionSetting;


class OrganizationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
       $this->middleware('admin');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {


       $orgs = Organization::orderBy('id', 'desc')->get();


        return view('Admin.backEnd.Organization.organizations', compact('orgs'));
    }


    public function setService(subscriptionSetting $request)
    {
        try 
         {
            SubscribedService::updateOrCreate
            (['org_id' => $request->statum_org_id],
              [
                'originator' => $request->originator,
                'app_id' => $request->app_id,
                'app_pass' => $request->app_pass,
                'user_id' => $request->user_id,
                'ucm_org_id' => $request->ucm_org_id,
                'keyword' => $request->key_word,
                'shortcode' => $request->short_code,
                'username' => $request->user_name,
                'password' => $request->password
             ]);

            return back()->with('info', "Profile updated");


         } 
        catch (Exception $e) 
         {
            return back()->with('message', 'Ooops! Something Went Wrong!');
         }
       
    }


}
