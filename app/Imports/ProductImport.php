<?php

namespace App\Imports;

use App\Enums\Status;
use Illuminate\Support\Collection;
use App\Repositories\ProductRepository;
use App\Repositories\CategoryRepository;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProductImport implements ToCollection, WithHeadingRow
{
    protected $validationErrors = [];
    protected $productRepository;
    protected $categoryRepository;

    public function __construct()
    {
        $this->productRepository = new ProductRepository;
        $this->categoryRepository = new CategoryRepository;
    }

    /**
     * @param Collection $rows
     */
    public function collection(Collection $rows)
    {
        // filter empty rows
        $rows = $rows->filter(function ($row) {
            return !empty(array_filter($row->toArray()));
        });

        if ($rows->count() > 0 && $rows->count() <= 500) {
            foreach ($rows as $row) {
                // Validate the row
                $validator = Validator::make($row->toArray(), [
                    'group' => 'required',
                    'product_name' => 'required',
                ]);

                // Check if validation fails for the current row
                if ($validator->fails()) {
                    // Store validation errors
                    $this->validationErrors['import_file'] = "File mandatory fields cannot not be empty and data should be in valid format.";
                    continue; // Skip processing this row and move to the next one
                }

                $group = $this->categoryRepository->getProductCategoryByTitle($row['group']);

                if ($group == null) {
                    // Store validation errors
                    $failedGroups[] = $row['group'];

                    // Store validation errors
                    $this->validationErrors['import_file'] = "These groups (" . implode(', ', $failedGroups) . ") do not exists.";

                    continue; // Skip processing this row and move to the next one
                }

                if ($group != null) {
                    $dataArray = [
                        'school_id' => getUserSchoolId(),
                        'category_id' => $group->id,
                        'title' => $row['product_name'] ?? 0,
                        'opening_stock' => $row['quantity'] ?? 0,
                        'available_stock' => $row['quantity'] ?? 0,
                        'rate_per_product' => $row['price'] ?? 0,
                        'gst_tax' => $row['tax_percentage'] ?? 0,
                        'product_code' => $row['product_code'] ?? null,
                        'product_size' => $row['product_size'] ?? null,
                        'type' => $row['type'] ?? null,
                        'purchase_date_at' => date('y-m-d'),
                        'purchased_by' => auth()->user()->id,
                        'status' => Status::ACTIVE->value,
                    ];

                    $this->productRepository->create($dataArray);
                }
            }
        } else if ($rows->count() > 500) {
            $this->validationErrors['import_file'] = "Only 500 records are accepted in the list at a time";
        } else {
            $this->validationErrors['import_file'] = "File cannot be empty.";
        }

        if (!empty($this->validationErrors)) {
            return $this->validationErrors;
        }
    }

    /**
     * Get the validation errors encountered during import.
     *
     * @return array
     */
    public function getValidationErrors()
    {
        return $this->validationErrors;
    }
}
