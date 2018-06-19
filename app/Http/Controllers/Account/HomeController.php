<?php

namespace App\Http\Controllers\Account;
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
       $this->middleware('user');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $content = Cache::remember('content', 3, function(){
                 return ScheduledMessage::where('org_id', Auth::user()->org_id)->count();
         });

        $reg_members = Cache::remember('reg_members', 2, function(){
                 return CampaignDetail::where('statum_org_id', Auth::user()->org_id)->where('status', '=', 0)->count();
         });

        $inboundSms = Cache::remember('inboundSms', 2, function(){
                  return Transaction::where('org_id', Auth::user()->org_id)->where('status', 1)->count();
         });       

        $sent_sms = Cache::remember('sent_sms', 2, function(){
                  return Transaction::where('org_id', Auth::user()->org_id)->where('status', 0)->count();
         });       
        


        return view('Client.dashboard', compact('inboundSms', 'reg_members', 'content', 'sent_sms'));
    }


}
