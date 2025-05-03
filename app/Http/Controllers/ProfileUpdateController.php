<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class ProfileUpdateController extends Controller
{
    /**
     * Update the user's profile.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'username' => ['required', 'string', 'max:255'],
        ]);

        $request->user()->update([
            'email' => $validated['email'],
            'username' => $validated['username'],
        ]);

        return redirect()->back()->with('message', 'Password Updated successfully.');
    }
}
