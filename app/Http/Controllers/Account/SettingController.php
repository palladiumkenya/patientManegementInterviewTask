<?php

namespace App\Http\Controllers\Account;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Cache, Auth, Exception;

class SettingController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('user');
    }


    /**
     * Shows the users.
     *
     * @return \Illuminate\Http\Response
     */
    protected function users()
    {
       
        $users =  User::where('depart_id', Auth::user()->depart_id)->orderBy('id', 'desc')->get();
        

        return view('Client.backEnd.users.user', compact('users'));
    }




}
