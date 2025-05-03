import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import DatePicker from "react-datepicker";

const DailyCollectionFilterForm = ({
    feeTypesEnum = [],
    classNames = [],
    classrooms = [],
    paymentModes = [],
    totalReportCount,
    setLoading,
    setDailyFeePaymentReportsData,
    setTotalPaidByPaymentModeData,
    setTotalPaidByAdminData,
    setParams
}) => {

    const dummySelectOneInput = useRef();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [filteredClassrooms, setFilteredClassrooms] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        concession: false,
        current_session: false,
        cancelled_fee: false,
        exclude_emp_ward: false,
        exclude_voucher_fee: false,
        fee_type: "",
        payment_mode: "",
        class_name_id: "",
        classroom_id: "",
        start_date: "",
        end_date: "",
    });

    useEffect(() => {
        setParams({
            concession: data?.concession ?? false,
            current_session: data?.current_session ?? false,
            cancelled_fee: data?.cancelled_fee ?? false,
            exclude_emp_ward: data?.exclude_emp_ward ?? false,
            exclude_voucher_fee: data?.exclude_voucher_fee ?? false,
            fee_type: data?.fee_type ?? "",
            payment_mode: data?.payment_mode ?? "",
            class_name_id: data?.class_name_id ?? "",
            classroom_id: data?.classroom_id ?? "",
            start_date: data?.start_date ?? "",
            end_date: data?.end_date ?? "",
        });
    }, [data]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            start_date: startDate
        }));
    },[startDate]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            end_date: endDate
        }));
    },[endDate]);


    // handle class change start
    const handleClassNameChange = (e) => {
        const class_name_id = e.target.value;

        setFilteredClassrooms(classrooms?.filter(item => item?.class_name_id == class_name_id));

        setData((prevData) => ({
            ...prevData,
            class_name_id: class_name_id,
            classroom_id: "",
        }))
    }
    // handle class change end


    const handleReset = () => {
        setStartDate(new Date());
        setEndDate(new Date());
        setDailyFeePaymentReportsData([]);
        setTotalPaidByPaymentModeData([]);
        setTotalPaidByAdminData([]);
        reset();
    }


    // handle filter data start
        const handleFilterData = (e) => {
            e.preventDefault();

            setLoading(false);

            router.post(route('fee_report.daily_collection'), data);
        }
    // handle filter data end


    return (


        <div className="educare-common-card">
            <div className="bg-white/50 shadow-[0_1px_2px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <div className="educare-common-card-wrap-border">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12">
                            <div className="flex flex-wrap gap-2.5 items-center justify-between">
                                <div>
                                    <span className="h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA">Total: {totalReportCount}</span>
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                            <Checkbox
                                                id="concession"
                                                name="concession"
                                                checked={
                                                    data.concession
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "concession",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="educare-create-school-settings-list-title width-full">
                                            <InputLabel
                                                htmlFor="concession"
                                                value="Concession"
                                            />
                                        </div>
                                    </div>
                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                        <div className="educare-create-school-settings-list-check width-full">
                                            <Checkbox
                                                id="current_session"
                                                name="current_session"
                                                checked={
                                                    data.current_session
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "current_session",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="educare-create-school-settings-list-title width-full">
                                            <InputLabel
                                                htmlFor="current_session"
                                                value="Current Session"
                                            />
                                        </div>
                                    </div>
                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                        <div className="educare-create-school-settings-list-check width-full">
                                            <Checkbox
                                                id="cancelled_fee"
                                                name="cancelled_fee"
                                                checked={
                                                    data.cancelled_fee
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "cancelled_fee",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="educare-create-school-settings-list-title width-full">
                                            <InputLabel
                                                htmlFor="cancelled_fee"
                                                value="Cancelled Fee"
                                            />
                                        </div>
                                    </div>
                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                        <div className="educare-create-school-settings-list-check width-full">
                                            <Checkbox
                                                id="exclude_emp_ward"
                                                name="exclude_emp_ward"
                                                checked={
                                                    data.exclude_emp_ward
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "exclude_emp_ward",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="educare-create-school-settings-list-title width-full">
                                            <InputLabel
                                                htmlFor="exclude_emp_ward"
                                                value="Exclude Emp Ward"
                                            />
                                        </div>
                                    </div>
                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                        <div className="educare-create-school-settings-list-check width-full">
                                            <Checkbox
                                                id="exclude_voucher_fee"
                                                name="exclude_voucher_fee"
                                                checked={
                                                    data.exclude_voucher_fee
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "exclude_voucher_fee",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="educare-create-school-settings-list-title width-full">
                                            <InputLabel
                                                htmlFor="exclude_voucher_fee"
                                                value=" Exclude Voucher Fee"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="grid grid-cols-12 gap-3">
                                <div className="col-span-12 lg:col-span-2 md:col-span-3 sm:col-span-3">
                                    <div className="educare-input-field-styles">
                                        <SelectInput
                                            id="fee_type"
                                            data_label="Type"
                                            data={feeTypesEnum}
                                            ref={
                                                dummySelectOneInput
                                            }
                                            value={
                                                data.fee_type
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "fee_type",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.fee_type
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-3 md:col-span-6 sm:col-span-6">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="educare-input-field-styles">
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
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
                                        <div className="educare-input-field-styles">
                                            <DatePicker
                                                selected={endDate}
                                                onChange={(date) => setEndDate(date)}
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
                                </div>
                                <div className="col-span-12 lg:col-span-2 md:col-span-3 sm:col-span-3">
                                    <div className="educare-input-field-styles">
                                        <SelectInput
                                            id="payment_mode"
                                            data_label="Mode"
                                            data={paymentModes}
                                            ref={
                                                dummySelectOneInput
                                            }
                                            value={
                                                data.payment_mode
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "payment_mode",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.payment_mode
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-2 md:col-span-3 sm:col-span-3">
                                    <div className="educare-input-field-styles">
                                        <SelectInput
                                            id="class_name_id"
                                            data_label="Class"
                                            data={classNames}
                                            ref={
                                                dummySelectOneInput
                                            }
                                            value={
                                                data.class_name_id
                                            }
                                            onChange={(e) =>
                                                handleClassNameChange(e)
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.class_name_id
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-2 md:col-span-3 sm:col-span-3">
                                    <div className="educare-input-field-styles">
                                        <SelectInput
                                            id="classroom_id"
                                            data_label="Section"
                                            data={filteredClassrooms}
                                            ref={
                                                dummySelectOneInput
                                            }
                                            value={
                                                data.classroom_id
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "classroom_id",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.classroom_id
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-1 lg:col-span-2 md:col-span-3 sm:col-span-4">
                                    <div className='flex flex-wrap gap-2 educare-filter-action-btn'>
                                        <div>
                                            <Tooltip
                                                title="Search"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <button
                                                    type="button"
                                                    className="educare-secondary-btn-md-fill"
                                                    onClick={(e) => {
                                                        handleFilterData(e)
                                                    }}
                                                >
                                                    <i className="icon-search-interface-symbol"></i>
                                                </button>
                                            </Tooltip>
                                        </div>
                                        <div>
                                            <Tooltip
                                                title="Reset"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <button
                                                    type="button"
                                                    className="educare-gray-btn-md-fill"
                                                    onClick={() => {
                                                        handleReset()
                                                    }}
                                                >
                                                    <i className="icon-ArrowsClockwise"></i>
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyCollectionFilterForm;
