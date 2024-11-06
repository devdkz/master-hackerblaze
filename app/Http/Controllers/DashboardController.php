<?php

namespace App\Http\Controllers;

use App\Models\ServiceModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index (){
        $services = ServiceModel::all();
        $use = User::find(auth()->user()->id);
        return Inertia::render('Dashboard',[
            'services' => $services,
            'user' => [
                'connected_blaze' => $use->connected_blaze,
                'csrf_token' => csrf_token(),
                // Outros dados do usuário que você deseja passar
            ],
        ]);
    }

    public function catalogador(){
        return Inertia::render('Catalogador');
    }

    public function brancoduplo(){
        $user = User::find(auth()->user()->id);
        return Inertia::render('Games/BrancoDuplo',[
            'access_token' => $user->access_token,
            'user' => [
                'csrf_token' => csrf_token(),
            ]
        ]);
    }
    public function doublezeroloss(){
        $user = User::find(auth()->user()->id);
        return Inertia::render('Games/DoubleZeroLoss',[
            'access_token' => $user->access_token,
            'user' => [
                'csrf_token' => csrf_token(),
            ]
        ]);
    }
    public function brancosemgale(){
        $user = User::find(auth()->user()->id);
        return Inertia::render('Games/BrancoSemGale',[
            'access_token' => $user->access_token,
            'user' => [
                'csrf_token' => csrf_token(),
            ]
        ]);
    }
    public function doublesemgale(){
        $user = User::find(auth()->user()->id);
        return Inertia::render('Games/DoubleSemGale',[
            'access_token' => $user->access_token,
            'user' => [
                'csrf_token' => csrf_token(),
            ]
        ]);
    }
    public function limpar(){
        DB::table('last_results_double_blaze')->truncate();
        return response()->json(['success'=>true,'message' => "Limpo com Sucesso!"]);
    }
    public function crashvelas10x(){
        $user = User::find(auth()->user()->id);
        return Inertia::render('Games/CrashVelasAltas',[
            'access_token' => $user->access_token,
            'user' => [
                'csrf_token' => csrf_token(),
            ]
        ]);
    }



    public function apostarblaze(Request $request)
    {
        $valor = $request->input('valor');
        $color = $request->input('color');
        $user = User::find(auth()->user()->id);
        $url = 'https://blaze1.space/api/singleplayer-originals/originals/roulette_bets';
        $data = [
            'amount' => $valor,
            'currency_type' => 'BRL',
            'color' => $color,
            'free_bet' => false,
            'room_id' => 1,
        ];

        $headers = [
            'accept' => 'application/json, text/plain, */*',
            'accept-language' => 'pt-BR,pt;q=0.9',
            'authorization' => 'Bearer '.$user->access_token,
            'content-type' => 'application/json;charset=UTF-8',
        ];
        $response = Http::withHeaders($headers)
                        ->post($url, $data);
        if ($response->successful()) {
            return response()->json($response->json());
        } else {
            return response()->json(['error' => 'Erro ao realizar a aposta'], 500);
        }
    }
    
    public function connectBlaze(Request $request)
    {
        $email = $request->input('username');
        $password = $request->input('password');
    
        // Verifica se o email e a senha foram fornecidos
        if ($email && $password) {
            $url = 'https://blaze1.space/api/auth/password?analyticSessionID=1730838678646';
            // Definindo os cabeçalhos da requisição
            $headers = [
                'accept' => 'application/json, text/plain, */*',
                'accept-language' => 'pt-BR,pt;q=0.9',
                'content-type' => 'application/json;charset=UTF-8',
                // Inclua mais cabeçalhos conforme necessário
            ];
    
            // Dados a serem enviados no corpo da requisição
            $data = [
                'username' => $email,
                'password' => $password,
            ];
    
            try {
                // Enviando a requisição PUT usando o Http facade
                $response = Http::withHeaders($headers)->put($url, $data);
    
                // Verifica se a requisição foi bem-sucedida
                if ($response->successful()) {
                    $data = $response->json();
                    $user = User::find(auth()->user()->id);
                    if($user){
                        $user->connected_blaze = 1;
                        $user->access_token = $data['access_token'];
                        $user->save();
                    }
                    return response()->json($response->json(), $response->status());
                } else {
                    return response()->json(['error' => 'Falha ao conectar: ' . $response->body()], $response->status());
                }
            } catch (\Exception $e) {
                // Captura de erros durante a requisição
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }
    
        // Retorno de erro se email ou senha não foram fornecidos
        return response()->json(['error' => 'Email e senha são necessários.'], 400);
    }
}
