<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\CampaignDetail;
use App\Models\Transaction;
use App\Models\ScheduledMessage;
use Illuminate\Http\Request;
use Auth, Cache, DB;


class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
       $this->middleware('admin');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $content = Cache::remember('content', 3, function(){
                 return ScheduledMessage::count();
         });

        
        $reg_members = Cache::remember('reg_members', 2, function(){
                 return CampaignDetail::count();
         });


        $inboundSms = Cache::remember('inboundSms', 2, function(){
                  return Transaction::where('status', 1)->count();
         });

        $sent_sms = Transaction::where('status', 0)->count();       


        return view('Admin.dashboard', compact('content', 'reg_members', 'inboundSms', 'sent_sms'));
    }


}
