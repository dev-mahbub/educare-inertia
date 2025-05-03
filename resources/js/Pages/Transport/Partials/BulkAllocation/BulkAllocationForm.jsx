import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { useForm, router } from "@inertiajs/react";
import { useEffect, useState } from 'react';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import { Tooltip } from "@mui/material";
import CheckboxA from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const BulkAllocationForm = ({
    availableSeats,
    classrooms,
    students,
    vouchers,
    routes,
    transportTypeArr,
    amountPrice,
    stoppages,
    transportFeeStructureSetting,
}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        allocate_type_for: "Student",
        classroom_id: 1000, // false value for validate
        student_id: 1000, // false value for validate
        voucher_id: "",
        transport_type: "",
        transport_route_id: "",
        amount: "",
        applied_on_date_at: new Date(),
        start_from_date: new Date(),
        student_ids: [],
        available_seats: "",
        total_seats: "",
        transport_stoppage_id: "",
    });

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [stoppageData, setStoppageData] = useState([]);
    const [filteredVouchers, setFilteredVouchers] = useState([]);

    const handleSelectChange = (event, value) => {
        setSelectedOptions(value);
        setData({
            ...data,
            student_ids: value,
        })
    };

    const handleRemoveOption = (optionToRemove) => {
        setSelectedOptions((prevSelectedOptions) =>
            prevSelectedOptions.filter((option) => option !== optionToRemove)
        );
    };

    // const handleClassroom = (classroomId) => {
        
    //     const form_data = {
    //         classroom_id: classroomId,
    //     };
    //     router.post(route("transport.allocation_bulk"), form_data);
    // };

    const bulkAllocateData = (e) => {
        e.preventDefault();
        post(route("transport.allocation_bulk_save"), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                setSelectedOptions([])
            },
        });
    };

    const handleStoppage = (stoppageId) => {
        const amountStoppage = stoppages?.find(item3 => item3?.id == stoppageId);
        setData({
            ...data,
            transport_stoppage_id: stoppageId,
            amount: amountStoppage?.pick_drop_price,
            transport_type: 'Pick & Drop',
        })
    }

    const handleAvailableSeats = (routeId) => {
        const availableData = availableSeats?.find((item) => item?.transport_route_id == routeId);
        setData(
            {
                ...data,
                transport_route_id: routeId,
                available_seats: availableData?.available_seats,
                total_seats: availableData?.total_seat,
                transport_stoppage_id: "",
                amount: "",
                transport_type: "",
            }
        );
        setStoppageData(stoppages?.filter((item2) => item2?.transport_route_id == routeId));
    }

    const handelPickAmount = (value) => {

        const amountStoppage = stoppages?.find(item3 => item3?.id == data?.transport_stoppage_id);

        console.log('amountStoppage', amountStoppage);

        if (value == 'Pickup') {
            setData({
                ...data,
                'transport_type': value,
                'amount': amountStoppage?.pick_price,
            })
        } else if (value == 'Drop') {
            setData({
                ...data,
                'transport_type': value,
                'amount': amountStoppage?.drop_price,
            })
        } else if (value == 'Pick & Drop') {
            setData({
                ...data,
                'transport_type': value,
                'amount': amountStoppage?.pick_drop_price,
            })
        }
    }

    useEffect(() => {
        if (transportFeeStructureSetting?.value == 'fee') {
            setFilteredVouchers(vouchers);
            // setFilteredVouchers(vouchers?.filter(item => {
            //     const hasPayment = item?.payment?.some(payment => {
            //         return payment?.payment_status != 'Cancelled';
            //     });
    
            //     return !hasPayment;
            // }));
        }
        else if (transportFeeStructureSetting?.value == 'voucher') {
            setFilteredVouchers(vouchers)
            // setFilteredVouchers(vouchers?.filter(item => {
            //     if (
            //         item?.payment == null ||
            //         (
            //             item?.payment != null &&
            //             (item?.payment?.payment_status == 'Cancelled')
            //         )
            //     ) {
            //         return true;
            //     }
            //     else {
            //         return false;
            //     }
            // }));
        }
    }, [vouchers])


    

    console.log('data', data);
    console.log('stoppages', stoppages);

    return (
        <>
            <div className="educare-common-card">
                <form onSubmit={bulkAllocateData}>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="xl:col-span-7 col-span-12">

                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                                <div>
                                    <div className="flex flex-wrap justify-between items-center pb-1 mb-3 border-b border-grayLight/20 gap-5">
                                        <h5 className="text-[16px] font-semibold text-headingLight">
                                            Route Details
                                        </h5>
                                        {data.transport_route_id ? (
                                            <span className="badge warning">
                                                Available Seats {data?.available_seats} out of {data?.total_seats}
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="transport_route_id"
                                                            value="Route"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <SelectInput
                                                    id="transport_route_id"
                                                    data_label="Type"
                                                    data={routes}
                                                    value={
                                                        data.transport_route_id
                                                    }
                                                    onChange={(e) => handleAvailableSeats(e.target.value)}
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.transport_route_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        {data.transport_route_id ? (
                                            <>
                                                <div className="col-span-12 md:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="transport_stoppage_id"
                                                                    value="Stoppage"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <SelectInput
                                                            id="transport_stoppage_id"
                                                            data_label="stoppage"
                                                            data={stoppageData}
                                                            value={
                                                                data.transport_stoppage_id
                                                            }
                                                            onChange={(e) =>
                                                                handleStoppage(e.target.value)
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.transport_stoppage_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-12 mt-3">
                                                    <div className="grid grid-cols-12 gap-5">

                                                        <div className="col-span-12 md:col-span-6 sm:col-span-6">
                                                            <div className="educare-input-field-styles">
                                                                <InputLabel
                                                                    htmlFor="transport_type"
                                                                    value="Transport Type"
                                                                />
                                                                <SelectInput
                                                                    id="transport_type"
                                                                    data_label="Type"
                                                                    data={transportTypeArr}
                                                                    value={
                                                                        data.transport_type
                                                                    }
                                                                    onChange={(e) => {
                                                                        handelPickAmount(e.target.value);
                                                                    }
                                                                    }
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.transport_type
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-12 md:col-span-6 sm:col-span-6">
                                                            <div className="educare-input-field-styles">
                                                                <InputLabel value="Amount" />
                                                                <TextInput
                                                                    id="amount"
                                                                    value={
                                                                        data.amount
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "amount",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    type="number"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.amount
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-wrap justify-between items-center pt-4 pb-1 mb-3 border-b border-grayLight/20 gap-5">
                                        <h5 className="text-[16px] font-semibold text-headingLight">
                                            Payment Details
                                        </h5>
                                    </div>
                                    <div className="grid grid-cols-12 gap-5">       
                                        <div className="col-span-12 lg:col-span-4 md:col-span-4 sm:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="allocate_from"
                                                            value="Allocate From"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <SelectInput
                                                    id="voucher_id"
                                                    data_label="From"
                                                    data={filteredVouchers}
                                                    value={
                                                        data.voucher_id
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "voucher_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.voucher_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 lg:col-span-4 md:col-span-6 sm:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel value="Applied On" />
                                                <DatePicker
                                                    selected={data?.applied_on_date_at && new Date(data?.applied_on_date_at)}
                                                    onChange={(date) =>
                                                        setData(
                                                            "applied_on_date_at",
                                                            date
                                                        )
                                                    }
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Select Date"
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 lg:col-span-4 md:col-span-6 sm:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel value="Starts From" />
                                                <DatePicker
                                                    selected={data?.start_from_date && new Date(data?.start_from_date)}
                                                    onChange={(date) =>
                                                        setData(
                                                            "start_from_date",
                                                            date
                                                        )
                                                    }
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Start From"
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-wrap justify-between items-center pt-4 pb-1 mb-3 border-b border-grayLight/20 gap-5">
                                        <h5 className="text-[16px] font-semibold text-headingLight">
                                            Students Details
                                        </h5>
                                    </div>
                                    
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 md:col-span-8 sm:col-span-12">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-type-file-styles hide-educare-autocomplete-options">
                                                    <Autocomplete
                                                        multiple
                                                        id="checkboxes-tags-demo1"
                                                        options={students}
                                                        disableCloseOnSelect
                                                        getOptionLabel={(option) => option.title}
                                                        value={selectedOptions}
                                                        onChange={handleSelectChange}
                                                        renderOption={(props, option, { selected }) => (
                                                            <li {...props}>
                                                                <CheckboxA
                                                                    icon={icon}
                                                                    checkedIcon={checkedIcon}
                                                                    style={{ marginRight: 8 }}
                                                                    checked={selected}
                                                                />
                                                                {option.title}
                                                            </li>
                                                        )}
                                                        renderInput={(params) => <TextField {...params} placeholder="Students" />}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="xl:col-span-5 col-span-12">
                            <div className="educare-classroom-table-wrapper">
                                <div className="educare-card-title flex justify-between flex-wrap gap-2.5">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Selected Students
                                    </h5>
                                    <div>
                                        <button
                                            className="educare-primary-btn-md-fill"
                                            type="submit"
                                            disabled={processing}
                                        >
                                            Add Transport To Students
                                        </button>
                                    </div>
                                </div>
                                <div className="educare-default-table xs:overflow-x-auto">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Student Name</th>
                                                <th>Adm No</th>
                                                <th>Class</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {selectedOptions.map((option, index) => (
                                                <tr key={index}>
                                                    <td>{option?.title}</td>
                                                    <td>{option?.admission_no}</td>
                                                    <td>{option?.classroom_title}</td>
                                                    <td>
                                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                            <div>
                                                                <button
                                                                    className="educare-danger-btn-sm-fill"
                                                                    type="button"
                                                                    onClick={() => handleRemoveOption(option)}
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default BulkAllocationForm;
