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
       
        $users =  User::where('depart_id', Auth::user()->depart_id)->orderBy('id', 'desc')->get();

        return view('Admin.backEnd.users.user', compact('users'));
    }

    



}
