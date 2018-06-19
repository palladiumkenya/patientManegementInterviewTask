@extends('Client.backLayout.app')
@section('title')
Subscription Content
@stop
@section('style')

@stop
@section('content')
<div class="panel panel-default">
        <div class="panel-heading">Subscription Content</div>

        <div class="panel-body">
          <!-- Trigger the modal with a button -->
          <a class="btn btn-xs btn-primary btn-flat" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-plus"> Content</span></a>
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
          <br>

        <table id="data" class="table table-striped table no-margin">
          <thead>
            <tr class="success">
              <th class="text-center"> ID </th>
              <th class="text-center"> Message</th>
              <th class="text-center"> Answer</th>
              <th class="text-center"> Created On</th>
              <th class="text-center"> Edit </th>
              <th class="text-center"> Delete </th>
           </tr>
          </thead>
          <tbody>
            <!--  Initialize Table ID counter -->
            <?php $id = 1; ?>
            @foreach($data_records as $data)
            <tr>
              <td class="text-center"> {{$id ++}} </td>
              <td class="text-center"> {{$data->message}}</td>
              <td class="text-center"> {{$data->answer}}</td>
              <td class="text-center"> {{$data->created_at}}</td>
              <td class="text-center"><a class="btn btn-xs btn-warning"  data-toggle="modal" data-target="#edit_submessage{{$data->id}}"><span><i class="fa fa-edit" aria-hidden="true"></i> Edit </span></a>
                <!-- Add content  -->
            <div class="container">
                <!-- Modal -->
                <div class="modal fade" id="edit_submessage{{$data->id}}" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Add Content</h4>
                            </div>
                            <div class="modal-body">
                                <form class="form-horizontal" role="form" method="POST" action="{{ url('/update-content') }}">
                                    {{ csrf_field() }}
                                    <div class="form-group{{ $errors->has('message') ? ' has-error' : '' }}">
                                        <label for="message" class="col-md-2 control-label"> Message </label>

                                        <div class="col-lg-8 col-md-10 col-sm-12">
                                            <textarea class="form-control z-depth-1"  name="message" required="required" rows="7" column="12" id="message"> {{$data->message}}</textarea>

                                            @if ($errors->has('message'))
                                                <span class="help-block">
                                                    <strong>{{ $errors->first('message') }}</strong>
                                                </span>
                                            @endif
                                        </div>
                                    </div>

                                    <br>
                                    <input type="hidden" name="id" value="{{$data->id}}">
                      
                                    <div class="form-group{{ $errors->has('answer') ? ' has-error' : '' }}">
                                        <label for="answer" class="col-md-2 control-label"> Answer </label>

                                        <div class="col-lg-8 col-md-10 col-sm-12">
                                            <input id="answer" type="text" class="form-control" placeholder="Type your answer here..." title="This is where the expected answer is put. Type Null if no answer is expected" name="answer" value="{{$data->answer}}" required>

                                            @if ($errors->has('answer'))
                                                <span class="help-block">
                                                    <strong>{{ $errors->first('answer') }}</strong>
                                                </span>
                                            @endif
                                        </div>
                                    </div>
                                   <br>
                                    <div class="form-group">
                                        <div class="col-lg-6 col-md-12 col-sm-12 col-md-offset-2">
                                        <button type="button" class="btn btn-default btn-flat" data-dismiss="modal">Close</button>
                                            <button type="submit" class="btn btn-success btn-flat pull-right">
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
              
              </td>
              <td class="text-center">
                <form action="{{ url('delete-content') }}" method="POST" id="form1">
                  {{ csrf_field() }}
                   <input type="hidden" name="id" required="required" value="{{$data->id}}">
                 </form>
              <button class="btn btn-danger btn-xs" type="submit" form="form1" value="Submit" onclick="if (!confirm('Are you sure about this?')) { return false }"><span><i class="fa fa-trash" aria-hidden="true"></i> Delete </span></button>
              </td>
            </tr>
            @endforeach
          </tbody>
        </table>
                    <!-- /.table-responsive -->
    </div>
    </div>                
</div>
</div>



<!-- Add content  -->
    <div class="container">
        <!-- Modal -->
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add Content</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form" method="POST" action="{{ url('/register-new-content') }}">
                            {{ csrf_field() }}
                            <div class="form-group{{ $errors->has('message') ? ' has-error' : '' }}">
                                <label for="message" class="col-md-2 control-label"> Message </label>

                                <div class="col-lg-8 col-md-10 col-sm-12">
                                    <textarea class="form-control z-depth-1" placeholder="Type your question or message here ...." name="message" required="required" rows="7" column="12" id="message"></textarea>

                                    @if ($errors->has('message'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('message') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <br>
              
                            <div class="form-group{{ $errors->has('answer') ? ' has-error' : '' }}">
                                <label for="answer" class="col-md-2 control-label"> Answer </label>

                                <div class="col-lg-8 col-md-10 col-sm-12">
                                    <input id="answer" type="text" class="form-control" placeholder="Type your answer here..." title="This is where the expected answer is put. Type Null if no answer is expected" name="answer" value="{{ old('answer') }}" required>

                                    @if ($errors->has('answer'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('answer') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>
                           <br>
                          <div class="form-group{{ $errors->has('account') ? ' has-error' : '' }}">
                            <label for="account" class="col-md-2 control-label">Service</label>
                            <div class="col-lg-8 col-md-10 col-sm-12">
                            <select required="required" name="account" id="account" title="Please select the service" class="form-control">
                                <option value="">Select the service</option>
                              @foreach($service as $item)
                                <option value="{{ $item->keyword }}"> {{ $item->keyword }}</option>
                              @endforeach
                            </select>
                            @if ($errors->has('account'))
                                <span class="help-block">
                                <strong>{{ $errors->first('account') }}</strong>
                                </span>
                                @endif
                            </div>
                         </div>
                         <br>
                            <div class="form-group">
                                <div class="col-lg-6 col-md-12 col-sm-12 col-md-offset-2">
                                <button type="button" class="btn btn-default btn-flat" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-success btn-flat pull-right">
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