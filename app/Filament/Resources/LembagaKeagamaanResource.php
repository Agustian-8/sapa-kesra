<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LembagaKeagamaanResource\Pages;
use App\Models\LembagaKeagamaan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\Grid;

class LembagaKeagamaanResource extends Resource
{
    protected static ?string $model = LembagaKeagamaan::class;
    
    protected static ?string $navigationIcon = 'heroicon-o-building-library';
    protected static ?string $navigationGroup = 'Data Master';
    protected static ?string $navigationLabel = 'Lembaga Keagamaan';
    protected static ?string $pluralLabel = 'Lembaga Keagamaan';
    protected static ?string $modelLabel = 'Lembaga Keagamaan';
    
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Lembaga')
                    ->description('Data dasar lembaga keagamaan')
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
                                
                                Forms\Components\TextInput::make('nama_lembaga')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Nama Lembaga')
                                    ->placeholder('Masukkan nama lembaga')
                                    ->prefixIcon('heroicon-o-building-office'),
                                
                                Forms\Components\TextInput::make('jenis_kelompok')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Jenis Kelompok')
                                    ->placeholder('Contoh: Majelis Taklim, Pesantren, dll')
                                    ->prefixIcon('heroicon-o-users'),
                                
                                Forms\Components\TextInput::make('nama_pengurus')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Nama Pengurus')
                                    ->placeholder('Masukkan nama pengurus')
                                    ->prefixIcon('heroicon-o-user'),
                                
                                Forms\Components\TextInput::make('legalitas')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Legalitas')
                                    ->placeholder('Nomor SK/legalitas')
                                    ->prefixIcon('heroicon-o-document-text'),
                                
                                Forms\Components\TextInput::make('kontak')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Kontak')
                                    ->placeholder('Nomor telepon/WA')
                                    ->prefixIcon('heroicon-o-phone')
                                    ->tel(),
                            ]),
                    ]),
                
                Forms\Components\Section::make('Informasi Lokasi & Keuangan')
                    ->description('Data alamat dan rekening bank')
                    ->icon('heroicon-o-map-pin')
                    ->schema([
                        Grid::make(1)
                            ->schema([
                                Forms\Components\Textarea::make('alamat')
                                    ->required()
                                    ->label('Alamat Lengkap')
                                    ->placeholder('Masukkan alamat lengkap')
                                    ->rows(3)
                                    ->columnSpanFull(),
                            ]),
                        
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
                Tables\Columns\TextColumn::make('nama_lembaga')
                    ->searchable()
                    ->sortable()
                    ->label('Nama Lembaga')
                    ->weight('bold')
                    ->icon('heroicon-o-building-office')
                    ->copyable()
                    ->copyMessage('Nama lembaga disalin'),
                
                Tables\Columns\TextColumn::make('jenis_kelompok')
                    ->searchable()
                    ->sortable()
                    ->label('Jenis Kelompok')
                    ->badge()
                    ->color('primary'),
                
                Tables\Columns\TextColumn::make('nama_pengurus')
                    ->searchable()
                    ->sortable()
                    ->label('Pengurus')
                    ->icon('heroicon-o-user'),
                
                Tables\Columns\TextColumn::make('legalitas')
                    ->searchable()
                    ->sortable()
                    ->label('Legalitas')
                    ->limit(20)
                    ->tooltip(function ($state) {
                        return $state;
                    }),
                
                Tables\Columns\TextColumn::make('kontak')
                    ->searchable()
                    ->sortable()
                    ->label('Kontak')
                    ->icon('heroicon-o-phone')
                    ->copyable(),
                
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
                Tables\Filters\Filter::make('created_at')
                    ->form([
                        Forms\Components\DatePicker::make('created_from')
                            ->label('Dari Tanggal'),
                        Forms\Components\DatePicker::make('created_until')
                            ->label('Sampai Tanggal'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['created_from'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '>=', $date),
                            )
                            ->when(
                                $data['created_until'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '<=', $date),
                            );
                    })
                    ->columns(2),
                    
                Tables\Filters\SelectFilter::make('jenis_kelompok')
                    ->label('Jenis Kelompok')
                    ->options([
                        'Majelis Taklim' => 'Majelis Taklim',
                        'Pesantren' => 'Pesantren',
                        'Gereja' => 'Gereja',
                        'Pura' => 'Pura',
                        'Vihara' => 'Vihara',
                        'Klenteng' => 'Klenteng',
                        'Lainnya' => 'Lainnya',
                    ]),
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
            ->poll('10s')
            ->striped()
            ->emptyStateHeading('Belum ada data lembaga keagamaan')
            ->emptyStateDescription('Mulai tambahkan data lembaga keagamaan pertama Anda.')
            ->emptyStateIcon('heroicon-o-building-library');
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
            'index' => Pages\ListLembagaKeagamaans::route('/'),
            'create' => Pages\CreateLembagaKeagamaan::route('/create'),
            'edit' => Pages\EditLembagaKeagamaan::route('/{record}/edit'),
        ];
    }
}