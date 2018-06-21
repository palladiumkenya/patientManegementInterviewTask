<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Auth, Cache, DB;
use App\Models\PatientsAddress;
use App\Models\PatientsContactDetail;
use App\Models\PatientsEnrollmentDetail;
use App\Models\PatientsKinDatum;
use App\Models\PatientsMetaDatum;


class HomeController extends Controller
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
       $users = User::count();
       $patients = PatientsMetaDatum::count();
       $deleted_patients = PatientsMetaDatum::withTrashed()->count();
       $last_date = PatientsMetaDatum::orderBy('id', 'desc')->value('created_at');

       return view('Admin.dashboard', compact('users', 'patients', 'deleted_patients', 'last_date'));
    }


}
