<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <!-- <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" /> -->

        <!-- project font -->
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"> 
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  
        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/sass/app.scss', 'resources/js/app.jsx'])
        <!-- @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])  -->
        @inertiaHead
    </head>
    <body class="antialiased">
        @inertia
    </body>
</html>
