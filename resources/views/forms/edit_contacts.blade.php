<div class="panel panel-default">
    <div class="panel-heading">Edit Contact Details</div>

    <div class="panel-body">
        <div class="box-body">

            <form method="post" action="{{url('/update/contacts')}}" class="form-horizontal">
                {{ csrf_field() }}
				<input type="hidden" class="form-control" name="user"value="{{$patient->id}}">
                <div class="row row-div">
                    <div class="col-lg-11">
                        <label class="control-label col-md-3">Phone Number</label>
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-building"></i></span>
                            <input type="text" class="form-control" name="phone_number" placeholder="Phone Number" value="{{$patient->phone_number}}">
                        </div>
                    </div>
                </div>
				
				   <div class="row row-div">
                    <div class="col-lg-11">
                        <label class="control-label col-md-3">Alternative Phone Number</label>
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-building"></i></span>
                            <input type="text" class="form-control" name="altphone" placeholder="Alternative Phone Number"  value="{{$patient->altphone}}">
                        </div>
                    </div>
                </div>
				
				<div class="row row-div">
                    <div class="col-lg-11">
                        <label class="control-label col-md-3">Email</label>
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-building"></i></span>
                            <input type="text" class="form-control" name="email" placeholder="Email Address"  value="{{$patient->email}}">
                        </div>
                    </div>
                </div>
				
                <hr style="border-top: 1px solid #000000;">

                <div class="form-group">
                    <label class="control-label col-md-3">&nbsp;</label>
                    <div class="col-md-8">
                        <button type="submit" class="btn btn-success"><i class="fa fa-check"></i> Save</button>
                        <a class="btn btn-warning"  data-dismiss="modal" aria-label="Close"><i class="fa fa-times"></i> Cancel</a>&nbsp;
                    </div>
                </div>
            </form>

        </div>
    </div>
</div>