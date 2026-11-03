<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LpjResource\Pages;
use App\Models\Lpj;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class LpjResource extends Resource
{
    protected static ?string $model = Lpj::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-check';
    protected static ?string $navigationGroup = 'Manajemen';
    protected static ?string $navigationLabel = 'Data LPJ';
    protected static ?string $pluralLabel = 'Laporan Pertanggungjawaban';
    protected static ?string $modelLabel = 'LPJ';
    
    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Laporan')
                    ->description('Pilih proposal yang sudah dicairkan untuk dilaporkan')
                    ->schema([
                        Forms\Components\Select::make('pengajuan_id')
                            ->relationship('pengajuan', 'judul_proposal')
                            ->label('Judul Proposal / Pengajuan')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->columnSpanFull(),

                        Forms\Components\DatePicker::make('tanggal_lapor')
                            ->label('Tanggal Pelaporan')
                            ->default(now())
                            ->required(),

                        Forms\Components\FileUpload::make('file_lpj')
                            ->label('Dokumen LPJ (PDF)')
                            ->acceptedFileTypes(['application/pdf'])
                            ->directory('dokumen-lpj')
                            ->maxSize(10240)
                            ->required(),
                    ])->columns(2),

                Forms\Components\Section::make('Evaluasi & Status')
                    ->description('Evaluasi kelengkapan dokumen LPJ')
                    ->schema([
                        Forms\Components\Select::make('status_lpj')
                            ->label('Status Pemeriksaan')
                            ->options([
                                'menunggu_pemeriksaan' => 'Menunggu Pemeriksaan',
                                'revisi' => 'Perlu Revisi',
                                'disetujui' => 'Disetujui (Selesai)',
                            ])
                            ->default('menunggu_pemeriksaan')
                            ->required()
                            ->prefixIcon('heroicon-o-clipboard-document-check'),

                        Forms\Components\Textarea::make('catatan_evaluasi')
                            ->label('Catatan Evaluasi / Alasan Revisi')
                            ->columnSpanFull()
                            ->rows(3),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('pengajuan.judul_proposal')
                    ->label('Judul Proposal')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->limit(40),
                
                Tables\Columns\TextColumn::make('tanggal_lapor')
                    ->label('Tanggal Lapor')
                    ->date('d M Y')
                    ->sortable(),

                Tables\Columns\TextColumn::make('status_lpj')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'menunggu_pemeriksaan' => 'warning',
                        'revisi' => 'danger',
                        'disetujui' => 'success',
                        default => 'gray',
                    }),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status_lpj')
                    ->label('Filter Status')
                    ->options([
                        'menunggu_pemeriksaan' => 'Menunggu Pemeriksaan',
                        'revisi' => 'Perlu Revisi',
                        'disetujui' => 'Disetujui',
                    ]),
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\EditAction::make()->color('info'),
                    Tables\Actions\ViewAction::make()->color('success'),
                ]),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->emptyStateHeading('Belum ada LPJ')
            ->emptyStateIcon('heroicon-o-document-check');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListLpjs::route('/'),
            'create' => Pages\CreateLpj::route('/create'),
            'edit' => Pages\EditLpj::route('/{record}/edit'),
        ];
    }
}