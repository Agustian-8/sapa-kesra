<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PengajuanResource\Pages;
use App\Models\Pengajuan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\Grid;

class PengajuanResource extends Resource
{
    protected static ?string $model = Pengajuan::class;
    
    protected static ?string $navigationIcon = 'heroicon-o-document-plus';
    protected static ?string $navigationGroup = 'Manajemen';
    protected static ?string $navigationLabel = 'Pengajuan';
    protected static ?string $pluralLabel = 'Pengajuan Bantuan';
    protected static ?string $modelLabel = 'Pengajuan Bantuan';
    
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Data Pemohon')
                    ->description('Pilih entitas yang mengajukan bantuan')
                    ->icon('heroicon-o-user-group')
                    ->schema([
                        Forms\Components\MorphToSelect::make('pemohon')
                            ->types([
                                Forms\Components\MorphToSelect\Type::make(\App\Models\RumahIbadah::class)
                                    ->titleAttribute('nama_rumah_ibadah')
                                    ->label('Rumah Ibadah'),
                                Forms\Components\MorphToSelect\Type::make(\App\Models\LembagaKeagamaan::class)
                                    ->titleAttribute('nama_lembaga')
                                    ->label('Lembaga Keagamaan'),
                            ])
                            ->searchable()
                            ->preload()
                            ->required()
                            ->columnSpanFull(),
                    ]),
                
                Forms\Components\Section::make('Detail Pengajuan')
                    ->description('Informasi detail pengajuan bantuan')
                    ->icon('heroicon-o-document-text')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Forms\Components\Select::make('kategori_bantuan')
                                    ->required()
                                    ->label('Kategori Bantuan')
                                    ->options([
                                        'Kegiatan Keagamaan' => 'Kegiatan Keagamaan',
                                        'Pembangunan' => 'Pembangunan',
                                        'Renovasi' => 'Renovasi',
                                        'Pendidikan' => 'Pendidikan',
                                        'Kesehatan' => 'Kesehatan',
                                        'Sosial' => 'Sosial',
                                        'Lainnya' => 'Lainnya',
                                    ])
                                    ->placeholder('Pilih kategori')
                                    ->native(false)
                                    ->prefixIcon('heroicon-o-tag'),
                                
                                Forms\Components\TextInput::make('nominal_pengajuan')
                                    ->required()
                                    ->numeric()
                                    ->label('Nominal Pengajuan (Rp)')
                                    ->placeholder('0')
                                    ->prefixIcon('heroicon-o-banknotes')
                                    ->step(1000),
                                
                                Forms\Components\TextInput::make('judul_proposal')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Judul Proposal')
                                    ->placeholder('Masukkan judul proposal')
                                    ->prefixIcon('heroicon-o-pencil'),
                                
                                Forms\Components\FileUpload::make('file_proposal')
                                    ->required()
                                    ->label('File Proposal')
                                    ->helperText('Upload file proposal (PDF, DOC, DOCX)')
                                    ->acceptedFileTypes(['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
                                    ->maxSize(10240)
                                    ->uploadingMessage('Mengupload file...')
                                    ->directory('proposals')
                                    ->visibility('private')
                                    ->preserveFilenames(),
                                
                                Forms\Components\Select::make('status_pengajuan')
                                    ->required()
                                    ->label('Status Pengajuan')
                                    ->options([
                                        'draft' => 'Draft',
                                        'diajukan' => 'Diajukan',
                                        'diverifikasi' => 'Diverifikasi',
                                        'disetujui' => 'Disetujui',
                                        'ditolak' => 'Ditolak',
                                    ])
                                    ->default('draft')
                                    ->native(false)
                                    ->prefixIcon('heroicon-o-check-circle'), // Ikon sudah diperbaiki
                                
                                Forms\Components\TextInput::make('nominal_disetujui')
                                    ->numeric()
                                    ->label('Nominal Disetujui (Rp)')
                                    ->placeholder('0')
                                    ->prefixIcon('heroicon-o-banknotes')
                                    ->step(1000)
                                    ->helperText('Diisi jika pengajuan disetujui'),
                                
                                Forms\Components\TextInput::make('tahun_anggaran')
                                    ->required()
                                    ->label('Tahun Anggaran')
                                    ->default(date('Y'))
                                    ->prefixIcon('heroicon-o-calendar')
                                    ->numeric(),
                            ]),
                        
