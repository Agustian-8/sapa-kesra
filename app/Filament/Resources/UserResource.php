<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Hash;
use Filament\Tables\Actions\Action;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationGroup = 'Manajemen Pengguna';
    protected static ?string $modelLabel = 'Pengguna';
    protected static ?string $pluralLabel = 'Data Pengguna';
    protected static ?int $navigationSort = 5;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Akun')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nama Lengkap')
                            ->required()
                            ->maxLength(255)
                            ->prefixIcon('heroicon-o-user'),
                            
                        Forms\Components\TextInput::make('email')
                            ->label('Alamat Email')
                            ->email()
                            ->required()
                            ->maxLength(255)
                            ->prefixIcon('heroicon-o-envelope'),
                            
                        Forms\Components\TextInput::make('password')
                            ->password()
                            ->dehydrateStateUsing(fn ($state) => Hash::make($state))
                            ->dehydrated(fn ($state) => filled($state))
                            ->required(fn (string $context): bool => $context === 'create')
                            ->maxLength(255)
                            ->label('Password')
                            ->prefixIcon('heroicon-o-key')
                            ->helperText('Biarkan kosong jika tidak ingin mengubah password saat edit.'),
                    ])->columns(2),

                Forms\Components\Section::make('Hak Akses & Legalitas')
                    ->schema([
                        Forms\Components\Select::make('role')
                            ->label('Hak Akses (Role)')
                            ->options([
                                'admin' => 'Admin Kesra',
                                'verifikator' => 'Verifikator',
                                'pimpinan' => 'Pimpinan (Kabag/Bupati)',
                                'pemohon' => 'Pemohon (Masyarakat)',
                            ])
                            ->required()
                            ->default('pemohon')
                            ->prefixIcon('heroicon-o-shield-check'),
                            
                        Forms\Components\Select::make('status_akun')
                            ->label('Status Akun')
                            ->options([
                                'pending' => 'Menunggu Verifikasi',
                                'aktif' => 'Aktif',
                                'ditolak' => 'Ditolak',
                            ])
                            ->required()
                            ->default('pending')
                            ->prefixIcon('heroicon-o-check-badge'),
                            
                        Forms\Components\FileUpload::make('dokumen_legalitas')
                            ->label('Dokumen Legalitas (KTP/SK)')
                            ->directory('dokumen-legalitas')
                            ->acceptedFileTypes(['application/pdf', 'image/jpeg', 'image/png'])
                            ->openable()
                            ->downloadable()
                            ->columnSpanFull()
                            ->helperText('Dokumen bukti pendaftaran pengguna (khusus akun Pemohon).'),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nama Lengkap')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                    
                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->icon('heroicon-o-envelope'),
                    
                Tables\Columns\TextColumn::make('role')
                    ->label('Role')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'admin' => 'danger',
                        'verifikator' => 'info',
                        'pimpinan' => 'primary',
                        'pemohon' => 'success',
                        default => 'gray',
                    }),
                    
                Tables\Columns\TextColumn::make('status_akun')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'aktif' => 'success',
                        'ditolak' => 'danger',
                        default => 'gray',
                    }),
                    
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Mendaftar Pada')
                    ->dateTime('d M Y')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('role')
                    ->label('Filter Role')
                    ->options([
                        'admin' => 'Admin Kesra',
                        'verifikator' => 'Verifikator',
                        'pimpinan' => 'Pimpinan',
                        'pemohon' => 'Pemohon',
                    ]),
                Tables\Filters\SelectFilter::make('status_akun')
                    ->label('Filter Status')
                    ->options([
                        'pending' => 'Pending',
                        'aktif' => 'Aktif',
                        'ditolak' => 'Ditolak',
                    ]),
            ])
            ->actions([
                // Tombol ajaib untuk otomatis menyetujui akun
                Action::make('setujui')
                    ->label('Setujui')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn (User $record): bool => $record->status_akun === 'pending')
                    ->requiresConfirmation()
                    ->modalHeading('Setujui Akun Pemohon?')
                    ->modalDescription('Pastikan Anda sudah mengecek dokumen legalitas sebelum mengaktifkan akun ini.')
                    ->action(fn (User $record) => $record->update(['status_akun' => 'aktif'])),
                    
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}