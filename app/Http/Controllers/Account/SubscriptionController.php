<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\addContent;
use App\Http\Requests\updateContent;
use DB, Mail, Auth, Cache;
use App\Models\ScheduledMessage;
use App\Models\CampaignDetail;
use App\Models\SubscribedService; 

class SubscriptionController extends Controller 
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
     * return all the content
     *@return view
     */
    protected function Content()
    {
         $data_records = ScheduledMessage::where('org_id', Auth::user()->org_id)->orderBy('id', 'desc')
                        ->take(1000)
                        ->get();

         $service = SubscribedService::where('org_id', Auth::user()->org_id)->get();

        return view('Client.backEnd.Subscription.content', compact('data_records', 'service'));

    }


     /**
     * return all subscribers 
     *@return view
     */
    protected function addContent(addContent $request)
    {
        try 
         {
             DB::beginTransaction();

             $subSerId = SubscribedService::where('org_id', Auth::user()->org_id)
                                          ->where('keyword', '=', $request->account)->value('id');

             $last_counter = ScheduledMessage::where('subscribed_services_id', $subSerId)
                                             ->orderBy('id', 'desc')->value('counter') + 1;

             $ScheduledMessage = new ScheduledMessage;
             $ScheduledMessage->message = $request->message;
             $ScheduledMessage->counter = $last_counter;
             $ScheduledMessage->subscribed_services_id = $subSerId;
             $ScheduledMessage->answer = $request->answer;
             $ScheduledMessage->org_id = Auth::user()->org_id;
             $ScheduledMessage->save();

             DB::commit();
             return back()->with('info', "Profile created");


         } 
        catch (Exception $e) 
         {
            Log::error($e);
            DB::rollback(); 
            return back()->with('message', 'Ooops! Something Went Wrong!');
         }

    }

    /**
     * update the Content
     *@return void
     */
    public function updateContent(updateContent $request)
    {
        try 
          {
             DB::beginTransaction();

             $ScheduledMessage = ScheduledMessage::find($request->id);
             $ScheduledMessage->message = $request->message;
             $ScheduledMessage->answer = $request->answer;
             $ScheduledMessage->save();

             DB::commit();
             return back()->with('info', "Profile updated");
          } 
        catch (Exception $e) 
          {
             Log::error($e);
             DB::rollback(); 
             return back()->with('message', 'Ooops! Something Went Wrong!'); 
          }
             
    }

   /**
     * delete content by id
     *@return void
     */
    public function deleteContent(Request $request)
    {
       try 
       {   DB::beginTransaction();
           
           ScheduledMessage::find($request->id)->delete();
           DB::commit();
           
           return back()->with('info', "Profile deleted");
       } 
       catch (Exception $e) {
           
           Log::error($e);
           DB::rollback(); 
           return back()->with('message', 'Ooops! Something Went Wrong!'); 
       }
    }


    /**
     * return all subscribers 
     *@return view
     */
    public function subscribers()
    {
        $subscribers = CampaignDetail::where('statum_org_id', Auth::user()->org_id)
                        ->orderBy('id', 'desc')
                        ->take(1000)
                        ->get();

        return view('Client.backEnd.Subscription.subscribers', compact('subscribers'));
    }
}
