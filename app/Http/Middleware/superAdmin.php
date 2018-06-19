<?php

namespace App\Http\Middleware;

use Closure;
use Session;
use App\Models\User;
use App\Models\Organization;
use Auth, Exception;

class superAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try 
          {
            $org_type = Organization::where('id', User::where('email', Auth::user()->email)->value('org_id'))->value('type');

            if($org_type != '1'){
                Session::flush();
                return redirect('login')->with('message', 'Ooops! Please log in');
            }
            return $next($request);
            
          } 
        catch (Exception $e) 
          {
             return redirect('login')->with('message', 'Please log in.');
          }
    }
}
