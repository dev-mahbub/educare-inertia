<?php 

namespace App\Repositories;

interface IPageRepository
{
    public function getPageByType($type = 'About Us', $schoolId = null);
}