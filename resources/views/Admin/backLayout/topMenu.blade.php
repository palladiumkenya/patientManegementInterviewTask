
          
            <nav class="" role="navigation">
              <div class="nav toggle">
                <a id="menu_toggle"><i class="fa fa-bars"></i></a>
              </div>

              <ul class="nav navbar-nav navbar-right">
                <li class="">
                  <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    <img src="{{ URL::asset('/images/img.jpg') }}" alt="">{{Auth::user()->first_name.' ' .Auth::user()->last_name }}
                    <span class=" fa fa-angle-down"></span>
                  </a>
                  <ul class="dropdown-menu dropdown-usermenu pull-right">

                     {!! Form::open(['url' => url('logout'),'class'=>'form-inline']) !!}
                           {!! csrf_field() !!}
                          <li><button class="btn btn-primary btn-lg btn-block register-button" type="submit" >Logout</button> </li>
                       {!! Form::close() !!}
                  </ul>
                </li>
              </ul>
            </nav>