                        Forms\Components\Textarea::make('catatan_verifikator')
                            ->label('Catatan Verifikator')
                            ->placeholder('Masukkan catatan verifikasi (opsional)')
                            ->rows(3)
                            ->columnSpanFull()
                            ->helperText('Catatan untuk tim verifikator'),
                    ])
                    ->collapsible(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('pemohon.nama_rumah_ibadah')
                    ->label('Nama Pemohon')
                    ->getStateUsing(function (Pengajuan $record) {
                        return $record->pemohon_type === \App\Models\RumahIbadah::class 
                            ? $record->pemohon->nama_rumah_ibadah 
                            : $record->pemohon->nama_lembaga;
                    })
                    ->searchable(),

                Tables\Columns\TextColumn::make('judul_proposal')
                    ->searchable()
                    ->sortable()
                    ->label('Judul Proposal')
                    ->weight('bold')
                    ->limit(30)
                    ->tooltip(function ($state) {
                        return $state;
                    }),
                
                Tables\Columns\TextColumn::make('kategori_bantuan')
                    ->searchable()
                    ->sortable()
                    ->label('Kategori')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Kegiatan Keagamaan' => 'info',
                        'Pembangunan' => 'success',
                        'Renovasi' => 'warning',
                        'Pendidikan' => 'primary',
                        'Kesehatan' => 'danger',
                        'Sosial' => 'gray',
                        default => 'secondary',
                    }),
                
                Tables\Columns\TextColumn::make('nominal_pengajuan')
                    ->money('IDR', locale: 'id') 
                    ->sortable()
                    ->label('Nominal Pengajuan'),
                
                Tables\Columns\TextColumn::make('status_pengajuan')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'draft' => 'gray',
                        'diajukan' => 'warning',
                        'diverifikasi' => 'info',
                        'disetujui' => 'success',
                        'ditolak' => 'danger',
                        default => 'secondary',
                    }),
                
                Tables\Columns\TextColumn::make('nominal_disetujui')
                    ->money('IDR', locale: 'id') 
                    ->sortable()
                    ->label('Disetujui')
                    ->toggleable(isToggledHiddenByDefault: true),
                
                Tables\Columns\TextColumn::make('tahun_anggaran')
                    ->sortable()
                    ->label('Tahun')
                    ->badge()
                    ->color('primary'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status_pengajuan')
                    ->label('Status')
                    ->options([
                        'draft' => 'Draft',
                        'diajukan' => 'Diajukan',
                        'diverifikasi' => 'Diverifikasi',
                        'disetujui' => 'Disetujui',
                        'ditolak' => 'Ditolak',
                    ]),
                Tables\Filters\SelectFilter::make('kategori_bantuan')
                    ->label('Kategori')
                    ->options([
                        'Kegiatan Keagamaan' => 'Kegiatan Keagamaan',
                        'Pembangunan' => 'Pembangunan',
                        'Renovasi' => 'Renovasi',
                        'Pendidikan' => 'Pendidikan',
                        'Kesehatan' => 'Kesehatan',
                        'Sosial' => 'Sosial',
                        'Lainnya' => 'Lainnya',
                    ]),
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\EditAction::make()
                        ->color('info'),
                    Tables\Actions\DeleteAction::make()
                        ->color('danger'),
                    Tables\Actions\ViewAction::make()
                        ->color('success'),
                ]),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->label('Hapus Terpilih'),
                ]),
            ])
            ->defaultSort('created_at', 'desc')
            ->striped()
            ->emptyStateHeading('Belum ada pengajuan')
            ->emptyStateDescription('Mulai tambahkan pengajuan bantuan pertama.')
            ->emptyStateIcon('heroicon-o-document-plus');
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPengajuans::route('/'),
            'create' => Pages\CreatePengajuan::route('/create'),
            'edit' => Pages\EditPengajuan::route('/{record}/edit'),
        ];
    }
}