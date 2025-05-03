@component('mail::message')
****************************************************************
{{ config('app.name') }}
****************************************************************
{{ __('Forgot Your Password') }}
{{ __('Oops! We got the word that you forgot your password. No problem, these things happen. To reset your password, you need to pur the below passwort code in reset passwort form.') }}
<hr />
{{ __('Password code: :token', ['token' => $token]) }}
<hr />
{{ __('Regards') }}
{{ __('Your :name Team', ['name' => config('app.name')]) }}

****************************************************************
educarestudy
India

{{ __('Mobile') }}: +930565656
{{ __('E-Mail Address') }}: info@educarestudy.in
