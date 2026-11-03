import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    // Menambahkan dokumen_legalitas ke dalam state form bawaan Inertia
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        dokumen_legalitas: null, // Nilai default untuk file
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar Akun - SAPA KESRA" />

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-emerald-700">Pendaftaran Akun</h2>
                <p className="text-sm text-gray-500 mt-1">Siapkan dokumen KTP atau SK Pengurus untuk diunggah.</p>
            </div>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap (Sesuai KTP)" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Alamat Email (Aktif)" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                {/* AREA UPLOAD FILE */}
                <div className="mt-5 p-4 border border-emerald-100 bg-emerald-50/50 rounded-lg">
                    <InputLabel htmlFor="dokumen_legalitas" value="Upload KTP / SK Kepengurusan" className="font-bold text-emerald-800" />
                    
                    <input
                        id="dokumen_legalitas"
                        type="file"
                        name="dokumen_legalitas"
                        className="mt-2 block w-full text-sm text-slate-600 
                                   file:mr-4 file:py-2.5 file:px-4 
                                   file:rounded-md file:border-0 
                                   file:text-sm file:font-semibold 
                                   file:bg-emerald-600 file:text-white 
                                   hover:file:bg-emerald-700 cursor-pointer"
                        onChange={(e) => setData('dokumen_legalitas', e.target.files[0])}
                        required
                        accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <p className="text-xs text-emerald-600/80 mt-2">Format yang diizinkan: PDF, JPG, PNG (Maks: 2MB).</p>

                    <InputError message={errors.dokumen_legalitas} className="mt-2" />
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <Link
                        href={route('login')}
                        className="text-sm text-emerald-600 hover:text-emerald-800 underline rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        Sudah punya akun?
                    </Link>

                    <PrimaryButton className="ms-4 bg-emerald-600 hover:bg-emerald-700 focus:bg-emerald-700 active:bg-emerald-800" disabled={processing}>
                        Daftar & Unggah Dokumen
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}