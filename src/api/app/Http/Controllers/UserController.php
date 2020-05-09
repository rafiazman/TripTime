<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\User;
use Illuminate\Http\Request;
use Auth;
use Hash;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum',
            ['except' => [
                'checkExists'
            ]]);
    }

    /**
     * Checks if a user already exists within the database
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function checkExists(User $user)
    {
        // If User is not in database, Laravel Route Model Binding will automatically return 404
        return response(null, 200);
    }

    /**
     * Get the details of the currently logged in user
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request)
    {
        $user = $request->user();

        $vm = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'avatarPath' => $user->avatar_url
        ];

        return response()->json($vm);
    }
}
