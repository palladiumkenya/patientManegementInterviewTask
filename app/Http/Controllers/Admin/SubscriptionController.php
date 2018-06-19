<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB, Mail, Auth, Cache;
use App\Models\ScheduledMessage;
use App\Models\CampaignDetail;

class SubscriptionController extends Controller 
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
     * return all subscribers 
     *@return view
     */
    protected function subscribers()
    {
         $members_records = Cache::remember('members_records', 1, function(){
            return CampaignDetail::where('status', '=', 0)
                        ->orderBy('id', 'desc')
                        ->take(1000)
                        ->get();
         });

        return view('Admin.backEnd.Subscription.Subscription', compact('members_records'));

    }



    /**
     * return all answer records
     *@return view
     */
    protected function answerRecords()
    {
         $data_records = Cache::remember('data_records', 1, function(){
            return CampaignDetail::where('status', '=', 200)
                        ->orderBy('id', 'desc')
                        ->take(1000)
                        ->get();
         });

        return view('Admin.PromotionData.answerRecords', compact('data_records'));

    } 


    /**
     * return wrong answer records
     *@return view
     */
    protected function wrongAnswerRecords()
    {
         $data_records = Cache::remember('data_records', 1, function(){
            return CampaignDetail::where('status', '=', 400)
                        ->orderBy('id', 'desc')
                        ->take(1000)
                        ->get();
         });

        return view('Admin.PromotionData.wrongAnswerRecords', compact('data_records'));

    }

    /**
     * return all the content
     *@return view
     */
    protected function Content()
    {
         $data_records = Cache::remember('data_records', 1, function(){
            return ScheduledMessage::orderBy('id', 'desc')
                        ->take(1000)
                        ->get();
         });

        return view('Admin.backEnd.Subscription.content', compact('data_records'));

    }
}
