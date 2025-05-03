@component('mail::message')
****************************************************************
{{ config('app.name') }}
****************************************************************

{{ __('Thank you for your order at :name!', ['name' => config('app.name')]) }}

{{ __('The download link for your purchased addresses will be sent to you in a second separate email.') }}

{{ __('Regards') }}
{{ __('Your :name Team', ['name' => config('app.name')]) }}

****************************************************************
educarestudy
India

{{ __('Mobile') }}: +930565656
{{ __('E-Mail Address') }}: info@educarestudy.in
