<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class updatePatientData extends FormRequest
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
                'id_number' => 'required|between:6,10',
                'patient_meta_data_id' => 'required|string|max:15',
                'village' => 'required|string|max:55',
                'ward' => 'required|string|max:55',
                'subcounty' => 'required|string|max:55',
                'county' => 'required|string|max:55',
                'cell_phone' => 'required|between:9,12',
                'email' => 'required|string|email|max:55',
                'alternative_cell_number' => 'required|between:9,12',
                'enrollment_number' => 'required|string|string|max:255',
                'next_of_kin_name' => 'required|string|max:55',
                'next_of_kin_phone' => 'required|between:9,12',
                'next_of_kin_id_number' => 'required|between:6,10',
        ];
    }
}
