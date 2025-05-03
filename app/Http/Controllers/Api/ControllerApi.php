<?php

namespace App\Http\Controllers\Api;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\Info(
 *     version="2.0.0",
 *     title="ErpEduCare Documentation",
 *     description="Api Documentation",
 *     @OA\Contact(
 *         name="Md Nasir Uddin",
 *         email="nasir.chalo@gmail.com"
 *     ),
 *     @OA\License(
 *         name="Apache 2.0",
 *         url="http://www.apache.org/licenses/LICENSE-2.0.html"
 *     )
 * ),
 * @OA\Server(
 *     url="/api/v1",
 * ),
 */
class ControllerApi extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}
