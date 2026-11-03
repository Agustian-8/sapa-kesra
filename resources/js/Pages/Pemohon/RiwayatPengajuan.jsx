import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    FileText,
    Plus,
    FolderOpen,
    Upload,
    CalendarDays,
    Tag,
    Wallet,
    Clock,
    CheckCircle2,
    XCircle,
    ChevronRight,
    Inbox,
    ListChecks,
} from 'lucide-react';

/* Konfigurasi badge status */
function getStatusConfig(status) {
    switch (status) {
        case 'usulan':
            return {
                label: 'Usulan Baru',
                icon: Clock,
                className: 'bg-slate-100 text-slate-700 ring-slate-200',
            };
        case 'verifikasi':
            return {
                label: 'Verifikasi',
                icon: ListChecks,
                className: 'bg-blue-50 text-blue-700 ring-blue-200',
            };
        case 'validasi':
            return {
                label: 'Validasi SK',
                icon: ListChecks,
                className: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
            };
        case 'penetapan':
            return {
                label: 'Ditetapkan',
                icon: CheckCircle2,
                className: 'bg-violet-50 text-violet-700 ring-violet-200',
            };
        case 'pencairan':
            return {
                label: 'Dicairkan',
                icon: Wallet,
                className: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
            };
        case 'ditolak':
            return {
                label: 'Ditolak',
                icon: XCircle,
                className: 'bg-red-50 text-red-700 ring-red-200',
            };
        default:
            return {
                label: 'Diproses',
                icon: Clock,
                className: 'bg-slate-100 text-slate-700 ring-slate-200',
            };
    }
}

function StatusBadge({ status }) {
    const { label, icon: Icon, className } = getStatusConfig(status);
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${className}`}
        >
            <Icon className="w-3.5 h-3.5" strokeWidth={2} />
            {label}
        </span>
    );
}

const formatRupiah = (angka) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(angka || 0);

const formatTanggal = (date) =>
    new Date(date).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

export default function RiwayatPengajuan({ auth, pengajuans }) {
    const hasData = pengajuans.length > 0;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center rounded-lg bg-violet-600 text-white p-2">
                        <FileText className="w-5 h-5" strokeWidth={2} />
                    </span>
                    <div>
                        <h2 className="font-semibold text-lg text-slate-800 leading-tight">
                            Riwayat Proposal
                        </h2>
                        <p className="text-xs text-slate-500">
                            Lacak status pengajuan bantuan Anda
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Riwayat Pengajuan - SAPA KESRA" />

            <div className="py-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">

                        {/* Header kartu */}
                        <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 tracking-tight">
                                    Daftar Pengajuan Bantuan
                                </h3>
                                <p className="text-sm text-slate-500 mt-0.5">
                                    Lacak status proposal yang telah Anda kirimkan.
                                </p>
                            </div>
                            <Link
                                href={route('pengajuan.create')}
                                className="inline-flex items-center justify-center gap-1.5 self-start sm:self-auto bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                            >
                                <Plus className="w-4 h-4" strokeWidth={2.5} />
                                Buat Baru
                            </Link>
                        </div>

                        {hasData ? (
                            <>
                                {/* Tampilan tabel (md ke atas) */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead>
                                            <tr className="text-xs uppercase tracking-wider text-slate-500 bg-slate-50/80 border-b border-slate-100">
                                                <th className="px-6 py-3.5 font-semibold">Tanggal</th>
                                                <th className="px-6 py-3.5 font-semibold">Judul Proposal</th>
                                                <th className="px-6 py-3.5 font-semibold">Kategori</th>
                                                <th className="px-6 py-3.5 font-semibold">Nominal</th>
                                                <th className="px-6 py-3.5 font-semibold text-center">Status & Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {pengajuans.map((item) => (
                                                <tr key={item.id} className="hover:bg-slate-50/60 transition">
                                                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                                                        {formatTanggal(item.created_at)}
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-slate-800 max-w-xs">
                                                        {item.judul_proposal}
                                                    </td>
                                                    <td className="px-6 py-4 capitalize text-slate-600">
                                                        {item.kategori_bantuan}
                                                    </td>
                                                    <td className="px-6 py-4 font-semibold text-emerald-700 whitespace-nowrap">
                                                        {formatRupiah(item.nominal_pengajuan)}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col items-center justify-center gap-2">
                                                            <StatusBadge status={item.status_pengajuan} />
                                                            {item.status_pengajuan === 'pencairan' && (
                                                                <Link
                                                                    href={route('lpj.create', item.id)}
                                                                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-violet-600 hover:bg-violet-700 text-white px-3 py-1.5 rounded-md transition shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1"
                                                                >
                                                                    <Upload className="w-3.5 h-3.5" strokeWidth={2} />
                                                                    Upload LPJ
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Tampilan kartu (mobile) */}
                                <div className="md:hidden divide-y divide-slate-100">
                                    {pengajuans.map((item) => (
                                        <div key={item.id} className="p-5 space-y-3">
                                            <div className="flex items-start justify-between gap-3">
                                                <h4 className="font-semibold text-slate-800 text-sm leading-snug">
                                                    {item.judul_proposal}
                                                </h4>
                                                <StatusBadge status={item.status_pengajuan} />
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 text-xs">
                                                <div className="flex items-center gap-1.5 text-slate-500">
                                                    <CalendarDays className="w-3.5 h-3.5" strokeWidth={2} />
                                                    {formatTanggal(item.created_at)}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-slate-500 capitalize">
                                                    <Tag className="w-3.5 h-3.5" strokeWidth={2} />
                                                    {item.kategori_bantuan}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold col-span-2">
                                                    <Wallet className="w-3.5 h-3.5" strokeWidth={2} />
                                                    {formatRupiah(item.nominal_pengajuan)}
                                                </div>
                                            </div>

                                            {item.status_pengajuan === 'pencairan' && (
                                                <Link
                                                    href={route('lpj.create', item.id)}
                                                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-violet-600 hover:bg-violet-700 text-white px-3 py-1.5 rounded-md transition shadow-sm"
                                                >
                                                    <Upload className="w-3.5 h-3.5" strokeWidth={2} />
                                                    Upload LPJ
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            /* Empty state */
                            <div className="px-6 py-16 flex flex-col items-center justify-center text-center">
                                <span className="inline-flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 p-4 ring-1 ring-slate-100 mb-4">
                                    <Inbox className="w-8 h-8" strokeWidth={1.8} />
                                </span>
                                <h4 className="text-base font-semibold text-slate-800">
                                    Belum ada pengajuan
                                </h4>
                                <p className="text-sm text-slate-500 mt-1 max-w-sm">
                                    Anda belum pernah mengirimkan proposal bantuan. Mulai pengajuan
                                    pertama Anda sekarang.
                                </p>
                                <Link
                                    href={route('pengajuan.create')}
                                    className="mt-5 inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                >
                                    <Plus className="w-4 h-4" strokeWidth={2.5} />
                                    Buat Pengajuan
                                    <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}