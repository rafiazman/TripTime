<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Class CreateTripRequest
 * @package App\Http\Requests
 *
 * @property string name
 * @property string description
 * @property string start
 * @property string end
 */

class CreateTripRequest extends FormRequest
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
            'name' => 'required|string',
            'description' => 'nullable|string',
            'start' => 'required|date|after_or_equal:today',
            'end' => 'required|date|after_or_equal:start'
        ];
    }
}
