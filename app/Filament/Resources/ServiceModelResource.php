<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ServiceModelResource\Pages;
use App\Filament\Resources\ServiceModelResource\RelationManagers;
use App\Models\ServiceModel;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ServiceModelResource extends Resource
{
    protected static ?string $model = ServiceModel::class;
    protected static ?string $label = 'Serviço';
    protected static ?string $pluralLabel = 'Serviços';
    protected static ?string $navigationGroup = 'Gerenciamento';
    protected static ?string $navigationIcon = 'heroicon-o-squares-2x2';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                ->label('Nome')
                ->required()
                ->maxLength(255),

            Forms\Components\FileUpload::make('image_url')
                ->label('Imagem')
                ->directory('services') // Define o diretório onde a imagem será armazenada
                ->image()               // Limita o upload a arquivos de imagem
                ->maxSize(2048)         // Define um tamanho máximo de 2 MB para o arquivo
                ->required(),

            Forms\Components\TextInput::make('route_redirect')
                ->label('Rota de Redirecionamento')
                ->maxLength(255),

            Forms\Components\Toggle::make('blocked')
                ->label('Bloqueado')
                ->default(false),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                ->label('Nome')
                ->sortable()
                ->searchable(),
                Tables\Columns\TextColumn::make('route_redirect')
                ->label('Rota de Direcionamento')
                ->sortable()
                ->searchable(),



            Tables\Columns\ImageColumn::make('image_url')
                ->label('Imagem')
                ->disk('public') // Define o disco onde a imagem está armazenada
                ->height(50)
                ->width(50),
            
            Tables\Columns\ToggleColumn::make('blocked')
                ->label('Bloqueado')
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
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
            'index' => Pages\ListServiceModels::route('/'),
            'create' => Pages\CreateServiceModel::route('/create'),
            'edit' => Pages\EditServiceModel::route('/{record}/edit'),
        ];
    }
}
