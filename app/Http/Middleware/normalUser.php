<?php

namespace App\Http\Middleware;

use Closure;
use Session, Exception;
use App\Models\User;
use App\Models\Department;
use Auth;

class normalUser
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
            $level_id = Department::where('id', User::where('email', Auth::user()->email)->value('depart_id'))->value('level_id');

            if($level_id != 2){
                Session::flush();
                return redirect('login')->with('message', 'Ooops! Please log in');
            }
            return $next($request);
            
          } 
        catch (Exception $e) 
          {
             return redirect('login')->with('message', 'Please log in');
          }
        
    }
}
