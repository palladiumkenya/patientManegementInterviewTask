<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class createPatientsMetaDatum extends FormRequest
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
             'first_name' => 'required|string|max:55',
             'second_name' => 'required|string|max:55',
             'id_number' => 'required|string|max:55|unique:patients_meta_data',
        ];
    }
}
