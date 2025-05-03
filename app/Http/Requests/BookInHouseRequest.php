<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookInHouseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'school_id' => ['nullable', 'integer'],
            'category_id' => ['nullable', 'integer'],
            'class_name_id' => ['nullable', 'integer'],
            'subject_id' => ['nullable', 'integer'],
            'book_title' => ['required', 'string'],
            'acc_no' => ['required', 'string'],
            'author' => ['nullable', 'string'],
            'quantity' => ['nullable', 'numeric'],
            'price' => ['nullable', 'numeric'],
            'type' => ['nullable', 'string'],
            // in house
            'type_id' => ['nullable', 'integer'],
            'library_vendor_id' => ['nullable', 'integer'],
            'author_two' => ['nullable', 'string'],
            'author_three' => ['nullable', 'string'],
            'publish_place' => ['nullable', 'string'],
            'classification_no' => ['nullable', 'string'],
            'purchasing_date_at' => ['nullable', 'date'],
            'publisher_name' => ['nullable', 'string'],
            'publish_year' => ['nullable', 'string'],
            'isbn_number' => ['nullable', 'string'],
            'volume' => ['nullable', 'string'],
            'edition' => ['nullable', 'string'],
            'no_of_pages' => ['nullable', 'numeric'],
            'language' => ['nullable', 'string'],
            'book_entry_date_at' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'bill_no' => ['nullable', 'string'],
            'barcode' => ['nullable', 'string'],
            'is_allocate_book_location' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string'],
        ];
    }
}
