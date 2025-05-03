<?php

namespace App\Repositories;

interface IInvoiceRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getRegisterAll();
    public function getInvoiceById(int $id, int $schoolId = null);
    public function getNextInvoiceNo(int $schoolId = null);
    public function getDueServiceInvoices(int $schoolId = null);
    public function getPaidServiceInvoices(int $schoolId = null);
    public function getDueInvoicesByIds(array $ids, int $schoolId = null);
}
