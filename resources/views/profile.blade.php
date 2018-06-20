@extends('layouts.dashboard') @section('content')

<div class="panel panel-default">
    <div class="panel-heading">Patient Details </div>

    <div class="panel-body">
        <div class="box-body">
            <div class="row">
                <div class=" col-md-6 col-lg-6 ">
                    <table class="table table-user-information">
                        <tbody>
                            <tr>
                                <h4><strong>Personal Details</strong></h4>
                            </tr>
                            <tr>
                                <td>Name:</td>
                                <td>{{$patient->first_name}}&nbsp;{{$patient->last_name}}</td>
                            </tr>
                            <tr>
                                <td>D.O.B:</td>
                                <td>{{$patient->dob}}</td>
                            </tr>
                            <tr>
                                <td>County</td>
                                <td>{{$patient->county}}</td>
                            </tr>

                            <tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>{{$patient->gender}}</td>
                                </tr>
                                <tr>
                                    <td>Home Address</td>
                                    <td>Kathmandu,Nepal</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td><a href="mailto:info@support.com">info@support.com</a></td>
                                </tr>
                                <td>Phone Number</td>
                                <td>123-4567-890(Landline)
                                    <br>
                                    <br>555-4567-890(Mobile)
                                </td>

                            </tr>

                        </tbody>
                    </table>
<hr/>
                    <a href="#" class="btn btn-primary">Edit</a>
                </div>

                <div class=" col-md-6 col-lg-6 ">

                    <table class="table table-user-information">
                        <tbody>
                            <tr>
                                <h4><strong>Contact Info.</strong></h4>

                            </tr>
                            <tr>
                                <td>Phone Number:</td>
                                <td>{{$patient->phone_number}}</td>
                            </tr>
                            <tr>
                                <td>Alternative Phone</td>
                                <td>{{$patient->altphone}}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{{$patient->email}}</td>
                            </tr>

                        </tbody>
                    </table>
					<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-default">
					 Edit
				   </button>
					<hr style="height:2px;border:none;color:#333;background-color:#333;" />
					
                    <table class="table table-user-information">
					<thead>
					<tr>
					  <th>Name</th>
					  <th>Phone Number</th>
					  <th>Relationship</th>
					  <th>Action</th>
					</tr>
				</thead>
                        <tbody>
                            <tr>
                                <h4><strong>Next of Kins</strong></h4>

                            </tr>
							@foreach($nextOfKins as $nextOfKin)
                            <tr>
                                <td>{{$nextOfKin->first_name}} &nbsp;{{$nextOfKin->last_name}}</td>
                                <td>{{$nextOfKin->phone_number}}</td>
								<td>{{$nextOfKin->relationship}}</td>
								<td><a href="{{url('/profile/'.$nextOfKin->next_of_kin)}}"> <button type="button" class="btn btn-block btn-primary">View</button></a></td>
                            </tr>
							@endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
			<div class="modal fade" id="modal-default">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Contacts</h4>
              </div>
              @include('forms.edit_contacts')
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->
    </div>
    @endsection