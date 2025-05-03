import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

const Edit_InHouseForm = ({
    bookTypes = [],
    libraryVendor = [],
    bookCategory = [],
    classNames = [],
    subjects = []
}) => {
    const [listPopup, setListPopup] = useState(false);
    const handleListPopupClick = () => {
        setListPopup(!listPopup);
    };
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        acc_no: "",
        category_id: "",
        book_title: "",
        author: "",
        author_two: "",
        author_three: "",
        publish_place: "",
        classification_no: "",
        purchasing_date_at: new Date(),
        publisher_name: "",
        publish_year: "",
        isbn_number: "",
        class_name_id: "",
        subject_id: "",
        volume: "",
        edition: "",
        no_of_pages: "",
        language: "",
        price: "",
        book_entry_date_at: new Date(),
        description: "",
        bill_no: "",
        barcode: "",
        library_vendor_id: "",
        type_id: "",
    });

    const isFutureDate = (date) => {
        // Check if the given date is in the future
        return date.getTime() < new Date().getTime();
    };

    const handleFormDataInsert = (e) => {
        e.preventDefault();
        post(route("book.inhouse_save"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            }
        });
    };

    return (
        <>
            <form onSubmit={handleFormDataInsert}>
                <div className="educare-common-card-title">
                    <h5>
                        <i className="icon-BookBookmark"></i>
                        Inhouse Book Entry
                    </h5>
                </div>
                <div className="educare-common-card">
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-common-card-wrap-border">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="acc_no"
                                                    value="AccNo"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <TextInput
                                            id="acc_no"
                                            value={data.acc_no}
                                            onChange={(e) =>
                                                setData("acc_no", e.target.value)
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.acc_no}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="category_id"
                                            value="Book Category/Department"
                                        />
                                        <SelectInput
                                            id="category_id"
                                            data_label="Class"
                                            data={bookCategory}
                                            value={data.category_id}
                                            onChange={(e) =>
                                                setData(
                                                    "category_id",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.category_id
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="book_title"
                                                    value="Book Title"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <TextInput
                                            id="book_title"
                                            value={data.book_title}
                                            onChange={(e) =>
                                                setData(
                                                    "book_title",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.book_title}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="author"
                                            value="Author"
                                        />
                                        <TextInput
                                            id="author"
                                            value={data.author}
                                            onChange={(e) =>
                                                setData("author", e.target.value)
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.author}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-6  md:col-span-4 lg:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="author_two"
                                            value="Author 2"
                                        />
                                        <TextInput
                                            id="author_two"
                                            value={data.author_two}
                                            onChange={(e) =>
                                                setData(
                                                    "author_two",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.author_two}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-6  md:col-span-4 lg:col-span-2">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="author_three"
                                            value="Author 3"
                                        />
                                        <TextInput
                                            id="author_three"
                                            value={data.author_three}
                                            onChange={(e) =>
                                                setData(
                                                    "author_three",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.author_three}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 sm:col-span-6  md:col-span-4 lg:col-span-2">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="publish_place"
                                            value="Publish Place"
                                        />
                                        <TextInput
                                            id="publish_place"
                                            value={data.publish_place}
                                            onChange={(e) =>
                                                setData(
                                                    "publish_place",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.publish_place}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 sm:col-span-6  md:col-span-4 lg:col-span-2">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="classification_no"
                                            value="Classification No."
                                        />
                                        <TextInput
                                            id="classification_no"
                                            value={data.classification_no}
                                            onChange={(e) =>
                                                setData(
                                                    "classification_no",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.classification_no}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2">
                                    <div className="educare-input-field-styles">
                                        <InputLabel value="Purchasing Date" />
                                        <DatePicker
                                            selected={
                                                data.purchasing_date_at &&
                                                new Date(data.purchasing_date_at)
                                            }
                                            onChange={(date) =>
                                                setData("purchasing_date_at", date)
                                            }
                                            showYearDropdown
                                            showMonthDropdown
                                            useShortMonthInDropdown
                                            showPopperArrow={false}
                                            peekNextMonth
                                            dropdownMode="select"
                                            isClearable
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText=""
                                            className="w-full"
                                            filterDate={isFutureDate}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-6  md:col-span-4 lg:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="publisher_name"
                                            value="Publisher name"
                                        />
                                        <TextInput
                                            id="publisher_name"
                                            value={data.publisher_name}
                                            onChange={(e) =>
                                                setData("publisher_name", e.target.value)
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.publisher_name}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 sm:col-span-6  md:col-span-4 lg:col-span-2">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="publish_year"
                                            value="Publish Year"
                                        />
                                        <TextInput
                                            id="publish_year"
                                            value={data.publish_year}
                                            onChange={(e) =>
                                                setData(
                                                    "publish_year",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.publish_year}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 sm:col-span-6  md:col-span-4 lg:col-span-2">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="isbn_number"
                                            value="ISBN Number"
                                        />
                                        <TextInput
                                            id="isbn_number"
                                            value={data.isbn_number}
                                            onChange={(e) =>
                                                setData(
                                                    "isbn_number",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.isbn_number}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 sm:col-span-6  md:col-span-4 lg:col-span-2">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="class_name_id"
                                            value="Class"
                                        />
                                        <SelectInput
                                            id="class_name_id"
                                            data_label="Class"
                                            data={classNames}
                                            value={data.class_name_id}
                                            onChange={(e) =>
                                                setData(
                                                    "class_name_id",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.class_name_id}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 sm:col-span-6  md:col-span-4 lg:col-span-2">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="subject_id"
                                            value="Subject"
                                        />
                                        <SelectInput
                                            id="subject_id"
                                            data_label="Subject"
                                            data={subjects}
                                            value={data.subject_id}
                                            onChange={(e) =>
                                                setData(
                                                    "subject_id",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.subject_id}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="volume"
                                            value="Volume"
                                        />
                                        <TextInput
                                            id="volume"
                                            value={data.volume}
                                            onChange={(e) =>
                                                setData("volume", e.target.value)
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.volume}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="edition"
                                            value="Edition"
                                        />
                                        <TextInput
                                            id="edition"
                                            value={data.edition}
                                            onChange={(e) =>
                                                setData("edition", e.target.value)
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.edition}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="no_of_pages"
                                            value="No of Pages"
                                        />
                                        <TextInput
                                            id="no_of_pages"
                                            value={data.no_of_pages}
                                            onChange={(e) =>
                                                setData(
                                                    "no_of_pages",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                            type="number"
                                        />
                                        <InputError
                                            message={errors.no_of_pages}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="language"
                                            value="Language"
                                        />
                                        <TextInput
                                            id="language"
                                            value={data.language}
                                            onChange={(e) =>
                                                setData("language", e.target.value)
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.language}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2">
                                    <div className="educare-input-field-styles">
                                        <InputLabel htmlFor="price" value="Price" />
                                        <TextInput
                                            id="price"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData("price", e.target.value)
                                            }
                                            className="block"
                                            type="number"
                                        />
                                        <InputError
                                            message={errors.price}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="book_entry_date_at"
                                            value="Book Entry Date"
                                        />
                                        <DatePicker
                                            selected={
                                                data?.book_entry_date_at
                                                && new Date(
                                                    data?.book_entry_date_at
                                                )
                                            }
                                            onChange={(date) =>
                                                setData("book_entry_date_at", date)
                                            }
                                            showYearDropdown
                                            showMonthDropdown
                                            useShortMonthInDropdown
                                            showPopperArrow={false}
                                            peekNextMonth
                                            dropdownMode="select"
                                            isClearable
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="End date"
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="description"
                                            value="Book Description"
                                        />
                                        <TextareaInput
                                            id="description"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.description}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="bill_no"
                                            value="Bill No."
                                        />
                                        <TextInput
                                            id="bill_no"
                                            value={data.bill_no}
                                            onChange={(e) =>
                                                setData("bill_no", e.target.value)
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.bill_no}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="barcode"
                                            value="Barcode"
                                        />
                                        <TextInput
                                            id="barcode"
                                            value={data.barcode}
                                            onChange={(e) =>
                                                setData("barcode", e.target.value)
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.barcode}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="library_vendor_id"
                                            value="Source of Supply"
                                        />
                                        <SelectInput
                                            id="library_vendor_id"
                                            data_label="Source"
                                            data={libraryVendor}
                                            value={data.library_vendor_id}
                                            onChange={(e) =>
                                                setData(
                                                    "library_vendor_id",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.library_vendor_id}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="book_type"
                                            value="Book Type"
                                        />
                                        <SelectInput
                                            id="book_type"
                                            data_label="book type"
                                            data={bookTypes}
                                            value={data.type_id}
                                            onChange={(e) =>
                                                setData("type_id", e.target.value)
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.type_id}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2">
                                    <button
                                        type="button"
                                        disabled={processing}
                                        onClick={handleListPopupClick}
                                        className=" transition ease-in-out duration-150 md:mt-6 lg:mt-6  educare-success-btn-md-fill"
                                    >
                                        <i className="icon-PlusCircle"></i>
                                        Add Book Type
                                    </button>
                                </div>

                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                        <div className="educare-create-school-settings-list-check width-full">
                                            <Checkbox
                                                id="is_allocate_book_location"
                                                name="is_allocate_book_location"
                                                checked={data.is_allocate_book_location}
                                                onChange={(e) =>
                                                    setData(
                                                        "is_allocate_book_location",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="educare-create-school-settings-list-title width-full">
                                            <InputLabel
                                                htmlFor="is_allocate_book_location"
                                                value="Allocate book to location"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12">
                    <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                        <PrimaryButton onClick={() => reset()} disabled={processing} type="button" className="educare-gray-btn-lg-stroke">
                            Cancel
                        </PrimaryButton>
                        <PrimaryButton disabled={processing} type="submit" className="educare-primary-btn-lg-fill">
                            Save
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Edit_InHouseForm;
