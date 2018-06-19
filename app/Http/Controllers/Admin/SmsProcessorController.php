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



class SmsProcessorController extends Controller {

use Responses, SaveRequest; 


    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
       $this->middleware('guest');
    }

    /** 
     * recieve sms details  from DB
     * 
     * @return void 
     */ 
   public function recieveSmsData(Request $request) 
   { 
    try  
     { 
        $url = "http://127.0.0.1/ucm_api/index.php"; 
 
        $request_id = "statum" . preg_replace('/\D/', '', date('Y-m-d H:i:s')) . str_random(5); 
 
        $data = array  
            ( 
              'reference' => $request_id,  
              'message_type' => "1",  
              'service_id' => $request->service_id,  
              'message' => $request->message,   
              'user_id' => $request->user_id, 
              'app_id' => $request->app_id,  
              'org_id' => $request->ucm_org_id,  
              'src_address' => $request->shortcode,  
              'dst_address' => $request->phone_number,  
              'keyword' => $request->keyword,  
              'operation' => "send", 
              'timestamp' => preg_replace('/\D/', '', date('Y-m-d H:i:s')), 
              'auth_key' => md5($request->app_id . preg_replace('/\D/', '', date('Y-m-d H:i:s')) . $request->app_pass) 
            ); 
 
         $curl = curl_init($url); 
         curl_setopt($curl, CURLOPT_HEADER, false); 
         curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); 
         curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-type: application/json")); 
         curl_setopt($curl, CURLOPT_POST, true); 
         curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data)); 
 
         $ucm_response = curl_exec($curl); 
         $status = curl_getinfo($curl, CURLINFO_HTTP_CODE); 
         Logger::write('outbox', "Request " . json_encode($data) . " Sent to UCM. Response " . $ucm_response . " Code: " . $status);             
         $this->saveSubscriptionSms($request, $request_id, $ucm_response); 
 
     }  
    catch (Exception $e)  
     { 
        Logger::write('exception', "Error: " . $e); 
     } 
        
   } 

}



