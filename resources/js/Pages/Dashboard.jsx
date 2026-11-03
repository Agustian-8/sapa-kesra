import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Clock,
    XCircle,
    Building2,
    FileText,
    BarChart3,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    Info,
} from 'lucide-react';

/* Komponen kartu fitur */
function FeatureCard({ icon: Icon, accent, title, description, href, cta }) {
    const accents = {
        emerald: {
            iconWrap: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
            link: 'text-emerald-700 hover:text-emerald-800',
            hoverBorder: 'hover:border-emerald-200',
            bar: 'bg-emerald-500',
        },
        blue: {
            iconWrap: 'bg-blue-50 text-blue-600 ring-blue-100',
            link: 'text-blue-700 hover:text-blue-800',
            hoverBorder: 'hover:border-blue-200',
            bar: 'bg-blue-500',
        },
        violet: {
            iconWrap: 'bg-violet-50 text-violet-600 ring-violet-100',
            link: 'text-violet-700 hover:text-violet-800',
            hoverBorder: 'hover:border-violet-200',
            bar: 'bg-violet-500',
        },
    };
    const a = accents[accent];

    return (
        <Link
            href={href}
            className={`group relative bg-white p-6 rounded-2xl shadow-sm border border-slate-200/70 ${a.hoverBorder} hover:shadow-md transition-all duration-300 flex flex-col`}
        >
            <span className={`absolute left-0 top-6 bottom-6 w-1 rounded-full ${a.bar} opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ring-1 ${a.iconWrap} mb-5`}>
                <Icon className="w-6 h-6" strokeWidth={2} />
            </div>
            <h4 className="font-semibold text-slate-800 text-base tracking-tight">{title}</h4>
            <p className="text-sm text-slate-500 mt-2 mb-5 leading-relaxed flex-1">{description}</p>
            <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${a.link}`}>
                {cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            </span>
        </Link>
    );
}

/* Komponen banner status */
function StatusBanner({ tone, icon: Icon, title, children }) {
    const tones = {
        warning: {
            wrap: 'bg-amber-50 border-amber-200',
            iconWrap: 'bg-amber-100 text-amber-600 ring-amber-200',
            title: 'text-amber-900',
            body: 'text-amber-800/90',
        },
        danger: {
            wrap: 'bg-red-50 border-red-200',
            iconWrap: 'bg-red-100 text-red-600 ring-red-200',
            title: 'text-red-900',
            body: 'text-red-800/90',
        },
        info: {
            wrap: 'bg-slate-50 border-slate-200',
            iconWrap: 'bg-slate-100 text-slate-600 ring-slate-200',
            title: 'text-slate-900',
            body: 'text-slate-700',
        },
    };
    const t = tones[tone];

    return (
        <div className={`rounded-2xl border ${t.wrap} p-5 sm:p-6 flex items-start gap-4 shadow-sm`}>
            <span className={`inline-flex items-center justify-center rounded-xl p-2.5 ring-1 ${t.iconWrap} shrink-0`}>
                <Icon className="w-5 h-5" strokeWidth={2} />
            </span>
            <div className="min-w-0">
                <h4 className={`font-semibold text-base ${t.title}`}>{title}</h4>
                <div className={`mt-1.5 text-sm leading-relaxed ${t.body}`}>{children}</div>
            </div>
        </div>
    );
}

export default function Dashboard({ auth }) {
    const isPending = auth.user.status_akun === 'pending';
    const isDitolak = auth.user.status_akun === 'ditolak';
    const isAktif = auth.user.status_akun === 'aktif';

    const firstName = auth.user.name?.split(' ')[0] || auth.user.name;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center rounded-lg bg-emerald-600 text-white p-2">
                        <ShieldCheck className="w-5 h-5" strokeWidth={2} />
                    </span>
                    <div>
                        <h2 className="font-semibold text-lg text-slate-800 leading-tight">Dasbor Pemohon</h2>
                        <p className="text-xs text-slate-500">Portal layanan SAPA KESRA</p>
                    </div>
                </div>
            }
        >
            <Head title="Dasbor - SAPA KESRA" />

            <div className="py-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                    {/* BANNER SELAMAT DATANG */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 p-6 sm:p-8 text-white shadow-sm">
                        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
                        <div className="absolute -right-16 bottom-0 w-52 h-52 rounded-full bg-white/5" />
                        <div className="relative">
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/20">
                                Kabupaten Melawi
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold mt-3 tracking-tight">
                                Selamat datang, {firstName}
                            </h3>
                            <p className="text-emerald-50/90 mt-1 text-sm max-w-xl leading-relaxed">
                                Ini adalah portal layanan publik SAPA KESRA Kabupaten Melawi. Kelola profil,
                                ajukan bantuan, dan pantau proposal Anda dalam satu tempat.
                            </p>
                        </div>
                    </div>

                    {/* KONDISI 1: AKUN PENDING */}
                    {isPending && (
                        <StatusBanner tone="warning" icon={Clock} title="Akun Anda Sedang Diverifikasi">
                            Dokumen legalitas (KTP/SK) yang Anda unggah saat pendaftaran sedang diperiksa
                            oleh Tim Bagian Kesra. Anda baru dapat mengakses menu pembuatan profil dan
                            pengajuan bantuan setelah akun disetujui. Mohon cek halaman ini kembali secara
                            berkala.
                        </StatusBanner>
                    )}

                    {/* KONDISI 2: AKUN DITOLAK */}
                    {isDitolak && (
                        <StatusBanner tone="danger" icon={XCircle} title="Verifikasi Akun Ditolak">
                            Maaf, pendaftaran akun Anda tidak dapat disetujui. Hal ini biasanya terjadi
                            karena dokumen legalitas yang diunggah tidak valid, buram, atau tidak sesuai
                            persyaratan. Silakan hubungi Bagian Kesra untuk informasi lebih lanjut.
                        </StatusBanner>
                    )}

                    {/* KONDISI 3: AKUN AKTIF */}
                    {isAktif && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-500">
                                <Info className="w-4 h-4" strokeWidth={2} />
                                <span className="text-xs font-medium uppercase tracking-wider">
                                    Menu Layanan
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                                <FeatureCard
                                    icon={Building2}
                                    accent="emerald"
                                    title="Profil Data"
                                    description="Lengkapi dan perbarui data profil Rumah Ibadah atau Lembaga Keagamaan Anda di sini."
                                    href={route('profil-data.index')}
                                    cta="Kelola Data"
                                />
                                <FeatureCard
                                    icon={FileText}
                                    accent="blue"
                                    title="Buat Pengajuan"
                                    description="Ajukan proposal bantuan dana keagamaan secara online. Pastikan profil Anda sudah lengkap."
                                    href={route('pengajuan.create')}
                                    cta="Mulai Pengajuan"
                                />
                                <FeatureCard
                                    icon={BarChart3}
                                    accent="violet"
                                    title="Lacak Proposal"
                                    description="Pantau posisi proposal Anda dan unggah dokumen LPJ jika dana sudah dicairkan."
                                    href={route('pengajuan.index')}
                                    cta="Lihat Riwayat"
                                />
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}