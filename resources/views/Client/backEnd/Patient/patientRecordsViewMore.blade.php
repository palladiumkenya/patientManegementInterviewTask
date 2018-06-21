@extends('Client.backLayout.app')
@section('title')
Patient Record
@stop
@section('style')

@stop
@section('content')
<div class="panel panel-default">
        <div class="panel-heading">Patient Records</div>
       <!-- Congrats message -->
        @if (session('info'))
            <div class="alert alert-success alert-dismissable">
            <button aria-hidden="true" data-dismiss="alert" class="close" type="button"><i class="fa fa-close"></i>
            </button>
            <h4><i class="icon fa fa-check"></i>
                {{ session('info') }}
             </h4>   
            </div>
        @endif

        <!-- Error message -->
        @if (session('message'))
            <div class="alert alert-danger alert-dismissable">
            <button aria-hidden="true" data-dismiss="alert" class="close" type="button"><i class="fa fa-close"></i></button> <h4><i class="icon fa fa-check"></i>
                {{ session('message') }}
             </h4>
            </div>
        @endif

        
        @if (count($errors) > 0)
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="panel-body">
             <!-- Trigger the modal with a button -->
          <a class="btn btn-xs btn-primary btn-flat" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-edit"> Update Record</span></a>
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
                            <th class="text-center"> Edit </th>
                            <th class="text-center"> Delete </th>
                        </tr>
                    </thead>
                    <tbody>
                        <!--  Initialize Table ID counter -->
                        @php $id = 1; @endphp @foreach($patientRecords as $data)
                        <tr>
                            <td class="text-center"> {{$id ++}} </td>
                            <td class="text-center"> {{$data->first_name . " " . $data->second_name }}</td>
                            <td class="text-center"> {{$data->id_number}}</td>
                            <td class="text-center"> {{App\Models\PatientsEnrollmentDetail::where('patient_meta_data_id', $data->id)->value('enrollment_number')}}</td>
                            <td class="text-center">  {{App\Models\PatientsContactDetail::where('patient_meta_data_id', $data->id)->value('cell_phone')}}</td>
                            <td class="text-center">  {{App\Models\PatientsContactDetail::where('patient_meta_data_id', $data->id)->value('email')}}</td>
                            <td class="text-center">  {{App\Models\PatientsContactDetail::where('patient_meta_data_id', $data->id)->value('alternative_cell_number')}}</td>
                            <td class="text-center">  {{App\Models\PatientsAddress::where('patient_meta_data_id', $data->id)->value('village')}}</td>
                            <td class="text-center">  {{App\Models\PatientsAddress::where('patient_meta_data_id', $data->id)->value('ward')}}</td>
                            <td class="text-center"> {{App\Models\PatientsAddress::where('patient_meta_data_id', $data->id)->value('subcounty')}} </td>
                            <td class="text-center"> {{App\Models\PatientsAddress::where('patient_meta_data_id', $data->id)->value('county')}} </td>
                            <td class="text-center"> {{App\Models\PatientsKinDatum::where('patient_meta_data_id', $data->id)->value('next_of_kin_name')}} </td>
                            <td class="text-center"> {{App\Models\PatientsKinDatum::where('patient_meta_data_id', $data->id)->value('next_of_kin_phone')}} </td>
                            <td class="text-center"> {{App\Models\PatientsKinDatum::where('patient_meta_data_id', $data->id)->value('next_of_kin_id_number')}} </td>
                            <td class="text-center"> </td>
                            <td class="text-center"> </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            <!-- /.table-responsive -->
    </div>
    </div>                
</div>


  <!-- Add patient  -->
    <div class="container">
        <!-- Modal -->
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add Patient</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form" method="POST" action="{{ url('/register-patient') }}">
                            {{ csrf_field() }}


                            <p class="col-md-offset-6">Patient's Data</p>

                            <div class="form-group{{ $errors->has('first_name') ? ' has-error' : '' }}">
                                <label for="first_name" class="col-md-4 control-label">First Name </label>

                                <div class="col-lg-6 col-md-8 col-sm-12">
                                    <input id="first_name" type="text" class="form-control" name="first_name" value="{{ old('first_name') }}" required>

                                    @if ($errors->has('first_name'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('first_name') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group{{ $errors->has('second_name') ? ' has-error' : '' }}">
                                <label for="second_name" class="col-md-4 control-label">Second Name </label>

                                <div class="col-lg-6 col-md-8 col-sm-12">
                                    <input id="second_name" type="text" class="form-control" name="second_name" value="{{ old('second_name') }}" required>

                                    @if ($errors->has('second_name'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('second_name') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group{{ $errors->has('id_number') ? ' has-error' : '' }}">
                                <label for="id_number" class="col-md-4 control-label"> ID Number </label>

                                <div class="col-lg-6 col-md-8 col-sm-12">
                                    <input id="id_number" type="number" class="form-control" name="id_number" value="{{ old('id_number') }}" required>

                                    @if ($errors->has('id_number'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('id_number') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>



                            <div class="form-group">
                                <div class="col-lg-6 col-md-8 col-sm-12 col-md-offset-4">
                                <button type="button" class="btn btn-default btn-flat pull-left" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-facebook btn-flat pull-right">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop