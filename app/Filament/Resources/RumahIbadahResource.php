<?php

namespace App\Filament\Resources;

use App\Filament\Resources\RumahIbadahResource\Pages;
use App\Models\RumahIbadah;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\Grid;

class RumahIbadahResource extends Resource
{
    protected static ?string $model = RumahIbadah::class;
    
    protected static ?string $navigationIcon = 'heroicon-o-building-office-2';
    protected static ?string $navigationGroup = 'Data Master';
    protected static ?string $navigationLabel = 'Rumah Ibadah';
    protected static ?string $pluralLabel = 'Rumah Ibadah';
    protected static ?string $modelLabel = 'Rumah Ibadah';
    
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Rumah Ibadah')
                    ->description('Data dasar rumah ibadah')
                    ->icon('heroicon-o-information-circle')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Forms\Components\Select::make('user_id')
                                    ->relationship('user', 'name')
                                    ->required()
                                    ->searchable()
                                    ->preload()
                                    ->label('Pengguna')
                                    ->placeholder('Pilih pengguna')
                                    ->helperText('Pilih pengguna yang bertanggung jawab'),
                                
                                Forms\Components\TextInput::make('nama_rumah_ibadah')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Nama Rumah Ibadah')
                                    ->placeholder('Masukkan nama rumah ibadah')
                                    ->prefixIcon('heroicon-o-building-office-2'),
                                
                                Forms\Components\Select::make('jenis_agama')
                                    ->required()
                                    ->label('Jenis Agama')
                                    ->options([
                                        'Islam' => 'Islam',
                                        'Kristen' => 'Kristen',
                                        'Katolik' => 'Katolik',
                                        'Hindu' => 'Hindu',
                                        'Buddha' => 'Buddha',
                                        'Khonghucu' => 'Khonghucu',
                                    ])
                                    ->placeholder('Pilih agama')
                                    ->native(false)
                                    ->prefixIcon('heroicon-o-globe-asia-australia'),
                                
                                Forms\Components\TextInput::make('kecamatan')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Kecamatan')
                                    ->placeholder('Masukkan kecamatan')
                                    ->prefixIcon('heroicon-o-map'),
                                
                                Forms\Components\TextInput::make('desa_kelurahan')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Desa/Kelurahan')
                                    ->placeholder('Masukkan desa/kelurahan')
                                    ->prefixIcon('heroicon-o-map-pin'),
                                
