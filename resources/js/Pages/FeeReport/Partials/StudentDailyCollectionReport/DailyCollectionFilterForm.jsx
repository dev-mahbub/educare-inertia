import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import DatePicker from "react-datepicker";

const DailyCollectionFilterForm = ({
    paymentModes = [],
    totalReportCount,
    setLoading,
    setDailyFeePaymentReportsData,
    setTotalPaidByPaymentModeData,
    setTotalPaidByAdminData,
    setParams
}) => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

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
        start_date: "",
        end_date: "",
        payment_mode: "",
    });

    useEffect(() => {
        setParams({
            concession: data?.concession ?? false,
            current_session: data?.current_session ?? false,
            cancelled_fee: data?.cancelled_fee ?? false,
            exclude_emp_ward: data?.exclude_emp_ward ?? false,
            exclude_voucher_fee: data?.exclude_voucher_fee ?? false,
            payment_mode: data?.payment_mode ?? "",
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

            router.post(route('fee_report.teacher.student_daily_collection_report'), data);
        }
    // handle filter data end

// console.log(data);
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
                            <div className="flex flex-wrap gap-2.5 mt-2.5 lg:justify-end">
                                <div>
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
                                </div>
                                <div>
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
                                <div>
                                    <div className="educare-input-field-styles">
                                        <SelectInput
                                            id="payment_mode"
                                            data_label="Mode"
                                            data={paymentModes}
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
                                <div>
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
