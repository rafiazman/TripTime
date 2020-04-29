<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\User;
use Illuminate\Http\Request;

use Auth;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum',
            ['except' => [
                'register',
                'login',
                'logout',
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
     * Registers a new user into the database
     * @param CreateUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(CreateUserRequest $request)
    {
        User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
        ]);

        $user = $this->create($request);

        Auth::guard()->login($user);

        return response()->json([
            'user' => $user,
            'message' => 'Registration successful, user logged in.'
        ], 200);
    }

    /**
     * Logs in a user with the given e-mail and password
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Authentication passed...
            $authuser = auth()->user();
            return response()->json(['message' => 'Login successful.'], 200);
        } else {
            return response()->json(['message' => 'Invalid email or password.'], 401);
        }
    }

    /**
     * Logs out a currently logged in user
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Logged out.'], 200);
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
