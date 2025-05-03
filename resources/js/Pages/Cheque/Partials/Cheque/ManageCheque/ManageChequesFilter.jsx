import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const ManageChequesFilter = ({
    classrooms = [],
    totalCheque,
    setLoading,
    setFormData,
    filterChequeReports
}) => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [params, setParams] = useState({});

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        classroom_id: "",
        cheque_no: "",
        admission_no: "",
        student_name: "",
        from_date: fromDate,
        to_date: toDate,
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            from_date: fromDate
        }));
    }, [fromDate]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            to_date: toDate
        }));
    }, [toDate]);


    useEffect(() => {
        setFormData(data);
        setParams({
            classroom_id: data?.classroom_id ?? "",
            cheque_no: data?.cheque_no ?? "",
            admission_no: data?.admission_no ?? "",
            student_name: data?.student_name ?? "",
            from_date: fromDate ?? "",
            to_date: toDate ?? "",
        });
    }, [data])


    // handle filter cheque report start
    const filterChequesData = (e) => {
        e.preventDefault();

        filterChequeReports();
        // setLoading(false);

        // post(route('cheque.manage_cheque'), {
        //     preserveScroll: true,
        //     onSuccess: () => {},
        //     onError: (errors) => {},
        // });
    };
    // handle filter cheque report end


    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here


    return (
        <>
            <div className="educare-header-filtar-bar-area z-[4] relative">
                <div className="educare-card-title leading-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Cheque List
                    </h5>
                </div>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={filterChequesData}>
                            <div className=" educare-header-filtar-bar-inner-main">
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <span>Total: {totalCheque}</span>
                                </div>
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span
                                            className="educare-header-filter-prev"
                                            onClick={handlePrevClick}
                                        >
                                            <i className="icon-left-chevron"></i>
                                        </span>
                                        <div
                                            className="educare-header-filtar-bar-fields-wrap"
                                            ref={listRef}
                                            style={{
                                                transform: `translateX(-${
                                                    currentIndex * 120
                                                }px)`,
                                            }}
                                        >
                                            {/* Replace changable inputs */}
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="classroom_id"
                                                    data_label="Class"
                                                    data={classrooms}
                                                    value={data.classroom_id}
                                                    onChange={(e) =>
                                                        setData(
                                                            "classroom_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.classroom_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="cheque_no"
                                                    value={data.cheque_no}
                                                    onChange={(e) =>
                                                        setData(
                                                            "cheque_no",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder="Chk No."
                                                />
                                                <InputError
                                                    message={errors.cheque_no}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="admission_no"
                                                    value={data.admission_no}
                                                    onChange={(e) =>
                                                        setData(
                                                            "admission_no",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder="Ad No."
                                                />
                                                <InputError
                                                    message={
                                                        errors.admission_no
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="student_name"
                                                    value={data.student_name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "student_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder="Student Name"
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <div className="educare-input-field-styles">
                                                    <DatePicker
                                                        selected={fromDate}
                                                        onChange={(date) =>
                                                            setFromDate(date)
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="From Date"
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <div className="educare-input-field-styles">
                                                    <DatePicker
                                                        selected={toDate}
                                                        onChange={(date) =>
                                                            setToDate(date)
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="To Date"
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                            {/* Replace changable inputs */}
                                        </div>
                                        <span
                                            className="educare-header-filter-next"
                                            onClick={handleNextClick}
                                        >
                                            <i className="icon-chevron"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                    {/* Replace changable buttons */}
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
                                                    filterChequesData(e)
                                                }}
                                            >
                                                <i className="icon-search-interface-symbol"></i>
                                            </button>
                                        </Tooltip>
                                    </div>

                                    {totalCheque > 0 &&
                                    <div>
                                        <Tooltip
                                            title="Excel Sheet"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <a
                                                target="_blank"
                                                href={route('export_excel.cheque_manage_report', params)}
                                                className="educare-success-btn-md-fill"
                                            >
                                                <i className="icon-FileX"></i>
                                            </a>
                                        </Tooltip>
                                    </div>
                                    }

                                    <div>
                                        <Tooltip
                                            title="Reset"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <Link
                                                href={route(
                                                    "cheque.manage_cheque"
                                                )}
                                                className="educare-gray-btn-md-fill"
                                            >
                                                <i className="icon-ArrowsClockwise"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                    {/* Replace changable buttons */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageChequesFilter;
