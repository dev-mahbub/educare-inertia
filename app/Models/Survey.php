<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'academic_year_id',
        'created_by',
        'opened_by',
        'closed_by',
        'title',
        'description',
        'instructions_desc',
        'survey_audience',
        'opened_date',
        'closed_date',
        'is_open',
        'is_published',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => Status::class,
    ];


    public function surveyClasses()
    {
        return $this->hasMany(SurveyClass::class, 'survey_id');
    }

    public function surveyQuestions()
    {
        return $this->hasMany(SurveyQuestion::class, 'survey_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function openedBy()
    {
        return $this->belongsTo(User::class, 'opened_by', 'id');
    }

    public function closedBy()
    {
        return $this->belongsTo(User::class, 'closed_by', 'id');
    }

    public function surveyResponses()
    {
        return $this->hasMany(SurveyResponse::class, 'survey_id');
    }
}
