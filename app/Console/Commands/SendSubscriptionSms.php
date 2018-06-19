<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ScheduledMessage;
use App\Models\SubscribedService;
use App\Models\CampaignDetail;
use DB;
use ChannelLog as Logger;

class SendSubscriptionSms extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:sms';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send Subscription Sms to Users';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
 

       
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        try 
         {
            $content = DB::table('subscribed_services as a')
                ->join('scheduled_messages as b', 'a.id', '=', 'b.subscribed_services_id')
                ->join('campaign_details as c', 'a.id', '=', 'c.subscribed_services_id')
                ->whereRaw('DATE(c.sent_time) <> CURDATE()')
                ->whereRaw('c.counter = b.counter ')
                ->selectRaw('b.message, a.keyword, a.user_id, a.ucm_org_id, a.app_id, a.app_pass, a.shortcode, c.dst_address, c.service_id, c.subscribed_services_id, a.username, a.password')
                ->distinct()
                ->get();

              $array = json_decode(json_encode($content), true);      
             
             foreach ($array as $row) 
             {
                $url ="http://127.0.0.1/Wendo/api/subscription/receive-data-from-db";

                $data = 'app_id=' . $row["app_id"] . '&keyword=' . $row["keyword"] . '&shortcode=' . $row["shortcode"] . '&app_pass=' . $row["app_pass"] . '&ucm_org_id=' . $row["ucm_org_id"] . '&user_id=' . $row["user_id"] . '&service_id=' . $row["service_id"] . '&message=' . $row["message"] . '&phone_number=' . $row["dst_address"] . '&username=' . $row["username"] . '&password=' . $row["password"] . '&subscribed_services_id=' . $row['subscribed_services_id'];

                $ch = curl_init( $url );
                curl_setopt( $ch, CURLOPT_POST, 1);
                curl_setopt( $ch, CURLOPT_POSTFIELDS, $data);
                curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, 1);
                curl_setopt( $ch, CURLOPT_HEADER, 0);
                curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt( $ch, CURLOPT_TIMEOUT, 30);

               CampaignDetail::where('dst_address', $row["dst_address"])->where('subscribed_services_id', $row['subscribed_services_id'])->update(['sent_time' => date("Y-m-d")]);

               $response = curl_exec( $ch );
               curl_close($ch); 
              }
            } 
            catch (Exception $e) 
              {
                Logger::write('exception', $e);
              }

           
        }    
}
