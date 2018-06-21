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
                        <h4 class="modal-title">Update Records</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form" method="POST" action="{{ url('/update-patient-details') }}">
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

                            <input type="hidden" name="patient_meta_data_id" value="{{$data->id}}">

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

                            <p class="col-md-offset-6">Contact Details</p>

                            <div class="form-group{{ $errors->has('cell_phone') ? ' has-error' : '' }}">
                                <label for="cell_phone" class="col-md-4 control-label">Phone </label>

                                <div class="col-lg-6 col-md-8 col-sm-12">
                                    <input id="cell_phone" type="number" class="form-control" name="cell_phone" value="{{ old('cell_phone') }}" required>

                                    @if ($errors->has('cell_phone'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('cell_phone') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                <label for="email" class="col-md-4 control-label">Email </label>

                                <div class="col-lg-6 col-md-8 col-sm-12">
                                    <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required>

                                    @if ($errors->has('email'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('email') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group{{ $errors->has('alternative_cell_number') ? ' has-error' : '' }}">
                                <label for="alternative_cell_number" class="col-md-4 control-label"> Alt Phone </label>

                                <div class="col-lg-6 col-md-8 col-sm-12">
                                    <input id="alternative_cell_number" type="number" class="form-control" name="alternative_cell_number" value="{{ old('alternative_cell_number') }}" required>

                                    @if ($errors->has('alternative_cell_number'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('alternative_cell_number') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                          <p class="col-md-offset-6">Location Details</p>

                            <div class="form-group{{ $errors->has('village') ? ' has-error' : '' }}">
                                <label for="village" class="col-md-4 control-label">Village </label>

                                <div class="col-lg-6 col-md-8 col-sm-12">
                                    <input id="village" type="text" class="form-control" name="village" value="{{ old('village') }}" required>

                                    @if ($errors->has('village'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('village') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group{{ $errors->has('ward') ? ' has-error' : '' }}">
                                <label for="ward" class="col-md-4 control-label"> Ward </label>

                                <div class="col-lg-6 col-md-8 col-sm-12">
                                    <input id="ward" type="text" class="form-control" name="ward" value="{{ old('ward') }}" required>

                                    @if ($errors->has('ward'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('ward') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group{{ $errors->has('subcounty') ? ' has-error' : '' }}">
                                <label for="subcounty" class="col-md-4 control-label"> Sub County </label>

                                <div class="col-lg-6 col-md-8 col-sm-12">
                                    <input id="subcounty" type="text" class="form-control" name="subcounty" value="{{ old('subcounty') }}" required>

                                    @if ($errors->has('subcounty'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('subcounty') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>


                            <div class="form-group{{ $errors->has('county') ? ' has-error' : '' }}">
                                <label for="county" class="col-md-4 control-label">County </label>

                                <div class="col-lg-6 col-md-8 col-sm-12">
                                    <input id="county" type="text" class="form-control" name="county" value="{{ old('county') }}" required>

                                    @if ($errors->has('county'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('county') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <p class="col-md-offset-6">Next of Kin Details</p>

                            <div class="form-group{{ $errors->has('next_of_kin_name') ? ' has-error' : '' }}">
                                <label for="next_of_kin_name" class="col-md-4 control-label">Kin Name </label>

                                <div class="col-lg-6 col-md-8 col-sm-12">
                                    <input id="next_of_kin_name" type="text" class="form-control" name="next_of_kin_name" value="{{ old('next_of_kin_name') }}" required>

                                    @if ($errors->has('next_of_kin_name'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('next_of_kin_name') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group{{ $errors->has('next_of_kin_phone') ? ' has-error' : '' }}">
                                <label for="next_of_kin_phone" class="col-md-4 control-label"> Kin Phone </label>

                                <div class="col-lg-6 col-md-8 col-sm-12">
                                    <input id="next_of_kin_phone" type="number" class="form-control" name="next_of_kin_phone" value="{{ old('next_of_kin_phone') }}" required>

                                    @if ($errors->has('next_of_kin_phone'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('next_of_kin_phone') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            

                            <div class="form-group{{ $errors->has('next_of_kin_id_number') ? ' has-error' : '' }}">
                                <label for="next_of_kin_id_number" class="col-md-4 control-label">Kin ID </label>

                                <div class="col-lg-6 col-md-8 col-sm-12">
                                    <input id="next_of_kin_id_number" type="number" class="form-control" name="next_of_kin_id_number" value="{{ old('next_of_kin_id_number') }}" required>

                                    @if ($errors->has('next_of_kin_id_number'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('next_of_kin_id_number') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <p class="col-md-offset-6">Enrollment Details</p>

                            <div class="form-group{{ $errors->has('enrollment_number') ? ' has-error' : '' }}">
                                <label for="enrollment_number" class="col-md-4 control-label"> Enrollment Number </label>

                                <div class="col-lg-6 col-md-8 col-sm-12">
                                    <input id="enrollment_number" type="text" class="form-control" name="enrollment_number" value="{{ old('enrollment_number') }}" required>

                                    @if ($errors->has('enrollment_number'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('enrollment_number') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>


                           <br>
                            <div class="form-group">
                                <div class="col-lg-6 col-md-8 col-sm-12 col-md-offset-4">
                                <button type="button" class="btn btn-default btn-flat pull-left" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-facebook btn-flat pull-right">
                                        Update
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