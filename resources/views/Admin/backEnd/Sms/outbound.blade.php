@extends('Admin.backLayout.app')
@section('title')
Show Outbound Sms
@stop

@section('content')
<div class="panel panel-default">
        <div class="panel-heading">Outbound Sms</div>

        <div class="panel-body">
  
                  <div class="table-responsive">
                      <table id="data" class="table table-striped table no-margin">
                        <thead>
                          <tr class="success">
                            <th class="text-center"> ID </th>
                            <th class="text-center"> Phone Number</th>
                            <th class="text-center"> Message</th>
                            <th class="text-center"> Transaction Time</th>
                            <th class="text-center"> Source Address </th>
                            <th class="text-center"> Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <!--  Initialize Table ID counter -->
                          @php $id = 1; @endphp
                          @foreach($sent_sms as $data)
                          <tr>
                            <td class="text-center"> {{$id ++}} </td>
                            <td class="text-center"> {{$data->dst_address}} </td>
                            <td class="text-center"> {{$data->message}}</td>
                            <td class="text-center"> {{$data->updated_at}}</td>
                            <td class="text-center"> {{$data->src_address}} </td>
                            <td class="text-center"> {{$data->response_desc}}</td>
                          </tr>
                          @endforeach
                        </tbody>
                      </table>
                    </div>
                    <!-- /.table-responsive -->
    </div>
    </div>                

@stop