@extends('Client.backLayout.app')
@section('title')
Deleted Patient Record
@stop
@section('style')

@stop
@section('content')
<div class="panel panel-default">
        <div class="panel-heading">Patient Records</div>


        <div class="panel-body">
             <div class="table-responsive">
                <br>
                <table id="data" class="table table-striped table no-margin">
                    <thead>
                        <tr class="success">
                            <th class="text-center"> ID </th>
                            <th class="text-center"> Name </th>
                            <th class="text-center"> ID Number</th>
                            <th class="text-center"> Enrollment Number </th>
                            <th class="text-center"> Phone</th>
                            <th class="text-center"> Email</th>
                            <th class="text-center"> Alt Phone </th>
                            <th class="text-center"> Village </th>
                            <th class="text-center"> Ward </th>
                            <th class="text-center"> Sub County </th>
                            <th class="text-center"> County </th>
                            <th class="text-center"> Kin Name </th>
                            <th class="text-center"> Kin Phone </th>
                            <th class="text-center"> Kin ID No </th>
                        </tr>
                    </thead>
                    <tbody>
                        <!--  Initialize Table ID counter -->
                        @php $id = 1; @endphp @foreach($deleted as $data)
                        <tr>
                            <td class="text-center"> {{$id ++}} </td>
                            <td class="text-center"> {{$data->first_name . " " . $data->second_name }}</td>
                            <td class="text-center"> {{$data->id_number}}</td>
                            <td class="text-center"> {{App\Models\PatientsEnrollmentDetail::withTrashed()->where('patient_meta_data_id', $data->id)->value('enrollment_number')}}</td>
                            <td class="text-center">  {{App\Models\PatientsContactDetail::withTrashed()->where('patient_meta_data_id', $data->id)->value('cell_phone')}}</td>
                            <td class="text-center">  {{App\Models\PatientsContactDetail::withTrashed()->where('patient_meta_data_id', $data->id)->value('email')}}</td>
                            <td class="text-center">  {{App\Models\PatientsContactDetail::withTrashed()->where('patient_meta_data_id', $data->id)->value('alternative_cell_number')}}</td>
                            <td class="text-center">  {{App\Models\PatientsAddress::withTrashed()->where('patient_meta_data_id', $data->id)->value('village')}}</td>
                            <td class="text-center">  {{App\Models\PatientsAddress::withTrashed()->where('patient_meta_data_id', $data->id)->value('ward')}}</td>
                            <td class="text-center"> {{App\Models\PatientsAddress::withTrashed()->where('patient_meta_data_id', $data->id)->value('subcounty')}} </td>
                            <td class="text-center"> {{App\Models\PatientsAddress::withTrashed()->where('patient_meta_data_id', $data->id)->value('county')}} </td>
                            <td class="text-center"> {{App\Models\PatientsKinDatum::withTrashed()->where('patient_meta_data_id', $data->id)->value('next_of_kin_name')}} </td>
                            <td class="text-center"> {{App\Models\PatientsKinDatum::withTrashed()->where('patient_meta_data_id', $data->id)->value('next_of_kin_phone')}} </td>
                            <td class="text-center"> {{App\Models\PatientsKinDatum::withTrashed()->where('patient_meta_data_id', $data->id)->value('next_of_kin_id_number')}} </td> 
                        @endforeach
                    </tbody>
                </table>
            <!-- /.table-responsive -->
    </div>
    </div>                
</div>


  
@stop