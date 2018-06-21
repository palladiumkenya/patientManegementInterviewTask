<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">

@include('Client.backLayout.header')

      	  <div class="col-md-3 left_col">
    	   @include('Client.backLayout.sidebarMenu')
    	  </div>
		    <!-- top navigation -->
	        <div class="top_nav">
	          <div class="nav_menu">
	                 @include('Client.backLayout.topMenu')
	          </div>
	        </div>
	        <!-- /top navigation -->
	        <!-- page content -->
	        <div class="right_col" role="main">
	          
	          		 	@yield('content')
	        </div>
	        <!-- /page content -->
 @include('Client.backLayout.footer')