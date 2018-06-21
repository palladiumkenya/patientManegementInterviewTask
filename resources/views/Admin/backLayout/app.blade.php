<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">

@include('Admin.backLayout.header')

      	  <div class="col-md-3 left_col">
    	   @include('Admin.backLayout.sidebarMenu')
    	  </div>
		    <!-- top navigation -->
	        <div class="top_nav">
	          <div class="nav_menu">
	                 @include('Admin.backLayout.topMenu')
	          </div>
	        </div>
	        <!-- /top navigation -->
	        <!-- page content -->
	        <div class="right_col" role="main">
	          
	          		 	@yield('content')
	        </div>
	        <!-- /page content -->
 @include('Admin.backLayout.footer')