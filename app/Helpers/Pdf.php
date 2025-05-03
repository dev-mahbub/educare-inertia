<?php

namespace App\Helpers;

use Mpdf\Mpdf;
use Mpdf\MpdfException;
use Mpdf\Output\Destination;
use Storage;

class Pdf
{
    /**
     * @param string $title
     * @param string|null $body
     * @param string|null $header
     * @param string|null $footer
     *
     * @return string
     * @throws MpdfException
     */
    public static function generate(
        string $title,
        ?string $body,
        ?string $header = null,
        ?string $footer = null
    ): string {
        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'P',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->WriteHTML($body);

        return $pdf->Output('', Destination::STRING_RETURN);
    }
}