                                Forms\Components\TextInput::make('koordinat_lokasi')
                                    ->maxLength(255)
                                    ->label('Koordinat Lokasi')
                                    ->placeholder('Contoh: -6.2088, 106.8456')
                                    ->prefixIcon('heroicon-o-globe-alt'),
                            ]),
                        
                        Forms\Components\Textarea::make('alamat')
                            ->required()
                            ->label('Alamat Lengkap')
                            ->placeholder('Masukkan alamat lengkap')
                            ->rows(3)
                            ->columnSpanFull(),
                    ]),
                
                Forms\Components\Section::make('Detail Bangunan & Pengurus')
                    ->description('Informasi detail bangunan dan kepengurusan')
                    ->icon('heroicon-o-building-office')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Forms\Components\TextInput::make('status_kepemilikan')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Status Kepemilikan')
                                    ->placeholder('Contoh: Milik Sendiri, Sewa, dll')
                                    ->prefixIcon('heroicon-o-document'),
                                
                                Forms\Components\TextInput::make('tahun_berdiri')
                                    ->label('Tahun Berdiri')
                                    ->placeholder('Contoh: 2000')
                                    ->prefixIcon('heroicon-o-calendar')
                                    ->numeric()
                                    ->minValue(1900)
                                    ->maxValue(date('Y')),
                                
                                Forms\Components\TextInput::make('kapasitas_jamaah')
                                    ->required()
                                    ->numeric()
                                    ->label('Kapasitas Jamaah')
                                    ->placeholder('Jumlah kapasitas')
                                    ->prefixIcon('heroicon-o-users')
                                    ->suffix('orang'),
                                
                                Forms\Components\Select::make('kondisi_bangunan')
                                    ->required()
                                    ->label('Kondisi Bangunan')
                                    ->options([
                                        'Baik' => 'Baik',
                                        'Rusak Ringan' => 'Rusak Ringan',
                                        'Rusak Sedang' => 'Rusak Sedang',
                                        'Rusak Berat' => 'Rusak Berat',
                                    ])
                                    ->placeholder('Pilih kondisi')
                                    ->native(false)
                                    ->prefixIcon('heroicon-o-check-circle'),
                                
                                Forms\Components\TextInput::make('status_tanah')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Status Tanah')
                                    ->placeholder('Contoh: Hak Milik, Wakaf, dll')
                                    ->prefixIcon('heroicon-o-document'),
                                
                                Forms\Components\TextInput::make('nama_pengurus')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Nama Pengurus')
                                    ->placeholder('Masukkan nama pengurus')
                                    ->prefixIcon('heroicon-o-user'),
                            ]),
                    ])
                    ->collapsible(),
                
                Forms\Components\Section::make('Informasi Keuangan')
                    ->description('Data rekening bank')
                    ->icon('heroicon-o-banknotes')
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                Forms\Components\TextInput::make('nama_bank')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Nama Bank')
                                    ->placeholder('Contoh: Bank Mandiri')
                                    ->prefixIcon('heroicon-o-banknotes'),
                                
                                Forms\Components\TextInput::make('nomor_rekening')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Nomor Rekening')
                                    ->placeholder('Masukkan nomor rekening')
                                    ->prefixIcon('heroicon-o-credit-card'),
                                
                                Forms\Components\TextInput::make('nama_rekening')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Nama Pemilik Rekening')
                                    ->placeholder('Sesuai dengan buku rekening')
                                    ->prefixIcon('heroicon-o-user-circle'),
                            ]),
                    ])
                    ->collapsible(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('nama_rumah_ibadah')
                    ->searchable()
                    ->sortable()
                    ->label('Nama Rumah Ibadah')
                    ->weight('bold')
                    ->icon('heroicon-o-building-office-2'),
                
                Tables\Columns\TextColumn::make('jenis_agama')
                    ->searchable()
                    ->sortable()
                    ->label('Agama')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Islam' => 'success',
                        'Kristen' => 'info',
                        'Katolik' => 'primary',
                        'Hindu' => 'warning',
                        'Buddha' => 'danger',
                        'Khonghucu' => 'gray',
                        default => 'secondary',
                    }),
                
                Tables\Columns\TextColumn::make('kecamatan')
                    ->searchable()
                    ->sortable()
                    ->label('Kecamatan')
                    ->icon('heroicon-o-map'),
                
                Tables\Columns\TextColumn::make('desa_kelurahan')
                    ->searchable()
                    ->sortable()
                    ->label('Desa/Kelurahan')
                    ->icon('heroicon-o-map-pin'),
                
                Tables\Columns\TextColumn::make('status_kepemilikan')
                    ->searchable()
                    ->sortable()
                    ->label('Kepemilikan')
                    ->badge()
                    ->color('info'),
                
                Tables\Columns\TextColumn::make('kapasitas_jamaah')
                    ->numeric()
                    ->sortable()
                    ->label('Kapasitas')
                    ->suffix(' orang'),
                
                Tables\Columns\TextColumn::make('kondisi_bangunan')
                    ->searchable()
                    ->sortable()
                    ->label('Kondisi')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Baik' => 'success',
                        'Rusak Ringan' => 'warning',
                        'Rusak Sedang' => 'danger',
                        'Rusak Berat' => 'danger',
                        default => 'secondary',
                    }),
                
                Tables\Columns\TextColumn::make('user.name')
                    ->sortable()
                    ->label('Pengguna')
                    ->toggleable(isToggledHiddenByDefault: true),
                
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->label('Dibuat')
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('jenis_agama')
                    ->label('Agama')
                    ->options([
                        'Islam' => 'Islam',
                        'Kristen' => 'Kristen',
                        'Katolik' => 'Katolik',
                        'Hindu' => 'Hindu',
                        'Buddha' => 'Buddha',
                        'Khonghucu' => 'Khonghucu',
                    ]),
                    
                Tables\Filters\SelectFilter::make('kondisi_bangunan')
                    ->label('Kondisi Bangunan')
                    ->options([
                        'Baik' => 'Baik',
                        'Rusak Ringan' => 'Rusak Ringan',
                        'Rusak Sedang' => 'Rusak Sedang',
                        'Rusak Berat' => 'Rusak Berat',
                    ]),
                    
                Tables\Filters\Filter::make('kapasitas_jamaah')
                    ->form([
                        Forms\Components\TextInput::make('min_kapasitas')
                            ->numeric()
                            ->label('Kapasitas Minimum'),
                        Forms\Components\TextInput::make('max_kapasitas')
                            ->numeric()
                            ->label('Kapasitas Maksimum'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['min_kapasitas'],
                                fn (Builder $query, $kapasitas): Builder => $query->where('kapasitas_jamaah', '>=', $kapasitas),
                            )
                            ->when(
                                $data['max_kapasitas'],
                                fn (Builder $query, $kapasitas): Builder => $query->where('kapasitas_jamaah', '<=', $kapasitas),
                            );
                    })
                    ->columns(2),
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\EditAction::make()
                        ->icon('heroicon-o-pencil-square')
                        ->color('info'),
                    Tables\Actions\DeleteAction::make()
                        ->icon('heroicon-o-trash')
                        ->color('danger'),
                    Tables\Actions\ViewAction::make()
                        ->icon('heroicon-o-eye')
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
            ->emptyStateHeading('Belum ada data rumah ibadah')
            ->emptyStateDescription('Mulai tambahkan data rumah ibadah pertama.')
            ->emptyStateIcon('heroicon-o-building-office-2');
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
            'index' => Pages\ListRumahIbadahs::route('/'),
            'create' => Pages\CreateRumahIbadah::route('/create'),
            'edit' => Pages\EditRumahIbadah::route('/{record}/edit'),
        ];
    }
}