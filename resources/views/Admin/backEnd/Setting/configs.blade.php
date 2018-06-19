@extends('Admin.backLayout.app')
@section('title')
Show the configs
@stop
@section('style')

@stop
@section('content')
<div class="panel panel-default">
        <div class="panel-heading">Configurations</div>

        <div class="panel-body">
          
        <div class="table-responsive">
        <table id="data" class="table table-striped table no-margin">
          <thead>
            <tr class="success">
              <th class="text-center"> ID </th>
              <th class="text-center"> Originator</th>
              <th class="text-center"> Keyword</th>
              <th class="text-center"> Shortcode</th>
              <th class="text-center"> Ucm Org Id </th>
              <th class="text-center"> Username </th>
              <th class="text-center"> Password</th>
              <th class="text-center"> App Id</th>
              <th class="text-center"> App Password</th>
              <th class="text-center"> User Id </th>
              <th class="text-center"> Created On</th>
           </tr>
          </thead>
          <tbody>
            <!--  Initialize Table ID counter -->
            <?php $id = 1; ?>
            @foreach($configs as $data)
            <tr>
              <td class="text-center"> {{$id ++}} </td>
              <td class="text-center"> {{$data->originator}}</td>
              <td class="text-center"> {{$data->keyword}}</td>
              <td class="text-center"> {{$data->shortcode}}</td>
              <td class="text-center"> {{$data->ucm_org_id}} </td>
              <td class="text-center"> {{$data->username}}</td>
              <td class="text-center"> {{$data->password}}</td>
              <td class="text-center"> {{$data->app_id}}</td>
              <td class="text-center"> {{$data->app_pass}}</td>
              <td class="text-center"> {{$data->user_id}}</td>
              <td class="text-center"> {{$data->created_at}}</td>
            </tr>
            @endforeach
          </tbody>
        </table>
       <!-- /.table-responsive -->
    </div>
    </div>                
</div>
@stop