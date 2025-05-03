<?php

namespace App\Http\Controllers\Process;

use Illuminate\Support\Facades\Process;
use App\Http\Controllers\Controller;
use App\Models\School;

class ProcessController extends Controller
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
        $domain_name = env('DOMAIN_NAME', 'educarestudy.in');

        if( intval($schoolId) && !empty($domain) ) {
            try{
                School::whereId($schoolId)->update(['is_generated_domain' => 1]);
                Process::quietly()->run('bash import.sh');
      
            } catch (Exception | Error $e) {
                // 
            }
        }

        
    }
}