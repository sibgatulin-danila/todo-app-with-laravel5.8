<?php

namespace App\Http\Controllers;


use App\Todo ;
use App\User;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index(User $user)
    {
        return $user->todos;
    }

    public function show(User $user, Todo $todo)
    {
        return $user->todos()->find($todo->id);
    }

    public function store( Request $request)
    {
        $todo = Todo::create($request->all());
        return $todo;
    }

    public function update(Request $request, User $user, Todo $todo)
    {
    
        $todo->update($request->all());
        $todo->save();
        return $todo;
    }

    public function delete(User $user, Todo $todo)
    {
        Todo::findOrFail($todo->id)->delete();
        return 204;
    }
}
