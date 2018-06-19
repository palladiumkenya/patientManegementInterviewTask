<?php

namespace App\Traits;

use App\Jobs\sendMessage;
use App\Models\Transaction;
use Exception, Log;
use App\Models\ScheduledMessage;
use ChannelLog as Logger;
use App\Models\SubscribedService;
use App\Models\CampaignDetail;

trait Responses
{
    
     ####################################### Success RESPONSES #################################################

     /**
     * Return after registration
     *
     * @return \Illuminate\Http\Response
     */
     public function welcome()
     {

        $message = "Welcome to ". $this->request->message ." service. We have weekly draws. Participate by answering our questions to win";
        
        $this->sendToQueue($message); 
        

     }
     /**
     * Return message after answer 
     *
     * @return \Illuminate\Http\Response
     */
     public function returnSubscriptionAswerResponse()
     {
        try 
          {
              #check which answer this is from user
              $counter = CampaignDetail::where('dst_address', $this->request->dst_address)->where('subscribed_services_id', $this->subscribed_services_id)->value('counter');

                 # check which is the correct answer
                 #if answer is wrong return try again message
                 if ($this->request->message != ScheduledMessage::where('counter', $counter)->value('answer')){

                    #send fail message
                    $message = "Oops! Wrong answer. Try again to stand a chance to win 1000/- MPESA. The more your responses the higher your chances of winning"; 

                 }
                 #else check no of questions answered for the day
                 else{
                         #if below 4 ask another question
                         $daily_counter = CampaignDetail::where('dst_address', $this->request->dst_address)->where('subscribed_services_id', $this->subscribed_services_id)->value('daily_counter');

                         if($daily_counter <= 4)
                         {
                            #get and send the next question
                            $message = ScheduledMessage::where('subscribed_services_id', $this->subscribed_services_id)->where('counter', $counter + 1)->value('message');

                            #update both counters
                            CampaignDetail::where('dst_address', $this->request->dst_address)->where('subscribed_services_id', $this->subscribed_services_id)
                                          ->update(['daily_counter' => $daily_counter + 1,
                                                    'counter' => $counter + 1
                                                   ]);

                         }
                         #else send success
                         else
                         {
                           $message = "Hey Champion, You have reached your maximum number of questions for the day. Lets try again tomorrow";
                         } 
                          

                    }
                 
                 $this->sendToQueue($message);
          
          } 
        catch (Exception $e) 
          {
            Logger::write('exception', "Error: " . $e);
          }
     }


     /**
     * Return to request register
     *
     * @return \Illuminate\Http\Response
     */
     public function promptRegister()
     {

       $message = "Please Send keyword ". SubscribedService::where('id', $this->subscribed_services_id)->value('keyword'). " to register.";

       $this->sendToQueue($message); 

     }
     


     /**
     * send outbound sms
     *
     * @return void
     */
     public function sendToQueue($message)
     {
         try 
           {
                echo $response = "<Envelope><Body><response><message>$message</message></response></Body></Envelope>";

                $this->saveOutboundSms($message);

                Logger::write('outbox', "Outbox Sms " . json_encode(simplexml_load_string($response)) . " Link ID " . $this->request->linkid);


           } 
         catch (Exception $e) 
           {
              Logger::write('exception', "Error: " . $e);
           } 

     }



}
