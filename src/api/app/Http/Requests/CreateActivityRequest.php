<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Class CreateActivityRequest
 * @package App\Http\Requests
 * @property string name
 * @property string type
 * @property string start
 * @property string end
 * @property string description
 * @property mixed location
 */

class CreateActivityRequest extends FormRequest
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
            'name' => 'string|required',
            'type' => 'string|required|in:outdoors,eating,scenery,gathering,music,gamble,play,fantasy,landmark,art,animal',
            'start' => ['date', 'required',
                // RFC3339 RegEx
                'regex:' . '/^(?<fullyear>\d{4})-(?<month>0[1-9]|1[0-2])-(?<mday>0[1-9]|[12][0-9]|3[01])' . 'T' .
                '(?<hour>[01][0-9]|2[0-3]):(?<minute>[0-5][0-9]):(?<second>[0-5][0-9]|60)(?<secfrac>\.[0-9]+)?' .
                '(Z|(\+|-)(?<offset_hour>[01][0-9]|2[0-3]):(?<offset_minute>[0-5][0-9]))$/i'
            ],
            'end' => ['date', 'required', 'after:start',
                // RFC3339 RegEx
                'regex:' . '/^(?<fullyear>\d{4})-(?<month>0[1-9]|1[0-2])-(?<mday>0[1-9]|[12][0-9]|3[01])' . 'T' .
                '(?<hour>[01][0-9]|2[0-3]):(?<minute>[0-5][0-9]):(?<second>[0-5][0-9]|60)(?<secfrac>\.[0-9]+)?' .
                '(Z|(\+|-)(?<offset_hour>[01][0-9]|2[0-3]):(?<offset_minute>[0-5][0-9]))$/i'
            ],
            'description' => 'string|nullable',
            'location.lat' => 'string|required',
            'location.lng' => 'string|required',
            'location.address' => 'string|nullable'
        ];
    }
}
