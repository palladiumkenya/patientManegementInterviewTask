@extends('layouts.dashboard')

@section('content')

<div class="panel panel-default">
	<div class="panel-heading">Team Management</div>

	<div class="panel-body">
		<div class="box-body">
			<table id="example1" class="table table-bordered table-striped">
				<thead>
					<tr>
					  <th>Name</th>
					  <th>Phone Number</th>
					  <th>Email</th>
					  <th>Admitted On</th>
					  <th>Action</th>
					</tr>
				</thead>
				<tbody>
					@foreach($patients as $patient)
					<tr>
					  <td><a href="#">{{$patient->first_name}}&nbsp;{{$patient->last_name}}</a></td>
					  <td>{{$patient->phone_number}}</td>
					  <td>{{$patient->email}}</td>
					  <td> {{$patient->created_at}}</td>
					  <td>
					  <a href="{{url('/profile/'.$patient->id)}}"> <button type="button" class="btn btn-block btn-primary">View</button></a>
					  </td>
					</tr>
					@endforeach
				 </tbody>
			</table>
		</div>
	</div>
</div>
@endsection
