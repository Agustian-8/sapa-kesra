import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';
import {
    FileText,
    UploadCloud,
    FileCheck2,
    X,
    ArrowLeft,
    Send,
    CalendarDays,
    ClipboardCheck,
    ShieldCheck,
    AlertCircle,
    ReceiptText,
    Image as ImageIcon,
    Mail,
    ListChecks,
} from 'lucide-react';

/* Header section */
function SectionHeader({ icon: Icon, title, description, accent = 'violet' }) {
    const accents = {
        violet: 'bg-violet-50 text-violet-700 ring-violet-100',
        slate: 'bg-slate-50 text-slate-700 ring-slate-100',
    };
    return (
        <div className="flex items-start gap-3 mb-5">
            <span className={`inline-flex items-center justify-center rounded-xl p-2.5 ring-1 ${accents[accent]}`}>
                <Icon className="w-5 h-5" strokeWidth={2} />
            </span>
            <div>
                <h4 className="text-base font-semibold text-slate-800 tracking-tight">{title}</h4>
                {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
            </div>
        </div>
    );
}

export default function UploadLpj({ auth, pengajuan }) {
    const { data, setData, post, processing, errors } = useForm({
        file_lpj: null,
    });

    const [fileKey, setFileKey] = useState(0);

    const submit = (e) => {
        e.preventDefault();
        post(route('lpj.store', pengajuan.id));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        setData('file_lpj', file);
        setFileKey((k) => k + 1);
    };

    const clearFile = () => {
        setData('file_lpj', null);
        setFileKey((k) => k + 1);
    };

    const fileSizeMB = data.file_lpj
        ? (data.file_lpj.size / (1024 * 1024)).toFixed(2)
        : null;

    const checklist = [
        { icon: Mail, label: 'Surat Pengantar' },
        { icon: ClipboardCheck, label: 'Laporan Penggunaan Dana' },
        { icon: ReceiptText, label: 'Nota Belanja' },
        { icon: ImageIcon, label: 'Foto Kegiatan' },
    ];

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
                            Laporan Pertanggungjawaban
                        </h2>
                        <p className="text-xs text-slate-500">Unggah dokumen LPJ bantuan</p>
                    </div>
                </div>
            }
        >
            <Head title="Upload LPJ - SAPA KESRA" />

            <div className="py-10">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <form
                        onSubmit={submit}
                        className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden"
                    >
                        {/* Header + konteks proposal */}
                        <div className="p-6 sm:p-8 bg-gradient-to-br from-violet-50 to-white border-b border-violet-100/70">
                            <h3 className="text-lg font-semibold text-slate-800 tracking-tight">
                                Unggah Dokumen LPJ
                            </h3>
                            <p className="text-sm text-slate-500 mt-1 max-w-xl leading-relaxed">
                                Anda diwajibkan untuk mengunggah dokumen bukti realisasi penggunaan
                                dana bantuan.
                            </p>

                            {/* Kartu konteks proposal */}
                            <div className="mt-5 rounded-xl bg-white border border-slate-200 p-4 flex items-start gap-3">
                                <span className="inline-flex items-center justify-center rounded-lg bg-violet-50 text-violet-600 p-2 ring-1 ring-violet-100 shrink-0">
                                    <FileText className="w-5 h-5" strokeWidth={2} />
                                </span>
                                <div className="min-w-0">
                                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                                        Proposal Terkait
                                    </p>
                                    <p className="text-sm font-semibold text-slate-800 mt-0.5 leading-snug">
                                        {pengajuan.judul_proposal}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1.5 inline-flex items-center gap-1.5">
                                        <CalendarDays className="w-3.5 h-3.5" strokeWidth={2} />
                                        Tahun Anggaran: {pengajuan.tahun_anggaran}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 space-y-8">
                            {/* Checklist dokumen */}
                            <section>
                                <SectionHeader
                                    icon={ListChecks}
                                    accent="slate"
                                    title="Kelengkapan Dokumen"
                                    description="Pastikan LPJ memuat seluruh komponen berikut."
                                />
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {checklist.map(({ icon: Icon, label }) => (
                                        <li
                                            key={label}
                                            className="flex items-center gap-2.5 rounded-lg bg-slate-50 border border-slate-100 px-3 py-2.5"
                                        >
                                            <span className="inline-flex items-center justify-center rounded-md bg-white text-slate-600 p-1.5 ring-1 ring-slate-200 shrink-0">
                                                <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                                            </span>
                                            <span className="text-sm text-slate-700">{label}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Upload dokumen */}
                            <section>
                                <SectionHeader
                                    icon={UploadCloud}
                                    accent="violet"
                                    title="Dokumen LPJ"
                                    description="Unggah file LPJ lengkap dalam format PDF."
                                />

                                <div className="rounded-xl border-2 border-dashed border-violet-200 bg-violet-50/40 p-5">
                                    {!data.file_lpj ? (
                                        <label
                                            htmlFor="file_lpj"
                                            className="flex flex-col items-center justify-center gap-2 cursor-pointer text-center py-4 group"
                                        >
                                            <span className="inline-flex items-center justify-center rounded-2xl bg-white text-violet-600 p-3 ring-1 ring-violet-100 group-hover:ring-violet-200 transition">
                                                <UploadCloud className="w-6 h-6" strokeWidth={2} />
                                            </span>
                                            <span className="text-sm font-semibold text-slate-700">
                                                Klik untuk memilih file PDF
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                Format wajib PDF, maksimal 10MB.
                                            </span>
                                            <input
                                                key={fileKey}
                                                id="file_lpj"
                                                type="file"
                                                className="sr-only"
                                                onChange={handleFileChange}
                                                required
                                                accept=".pdf,application/pdf"
                                            />
                                        </label>
                                    ) : (
                                        <div className="flex items-center gap-3 rounded-lg bg-white border border-violet-100 p-3.5">
                                            <span className="inline-flex items-center justify-center rounded-lg bg-violet-50 text-violet-600 p-2 ring-1 ring-violet-100 shrink-0">
                                                <FileCheck2 className="w-5 h-5" strokeWidth={2} />
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-slate-800 truncate">
                                                    {data.file_lpj.name}
                                                </p>
                                                <p className="text-xs text-slate-500">{fileSizeMB} MB</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={clearFile}
                                                className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                                                aria-label="Hapus file"
                                            >
                                                <X className="w-4 h-4" strokeWidth={2} />
                                            </button>
                                        </div>
                                    )}

                                    <InputError className="mt-2" message={errors.file_lpj} />

                                    {data.file_lpj && (
                                        <p className="text-xs text-violet-700 mt-3 flex items-center gap-1.5">
                                            <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2} />
                                            File siap diunggah. Pastikan dokumen sudah final.
                                        </p>
                                    )}
                                </div>

                                <div className="mt-3 flex items-start gap-2 text-xs text-slate-500">
                                    <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" strokeWidth={2} />
                                    <p>
                                        Dokumen akan diverifikasi oleh Tim Bagian Kesra. Pastikan seluruh
                                        bukti penggunaan dana tercantum dengan jelas.
                                    </p>
                                </div>
                            </section>
                        </div>

                        {/* Footer aksi */}
                        <div className="px-6 sm:px-8 py-5 bg-slate-50/70 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                            <Link
                                href={route('pengajuan.index')}
                                className="inline-flex items-center justify-center gap-1.5 text-slate-600 hover:text-slate-800 font-medium text-sm transition px-2 py-1.5"
                            >
                                <ArrowLeft className="w-4 h-4" strokeWidth={2} />
                                Batal & Kembali
                            </Link>
                            <PrimaryButton
                                disabled={processing}
                                className="bg-violet-600 hover:bg-violet-700 focus:ring-violet-500 px-6 py-2.5 rounded-lg shadow-sm w-full sm:w-auto justify-center"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <Send className="w-4 h-4" strokeWidth={2} />
                                    {processing ? 'Mengirim...' : 'Kirim Laporan LPJ'}
                                </span>
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}