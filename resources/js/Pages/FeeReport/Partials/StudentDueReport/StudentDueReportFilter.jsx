import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentDueReportFor from "./StudentDueReportFor";

const StudentDueReportFilter = ({
    fees = [],
    feeCategories = [],
    student_status_array = [],
    studentDueReports = [],
    classroom = [],
}) => {
    const [toFeesData, setToFeesData] = useState([]);
    const [loading, setLoadig] = useState(false);

    const [classDueReportsData, setClassDueReportsData] = useState([]);
    const [studentDueReportData, setStudentDueReportData] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [selectedClassroomId, setSelectedClassroomId] = useState(null);
    const [filterParams, setFilterParams] = useState({});

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        late_fee: false,
        voucher: false,
        student_status: "",
        from_fee_id: "",
        to_fee_id: "",
        fee_category_id: "",
    });

    useEffect(() => {
        setFilterParams({
            late_fee: data?.late_fee ?? false,
            voucher: data?.voucher ?? false,
            student_status: data?.student_status ?? "",
            from_installment: data?.from_fee_id ?? "",
            to_installment: data?.to_fee_id ?? "",
            fee_category_id: data?.fee_category_id ?? "",
        });
    }, [data]);

    // handle class due report data start
    useEffect(() => {
        setClassDueReportsData(studentDueReports);
        setLoadig(false);
    }, [studentDueReports]);
    // handle class due report data end

    useEffect(() => {
        setStudentDueReportData(classDueReportsData[selectedClassroomId] ?? [])
    }, [classDueReportsData]);

    //handle from fee change start
    const handleFromFeeChange = (e) => {
        const from_fee_id = e.target.value;

        setToFeesData(fees?.filter(item => item?.id >= from_fee_id));

        setData((prevData) => ({
            ...prevData,
            from_fee_id: from_fee_id,
            to_fee_id: "",
        }));
    }
    //handle from fee change end

    // handle filter report data start
    const handleFilterFeeDuesReport = (e) => {
        e.preventDefault();

        setStudentDueReportData([]);

        setSelectedClassroomId(null);

        getFeeDuesReportData(data)
    }

    const getFeeDuesReportData = (form_data) => {
        setLoadig(false);

        router.post(route('fee_report.teacher.student_due_report'), form_data, {
            onError: (errors) => {
                let count = 0;

                for (let key in errors) {
                    count++;

                    toast.error(errors[key], {
                        position: 'top-right',
                        autoClose: 1500,
                    })

                    if (count >= 1) {
                        break;
                    }
                }
            }
        });
    }
    // handle filter report data end

    // handle form reset start
    const handleReset = () => {
        reset();
        setClassNameId("");
        setToFeesData([]);
        setFilterText("");
        setClassDueReportsData([]);
        setStudentDueReportData([]);
        setSelectedClassroomId(null);
    }
    // handle form reset end


    const StudentDueReportData = (e) => {
        e.preventDefault();
    };
    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here

    return (
        <>
            <div className='educare-header-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={StudentDueReportData}>
                            <div className=" educare-header-filtar-bar-inner-main">
                                <div className="educare-card-title mr-auto pb-none">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Student Due Report
                                    </h5>
                                </div>
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document flex-nowrap">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="late_fee"
                                                        name="late_fee"
                                                        checked={
                                                            data.late_fee
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "late_fee",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="late_fee"
                                                        value="Late Fee"
                                                    />
                                                </div>
                                            </div>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document flex-nowrap">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="voucher"
                                                        name="voucher"
                                                        checked={
                                                            data.voucher
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "voucher",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="voucher"
                                                        value="Voucher"
                                                    />
                                                </div>
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="student_status"
                                                    data_label="Acitve Student"
                                                    data={student_status_array}
                                                    value={data.student_status}
                                                    onChange={(e) =>
                                                        setData("student_status", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.student_status}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id=""
                                                    data_label="From"
                                                    data={fees}
                                                    value={data.from_fee_id}
                                                    onChange={(e) =>
                                                        handleFromFeeChange(e)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.from_fee_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="to_fee_id"
                                                    data_label="To"
                                                    data={toFeesData}
                                                    value={data.to_fee_id}
                                                    onChange={(e) =>
                                                        setData("to_fee_id", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.to_fee_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="fee_category_id"
                                                    data_label="Fee Category"
                                                    data={feeCategories}
                                                    value={data.fee_category_id}
                                                    onChange={(e) => {
                                                        setData("fee_category_id", e.target.value)
                                                    }
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.fee_category_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                    </div>
                                </div>
                                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
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
                                                    handleFilterFeeDuesReport(e)
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
                                                onClick={(e) => {
                                                    handleReset();
                                                }}
                                            >
                                                <i className="icon-ArrowsClockwise"></i>
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <StudentDueReportFor
                studentDueReportData={studentDueReportData}
                filterText={filterText}
                setFilterText={setFilterText}
                selctedClassroomId={selectedClassroomId}
                filterParams={filterParams}
                getFeeDuesReportData={getFeeDuesReportData}
                formData={data}
                classroom={classroom}
                studentDueReports={studentDueReports}
            />
        </>
    );
};

export default StudentDueReportFilter;
