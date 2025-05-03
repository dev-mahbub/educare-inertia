import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";

export default function EditFeeInstallmentForm({ fees = "", fee = "" }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [lastDate, setLastDate] = useState(new Date());

    const { data, setData, errors, put, reset, processing } = useForm({
        installment_no: fee.installment_no,
        title: fee.title,
        is_admission_install: fee.is_admission_install,
        description: fee.description,
        start_date_at: fee.start_date_at,
        end_date_at: fee.end_date_at,
        last_pay_date_at: fee.last_pay_date_at,
    });

    const handleFeeInstallmentUpdate = (e) => {
        e.preventDefault();

        data.start_date_at = startDate;
        data.end_date_at = endDate;
        data.last_pay_date_at = lastDate;

        put(route("fee.installment_update", fee.id), data, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    useEffect(() => {
        setStartDate(new Date(fee?.start_date_at));
        setEndDate(new Date(fee?.end_date_at));
        setLastDate(new Date(fee?.last_pay_date_at));
    }, [fee]);

    const handleFeeInstallmentDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("fee.installment_delete", id));
            }
        });
    };

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-12 xl:col-span-6  col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Fee Installments
                                    <span>(Total : {fees?.length})</span>
                                </h5>
                            </div>
                            <div className="educare-admission-list-area">
                                <div className="educare-admission-list-inner">
                                    <div className="educare-admission-list-inner-wrapper">
                                        <div className="educare-admission-list pb-none">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Title</th>
                                                        <th>Start Date</th>
                                                        <th>End Date</th>
                                                        <th>Last Pay Date</th>
                                                        <th>Fine Start Date</th>
                                                        <th>Late Fine Amount</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {fees?.length > 0 ? (
                                                        fees?.map(
                                                            (item, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        {
                                                                            item?.installment_no
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            item?.title
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            item?.start_date_at
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            item?.end_date_at
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            item?.last_pay_date_at
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            item?.fine_start_date
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            parseFloat(item?.late_fine_amount ?? 0)
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                                            <div>
                                                                                <Tooltip
                                                                                    title="Edit"
                                                                                    placement="top"
                                                                                    arrow
                                                                                >
                                                                                    <Link
                                                                                        href={route(
                                                                                            "fee.installment_edit",
                                                                                            item.id
                                                                                        )}
                                                                                        className="educare-warning-btn-sm-fill"
                                                                                    >
                                                                                        <i className="icon-editing"></i>
                                                                                    </Link>
                                                                                </Tooltip>
                                                                            </div>
                                                                            <div>
                                                                                <Tooltip
                                                                                    title="Delete"
                                                                                    placement="top"
                                                                                    arrow
                                                                                >
                                                                                    <button
                                                                                        className="educare-danger-btn-sm-fill"
                                                                                        onClick={() =>
                                                                                            handleFeeInstallmentDelete(
                                                                                                item.id
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        <i className="icon-TrashSimple"></i>
                                                                                    </button>
                                                                                </Tooltip>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )
                                                    ) : (
                                                        <tr>
                                                            <td
                                                                className="text-center text-red-500"
                                                                colSpan="7"
                                                            >
                                                                Data not found
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-12 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Add New Installment
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleFeeInstallmentUpdate}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 md:col-span-4">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="installment_no"
                                                                value="Installment No"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="installment_no"
                                                        disabled
                                                        value={
                                                            data.installment_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "installment_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block cursor-not-allowed"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.installment_no
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-8">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="title"
                                                                value="Title"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="title"
                                                        value={data.title}
                                                        onChange={(e) =>
                                                            setData(
                                                                "title",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        placeHolder="eg:JAN-2015"
                                                    />
                                                    <InputError
                                                        message={errors.title}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="start_date_at"
                                                                value="Start Date"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        selected={startDate}
                                                        onChange={(date) =>
                                                            setStartDate(date)
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="Start date"
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="end_date_at"
                                                                value="End Date"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        selected={endDate}
                                                        onChange={(date) =>
                                                            setEndDate(date)
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
                                            <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="last_pay_date_at"
                                                                value="Last Pay Date"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        selected={lastDate}
                                                        onChange={(date) =>
                                                            setLastDate(date)
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="Last Pay date"
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="description"
                                                        value="Description"
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
                                                        message={
                                                            errors.description
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="translate-y-[-1px] inline-block">
                                                        <Checkbox
                                                            id="is_admission_installment"
                                                            name="is_admission_installment"
                                                            checked={
                                                                data.is_admission_install
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_admission_install",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="is_admission_install"
                                                            value="Is Admission Installment"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-2.5 mt-2">
                                                    <PrimaryButton
                                                        type="submit"
                                                        disabled={processing}
                                                        className="educare-primary-btn-lg-fill"
                                                    >
                                                        Update
                                                    </PrimaryButton>
                                                    <Link
                                                        href={route(
                                                            "fee.installment"
                                                        )}
                                                        className="educare-gray-btn-lg-stroke"
                                                    >
                                                        {" "}
                                                        Cancel
                                                    </Link>
                                                    {/* <PrimaryButton
                                                        type="button"
                                                        className="educare-gray-btn-lg-stroke"
                                                    >
                                                        Reset
                                                    </PrimaryButton> */}
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
