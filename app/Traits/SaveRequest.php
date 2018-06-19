<?php

namespace App\Traits;
use App\Models\CampaignDetail;
use Exception;
use App\Models\Transaction;
use App\Models\SubscribedService;
use ChannelLog as Logger;
use Carbon\Carbon;

trait SaveRequest
{

     /**
     * initial Register 
     *
     * @return void
     */
     public function initRegister()
     {
          try 
            {
                $member = new CampaignDetail();
                $member->campaign_id = $this->request->campaign_id;
                $member->msg_id = $this->request->msg_id;
                $member->org_id = $this->request->org_id;
                $member->src_address = $this->request->src_address;
                $member->dst_address = $this->request->dst_address;
                $member->message = $this->request->message;
                $member->datereceived = $this->request->datereceived;
                $member->linkid = $this->request->linkid;
                $member->traceid = $this->request->traceid;
                $member->service_id = $this->request->service_id;
                $member->sent_time = Carbon::yesterday();
                $member->counter = 1;
                $member->daily_counter = 0;
                $member->subscribed_services_id = $this->subscribed_services_id;
                $member->statum_org_id = $this->statum_org_id;
                $member->status = 0;
                $member->save();

            } 
          catch (Exception $e) 
            {
                Logger::write('exception', "Error: " . $e);
            }
        
  
     }
    /**
     * save the answers use input
     *
     * @return void
     */
     public function saveSubscriptionMessageResponse()
     {
          try 
            {

                $transaction = new Transaction;
                $transaction->dst_address = $this->request->dst_address;
                $transaction->src_address = $this->request->src_address;
                $transaction->message = $this->request->message;
                $transaction->org_id = $this->statum_org_id;
                $transaction->response_code =$this->request->linkid;
                $transaction->response_desc = "received";
                $transaction->status = "1";
                $transaction->save();

            } 
          catch (Exception $e) 
            {
                Logger::write('exception', "Error: " . $e);
            }
        
  
     }



     /**
     *  Save outbound sms
     *  
     * @return void
     */
     public function saveOutboundSms($message)
     {
          try
            {
                $transaction = new Transaction;
                $transaction->dst_address = $this->request->dst_address;
                $transaction->src_address = $this->request->src_address;
                $transaction->message = $message;
                $transaction->org_id = $this->statum_org_id;
                $transaction->response_code =$this->request->linkid;
                $transaction->response_desc = "Sent";
                $transaction->status = "0";
                $transaction->save();
            }
          catch (Exception $e)
            {
                Logger::write('exception', "Error: " . $e);
            }
     }


     /**
     *  Save outbound subscriptions sms
     *  
     * @return void
     */
     public function saveSubscriptionSms($request, $request_id, $ucm_response)
     {
          try
            {
                $transaction = new Transaction;
                $transaction->dst_address = $request->phone_number;
                $transaction->src_address = $request->shortcode;
                $transaction->message = $request->message;
                $transaction->org_id = $request->org_id;
                $transaction->response_code = json_decode($ucm_response)->data->new_record_id;
                $transaction->response_desc = json_decode($ucm_response)->desc;
                $transaction->status = "0";
                $transaction->save();
            }
          catch (Exception $e)
            {
                Logger::write('exception', "Error: " . $e);
            }
     }


}
