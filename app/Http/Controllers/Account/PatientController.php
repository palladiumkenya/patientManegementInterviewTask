<?php

namespace App\Http\Controllers\Account;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\PatientsAddress;
use App\Models\PatientsContactDetail;
use App\Models\PatientsEnrollmentDetail;
use App\Models\PatientsKinDatum;
use App\Models\PatientsMetaDatum;
use Cache, Auth, Log, Exception, DB, App\Http\Requests\createPatientsMetaDatum, App\Http\Requests\updatePatientData;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $patientRecords = PatientsMetaDatum::all();
       
       return view('Client.backEnd.Patient.patientRecords', compact('patientRecords')); 
    }

    /**
     * Show the form for other data for patient.
     *
     * @return \Illuminate\Http\Response
     */
    public function viewMore(Request $request)
    {
        $patientRecords = PatientsMetaDatum::where('id', $request->id)->get();
       
       return view('Client.backEnd.Patient.patientRecordsViewMore', compact('patientRecords')); 
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(createPatientsMetaDatum $request)
    {
        try 
          {
            DB::beginTransaction();

            PatientsMetaDatum::create($request->all());

            DB::commit();
            return back()->with('info', 'Profile created');

          } 
        catch (Exception $e) 
          {
            Log::error($e);
            DB::rollback(); 
            return back()->with('message', 'Ooops! Something Went Wrong!');
          }
        
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(updatePatientData $request)
    {

        try 
          {
            DB::beginTransaction();

            $patient_data = PatientsMetaDatum::find($request->patient_meta_data_id);
            $patient_data->first_name = $request->first_name;
            $patient_data->second_name = $request->second_name;
            $patient_data->id_number = $request->id_number;
            $patient_data->save();

            PatientsContactDetail::updateOrCreate(
            ['patient_meta_data_id' => $request->patient_meta_data_id],
            ['cell_phone' => $request->cell_phone,
             'email' => $request->email,
             'alternative_cell_number' => $request->alternative_cell_number]);

            PatientsAddress::updateOrCreate(
            ['patient_meta_data_id' => $request->patient_meta_data_id],
            ['village' => $request->village,
             'ward' => $request->ward,
             'subcounty' => $request->subcounty,
             'county' => $request->county]);

            PatientsEnrollmentDetail::updateOrCreate(
            ['patient_meta_data_id' => $request->patient_meta_data_id],
            ['enrollment_number' => $request->enrollment_number]);

            PatientsKinDatum::updateOrCreate(
            ['patient_meta_data_id' => $request->patient_meta_data_id],
            ['next_of_kin_name' => $request->next_of_kin_name,
            'next_of_kin_phone' => $request->next_of_kin_phone,
            'next_of_kin_id_number' => $request->next_of_kin_id_number]);

            DB::commit();
            return back()->with('info', 'Profile updated');
            
          } 
        catch (Exception $e) 
          {
            Log::error($e);
            DB::rollback(); 
            return back()->with('message', 'Ooops! Something Went Wrong!');
          }






    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        try 
          {
             DB::beginTransaction();

             PatientsMetaDatum::find($request->id)->delete();
             PatientsKinDatum::where('patient_meta_data_id', $request->id)->delete();
             PatientsAddress::where('patient_meta_data_id', $request->id)->delete();
             PatientsContactDetail::where('patient_meta_data_id', $request->id)->delete();
             PatientsEnrollmentDetail::where('patient_meta_data_id', $request->id)->delete();
             

             DB::commit();
             return back()->with('info', 'Profile Deleted');
          } 
        catch (Exception $e) 
          {
             Log::error($e);
             DB::rollback(); 
             return back()->with('message', 'Ooops! Something Went Wrong!');
          }
    }
}
