@extends('Admin.backLayout.app')
@section('title')
Show the Content
@stop
@section('style')

@stop
@section('content')
<div class="panel panel-default">
        <div class="panel-heading">Subscription Content</div>

        <div class="panel-body">
          
        <div class="table-responsive">
        <table id="data" class="table table-striped table no-margin">
          <thead>
            <tr class="success">
              <th class="text-center"> ID </th>
              <th class="text-center"> Message</th>
              <th class="text-center"> Answer</th>
              <th class="text-center"> Created On</th>
              <th class="text-center"> Edit </th>
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
              <td class="text-center"><a class="btn btn-xs btn-default"  data-toggle="modal" data-target="#edit_submessage{{$data->id}}"><span><i class="fa fa-edit" aria-hidden="true"></i> Edit </span></a>
              
              </td>
            </tr>
            @endforeach
          </tbody>
        </table>
                    <!-- /.table-responsive -->
    </div>
    </div>                
</div>
@stop