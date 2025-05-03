import InputError from '@/Components/InputError';
import RadioInput from '@/Components/RadioInput';
import SelectInput from '@/Components/SelectInput';
import { router, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DateWiseClassSummaryFilter = ({
    fees = [],
    setLoading,
    setFeeCollectionSummaryData,
    setParams
}) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [filteredToFees, setFilteredToFees] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        filter_type: "date_wise",
        from_fee_id: "",
        to_fee_id: "",
        start_date: "",
        end_date: "",
    });


    useEffect(() => {
        setParams({
            filter_type: data?.filter_type ?? "date_wise",
            from_fee_id: data?.from_fee_id ?? "",
            to_fee_id: data?.to_fee_id ?? "",
            start_date: data?.start_date ?? "",
            end_date: data?.end_date ?? "",
        });
    }, [data]);


    // handle form data start
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            start_date: startDate
        }));
    }, [startDate]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            end_date: endDate
        }));
    }, [endDate]);
    // handle form data start



    // handle filter type change start
    const handleFilterTypeChange = (value) => {
        setFeeCollectionSummaryData([]);
        setFilteredToFees([]);
        setStartDate("");
        setEndDate("");
        setLoading(false);

        setData((prevData) => ({
            ...prevData,
            filter_type: value,
            from_fee_id: "",
            to_fee_id: "",
        }));
    }
    // handle filter type change end


    // handle from fee change start
    const handleFromFeeChange = (e) => {
        const from_fee_id = e.target.value;

        setFilteredToFees(fees?.filter(item => item?.id >= from_fee_id));

        setData((prevData) => ({
            ...prevData,
            from_fee_id: from_fee_id,
            to_fee_id: "",
        }))
    }
    // handle from fee change end

    // handle reset form and data start
    const handleReset = () => {
        setFeeCollectionSummaryData([]);
        setFilteredToFees([]);
        setStartDate("")
        setEndDate("")
        setLoading(false);

        setData((prevData) => ({
            ...prevData,
            filter_type: "date_wise",
            from_fee_id: "",
            to_fee_id: "",
        }))
    }
    // handle reset form and data end


    // handle filter fee colection start
    const handleFilterFeeCollection = (e) => {
        e.preventDefault();

        if (data?.filter_type === 'date_wise' && ((data?.start_date === "" || data?.start_date === null) || (data?.end_date === "" || data?.end_date === null))) {
            toast.error("Please select start date and end date.", {
                position: 'top-right',
                autoClose: 1500,
            })
        }
        else if (data?.filter_type === 'installment_wise' && (data?.from_fee_id === "" || data?.to_fee_id === "")) {
            toast.error("Please select from installment and to installment.", {
                position: 'top-right',
                autoClose: 1500,
            })
        }
        else {
            setLoading(false)

            router.post(route('fee_report.date_wise_class_summary'), data)
        }
    }
    // handle filter fee colection end


    const CommonHeaderFilterTopData = (e) => {
        e.preventDefault();
    };


    return (
        <>

            <form onSubmit={CommonHeaderFilterTopData}>
                <div className='educare-header-filter-topbar flex flex-wrap gap-2.5 items-center'>
                    <div className="educare-card-title mr-auto pb-none">
                        <div className="educare-radio-field-styles flex flex-wrap gap-3">
                            <RadioInput
                                name="filter_type"
                                value="Date Wise"
                                checked={data.filter_type === "date_wise"}
                                onChange={() => handleFilterTypeChange("date_wise")}
                            />
                            <RadioInput
                                name="filter_type"
                                value="Installment Wise"
                                checked={data.filter_type === "installment_wise"}
                                onChange={() => handleFilterTypeChange("installment_wise")}
                            />
                        </div>
                    </div>
                    <div className="educare-filter-action-btn inline-flex gap-2">
                        {
                            data.filter_type === "date_wise" ?
                                (<div className='flex gap-2'>
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
                                            placeholderText="End Date"
                                            className="w-full"
                                        />
                                    </div>
                                </div>)
                                :
                                (<div className='flex gap-2'>
                                    <div className="educare-input-field-styles">
                                        <SelectInput
                                            data_label="From"
                                            data={fees}
                                            value={
                                                data.from_fee_id
                                            }
                                            onChange={(e) =>
                                               handleFromFeeChange(e)
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.from_fee_id
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="educare-input-field-styles">
                                        <SelectInput
                                            data_label="To"
                                            data={filteredToFees}
                                            value={
                                                data.to_fee_id
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "to_fee_id",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.to_fee_id
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>)

                        }

                        <div>
                            <Tooltip
                                title="Search"
                                placement="top"
                                arrow
                            >
                                <button
                                    type='button'
                                    className="educare-secondary-btn-md-fill"
                                    onClick={(e) => {
                                        handleFilterFeeCollection(e)
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
                                    type='button'
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
            </form >
            <div className='mb-5'></div>
        </>
    );
};

export default DateWiseClassSummaryFilter;
