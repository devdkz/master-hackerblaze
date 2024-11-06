<?php

namespace App\Jobs;

use App\Models\LastDoubleBlazeResults;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SaveDoubleBlazeResultsJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */

    public function handle(): void
    {
        $url = 'https://blaze1.space/api/singleplayer-originals/originals/roulette_games/current/1';
        $response = Http::withoutVerifying()->get($url);
        if ($response->successful()) {
            $data = $response->json();
            $this->saveResult($data);
        } else {
            Log::error('Erro ao obter dados da API: ' . $response->status());
        }
    }
    /**
     * Save the result to the database.
     *
     * @param array|null $data
     * @return void
     */
    private function saveResult(?array $data): void
    {
        if ($data !== null && isset($data['status']) && $data['status'] === 'rolling') {
            $result = LastDoubleBlazeResults::where('id_blaze', $data['id'])->first();
            if (!$result) {
                try {
                    LastDoubleBlazeResults::create([
                        'color' => $data['color'],
                        'id_blaze' => $data['id'],
                        'roll' => $data['roll'],
                        'room_id' => $data['room_id'],
                        'created_at' => $data['created_at'],
                    ]);
                } catch (\Exception $e) {
                    Log::error('Failed to save result: ' . $e->getMessage());
                }
            }
        }
    }
}
