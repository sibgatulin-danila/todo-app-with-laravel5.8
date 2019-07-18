<?php

namespace App\Http\Middleware;

use App\User;
use Closure;
use Illuminate\Support\Facades\DB;

class AuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $token=$request->header('Authorization');
        if(DB::table('users')->where('access_token', '=', $token)->exists()){
            return $next($request);
        }
        return response()->json(['data'=>'invalid Token']);
    }
}
