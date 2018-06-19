<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\Responses;
use App\Traits\SaveRequest;
use App\Models\CampaignDetail;
use Log, Exception;
use App\Models\SubscribedService;
use ChannelLog as Logger;

class ProcessorController extends Controller
{

    use Responses, SaveRequest;

    public $subscribed_services_id;
    public $statum_org_id;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    	$this->middleware('guest');

        $this->request = simplexml_load_string(trim(file_get_contents('php://input')));
        
        if (SubscribedService::where('keyword', '=', $this->request->message)->where('shortcode', '=', $this->request->src_address)->exists()) 
         {
            $this->subscribed_services_id = SubscribedService::where('keyword', '=', $this->request->message)->where('shortcode', '=', $this->request->src_address)->value('id');
         }
        else
         {
           $this->subscribed_services_id = CampaignDetail::where('src_address', $this->request->src_address)->where('dst_address', $this->request->dst_address)->value('subscribed_services_id');
         }

        $this->statum_org_id = SubscribedService::where('id', $this->subscribed_services_id)->value('org_id');
    }

    /**
     * Recieve UCM API Request.
     *
     * Save the UCM API Request.
     *s
     * @return void
     */
    public function index()
    {   

      try 
        {

           Logger::write('inbox', "Sms Request: " . json_encode($this->request));
           
 
            # Aready subscribed
           if (CampaignDetail::where('dst_address', $this->request->dst_address)
                             ->where('message', SubscribedService::where('shortcode', $this->request->src_address)->value('keyword'))->exists() ) 
 
             {
                $this->returnSubscriptionAswerResponse();
                $this->saveSubscriptionMessageResponse();
             }

            # Subscribing now
            elseif ($this->request->message == SubscribedService::where('shortcode', $this->request->src_address)->value('keyword')) 
             {
                $this->initRegister();
                $this->welcome();
             }

           # Prompt to subscribe
           else
             {
                $this->promptRegister();
             }
             
        }

      catch (Exception $e) 
        {
           Logger::write('exception', "Error: " . $e);
        }
    }





    /**
     * Recieve UCM API Stop Service Request.
     *
     * Delete user
     *
     * @return void
     */
    public function stopService()
    {
      
      try 
        {

           CampaignDetail::where('dst_address', '=', $this->request->dst_address)->delete();

           Logger::write('inbox', "Stop Service: " . json_encode($this->request));
        }

      catch (Exception $e) 
        {
           Logger::write('exception', "Error: " . $e);
        }

    }



}
