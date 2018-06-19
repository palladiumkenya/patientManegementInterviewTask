<?php

namespace App\Http\Controllers\Account;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\CampaignDetail;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Auth, Cache;

class SmsController extends Controller
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
     * Show inbound sms.
     *
     * @return void
     */
    public function inbound()
    {

         $received_sms = Transaction::where('org_id', Auth::user()->org_id)->where('status', 1)->orderBy('id', 'desc')->take(1000)->get();

        return view('Client.backEnd.Sms.inbound', compact('received_sms'));
    }

    /**
     * Show outbound sms.
     *
     * @return void
     */
    public function outbound()
    {

         $sent_sms = Transaction::where('org_id', Auth::user()->org_id)->where('status', 0)->orderBy('id', 'desc')->take(1000)->get();

        return view('Client.backEnd.Sms.outbound', compact('sent_sms'));
    }


}
