<?php

namespace App\Http\Controllers\AsrtisanCommand;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Process;
//use Symfony\Component\Process\Exception\ProcessFailedException;
//use Symfony\Component\Process\Process;
use App\Models\School;

class DomainController extends Controller
{    
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function index()
    {
        $domain = isset($_GET['domain']) ? $_GET['domain'] : '';
        $schoolId = isset($_GET['sid']) ? $_GET['sid'] : '';
        // $domain_name = env('DOMAIN_NAME', 'educarestudy.in');

        if( intval($schoolId) && !empty($domain) ) {
            try{
                Process::path('/var/www/educarestudy.in')->run('sudo -S bash ./create-domain.sh');
                School::whereId($schoolId)->update(['is_generated_domain' => 1]);
            } 
            catch (Exception | Error $e) {
                // 
            }
        }
    }
}
