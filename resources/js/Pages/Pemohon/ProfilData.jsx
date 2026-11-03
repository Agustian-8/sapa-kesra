import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';
import { useState } from 'react';
import {
    Building2,
    Landmark,
    CheckCircle2,
    MapPin,
    CreditCard,
    Info,
    ShieldCheck,
    Users,
} from 'lucide-react';

/* Komponen kecil untuk header section agar konsisten */
function SectionHeader({ icon: Icon, title, description, accent = 'emerald' }) {
    const accentMap = {
        emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
        blue: 'bg-blue-50 text-blue-700 ring-blue-100',
        slate: 'bg-slate-50 text-slate-700 ring-slate-100',
    };
    return (
        <div className="flex items-start gap-3 mb-6">
            <span className={`inline-flex items-center justify-center rounded-xl p-2.5 ring-1 ${accentMap[accent]}`}>
                <Icon className="w-5 h-5" strokeWidth={2} />
            </span>
            <div>
                <h4 className="text-base font-semibold text-slate-800 tracking-tight">{title}</h4>
                {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
            </div>
        </div>
    );
}

/* Komponen tab pemilih entitas */
function EntityTab({ active, onClick, icon: Icon, label, sublabel, accent }) {
    const activeStyles =
        accent === 'emerald'
            ? 'bg-white border-emerald-500 ring-2 ring-emerald-100 shadow-sm'
            : 'bg-white border-blue-500 ring-2 ring-blue-100 shadow-sm';
    const iconActive =
        accent === 'emerald' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white';

    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`group flex items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${
                active
                    ? activeStyles
                    : 'bg-slate-50/60 border-slate-200 hover:bg-white hover:border-slate-300'
            }`}
        >
            <span
                className={`inline-flex items-center justify-center rounded-lg p-2 transition-colors ${
                    active ? iconActive : 'bg-slate-200 text-slate-600 group-hover:bg-slate-300'
                }`}
            >
                <Icon className="w-5 h-5" strokeWidth={2} />
            </span>
            <span className="min-w-0">
                <span className={`block text-sm font-semibold ${active ? 'text-slate-800' : 'text-slate-700'}`}>
                    {label}
                </span>
                <span className="block text-xs text-slate-500 mt-0.5 leading-snug">{sublabel}</span>
            </span>
        </button>
    );
}

