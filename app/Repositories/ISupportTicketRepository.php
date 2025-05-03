<?php 

namespace App\Repositories;

interface ISupportTicketRepository
{
    // public function getRegisterAll();
    public function getActiveAllWithFilter(string $request_type = "", int $assign_to = null, string $month = "", string $start_date = "", string $end_date = "", string $solution_status = "");
    public function getCurrentSupportTicket(int $id);
    public function getActiveAllByRequestType(string $request_type);
}