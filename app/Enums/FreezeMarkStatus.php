<?php
namespace App\Enums;

enum FreezeMarkStatus: string
{
    case FREEZE = 'Freeze';
    case UNFREEZE = 'UnFreeze';
    case ACTIVE = 'Active';
    
}
