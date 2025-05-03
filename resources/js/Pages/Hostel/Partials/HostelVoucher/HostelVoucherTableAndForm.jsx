import React, { useEffect, useState } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import Checkbox from "@/Components/Checkbox";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import DatePicker from "react-datepicker";
import TextareaInput from "@/Components/TextareaInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { Tooltip } from "@mui/material";
import Swal from "sweetalert2";
const HostelVoucherTableAndForm = ({
    hostelVoucherSetting = [],
    hostelVoucher = [],
    installmentNo,
}) => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        id: "",
        hostel_voucher_fee: "",
        fee_as_voucher: hostelVoucherSetting?.hostel_voucher_fee === 'hostel_fee_as_voucher' ? true : false,
        fee_as_structure: hostelVoucherSetting?.hostel_voucher_fee === 'hostel_fee_as_fee_structure' ? true : false,
        title: "",
        start_date_at: "",
        end_date_at: "",
        description: "",
        installment_no: installmentNo,
    });

    const handleFeeAsVoucherChange = (e) => {
        if (e.target.checked) {
            setData({
                ...data,
                fee_as_structure: false,
                fee_as_voucher: true,
            })
        }
    };

    const handleFeeAsStructureChange = (e) => {
        if (e.target.checked) {
            setData({
                ...data,
                fee_as_structure: true,
                fee_as_voucher: false,
            })
        }
    };

    const handelChecked = (type, key, value) => {
        const sendData = { type, key, value }
        router.post(route('account_setting_create_update'), sendData);
    }

    const handleFormDataInsert = (e) => {
        e.preventDefault();
        post(route("hostel.voucher_save"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    const handleDelete = (e, id) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('hostel.voucher_destroy', id));
            }
        });
    }

    const handleEditData = (e, item) => {
        e.preventDefault();
        setData({
            ...data,
            id: item?.id,
            title: item?.title,
            start_date_at: item?.start_date_at,
            end_date_at: item?.end_date_at,
            description: item?.description,
            installment_no: item?.id,
        });
    }

    useEffect(() => {
        setData({
            ...data,
            fee_as_voucher: hostelVoucherSetting?.hostel_voucher_fee === 'hostel_fee_as_voucher' ? true : false,
            fee_as_structure: hostelVoucherSetting?.hostel_voucher_fee === 'hostel_fee_as_fee_structure' ? true : false,
            installment_no: installmentNo,
        })
    }, [hostelVoucherSetting])

    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <div className="bg-white/70  shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg">
                        <div className="educare-card-title mr-auto pb-none mb-2.5">
                            <h5>
                                <i className="icon-GlobeHemisphereWest"></i>
                                Hostel Voucher Setting
                            </h5>
                        </div>
                        <div className="flex justify-between items-center mb-2.5 educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                            <div>
                                <div className="educare-checkbox-field-styles">
                                    <InputLabel
                                        htmlFor="fee_as_structure"
                                        value="Create hostel fee as fee structure  ?"
                                    />
                                    <Checkbox
                                        name="fee_as_structure"
                                        checked={data?.fee_as_structure}
                                        onChange={handleFeeAsStructureChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="educare-checkbox-field-styles">
                                    <button
                                        className="educare-primary-btn-md-stroke"
                                        type="button"
                                        onClick={() => handelChecked('Hostel', 'hostel_voucher_fee', 'hostel_fee_as_fee_structure')}
                                        disabled={processing}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="educare-checkbox-field-styles">
                                    <InputLabel
                                        htmlFor="fee_as_voucher"
                                        value="Create hostel fee as voucher ?"
                                    />
                                    <Checkbox
                                        name="fee_as_voucher"
                                        checked={data?.fee_as_voucher}
                                        onChange={handleFeeAsVoucherChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="educare-checkbox-field-styles">
                                    <button
                                        className="educare-primary-btn-md-stroke"
                                        type="button"
                                        onClick={() => handelChecked('Hostel', 'hostel_voucher_fee', 'hostel_fee_as_voucher')}
                                        disabled={processing}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* form */}

                    {data?.fee_as_voucher === true && (
                        <div className="bg-white/70 mt-5 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                            <h5 className="text-[16px] text-headingLight font-primary mb-3 font-semibold">
                                Create Hostel Voucher
                            </h5>
                            <form
                                onSubmit={handleFormDataInsert}
                                className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5"
                            >
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12 md:col-span-6">
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
                                                value={data.installment_no}
                                                className="block disabled"
                                                disabled
                                            />
                                            <InputError
                                                message={errors.installment_no}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
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
                                    <div className="col-span-12 md:col-span-6">
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
                                                selected={
                                                    data?.start_date_at
                                                    && new Date(
                                                        data?.start_date_at
                                                    )
                                                }
                                                onChange={(date) =>
                                                    setData("start_date_at", date)
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
                                            <InputError
                                                message={errors.start_date_at}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
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
                                                selected={
                                                    data?.end_date_at
                                                    && new Date(
                                                        data?.end_date_at
                                                    )
                                                }
                                                onChange={(date) =>
                                                    setData("end_date_at", date)
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
                                            <InputError
                                                message={errors.end_date_at}
                                                className="mt-2"
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
                                                message={errors.description}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 mt-5">
                                    <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                        <PrimaryButton type="button" disabled={processing} className="educare-gray-btn-lg-stroke">
                                            Reset
                                        </PrimaryButton>
                                        <PrimaryButton type="submit" disabled={processing} className="educare-primary-btn-lg-fill">
                                            Save
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    {/*end form */}
                </div>
                {data?.fee_as_voucher === true && (
                    <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                        <div className="educare-card-title mr-auto pb-none mb-2.5">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Voucher Installments
                            </h5>
                        </div>

                        <div className="educare-default-table xs:overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr.</th>
                                        <th>Title</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hostelVoucher?.length > 0 ?
                                        hostelVoucher?.map((item, index) => (
                                            <tr className={`${data.id === item?.id ? 'educare-table-row-active' : ''}`} key={index}>
                                                <td>{++index}</td>
                                                <td>{item?.title}</td>
                                                <td>{item?.start_date_at}</td>
                                                <td>{item?.end_date_at}</td>
                                                <td>
                                                    <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                        <div>
                                                            <Tooltip
                                                                title="Edit"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    onClick={(e) => handleEditData(e, item)}
                                                                    type="button"
                                                                    className="educare-warning-btn-sm-fill"
                                                                >
                                                                    <i className="icon-editing"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                        <div>
                                                            <Tooltip
                                                                title="Delete"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="educare-danger-btn-sm-fill"
                                                                    as="button"
                                                                    onClick={(e) => handleDelete(e, item?.id)}
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="12">Data not found</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default HostelVoucherTableAndForm;
