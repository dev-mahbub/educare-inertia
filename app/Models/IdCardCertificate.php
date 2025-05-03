<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IdCardCertificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'template_name',
        'orientation',
        'audience_type',
        'is_with_backpage',
        'background_image',
        'background_color',
        'columns',
        'header',
        'body',
        'footer',
        'back_page',
        'status'
    ];

    public function backgroundImage()
    {
        return $this->morphOne(Image::class, 'imageable')
            ->where('school_id', getUserSchoolId())
            ->where('name', 'id_card_background_image');
    }

    public function headerBackgroundImage()
    {
        return $this->morphOne(Image::class, 'imageable')
            ->where('school_id', getUserSchoolId())
            ->where('name', 'id_card_header_background_image');
    }

    public function bodyBackgroundImage()
    {
        return $this->morphOne(Image::class, 'imageable')
            ->where('school_id', getUserSchoolId())
            ->where('name', 'id_card_body_background_image');
    }

    public function footerBackgroundImage()
    {
        return $this->morphOne(Image::class, 'imageable')
            ->where('school_id', getUserSchoolId())
            ->where('name', 'id_card_footer_background_image');
    }

    public function backpageBackgroundImage()
    {
        return $this->morphOne(Image::class, 'imageable')
            ->where('school_id', getUserSchoolId())
            ->where('name', 'id_card_backpage_background_image');
    }

    public function footerSignatureImage()
    {
        return $this->morphOne(Image::class, 'imageable')
            ->where('school_id', getUserSchoolId())
            ->where('name', 'id_card_footer_signature_image');
    }
}
