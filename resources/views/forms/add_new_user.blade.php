@extends('layouts.dashboard') @section('content')

<div class="panel panel-default">
    <div class="panel-heading">Church Details</div>

    <div class="panel-body">
        <div class="box-body">
            <div style="text-align:center;">
                <span class="step"></span>
                <span class="step"></span>

                <ul id="progressbar">
                    <li class="step1 active">Personal Details</li>
                    <li class="step1">Next of Kin</li>
                </ul>
            </div>
            <form id="detailsForm" method="post" action="{{url('/save/patient')}}" class="form-horizontal">

                {{ csrf_field() }}
                <div class="tab">
                    <div class="row row-div">
                        <div class="col-lg-6">
                            <label class="control-label col-md-2">First Name</label>
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-building"></i></span>
                                <input type="text" class="form-control" name="first_name" placeholder="First Name">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <label class="control-label col-md-2">Last Name</label>
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                                <input type="text" class="form-control" name="last_name" placeholder="Last Name">
                            </div>
                        </div>
                    </div>

					<div class="row row-div">
                        <div class="col-lg-6">
                            <label class="control-label col-md-2">Phone Number</label>
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                                <input type="text" class="form-control" name="phone_number" placeholder="Phone Number">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <label class="control-label col-md-2">Altrnative Phone</label>
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                                <input type="text" class="form-control" name="altphone" placeholder="Alternative Phone">
                            </div>
                        </div>
                    </div>
					
                    <div class="row row-div">
                        <div class="col-lg-6">
                            <label class="control-label col-md-2">Email</label>
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                                <input type="text" class="form-control" name="email" placeholder="Email Address">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <label class="control-label col-md-2">Marital Status</label>
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-map-marker"></i></span>
								<select class="form-control"   name="marital_status">
								<option>Single</option>
								<option>Married</option>
								<option>Windowed</option>
								<option>Divorced</option>
							  </select>
                            </div>
                        </div>
                    </div>
					
					
					<div class="row row-div">
                        <div class="col-lg-6">
                            <label class="control-label col-md-2">County</label>
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                                <input type="text" class="form-control" name="county" placeholder="County">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <label class="control-label col-md-2">Sub County</label>
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                                <input type="text" class="form-control" name="subcounty" placeholder="Sub County">
                            </div>
                        </div>
                    </div>
					
                    <div class="row row-div">
                        <div class="col-lg-6">
                            <label class="control-label col-md-2">Ward</label>
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                                <input type="text" class="form-control" name="ward" placeholder="Ward">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <label class="control-label col-md-2">Village</label>
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                                <input type="text" class="form-control" name="village" placeholder="Village">
                            </div>
                        </div>
                    </div>

                    <div class="row  row-div">
						<div class="col-lg-6">
                            <label class="control-label col-md-2">Gender</label>
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
								<select class="form-control"  name="gender">
								<option>Female</option>
								<option>Male</option>
							  </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <label class="control-label col-md-2">I.D Number</label>
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-location-arrow"></i></span>
                                <input type="text" class="form-control" name="id_number" placeholder="I.D Number">
                            </div>
                        </div>
                    </div>
					
					 <div class="row  row-div">
                        <div class="col-lg-6">
                            <label class="control-label col-md-2">Date of Birth</label>
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-location-arrow"></i></span>
                                <input type="text" class="form-control" name="date_of_birth" placeholder="Date of Birth">
								
                            </div>
                        </div>
                    </div>

                    <hr style="border-top: 1px solid #000000;">
                </div>

                <div class="tab">
                    <div class="row row-div">
                        <div class="col-lg-6">
                            <label class="control-label col-md-2">First Name</label>
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                                <input type="text" class="form-control" name="next_of_kin_first_name" placeholder="Next of Kin First Name">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <label class="control-label col-md-2">Last name</label>
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-map-marker"></i></span>
                                <input type="text" class="form-control" name="next_of_kin_last_name" placeholder="Next of Kin Last Name">
                            </div>
                        </div>
                    </div>

                    <div class="row row-div">
                        <div class="col-lg-6">
                            <label class="control-label col-md-2">Relationship</label>
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                                <input type="text" class="form-control" name="relationship" placeholder="Relationship">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <label class="control-label col-md-2">Phone Number</label>
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-map-marker"></i></span>
                                <input type="text" class="form-control" name="next_of_kin_phone_number" placeholder="Next of Kin Phone Number">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-md-3"></label>
                    <div class="col-md-8">
                        <button type="button" id="prevBtn" onclick="nextPrev(-1)">Previous</button>
                        <button type="button" id="nextBtn" onclick="nextPrev(1)">Next</button>
                    </div>
                </div>
            </form>

        </div>
    </div>
</div>

<script>
    var currentTab = 0; // Current tab is set to be the first tab (0)
    showTab(currentTab); // Display the crurrent tab

    function showTab(n) {
        // This function will display the specified tab of the form...
        var x = document.getElementsByClassName("tab");
        x[n].style.display = "block";
        //... and fix the Previous/Next buttons:
        if (n == 0) {
            document.getElementById("prevBtn").style.display = "none";
        } else {
            document.getElementById("prevBtn").style.display = "inline";
        }
        if (n == (x.length - 1)) {
            document.getElementById("nextBtn").innerHTML = "Submit";
        } else {

            document.getElementById("nextBtn").innerHTML = "Next";
        }
        //... and run a function that will display the correct step indicator:
        fixStepIndicator(n)
    }

    function nextPrev(n) {
        // This function will figure out which tab to display
        var x = document.getElementsByClassName("tab");
        // Exit the function if any field in the current tab is invalid:
        if (n == 1 && !validateForm()) return false;
        // Hide the current tab:
        x[currentTab].style.display = "none";
        // Increase or decrease the current tab by 1:
        currentTab = currentTab + n;
        // if you have reached the end of the form...
        if (currentTab >= x.length) {
            // ... the form gets submitted:
            document.getElementById("detailsForm").submit()
            return false;
        }
        // Otherwise, display the correct tab:
        showTab(currentTab);
    }

    function validateForm() {
        // This function deals with validation of the form fields
        var x, y, i, valid = true;
        x = document.getElementsByClassName("tab");
        y = x[currentTab].getElementsByTagName("input");
        // A loop that checks every input field in the current tab:
        for (i = 0; i < y.length; i++) {
            // If a field is empty...
            if (y[i].value == "") {
                // add an "invalid" class to the field:
                y[i].className += " invalid";
                // and set the current valid status to false
                valid = false;
            }
        }
        // If the valid status is true, mark the step as finished and valid:
        if (valid) {
            document.getElementsByClassName("step1")[currentTab].className += " finish";
        }
        return valid; // return the valid status
    }

    function fixStepIndicator(n) {
        var i, x = document.getElementsByClassName("step1");
        for (i = 0; i < x.length; i++) {
            //if(i !==0 || i !==1){
            x[i].className = x[i].className.replace(" active", "");
            //}
        }
        //... and adds the "active" class on the current step:
        x[n].className += " active";
    }
</script>

@endsection