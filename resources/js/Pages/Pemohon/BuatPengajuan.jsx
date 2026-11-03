import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';
import {
    FileText,
    Info,
    UploadCloud,
    FileCheck2,
    X,
    ShieldCheck,
    AlertCircle,
    Send,
    Building2,
} from 'lucide-react';

/* Header section kecil */
function SectionHeader({ icon: Icon, title, description, accent = 'slate' }) {
    const accents = {
        emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
        blue: 'bg-blue-50 text-blue-700 ring-blue-100',
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

export default function BuatPengajuan({ auth, pemohon, nama_tampil }) {
    const { data, setData, post, processing, errors } = useForm({
        judul_proposal: '',
        kategori_bantuan: '',
        nominal_pengajuan: '',
        file_proposal: null,
    });

    const [fileKey, setFileKey] = useState(0);

    const submit = (e) => {
        e.preventDefault();
        post(route('pengajuan.store'));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        setData('file_proposal', file);
        // reset input agar bisa memilih file yang sama lagi bila perlu
        setFileKey((k) => k + 1);
    };

    const clearFile = () => {
        setData('file_proposal', null);
        setFileKey((k) => k + 1);
    };

    const fileSizeMB = data.file_proposal
        ? (data.file_proposal.size / (1024 * 1024)).toFixed(2)
        : null;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center rounded-lg bg-blue-600 text-white p-2">
                        <FileText className="w-5 h-5" strokeWidth={2} />
                    </span>
                    <div>
                        <h2 className="font-semibold text-lg text-slate-800 leading-tight">
                            Buat Pengajuan Bantuan
                        </h2>
                        <p className="text-xs text-slate-500">Ajukan proposal bantuan dana keagamaan</p>
                    </div>
                </div>
            }
        >
            <Head title="Buat Pengajuan - SAPA KESRA" />

            <div className="py-10">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <form
                        onSubmit={submit}
                        className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden"
                    >
                        {/* Banner pemohon + catatan penting */}
                        <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-white border-b border-blue-100/70">
                            <div className="flex items-start gap-3">
                                <span className="inline-flex items-center justify-center rounded-xl bg-blue-600 text-white p-2.5 ring-1 ring-blue-700/20 shrink-0">
                                    <Building2 className="w-5 h-5" strokeWidth={2} />
                                </span>
                                <div className="min-w-0">
                                    <p className="text-xs font-medium uppercase tracking-wider text-blue-700/80">
                                        Pemohon
                                    </p>
                                    <h3 className="font-semibold text-slate-800 text-base leading-snug">
                                        {nama_tampil}
                                    </h3>
                                </div>
                            </div>

                            <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-white/70 border border-blue-100 p-3.5">
                                <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" strokeWidth={2} />
                                <p className="text-sm text-blue-900/85 leading-relaxed">
                                    Pastikan proposal fisik Anda sudah lengkap (memiliki KOP, stempel, dan
                                    tanda tangan) sebelum file PDF diunggah ke sistem ini.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 space-y-8">
                            {/* Detail proposal */}
                            <section>
                                <SectionHeader
                                    icon={FileText}
                                    accent="blue"
                                    title="Detail Proposal"
                                    description="Isi informasi utama pengajuan bantuan."
                                />
                                <div className="space-y-5">
                                    <div>
                                        <InputLabel htmlFor="judul_proposal" value="Judul / Perihal Proposal" />
                                        <TextInput
                                            id="judul_proposal"
                                            className="mt-1.5 block w-full"
                                            placeholder="Contoh: Permohonan Bantuan Renovasi Atap Masjid"
                                            value={data.judul_proposal}
                                            onChange={(e) => setData('judul_proposal', e.target.value)}
                                            required
                                        />
                                        <InputError className="mt-2" message={errors.judul_proposal} />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <InputLabel htmlFor="kategori_bantuan" value="Kategori Bantuan" />
                                            <select
                                                id="kategori_bantuan"
                                                className="mt-1.5 block w-full border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm text-sm"
                                                value={data.kategori_bantuan}
                                                onChange={(e) => setData('kategori_bantuan', e.target.value)}
                                                required
                                            >
                                                <option value="">-- Pilih Kategori --</option>
                                                <option value="pembangunan">Pembangunan Fisik</option>
                                                <option value="kegiatan">Kegiatan Keagamaan</option>
                                                <option value="pembinaan">Pembinaan Umat</option>
                                            </select>
                                            <InputError className="mt-2" message={errors.kategori_bantuan} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="nominal_pengajuan" value="Nominal Pengajuan" />
                                            <div className="mt-1.5 relative">
                                                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">
                                                    Rp
                                                </span>
                                                <TextInput
                                                    id="nominal_pengajuan"
                                                    type="number"
                                                    className="block w-full pl-9"
                                                    placeholder="50000000"
                                                    value={data.nominal_pengajuan}
                                                    onChange={(e) => setData('nominal_pengajuan', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            {data.nominal_pengajuan && !isNaN(data.nominal_pengajuan) && (
                                                <p className="text-xs text-slate-500 mt-1.5">
                                                    {new Intl.NumberFormat('id-ID', {
                                                        style: 'currency',
                                                        currency: 'IDR',
                                                        maximumFractionDigits: 0,
                                                    }).format(Number(data.nominal_pengajuan))}
                                                </p>
                                            )}
                                            <InputError className="mt-2" message={errors.nominal_pengajuan} />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Upload dokumen */}
                            <section>
                                <SectionHeader
                                    icon={UploadCloud}
                                    accent="emerald"
                                    title="Dokumen Proposal"
                                    description="Unggah proposal dalam format PDF."
                                />

                                <div className="rounded-xl border-2 border-dashed border-emerald-200 bg-emerald-50/40 p-5">
                                    {!data.file_proposal ? (
                                        <label
                                            htmlFor="file_proposal"
                                            className="flex flex-col items-center justify-center gap-2 cursor-pointer text-center py-4 group"
                                        >
                                            <span className="inline-flex items-center justify-center rounded-2xl bg-white text-emerald-600 p-3 ring-1 ring-emerald-100 group-hover:ring-emerald-200 transition">
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
                                                id="file_proposal"
                                                type="file"
                                                className="sr-only"
                                                onChange={handleFileChange}
                                                required
                                                accept=".pdf,application/pdf"
                                            />
                                        </label>
                                    ) : (
                                        <div className="flex items-center gap-3 rounded-lg bg-white border border-emerald-100 p-3.5">
                                            <span className="inline-flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 p-2 ring-1 ring-emerald-100 shrink-0">
                                                <FileCheck2 className="w-5 h-5" strokeWidth={2} />
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-slate-800 truncate">
                                                    {data.file_proposal.name}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {fileSizeMB} MB
                                                </p>
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

                                    <InputError className="mt-2" message={errors.file_proposal} />

                                    {data.file_proposal && (
                                        <p className="text-xs text-emerald-700 mt-3 flex items-center gap-1.5">
                                            <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2} />
                                            File siap diunggah. Pastikan dokumen sudah final.
                                        </p>
                                    )}
                                </div>

                                <div className="mt-3 flex items-start gap-2 text-xs text-slate-500">
                                    <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" strokeWidth={2} />
                                    <p>
                                        Pastikan nama file mudah dikenali dan tidak mengandung karakter
                                        khusus. File akan diverifikasi oleh Tim Bagian Kesra.
                                    </p>
                                </div>
                            </section>
                        </div>

                        {/* Footer aksi */}
                        <div className="px-6 sm:px-8 py-5 bg-slate-50/70 border-t border-slate-100">
                            <PrimaryButton
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 w-full justify-center py-3 rounded-lg shadow-sm"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <Send className="w-4 h-4" strokeWidth={2} />
                                    {processing ? 'Mengirim...' : 'Kirim Pengajuan Bantuan'}
                                </span>
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}