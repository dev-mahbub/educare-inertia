<?php

namespace App\Enums;

enum HostelStaffType: string
{
    case WARDEN = 'Warden';
    case SUPERVISOR = 'Supervisor';
    case COORDINATOR = 'Coordinator';
}
