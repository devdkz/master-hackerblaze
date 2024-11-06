<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Filament\Resources\UserResource\RelationManagers;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class UserResource extends Resource
{
    protected static ?string $model = User::class;
    protected static ?string $label = 'Usuário';
    protected static ?string $pluralLabel = 'Usuários';

    protected static ?string $navigationIcon = 'heroicon-o-user';
    protected static ?string $navigationLabel = 'Usuários';
    protected static ?string $heading = 'Usuários';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                ->label('Nome')
                ->required(), // Campo obrigatório
            Forms\Components\TextInput::make('email')
                ->label('Email')
                ->email() // Validação de email
                ->required(), // Campo obrigatório
            Forms\Components\TextInput::make('password')
                ->label('Senha')
                ->password()
                ->required(), // Campo obrigatório
                
            Forms\Components\Toggle::make('is_admin')
                ->label('Admin')
                ->default(false), // Valor padrão
            Forms\Components\DateTimePicker::make('validity')
                ->label('Validade')
                ->nullable(), // Permite valor nulo
            // Adicione outros campos conforme necessário
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('Nome'),
                Tables\Columns\TextColumn::make('email')->label('Email'),
                Tables\Columns\BooleanColumn::make('is_admin')->label('Admin'),
                Tables\Columns\TextColumn::make('validity')
                    ->label('Validade')
                    ->date('d/m/Y H:i:s'), // Formate a data conforme necessário
                // Adicione outras colunas conforme necessário
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
            ])
            ->searchable();
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
            'index' => Pages\ListUsers::route('/'),
        ];
    }
}
