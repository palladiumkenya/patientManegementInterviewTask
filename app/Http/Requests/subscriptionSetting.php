<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class subscriptionSetting extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'originator' => 'required|string|max:255',
            'app_id'=> 'required|string|max:255',
            'app_pass'=> 'required|string|max:255',
            'user_id'=> 'required|string|max:255',
            'ucm_org_id'=> 'required|string|max:255',
            'key_word'=> 'required|string|max:255',
            'short_code'=> 'required|string|max:255',
            'user_name'=> 'required|string|max:255',
            'password' => 'required|string|max:255',
            'statum_org_id' => 'required|string|max:255',
        ];
    }
}
