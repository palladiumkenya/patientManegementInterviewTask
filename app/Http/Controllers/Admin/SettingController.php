<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Cache, Auth, Exception;
use App\Models\SubscribedService;

class SettingController extends Controller
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
     * Shows the users.
     *
     * @return \Illuminate\Http\Response
     */
    protected function users()
    {
       
        $users =  User::where('org_id', Auth::user()->org_id)->orderBy('id', 'desc')->get();

        return view('Admin.backEnd.users.user', compact('users'));
    }

    /**
     * Shows the gateway connectors.
     *
     * @return \Illuminate\Http\Response
     */
    public function configs()
    {
       $configs = SubscribedService::all();

       return view('Admin.backEnd.Setting.configs', compact('configs'));
    }




}
