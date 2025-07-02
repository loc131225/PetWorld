<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ContactReplyMail;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function showForm()
    {
        return view('contact');
    }

    public function submit(Request $request)
    {
        $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'nullable|string',
        ]);

        // Lưu vào DB
        Contact::create([
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
        ]);

        // Gửi mail
        $data = (object)[
            'name' => $request->name,
            'email' => $request->email,
        ];

        Mail::to($request->email)->send(new ContactReplyMail($data));

        return response()->json(['message' => 'Thông tin đã được lưu và email đã được gửi.']);
    }
}


