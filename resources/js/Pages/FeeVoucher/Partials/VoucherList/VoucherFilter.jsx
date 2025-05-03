import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";

export default function VoucherFilter({
    classrooms = [],
    studentFeeVouchers = [],
    voucherStatusArray = [],
    setLoading,
    setFeeVouchersData,
    students = [],
    student
}) {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState({});
    const [filterText, setFilterText] = useState('');
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
        search: "",
        admission_no: "",
        classroom_id: "",
        voucher_status: "",
        student_id: "",
        start_date: startDate,
        end_date: endDate,
    });

    useEffect(() => {
        setSelectedStudent(student);
    }, [student]);

    useEffect(() => {
        setFilteredStudents(students.sort(customSort));
    }, [students]);

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


    useEffect(() => {
        if (selectedStudent?.id != null) {
            setData((prevData) => ({
                ...prevData,
                admission_no: selectedStudent?.admission_no ?? "",
                classroom_id: selectedStudent?.classroom_id ?? "",
                student_id: selectedStudent?.id ?? "",
            }));

            // setFilteredStudents(students?.filter(item => item?.classroom_id == selectedStudent?.classroom_id));
        }
        else {
            setData((prevData) => ({
                ...prevData,
                student_id: selectedStudent?.id ?? "",
            }));
        }
    }, [selectedStudent]);

    useEffect(() => {
        setParams({
            classroom_id: data?.classroom_id ?? "",
            voucher_status: data?.voucher_status ?? "",
            student_id: data?.student_id ?? "",
            start_date: data?.start_date ?? "",
            end_date: data?.end_date ?? ""
        });
    }, [data])


    // handle classroom change start
    const handleClassroomChange = (e) => {
        const classroom_id = e.target.value;

        // setFilteredStudents(students?.filter(item => item?.classroom_id == classroom_id));

        setData((prevData) => ({
            ...prevData,
            admission_no: "",
            classroom_id: classroom_id,
            student_id: "",
        }));

        const form_data = {
            classroom_id: classroom_id,
            filter_type: 'filter_student',
        }

        router.post(route("fee_voucher.list"), form_data);
    }
    // handle classroom change end


    // handle student change start
    const handleStudentChange = (e) => {
        const student_id = e.target.value;

        const student = filteredStudents?.find(item => item?.id == student_id);

        setSelectedStudent(student);

        setData((prevData) => ({
            ...prevData,
            admission_no: student?.admission_no ?? "",
            student_id: student?.id ?? "",
        }));
    }
    // handle student change end

    // handle admission no change start
    const handleAdmissionNoChange = (e) => {
        const admission_no = e.target.value;

        setData((prevData) => ({
            ...prevData,
            admission_no: admission_no
        }));
    }

    const handleAdmissionNoKeyPress = (e) => {
        const key = e.key;

        if (key == 'Enter') {
            e.preventDefault();

            // const selected_student = students?.find(item => item?.admission_no == data?.admission_no);

            // setSelectedStudent(selected_student);

            // if (selected_student?.id != null) {
            //     setFilteredStudents(students?.filter(item => item?.classroom_id == selected_student?.classroom_id));
            // }
            // else {
            //     setFilteredStudents(students?.filter(item => item?.classroom_id == data?.classroom_id));
            // }

            const form_data = {
                admission_no: data?.admission_no ?? "",
                student_id: "",
            }

            router.post(route("fee_voucher.list"), form_data);
        }
    }
    // handle admission no change end


    // handle filter data by search start
    const filteredStudentFeeVouchers = useMemo(() => {
        return studentFeeVouchers.filter((item) => {
            const inputText = filterText?.toLowerCase().trim();
            const admissionNo = item?.student?.admission_no?.toLowerCase();
            const studentName = `${item?.student?.first_name} ${item?.student?.middle_name} ${item?.student?.last_name}`.toLowerCase();
            const classroomTitle = item?.student?.classroom?.title?.toLowerCase();
            const title = item?.title?.toLowerCase();
            const start_date = item?.start_date?.toLowerCase();
            const end_date = item?.end_date?.toLowerCase();
            const total_amount = String(item?.total_amount)?.toLowerCase();
            const total_paid = String(item?.total_paid)?.toLowerCase();
            const total_due = String(item?.total_due)?.toLowerCase();

            return (
                (studentName && studentName.includes(inputText)) ||
                (admissionNo && admissionNo.includes(inputText)) ||
                (classroomTitle && classroomTitle.includes(inputText)) ||
                (title && title.includes(inputText)) ||
                (start_date && start_date.includes(inputText)) ||
                (end_date && end_date.includes(inputText)) ||
                (total_amount && total_amount.includes(inputText)) ||
                (total_paid && total_paid.includes(inputText)) ||
                (total_due && total_due.includes(inputText)) ||
                (
                    item?.fee_type_amounts?.some(feeType => feeType?.fee_type?.title?.toLowerCase().includes(inputText)) ||
                    item?.fee_type_amounts?.some(feeType => String(feeType?.amount).toLowerCase().includes(inputText))
                )
            );
        });
    }, [studentFeeVouchers, filterText, startDate, endDate]);

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
    };

    useEffect(() => {
        setFeeVouchersData(filteredStudentFeeVouchers);
    }, [filteredStudentFeeVouchers]);
    // handle filter data by search end

    // handle filter data start
    const filterVoucherData = (e) => {
        e.preventDefault();

        setLoading(false);

        post(route("fee_voucher.list"), {
            preserveScroll: true,
            onSuccess: () => {
                // reset()
            },
            onError: (errors) => {

            },
        });
    };
    // handle filter data end


    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here

    // sort students by classroom roll start
    function customSort(a, b) {
        // Check if classroomRoll exists and roll_no is not null for both a and b
        if (a.classroom_roll && b.classroom_roll && a.classroom_roll.roll_no != null && b.classroom_roll.roll_no != null) {
            return a.classroom_roll.roll_no - b.classroom_roll.roll_no;
        } else if (!a.classroom_roll || a.classroom_roll.roll_no == null) {
            // Handle null values for a
            return 1; // Move a to the end of the sorted array
        } else {
            // Handle null values for b
            return -1; // Move b to the end of the sorted array
        }
    }
    // sort students by classroom roll end


    return (
        <>
            <div className="educare-school-form-action-title">
                <h5><i className="icon-info"></i>  Student Voucher Report</h5>
            </div>
            <div className='educare-admission-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={filterVoucherData}>
                            <div className=" educare-header-filtar-bar-inner-main minMax4Xl:flex-wrap minMax4Xl:justify-end">
                                <div className="educare-admission-filtar-bar-count">
                                    <span>Vouchers: {filteredStudentFeeVouchers?.length}</span>
                                </div>
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="admission_no"
                                                    value={data.admission_no}
                                                    onChange={(e) =>
                                                        handleAdmissionNoChange(e)
                                                    }
                                                    onKeyPress={(e) => {
                                                        handleAdmissionNoKeyPress(e)
                                                    }}
                                                    placeHolder="Admission No."
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError message={errors.admission_no} className="mt-2" />
                                            </div>

                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="search"
                                                    value={data.search}
                                                    onChange={(e) => {
                                                        setData("search", e.target.value)
                                                        handleFilterChange(e);
                                                    }}
                                                    placeHolder="Search"
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError message={errors.search} className="mt-2" />
                                            </div>

                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="classroom_id"
                                                    data_label="All Class"
                                                    data={classrooms}
                                                    value={data.classroom_id}
                                                    onChange={(e) => {
                                                            handleClassroomChange(e)
                                                        }
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.classroom_id}
                                                    className="mt-2"
                                                />
                                            </div>


                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    data_label="Student"
                                                    data={filteredStudents}
                                                    value={data.student_id}
                                                    onChange={(e) =>
                                                        handleStudentChange(e)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.student_id}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="voucher_status"
                                                    data_label="All Status"
                                                    data={voucherStatusArray}
                                                    value={data.voucher_status}
                                                    onChange={(e) =>
                                                        setData("voucher_status", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.voucher_status}
                                                    className="mt-2"
                                                />
                                            </div>


                                            <div className="educare-input-field-styles">
                                                <DatePicker selected={startDate} onChange={(date, e) => {
                                                    setStartDate(date)
                                                }
                                                }
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Start date" />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <DatePicker selected={endDate} onChange={(date, e) => {
                                                    setEndDate(date)
                                                }
                                                }
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="End date" />
                                            </div>
                                        </div>
                                        <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                    </div>
                                </div>
                                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                    <div className="educare-button-field-styles">
                                        <Tooltip
                                            title="Search"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <button
                                                type="submit"
                                                className="educare-secondary-btn-md-fill"
                                            >
                                                <i className="icon-search-interface-symbol"></i>
                                            </button>
                                        </Tooltip>
                                    </div>
                                    {filteredStudentFeeVouchers?.length > 0 &&
                                        <div className="educare-button-field-styles">
                                            <Tooltip
                                                title="PDF"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <Link
                                                    href="#"
                                                    className="educare-warning-btn-md-fill"
                                                >
                                                    <i className="icon-FilePdf"></i>
                                                </Link>
                                            </Tooltip>
                                        </div>
                                    }
                                    {filteredStudentFeeVouchers?.length > 0 &&
                                        <div className="educare-button-field-styles">
                                            <Tooltip
                                                title="Download Excel"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <a
                                                    href={route('export_excel.voucher_report', params)}
                                                    target="_blank"
                                                    className="educare-success-btn-md-fill"
                                                >
                                                    <i className="icon-FileX"></i>
                                                </a>
                                            </Tooltip>
                                        </div>
                                    }
                                    <div className="educare-button-field-styles">
                                        <Tooltip
                                            title="Reset"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <Link
                                                href={route("fee_voucher.list")}
                                                className="educare-gray-btn-md-fill"
                                            >
                                                <i className="icon-ArrowsClockwise"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
}
