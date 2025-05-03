<?php

use App\Enums\UserRole;

return [
    /**
    * User seeder count
    * This value is the number of users to be seeded
    **/
    'user_count' => 3,

    /**
     * Seeded super admins
     * @return  Array of Admins to be created by UserFactory
     */
    'lms_super_admins' => [
        [
            'school_id' => 1,
            'username' => 'nasir',
            'first_name' => 'Nasir',
            'middle_name' => 'Uddin',
            'last_name' => 'Mandal',
            'phone' => '+8801712499840',
            'email' => 'nasir.chalo@gmail.com',
            'role' => UserRole::SUPER_ADMIN,
        ],
        [
            'school_id' => 1,
            'username' => 'situ_ua',
            'first_name' => 'Sittu',
            'middle_name' => 'Kumar',
            'last_name' => '',
            'phone' => '+916209111333',
            'email' => 'situtkumar28@gmail.com',
            'role' => UserRole::SUPER_ADMIN,
        ],
    ],

    /**
     * Seeded admins
     * @return  Array of Admins to be created by UserFactory
     */
    'lms_admins' => [
        [
            'school_id' => 1,
            'username' => 'situ_admin',
            'first_name' => 'Admin',
            'middle_name' => 'Kumar',
            'last_name' => '',
            'phone' => '+916209111333',
            'email' => 'situ@gmail.com',
            'role' => UserRole::ADMIN,
        ],
    ],

    /**
     * Seeded school admins
     * @return  Array of Admins to be created by UserFactory
     */
    'lms_school_admins' => [
        [
            'school_id' => 1,
            'username' => 'gyanoday',
            'first_name' => 'Gyanoday',
            'middle_name' => 'Public',
            'last_name' => 'School',
            'phone' => '+9162091113100',
            'email' => 'gyanodaypublicschool@educarestudy.in',
            'role' => UserRole::SITE_ADMIN,
        ],
    ],

    /**
     * Seeded school branch admins
     * @return  Array of Admins to be created by UserFactory
     */
    'lms_school_branch_admins' => [
        [
            'school_id' => 1,
            'username' => 'gyanoday2',
            'first_name' => 'Gyanoday2',
            'middle_name' => ' Public',
            'last_name' => 'School',
            'phone' => '+9162091113200',
            'email' => 'gyanoday2publicschool@educarestudy.in',
            'role' => UserRole::SITE_BRANCH_ADMIN,
        ],
    ],

    /**
     * Seeded teacher
     * @return  Array of Student to be created by UserFactory
     */
    'lms_school_office' => [
        [
            'school_id' => 1,
            'username' => 'gyanoday3',
            'first_name' => 'Gyanoday3',
            'middle_name' => 'Public',
            'last_name' => 'School',
            'phone' => '+9162091113600',
            'email' => 'office@educarestudy.in',
            'role' => UserRole::SITE_OFFICE,
        ],
    ],

    /**
     * Seeded teacher
     * @return  Array of Student to be created by UserFactory
     */
    'lms_teachers' => [
        [
            'school_id' => 1,
            'username' => 'titon',
            'first_name' => 'Titon',
            'middle_name' => 'Kumar',
            'last_name' => 'Das',
            'phone' => '+9162091113700',
            'email' => 'teacher@educarestudy.in',
            'role' => UserRole::SITE_TEACHER,
        ],
    ],

    /**
     * Seeded parents
     * @return  Array of Student to be created by UserFactory
     */
    'lms_parents' => [
        [
            'school_id' => 1,
            'username' => 'nitai',
            'first_name' => 'Nitai',
            'middle_name' => 'Kumar',
            'last_name' => 'Bosak',
            'phone' => '+9162091113800',
            'email' => 'parent1@educarestudy.in',
            'role' => UserRole::SITE_PARENT,
        ],
        [
            'school_id' => 1,
            'username' => 'John',
            'first_name' => 'John',
            'middle_name' => 'Michael',
            'last_name' => 'Smith',
            'phone' => '+9162091222',
            'email' => 'parent2@educarestudy.in',
            'role' => UserRole::SITE_PARENT,
        ],
        [
            'school_id' => 1,
            'username' => 'Emily',
            'first_name' => 'Emily',
            'middle_name' => 'Anne',
            'last_name' => 'Johnson',
            'phone' => '+916209114323',
            'email' => 'parent3@educarestudy.in',
            'role' => UserRole::SITE_PARENT,
        ],
    ],


    /**
     * Seeded students
     * @return  Array of Student to be created by UserFactory
     */
    'lms_students' => [
        [
            'school_id' => 1,
            'username' => 'Arjun',
            'first_name' => 'Arjun',
            'middle_name' => 'Kumar',
            'last_name' => 'Das',
            'phone' => '+9162091113900',
            'email' => 'student_arjun@educarestudy.in',
            'role' => UserRole::SITE_STUDENT,
        ],
        [
            'school_id' => 1,
            'username' => 'Ashish',
            'first_name' => 'Ashish',
            'middle_name' => 'Nehara',
            'last_name' => 'Pal',
            'phone' => '+9162091113901',
            'email' => 'student_ashish@educarestudy.in',
            'role' => UserRole::SITE_STUDENT,
        ],
        [
            'school_id' => 1,
            'username' => 'Sumir',
            'first_name' => 'Kumar',
            'middle_name' => 'Bishsas',
            'last_name' => '',
            'phone' => '+9162091113902',
            'email' => 'student_sumir@educarestudy.in',
            'role' => UserRole::SITE_STUDENT,
        ],
    ],
];
