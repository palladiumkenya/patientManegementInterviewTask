<?php

namespace App\Traits;
use Exception;

trait Config
{

    /**
     * return keyword
     *
     * @return void
     */
     public function keywordDetails()
     {

               $keyword_shortcode_details = array
                (
                      '22365' => "WENDO", 
                );

                return json_encode($keyword_shortcode_details);
     }


}
