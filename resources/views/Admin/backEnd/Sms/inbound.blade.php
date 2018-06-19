@extends('Admin.backLayout.app')
@section('title')
Inbound sms
@stop
@section('style')

@stop
@section('content')
<div class="panel panel-default">
        <div class="panel-heading">Inbound Sms</div>
        
        <div class="panel-body">
             <div class="table-responsive">
                      <table id="data" class="table table-striped table no-margin">
                        <thead>
                          <tr class="success">
                            <th class="text-center"> ID </th>
                            <th class="text-center"> Phone Number</th>
                            <th class="text-center"> Message</th>
                            <th class="text-center"> Transaction Time</th>
                            <th class="text-center"> Short Code </th>
                            <th class="text-center"> Link Id</th>
                            <th class="text-center"> service Id</th>
                          </tr>
                        </thead>
                        <tbody>
                          <!--  Initialize Table ID counter -->
                          @php $id = 1; @endphp
                          @foreach($received_sms as $data)
                          <tr>
                            <td class="text-center"> {{$id ++}} </td>
                            <td class="text-center"> {{$data->dst_address}} </td>
                            <td class="text-center"> {{$data->message}}</td>
                            <td class="text-center"> {{$data->created_at}}</td>
                            <td class="text-center"> {{$data->src_address}} </td>
                            <td class="text-center"> {{$data->linkid}}</td>
                            <td class="text-center"> {{$data->service_id}}</td>
                          </tr>
                          @endforeach
                        </tbody>
                      </table>
                    </div>
                    <!-- /.table-responsive -->
    </div>
    </div>                

@stop