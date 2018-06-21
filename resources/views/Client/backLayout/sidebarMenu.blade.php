
<div class="left_col scroll-view">
  <div class="navbar nav_title" style="border: 0;">
    <a href="{{ url('return-view/dashboard')}}" class="site_title"><i class="fa fa-university"></i> <span>{{App\Models\Department::where('id', Auth::user()->depart_id)->value('name')}}</span></a>
  </div>

  <div class="clearfix"></div>

  <!-- menu profile quick info -->
  <div class="profile">
    <div class="profile_pic">
      <img src="{{ URL::asset('/images/img.jpg') }}" alt="..." class="img-circle profile_img">
    </div>
    <div class="profile_info">
      <span>Welcome </span>
      <h2>{{Auth::user()->first_name.' ' .Auth::user()->last_name }}</h2>
    </div>
  </div>
  <!-- /menu profile quick info -->

  <br />

  <!-- sidebar menu -->
  <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
    <div class="menu_section">
      <h3>General</h3>
      <ul class="nav side-menu">
      
        <li><a><i class="fa fa-send"></i>Patient Data <span class="fa fa-chevron-down"></span></a>
          <ul class="nav child_menu">
            <li><a href="{{ url('return/patient-records') }}">Patient records</a></li>
            <li><a href="{{ url('return/deleted-patients') }}">Deleted patients</a></li>
            <li><a href="{{ url('return/patients-below-age') }}">Patient Below Age</a></li>
          </ul>
        </li>
        
    </div>
    <div class="menu_section">
      <h3>Setting</h3>
      <ul class="nav side-menu">
        <li><a><i class="fa fa-cog"></i> Users <span class="fa fa-chevron-down"></span></a>
          <ul class="nav child_menu">
            <li><a href="{{ url('return/all-users') }}">All Users</a></li>
          </ul>
        </li>
      </ul>
    </div>

  </div>
  <!-- /sidebar menu -->

</div>
