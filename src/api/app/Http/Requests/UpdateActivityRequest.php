<?php

namespace App\Http\Requests;

use App\Activity;
use Illuminate\Foundation\Http\FormRequest;

class UpdateActivityRequest extends FormRequest
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
        // TODO: Implement validation against existing start and end time in DB
        // $currentStart = Activity::find($this->id)->value('start_time');
        // $currentEnd = Activity::find($this->id)->value('end_time');

        return [
            'id' => 'required|numeric',
            'name' => 'sometimes|string',
            'type' => 'sometimes|string|required|in:outdoors,eating,scenery,gathering,music,gamble,play,fantasy,landmark,art,animal',
            'start' => ['sometimes', 'date', 'required',
                // RFC3339 RegEx
                'regex:' . '/^(?<fullyear>\d{4})-(?<month>0[1-9]|1[0-2])-(?<mday>0[1-9]|[12][0-9]|3[01])' . 'T' .
                '(?<hour>[01][0-9]|2[0-3]):(?<minute>[0-5][0-9]):(?<second>[0-5][0-9]|60)(?<secfrac>\.[0-9]+)?' .
                '(Z|(\+|-)(?<offset_hour>[01][0-9]|2[0-3]):(?<offset_minute>[0-5][0-9]))$/i'
            ],
            'end' => ['sometimes', 'date', 'required', 'after:start',
                // RFC3339 RegEx
                'regex:' . '/^(?<fullyear>\d{4})-(?<month>0[1-9]|1[0-2])-(?<mday>0[1-9]|[12][0-9]|3[01])' . 'T' .
                '(?<hour>[01][0-9]|2[0-3]):(?<minute>[0-5][0-9]):(?<second>[0-5][0-9]|60)(?<secfrac>\.[0-9]+)?' .
                '(Z|(\+|-)(?<offset_hour>[01][0-9]|2[0-3]):(?<offset_minute>[0-5][0-9]))$/i'
            ],
            'description' => 'sometimes|string|nullable',
            'location.lat' => 'sometimes|string|required',
            'location.lng' => 'sometimes|string|required',
            'location.address' => 'sometimes|string|nullable'
        ];
    }
}
