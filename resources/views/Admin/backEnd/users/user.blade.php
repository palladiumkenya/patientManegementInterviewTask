@extends('Admin.backLayout.app')
@section('title')
Show users
@stop
@section('style')

@stop
@section('content')
<div class="panel panel-default">
        <div class="panel-heading">Users</div>

        <div class="panel-body">
            <!-- Trigger the modal with a button -->
          <a class="btn btn-xs btn-primary btn-flat" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-plus"> User</span></a>
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
             <div class="table-responsive">
                <table id="data" class="table table-striped table no-margin">
                    <thead>
                        <tr class="success">
                            <th class="text-center"> ID </th>
                            <th class="text-center"> Name </th>
                            <th class="text-center"> Status</th>
                            <th class="text-center"> Email</th>
                            <th class="text-center"> Last Login </th>
                            <th class="text-center"> IP Address </th>
                            <th class="text-center"> Joined on </th>
                        </tr>
                    </thead>
                    <tbody>
                        <!--  Initialize Table ID counter -->
                        @php $id = 1; @endphp @foreach($users as $data)
                        <tr>
                            <td class="text-center"> {{$id ++}} </td>
                            <td class="text-center"> {{$data->first_name . " " . $data->last_name }}</td>
                            <td class="text-center"> @if($data->verified == 1){{"Active"}}
                                                     @else{{"Inactive"}}
                                                     @endif
                             </td>
                            <td class="text-center"> {{$data->email}}</td>
                            <td class="text-center"> {{$data->last_login_at}}</td>
                            <td class="text-center"> {{$data->last_login_ip}}</td>
                            <td class="text-center"> {{$data->created_at}}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
                    <!-- /.table-responsive -->
    </div>
    </div>                
</div>

    <!-- Add Organization  -->
    <div class="container">
        <!-- Modal -->
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add User</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form" method="POST" action="{{ url('/register-user') }}">
                            {{ csrf_field() }}


                            <p class="col-md-offset-6">User's Data</p>

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

                            <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                <label for="email" class="col-md-4 control-label"> Email </label>

                                <div class="col-lg-6 col-md-8 col-sm-12">
                                    <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required>

                                    @if ($errors->has('email'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('email') }}</strong>
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