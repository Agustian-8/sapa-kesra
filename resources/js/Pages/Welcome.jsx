import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="SAPA KESRA - Kabupaten Melawi" />
            
            <div className="relative min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-500 selection:text-white overflow-hidden">
                
                {/* --- DEKORASI BACKGROUND (GLOW/BLOB) --- */}
                <div className="absolute top-0 inset-x-0 h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute top-20 -left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                </div>

                {/* --- HEADER & NAVBAR (GLASSMORPHISM) --- */}
                <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/50 transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-20 items-center">
                            
                            {/* LOGO & NAMA APLIKASI */}
                            <div className="flex-shrink-0 flex items-center gap-4 group">
                                <img 
                                    src="/images/logo-melawi.jpeg" 
                                    alt="Logo Kabupaten Melawi" 
                                    className="h-11 w-auto object-contain transition-transform group-hover:scale-105 duration-300"
                                />
                                <div className="flex flex-col justify-center">
                                    <span className="block font-bold text-xl text-slate-900 tracking-tight leading-none">
                                        SAPA KESRA
                                    </span>
                                    <span className="block text-xs text-blue-600/90 mt-1 font-semibold uppercase tracking-wider">
                                        Kabupaten Melawi
                                    </span>
                                </div>
                            </div>
                            
                            {/* MENU KANAN */}
                            <div className="relative z-10">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                                    >
                                        Ke Dashboard Saya 
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-2 sm:gap-4">
                                        <Link
                                            href={route('login')}
                                            className="text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors px-3 py-2"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-500 px-5 py-2.5 rounded-full hover:from-blue-500 hover:to-indigo-400 transition-all shadow-md shadow-blue-500/25 hover:shadow-lg hover:-translate-y-0.5"
                                        >
                                            Daftar Akun
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* --- HERO SECTION --- */}
                <main className="relative z-10 flex flex-col justify-center min-h-[calc(100vh-5rem)] overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
                        <div className="text-center max-w-5xl mx-auto">
                            
                            {/* BADGE */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide uppercase mb-8 shadow-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                Layanan Terpadu Kesra
                            </div>

                            <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl/tight mb-6">
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-500 pb-2">
                                    SAPA KESRA
                                </span>
                                {/* Penyesuaian satu baris menggunakan whitespace-nowrap & teks dinamis */}
                                <span className="block mt-2 text-[15px] sm:text-xl md:text-3xl lg:text-4xl text-slate-800 font-bold whitespace-nowrap tracking-tight">
                                    Sistem Aplikasi Pelayanan Kesejahteraan Rakyat
                                </span>
                            </h1>
                            
                            <p className="mt-6 max-w-2xl mx-auto text-base text-slate-600 sm:text-lg leading-relaxed">
                                Portal layanan digital Bagian Kesejahteraan Rakyat Sekretariat Daerah Kabupaten Melawi untuk pengajuan bantuan rumah ibadah dan lembaga keagamaan secara <strong>transparan, akuntabel, dan efisien</strong>.
                            </p>

                            <div className="mt-8 relative max-w-lg mx-auto">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-slate-200/60"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-4 bg-slate-50 text-sm font-medium text-blue-600/80 italic">
                                        "Satu Data, Satu Layanan, Tepat Sasaran"
                                    </span>
                                </div>
                            </div>
                            
                            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1"
                                    >
                                        Buka Panel Dasbor
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1"
                                        >
                                            Mulai Pengajuan
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="inline-flex justify-center items-center px-8 py-3.5 border-2 border-slate-200 text-base font-semibold rounded-full text-slate-700 bg-white hover:bg-slate-50 hover:border-blue-200 hover:text-blue-700 transition-all"
                                        >
                                            Cek Status Proposal
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                {/* --- FITUR UNGGULAN --- */}
                <div className="relative z-10 bg-white py-20 border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                            
                            {/* Fitur 1 */}
                            <div className="group p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1 text-center sm:text-left">
                                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto sm:mx-0 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Database Terpadu</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    Penyimpanan profil rumah ibadah dan lembaga keagamaan secara utuh dalam satu sistem digital yang terintegrasi.
                                </p>
                            </div>

                            {/* Fitur 2 */}
                            <div className="group p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1 text-center sm:text-left">
                                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto sm:mx-0 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Paperless & Lacak Real-time</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    Pantau terus posisi proposal bantuan Anda mulai dari tahap usulan, verifikasi, hingga proses pencairan dana.
                                </p>
                            </div>

                            {/* Fitur 3 */}
                            <div className="group p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1 text-center sm:text-left">
                                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto sm:mx-0 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Tepat Sasaran</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    Mencegah data penerima ganda dan memudahkan pelaporan LPJ secara online demi transparansi yang lebih baik.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* --- FOOTER --- */}
                <footer className="relative z-10 bg-[#0F172A] text-slate-400 py-12 text-center border-t border-slate-800">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="font-bold text-xl text-white tracking-tight mb-2">SAPA KESRA</h2>
                        <p className="text-sm font-medium text-slate-500 mb-6">Pemerintah Kabupaten Melawi</p>
                        <div className="w-16 h-px bg-slate-700 mx-auto mb-6"></div>
                        <p className="text-sm">
                            &copy; {new Date().getFullYear()} Bagian Kesejahteraan Rakyat. Hak Cipta Dilindungi.
                        </p>
                    </div>
                </footer>
                
            </div>
        </>
    );
}