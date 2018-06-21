@extends('frontLayout.app')
@section('title')
Set Password
@stop
@section('content')
<div class="container">
    <div class="row">
        <br><br> <br><br>
        <div class="col-md-offset-3 col-md-6">
            <div class="panel panel-default">
                <div class="text-center panel-heading">Create Password</div>
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
                <div class="panel-body text-center">
                    <form method="POST" action="{{ url('password-set') }}">

                            {{ csrf_field() }}
                            <div class="row">
                            <div class="input-group mb-6">
                                <span class="input-group-addon"><i class="icon-lock"></i></span>
                                <input type="password" name="password" class="form-control" placeholder="Password"
                                       required>
                            </div>
                           </div>
                           <br>
                           <input type="hidden" name="user_id" value="{{$user_id}}">
                            <div class="row">
                                <div class="input-group mb-6">
                                <span class="input-group-addon"><i class="icon-lock"></i></span>
                                <input type="password" name="password_confirmation" class="form-control" placeholder="password confirmation"
                                       required>
                            </div>
                            </div>
                            <div class="row">
                                <br>
                                <div class="col-12">
                                    <button type="submit" class="btn btn-primary btn-sm ">Set Password</button>
                                   
                                </div>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')


@endsection