<?php
return [
    /*
    |--------------------------------------------------------------------------
    | local upload
    |--------------------------------------------------------------------------
    |
    | Different configuration options for uploading files
    |
    */
    'directories' => [
        'user' => 'images/user_',
        'media_image' => 'images/media_',
        'media_file' => 'files/media_',
        'media_video' => 'videos/media_',
        'blog_image' => 'images/blog_',
        'blog_file' => 'files/blog_',
        'blog_video' => 'videos/blog_',
        'event_image' => 'images/event_',
        'event_file' => 'files/event_',
        'event_video' => 'videos/event_',
        'course_image' => 'images/course_',
        'course_file' => 'files/course_',
        'course_video' => 'videos/course_',
        'school_image' => 'images/school_',
        'school_file' => 'files/school_',
        'school_video' => 'videos/school_',
        'student_image' => 'images/student_',
        'student_file' => 'files/student_',
        'student_video' => 'videos/student_',
        'teacher_file' => 'files/teacher_',
        'teacher_image' => 'images/teacher_',
        'teacher_video' => 'videos/teacher_',
        'homework_file' => 'files/homework_',
        'homework_image' => 'images/homework_',
        'homework_video' => 'videos/homework_',
        'resource_file' => 'files/resource_',
        'resource_image' => 'images/resource_',
        'resource_video' => 'videos/resource_',
        'assessment_file' => 'files/assessment_',
        'assessment_image' => 'images/assessment_',
        'assessment_video' => 'videos/assessment_',
        'classwork_file' => 'files/classwork_',
        'classwork_image' => 'images/classwork_',
        'classwork_video' => 'videos/classwork_',
        'staff_file' => 'files/staff_',
        'staff_image' => 'images/staff_',
        'staff_video' => 'videos/staff_',
        'driver_file' => 'files/driver_',
        'driver_image' => 'images/driver_',
        'driver_video' => 'videos/driver_',

        'owner_image' => 'images/user_',
        'academic_syllabus_image' => 'images/academic_syllabus_',
        'academic_setting' => 'images/academic_setting_',
        'message_image' => 'images/message_',
    ],

    'restrictions' => [
        'image' => 'mimes:jpeg,gif,png|max:5120',
        'file' => 'mimes:doc,docx,csv,pdf,png,jpg,jpeg,gif|max:4096',
        'video' => 'mimes:mp4,pdf,png,jpg,jpeg,gif|max:10240',
    ],
];
