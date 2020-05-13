<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTravelRequest extends FormRequest
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
            'id' => 'numeric|required',
            'mode' => 'sometimes|string|in:bus,plane,car,ship,motorcycle,train,bicycle,walk,horse|required',
            'description' => 'sometimes|string|nullable',
            'from.lat' => 'string|required_with:from.lng',
            'from.lng' => 'string|required_with:from.lat',
            'from.address' => 'sometimes|string',
            'from.time' => [
                'sometimes', 'date', 'required',
                // RFC3339 RegEx
                'regex:' . '/^(?<fullyear>\d{4})-(?<month>0[1-9]|1[0-2])-(?<mday>0[1-9]|[12][0-9]|3[01])' . 'T' .
                '(?<hour>[01][0-9]|2[0-3]):(?<minute>[0-5][0-9]):(?<second>[0-5][0-9]|60)(?<secfrac>\.[0-9]+)?' .
                '(Z|(\+|-)(?<offset_hour>[01][0-9]|2[0-3]):(?<offset_minute>[0-5][0-9]))$/i'
            ],
            'to.lat' => 'string|required_with:to.lng',
            'to.lng' => 'string|required_with:to.lat',
            'to.address' => 'sometimes|string',
            'to.time' => [
                'sometimes', 'date', 'after:from.time', 'required',
                // RFC3339 RegEx
                'regex:' . '/^(?<fullyear>\d{4})-(?<month>0[1-9]|1[0-2])-(?<mday>0[1-9]|[12][0-9]|3[01])' . 'T' .
                '(?<hour>[01][0-9]|2[0-3]):(?<minute>[0-5][0-9]):(?<second>[0-5][0-9]|60)(?<secfrac>\.[0-9]+)?' .
                '(Z|(\+|-)(?<offset_hour>[01][0-9]|2[0-3]):(?<offset_minute>[0-5][0-9]))$/i'
            ],
        ];
    }
}
