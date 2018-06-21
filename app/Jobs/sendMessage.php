<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Exception, Log;
use ChannelLog as Logger;
use App\Models\Transaction;

class sendMessage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $message;
    protected $dst_address;
    protected $request_id;
    protected $url;
    protected $user_id;
    protected $org_id;
    protected $src_address;
    protected $app_password;
    protected $app_id;
    protected $timestamp;
    protected $service_id;
    protected $message_type;
    protected $operation;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($message, $dst_address, $user_id, $org_id, $src_address, $app_password, $app_id, $service_id)
    {
        $this->message = $message;
        $this->dst_address = $dst_address;
        $this->timestamp = preg_replace('/\D/', '', date("Y-m-d H:i:s"));
        $this->request_id = "statum.co.ke" . preg_replace('/\D/', '', date('Y-m-d H:i:s')) . str_random(5);
        $this->url = "http://127.0.0.1/ucm_api/index.php";
        $this->user_id = $user_id;
        $this->org_id = $org_id;
        $this->src_address = $src_address;
        $this->app_password = $app_password;
        $this->app_id = $app_id;
        $this->service_id = $service_id;
        $this->message_type = "1";
        $this->operation = "send";
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try 
         {
            $data = array 
                 (         
                      'reference' => $this->request_id,
                      'message_type' => $this->message_type,
                      'service_id' => $this->service_id, 
                      'message' => $this->message, 
                      'user_id' => $this->user_id, 
                      'app_id' => $this->app_id, 
                      'org_id' => $this->org_id, 
                      'src_address' => $this->src_address, 
                      'dst_address' => $this->dst_address,
                      'operation' => $this->operation, 
                      'timestamp' => $this->timestamp, 
                      'auth_key' => md5($this->app_id . $this->timestamp . $this->app_password) 
                 );
             
            $curl = curl_init($this->url); 
            curl_setopt($curl, CURLOPT_HEADER, false); 
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-type: application/json"));
            curl_setopt($curl, CURLOPT_POST, true); 
            curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data)); 

            $api_response = curl_exec($curl);

            Logger::write('queue', "Message Request: " . json_encode($data) . " sent to UCM. response: " . $api_response);

            $this->saveRequest($api_response);
            
         } 

        catch (Exception $e) 
         {
            Logger::write('exception', "Error: " . $e);
         }
    }



    /**
     * save sms and api response
     *
     * @return void
     */
    public function saveRequest($api_response)
    {
        try 
           {
                $transaction = new Transaction;
                $transaction->dst_address = $this->dst_address;
                $transaction->src_address = $this->src_address;
                $transaction->message = $this->message;
                $transaction->response_code = json_decode($api_response)->data->new_record_id;
                $transaction->response_desc = json_decode($api_response)->desc;
                $transaction->save();

                Logger::write('queue', "Message Response: " . $api_response . " saved ID " . $transaction->id);

            } 

        catch (Exception $e) 
           {
                Logger::write('exception', "Error: " . $e);
           }
    }
}
