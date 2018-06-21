<?php

namespace App\Http\Controllers\Account;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\PatientsAddress;
use App\Models\PatientsContactDetail;
use App\Models\PatientsEnrollmentDetail;
use App\Models\PatientsKinDatum;
use App\Models\PatientsMetaDatum;

class ApiController extends Controller
{
        /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
       $this->middleware('guest');
    }


    /**
     * receives api request
     *
     * @return JSON response
     */
    public function index(Request $request)
    {
       
    }
}
