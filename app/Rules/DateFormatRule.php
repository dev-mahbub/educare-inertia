<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class DateFormatRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Check if the date matches the DD/MM/YYYY format with separators (/,-, or .)
        if (!preg_match('/^(0[1-9]|[1-2][0-9]|3[0-1])[\/\.-](0[1-9]|1[0-2])[\/\.-]\d{4}$/', $value)) {
            $fail('The :attribute must be in the format DD/MM/YYYY with separators (/,-, or .).');
        }

        // Check if the date is valid according to the format
        $date = \DateTime::createFromFormat('d/m/Y', str_replace(['.', '-'], '/', $value));

        if (!$date || $date->format('d/m/Y') !== str_replace(['.', '-'], '/', $value)) {
            $fail('The :attribute must be a valid date in the format DD/MM/YYYY.');
        }
    }
}
