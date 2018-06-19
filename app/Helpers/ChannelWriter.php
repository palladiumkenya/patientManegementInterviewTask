<?php

namespace App\Helpers;

use Monolog\Logger;

use App\Helpers\ChannelStreamHandler;

class ChannelWriter
{
    /**
     * The Log channels.
     *
     * @var array
     */
    protected $channels = [
        'exception' => [ 
            'path' => 'logs/exception.log', 
            'level' => Logger::INFO 
        ],
        'inbox' => [ 
            'path' => 'logs/inbound.log', 
            'level' => Logger::INFO 
        ],
        'outbox' => [ 
            'path' => 'logs/outbox.log', 
            'level' => Logger::INFO 
        ], 
        'queue' => [ 
            'path' => 'logs/queue.log', 
            'level' => Logger::INFO 
        ]    
    ];

    /**
     * The Log levels.
     *
     * @var array
     */
    protected $levels = [
        'debug'     => Logger::DEBUG,
        'info'      => Logger::INFO,
        'notice'    => Logger::NOTICE,
        'warning'   => Logger::WARNING,
        'error'     => Logger::ERROR,
        'critical'  => Logger::CRITICAL,
        'alert'     => Logger::ALERT,
        'emergency' => Logger::EMERGENCY,
    ];

    public function __construct() {
        $this->channels['exception']['path'] = 'logs/exception-' . date('Y-m-d') . '.log'; 
        $this->channels['inbox']['path'] = 'logs/inbound-' . date('Y-m-d') . '.log';
        $this->channels['outbox']['path'] = 'logs/outbound-' . date('Y-m-d') . '.log';
        $this->channels['queue']['path'] = 'logs/queue-' . date('Y-m-d') . '.log';
    }

    /**
     * Write to log based on the given channel and log level set
     * 
     * @param type $channel
     * @param type $message
     * @param array $context
     * @throws InvalidArgumentException
     */
    public function writeLog($channel, $level, $message, array $context = [])
    {
        //check channel exist
        if( !in_array($channel, array_keys($this->channels)) ){
            throw new InvalidArgumentException('Invalid channel used.');
        }

        //lazy load logger
        if( !isset($this->channels[$channel]['_instance']) ){
            //create instance
            $this->channels[$channel]['_instance'] = new Logger($channel);
            //add custom handler
            $this->channels[$channel]['_instance']->pushHandler( 
                new ChannelStreamHandler( 
                    $channel, 
                    storage_path() .'/'. $this->channels[$channel]['path'], 
                    $this->channels[$channel]['level']
                )
            );
        }

        //write out record
        $this->channels[$channel]['_instance']->{$level}($message, $context);
    }

    public function write($channel, $message, array $context = []){
        //get method name for the associated level
        $level = array_flip( $this->levels )[$this->channels[$channel]['level']];
        //write to log
        $this->writeLog($channel, $level, $message, $context);
    }

    //alert('event','Message');
    function __call($func, $params){
        if(in_array($func, array_keys($this->levels))){
            return $this->writeLog($params[0], $func, $params[1]);
        }
    }

}