export default function ProfilData({ auth, rumahIbadah, lembaga, tipePemohonAktif }) {
    const [tipe, setTipe] = useState(tipePemohonAktif);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        tipe_pemohon: tipePemohonAktif,

        // Field Rumah Ibadah
        nama_rumah_ibadah: rumahIbadah?.nama_rumah_ibadah || '',
        jenis_agama: rumahIbadah?.jenis_agama || lembaga?.jenis_agama || '',
        alamat: rumahIbadah?.alamat || lembaga?.alamat || '',
        kecamatan: rumahIbadah?.kecamatan || lembaga?.kecamatan || '',
        desa_kelurahan: rumahIbadah?.desa_kelurahan || lembaga?.desa_kelurahan || '',
        status_kepemilikan: rumahIbadah?.status_kepemilikan || '',
        kapasitas_jamaah: rumahIbadah?.kapasitas_jamaah || '',
        kondisi_bangunan: rumahIbadah?.kondisi_bangunan || '',
        status_tanah: rumahIbadah?.status_tanah || '',
        nama_pengurus: rumahIbadah?.nama_pengurus || '',

        // Field Lembaga Keagamaan
        nama_lembaga: lembaga?.nama_lembaga || '',
        nomor_sk_pendirian: lembaga?.nomor_sk_pendirian || '',
        nama_pimpinan: lembaga?.nama_pimpinan || '',

        // Field Bank
        nama_bank: rumahIbadah?.nama_bank || lembaga?.nama_bank || '',
        nomor_rekening: rumahIbadah?.nomor_rekening || lembaga?.nomor_rekening || '',
        nama_rekening: rumahIbadah?.nama_rekening || lembaga?.nama_rekening || '',
    });

    const handleTipeChange = (pilihan) => {
        setTipe(pilihan);
        setData('tipe_pemohon', pilihan);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('profil-data.store'), { preserveScroll: true });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center rounded-lg bg-emerald-600 text-white p-2">
                        <ShieldCheck className="w-5 h-5" strokeWidth={2} />
                    </span>
                    <div>
                        <h2 className="font-semibold text-lg text-slate-800 leading-tight">Profil Data Pemohon</h2>
                        <p className="text-xs text-slate-500">Lengkapi data entitas untuk pengajuan bantuan</p>
                    </div>
                </div>
            }
        >
            <Head title="Profil Data - SAPA KESRA" />

            <div className="py-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <form
                        onSubmit={submit}
                        className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden"
                    >
                        {/* Header form + pilihan entitas */}
                        <div className="p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white">
                            <div className="flex items-center gap-2 text-slate-500 mb-1">
                                <Info className="w-4 h-4" strokeWidth={2} />
                                <span className="text-xs font-medium uppercase tracking-wider">Langkah 1 dari 1</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 tracking-tight">
                                Pilih Jenis Entitas Pemohon
                            </h3>
                            <p className="text-sm text-slate-500 mt-1 mb-5">
                                Pilih salah satu jenis entitas yang sesuai dengan profil Anda. Data yang
                                ditampilkan akan menyesuaikan pilihan.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <EntityTab
                                    active={tipe === 'rumah_ibadah'}
                                    onClick={() => handleTipeChange('rumah_ibadah')}
                                    icon={Building2}
                                    label="Rumah Ibadah"
                                    sublabel="Masjid, gereja, pura, vihara, dan sejenisnya"
                                    accent="emerald"
                                />
                                <EntityTab
                                    active={tipe === 'lembaga'}
                                    onClick={() => handleTipeChange('lembaga')}
                                    icon={Landmark}
                                    label="Lembaga / Yayasan"
                                    sublabel="Lembaga keagamaan yang berbadan hukum"
                                    accent="blue"
                                />
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 space-y-10">
                            {/* === FORM KHUSUS RUMAH IBADAH === */}
                            {tipe === 'rumah_ibadah' && (
                                <section>
                                    <SectionHeader
                                        icon={Building2}
                                        accent="emerald"
                                        title="Data Rumah Ibadah"
                                        description="Informasi identitas dan kondisi fisik rumah ibadah."
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="md:col-span-2">
                                            <InputLabel value="Nama Rumah Ibadah" />
                                            <TextInput
                                                className="mt-1.5 block w-full"
                                                value={data.nama_rumah_ibadah}
                                                onChange={(e) => setData('nama_rumah_ibadah', e.target.value)}
                                                required={tipe === 'rumah_ibadah'}
                                                placeholder="Contoh: Masjid Al-Ikhlas"
                                            />
                                            <InputError className="mt-2" message={errors.nama_rumah_ibadah} />
                                        </div>
                                        <div>
                                            <InputLabel value="Kapasitas Jamaah" />
                                            <TextInput
                                                type="number"
                                                className="mt-1.5 block w-full"
                                                value={data.kapasitas_jamaah}
                                                onChange={(e) => setData('kapasitas_jamaah', e.target.value)}
                                                required={tipe === 'rumah_ibadah'}
                                                placeholder="Jumlah jamaah"
                                            />
                                        </div>
                                        <div>
                                            <InputLabel value="Status Kepemilikan" />
                                            <select
                                                className="mt-1.5 block w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm text-sm"
                                                value={data.status_kepemilikan}
                                                onChange={(e) => setData('status_kepemilikan', e.target.value)}
                                                required={tipe === 'rumah_ibadah'}
                                            >
                                                <option value="">-- Pilih --</option>
                                                <option value="Milik Sendiri">Milik Sendiri</option>
                                                <option value="Wakaf">Wakaf</option>
                                            </select>
                                        </div>
                                        <div>
                                            <InputLabel value="Status Tanah" />
                                            <TextInput
                                                className="mt-1.5 block w-full"
                                                value={data.status_tanah}
                                                onChange={(e) => setData('status_tanah', e.target.value)}
                                                required={tipe === 'rumah_ibadah'}
                                                placeholder="Contoh: SHM / Wakaf"
                                            />
                                        </div>
                                        <div>
                                            <InputLabel value="Kondisi Bangunan" />
                                            <select
                                                className="mt-1.5 block w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm text-sm"
                                                value={data.kondisi_bangunan}
                                                onChange={(e) => setData('kondisi_bangunan', e.target.value)}
                                                required={tipe === 'rumah_ibadah'}
                                            >
                                                <option value="">-- Pilih --</option>
                                                <option value="baik">Baik</option>
                                                <option value="rusak_ringan">Rusak Ringan</option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-2">
                                            <InputLabel value="Nama Pengurus (Ketua)" />
                                            <TextInput
                                                className="mt-1.5 block w-full"
                                                value={data.nama_pengurus}
                                                onChange={(e) => setData('nama_pengurus', e.target.value)}
                                                required={tipe === 'rumah_ibadah'}
                                                placeholder="Nama lengkap ketua pengurus"
                                            />
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* === FORM KHUSUS LEMBAGA === */}
                            {tipe === 'lembaga' && (
                                <section>
                                    <SectionHeader
                                        icon={Landmark}
                                        accent="blue"
                                        title="Data Lembaga Keagamaan"
                                        description="Informasi legalitas dan kepemimpinan lembaga."
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="md:col-span-2">
                                            <InputLabel value="Nama Lembaga / Yayasan" />
                                            <TextInput
                                                className="mt-1.5 block w-full"
                                                value={data.nama_lembaga}
                                                onChange={(e) => setData('nama_lembaga', e.target.value)}
                                                required={tipe === 'lembaga'}
                                                placeholder="Contoh: Yayasan Nurul Hidayah"
                                            />
                                            <InputError className="mt-2" message={errors.nama_lembaga} />
                                        </div>
                                        <div>
                                            <InputLabel value="Nomor SK Pendirian / Kemenkumham" />
                                            <TextInput
                                                className="mt-1.5 block w-full"
                                                value={data.nomor_sk_pendirian}
                                                onChange={(e) => setData('nomor_sk_pendirian', e.target.value)}
                                                required={tipe === 'lembaga'}
                                                placeholder="Nomor SK"
                                            />
                                        </div>
                                        <div>
                                            <InputLabel value="Nama Pimpinan Lembaga" />
                                            <TextInput
                                                className="mt-1.5 block w-full"
                                                value={data.nama_pimpinan}
                                                onChange={(e) => setData('nama_pimpinan', e.target.value)}
                                                required={tipe === 'lembaga'}
                                                placeholder="Nama lengkap pimpinan"
                                            />
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* === FORM BERSAMA (ALAMAT & BANK) === */}
                            <section>
                                <SectionHeader
                                    icon={MapPin}
                                    accent="slate"
                                    title="Data Umum & Alamat"
                                    description="Lokasi dan informasi dasar yang berlaku untuk kedua jenis entitas."
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <InputLabel value="Jenis Agama" />
                                        <select
                                            className="mt-1.5 block w-full border-slate-300 focus:border-slate-500 focus:ring-slate-500 rounded-lg shadow-sm text-sm"
                                            value={data.jenis_agama}
                                            onChange={(e) => setData('jenis_agama', e.target.value)}
                                            required
                                        >
                                            <option value="">-- Pilih Agama --</option>
                                            <option value="Islam">Islam</option>
                                            <option value="Kristen">Kristen</option>
                                            <option value="Katolik">Katolik</option>
                                        </select>
                                    </div>
                                    <div>
                                        <InputLabel value="Kecamatan" />
                                        <TextInput
                                            className="mt-1.5 block w-full"
                                            value={data.kecamatan}
                                            onChange={(e) => setData('kecamatan', e.target.value)}
                                            required
                                            placeholder="Nama kecamatan"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel value="Desa / Kelurahan" />
                                        <TextInput
                                            className="mt-1.5 block w-full"
                                            value={data.desa_kelurahan}
                                            onChange={(e) => setData('desa_kelurahan', e.target.value)}
                                            required
                                            placeholder="Nama desa/kelurahan"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <InputLabel value="Alamat Lengkap" />
                                        <textarea
                                            className="mt-1.5 block w-full border-slate-300 focus:border-slate-500 focus:ring-slate-500 rounded-lg shadow-sm text-sm"
                                            rows="3"
                                            value={data.alamat}
                                            onChange={(e) => setData('alamat', e.target.value)}
                                            required
                                            placeholder="Jalan, nomor, RT/RW, patokan lokasi"
                                        />
                                    </div>
                                </div>
                            </section>

                            <section>
                                <SectionHeader
                                    icon={CreditCard}
                                    accent="slate"
                                    title="Data Rekening Bank"
                                    description="Rekening yang digunakan untuk pencairan bantuan."
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <InputLabel value="Nama Bank" />
                                        <TextInput
                                            className="mt-1.5 block w-full"
                                            value={data.nama_bank}
                                            onChange={(e) => setData('nama_bank', e.target.value)}
                                            required
                                            placeholder="Contoh: Bank BRI"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel value="Nomor Rekening" />
                                        <TextInput
                                            type="number"
                                            className="mt-1.5 block w-full"
                                            value={data.nomor_rekening}
                                            onChange={(e) => setData('nomor_rekening', e.target.value)}
                                            required
                                            placeholder="Nomor rekening"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <InputLabel value="Atas Nama Rekening" />
                                        <TextInput
                                            className="mt-1.5 block w-full"
                                            value={data.nama_rekening}
                                            onChange={(e) => setData('nama_rekening', e.target.value)}
                                            required
                                            placeholder="Nama pemilik rekening"
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Footer aksi */}
                        <div className="px-6 sm:px-8 py-5 bg-slate-50/70 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <Users className="w-4 h-4" strokeWidth={2} />
                                <span>Pastikan seluruh data sesuai dokumen resmi.</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 bg-emerald-50 ring-1 ring-emerald-100 px-3 py-1.5 rounded-lg">
                                        <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
                                        Tersimpan
                                    </span>
                                </Transition>
                                <PrimaryButton
                                    disabled={processing}
                                    className="bg-emerald-700 hover:bg-emerald-800 focus:ring-emerald-500 px-5 py-2.5 rounded-lg shadow-sm"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Profil Data'}
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}