<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Tampilkan halaman registrasi.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Proses data registrasi yang masuk.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'dokumen_legalitas' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048', // Maksimal 2MB
        ]);

        // Proses penyimpanan file
        $path = null;
        if ($request->hasFile('dokumen_legalitas')) {
            $path = $request->file('dokumen_legalitas')->store('dokumen-legalitas', 'public');
        }

        // Simpan data user ke database
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'dokumen_legalitas' => $path,
            // Catatan: role dan status_akun tidak perlu ditulis karena sudah 
            // diatur 'default' di file migration (pemohon & pending)
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}