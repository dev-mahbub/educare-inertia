import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";

export default function VoucherSettingForm({ vouchers, voucher }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const { data, setData, errors, put, reset, processing } = useForm({
        installment_no: voucher?.installment_no,
        title: voucher?.title,
        start_date: voucher?.start_date,
        end_date: voucher?.end_date,
        description: voucher?.description,
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            start_date: startDate ?? voucher?.start_date
        }))
    }, [startDate])

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            end_date: endDate ?? voucher?.end_date
        }))
    }, [endDate])


    const handleVoucherSettingData = (e) => {
        e.preventDefault();
        data.start_date = startDate ?? voucher?.start_date;
        data.end_date = endDate ?? voucher?.end_date;
        put(route("transport_voucher.update", voucher.id), data, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setStartDate(null);
                setEndDate(null);
            },
        });
    };
    const handleDelete = (id) => {
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
                router.delete(route("transport_voucher.destroy", id));
            }
        });
    };

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Voucher Installments
                                    <span>(Total : {vouchers?.length})</span>
                                </h5>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>SL No.</th>
                                            <th>Title</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vouchers?.length > 0 ? (
                                            vouchers?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>{item.title}</td>
                                                    <td>{moment(item?.start_date).format("DD MMM, YYYY")}</td>
                                                    <td>{moment(item?.end_date).format("DD MMM, YYYY")}</td>
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
                                                                            "transport_voucher.edit",
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
                                                                            handleDelete(
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
                                            ))
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
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Create Transport Voucher
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleVoucherSettingData}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="md:col-span-6 col-span-12">
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
                                                        value={
                                                            data.installment_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "installment_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        disabled
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.installment_no
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="md:col-span-6 col-span-12">
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
                                                    />
                                                    <InputError
                                                        message={errors.title}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="md:col-span-6 col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="start_date"
                                                                value="Start Date"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        selected={startDate}
                                                        value={data.start_date}
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
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="md:col-span-6 col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="end_date"
                                                                value="End Date"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        selected={endDate}
                                                        value={data.end_date}
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
                                                <div className="flex flex-wrap gap-2.5 mt-2">
                                                    <PrimaryButton className="educare-primary-btn-lg-fill">
                                                        Update
                                                    </PrimaryButton>
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
