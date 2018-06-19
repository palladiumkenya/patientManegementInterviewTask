<?php

namespace App\Traits;

use App\Jobs\sendMessage;
use App\Models\Transaction;
use Exception, Log;
use ChannelLog as Logger;

trait SendSmsRequest
{


    public function sendMessageToQueue()
    {

      try 
       {
          $this->dispatch(new sendMessage($message, $dst_address, $user_id, $org_id, $src_address, $app_password, $app_id, $service_id));	
       } 
      catch (Exception $e) 
       {   
         Logger::write('exception', "Error: " . $e);	
       }
    	
    }



}