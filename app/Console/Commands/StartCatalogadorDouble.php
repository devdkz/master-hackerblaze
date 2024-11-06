<?php

namespace App\Console\Commands;

use App\Jobs\SaveDoubleBlazeResultsJob;
use Illuminate\Console\Command;

class StartCatalogadorDouble extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:start-catalogador-double';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start Catalogador DOUBLE BLAZE';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        while (true) {
            SaveDoubleBlazeResultsJob::dispatch();
            $this->info("Atualizando Resultados Double");
            sleep(2);
        }
    }
}
