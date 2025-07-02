<?php

namespace App\Http\Controllers\Api;

use App\Mail\ContactReplyMail;
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
        ]);

        $data = (object)[
            'name' => $request->name,
            'email' => $request->email,
        ];

        Mail::to($request->email)->send(new ContactReplyMail($data));

        return response()->json(['message' => 'Thông tin đã được gửi. Vui lòng kiểm tra email của bạn.']);
    }
}


