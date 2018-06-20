<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\Patient;
use App\Models\NextOfKin;
use Carbon\Carbon;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
		$patients = Patient::where('is_patient',1)->where('is_deleted',0)->get();
        return view('home')->with('patients',$patients);
    }
	
	 public function deletedPatients()
    {
		$patients = Patient::where('is_patient',1)
		->where('is_deleted',1)
		->get();
        return view('home')->with('patients',$patients);
    }
	
	 public function belowAge()
    {
		$patients = Patient::where('is_patient',1)
		->where('is_deleted',0)
		->where( 'dob', '>', Carbon::now()->subYears(15))
		->get();
        return view('home')->with('patients',$patients);
    }
	
	 public function profile($id)
    {
		$patient = Patient::find($id);
		$nextOfKins = \DB::select('SELECT p.id,p.first_name,p.last_name,p.phone_number,n.relationship, n.id,n.patient_id,n.next_of_kin from patients as p join next_of_kins as n on p.id = n.next_of_kin where n.patient_id = ?', [$id]);
        return view('profile')->with('patient',$patient)->with('nextOfKins', $nextOfKins);
    }
	public function addMember()
    {		
        return view('forms.add_new_user');
    }
	
	public function savePatient(Request $request){
		$patient = new Patient();
		$patient->first_name = $request->get('first_name');
		$patient->last_name = $request->get('last_name');
		$patient->phone_number = $request->get('phone_number');
		$patient->altphone = $request->get('altphone');			
		$patient->email = $request->get('email');
		$patient->marital_status = $request->get('marital_status');
		$patient->county = $request->get('county');
		$patient->subcounty = $request->get('subcounty');
		$patient->ward = $request->get('ward');
		$patient->village = $request->get('village');
		$patient->gender = $request->get('gender');
		$patient->id_number = $request->get('id_number');
		$patient->dob = $request->get('date_of_birth');			
		$patient->is_patient = 1;
		$patient->is_deleted = $request->get('is_deleted');		
		$patient->save();
		
		$nextOfKin = new Patient();
		$nextOfKin->first_name = $request->get('next_of_kin_first_name');
		$nextOfKin->last_name = $request->get('next_of_kin_last_name');
		$nextOfKin->phone_number = $request->get('next_of_kin_phone_number');
		$nextOfKin->is_patient = 0;
		$nextOfKin->save();
		
		$nxtkin = new NextOfKin();
		$nxtkin->patient_id = $patient->id;
		$nxtkin->next_of_kin = $nextOfKin->id;		
		$nxtkin->relationship = $request->get('relationship');
		$nxtkin->save();
		
		
		return redirect('/home');
		
	}
	
	public function updateContacts(Request $request){
		$patient = Patient::find($request->get('user'));
		$patient->phone_number = $request->get('phone_number');
		$patient->altphone = $request->get('altphone');			
		$patient->email = $request->get('email');
		$patient->update();
		
		return redirect('/profile/'.$request->get('user'));
	}
}
