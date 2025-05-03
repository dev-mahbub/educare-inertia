import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentHeadWiseFeeReportFilter = ({
    fees = [],
    classrooms = [],
    student_status_array = [],
    totalReportCount,
    setLoading,
    setParams
}) => {

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
        voucher: false,
        from_fee_id: "",
        to_fee_id: "",
        classroom_id: "",
        student_status: "",
    });

    useEffect(() => {
        setParams({
            voucher: data?.voucher ?? false,
            from_fee_id: data?.from_fee_id ?? "",
            to_fee_id: data?.to_fee_id ?? "",
            classroom_id: data?.classroom_id ?? "",
            student_status: data?.student_status ?? "",
        })
    }, [data]);


    // handle from fee change start
    const handleFromFeeChange = (e) => {
        const from_fee_id = e.target.value;

        setFilteredToFees(fees?.filter(item => item?.id >= from_fee_id));

        setData((prevData) => ({
            ...prevData,
            from_fee_id: from_fee_id,
            to_fee_id: "",
        }));
    }
    // handle from fee change end


    // handle filter reports start
    const handleFilterStudentHeadWiseReports = (e) => {
        e.preventDefault();

        if(data?.from_fee_id == "" || data?.to_fee_id == "") {
            toast.error("Please select from and to installment.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else {
            setLoading(false);

            post(route('fee_report.student_head_wise_fee_report'));
        }
    }
    // handle filter reports end


    const StudentHeadWiseFeeReportFilterData = (e) => {
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
        <div className='educare-header-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={StudentHeadWiseFeeReportFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: {totalReportCount}</span>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
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
                                                data_label="To"
                                                data={filteredToFees}
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
                                                data_label="All Class"
                                                data={classrooms}
                                                value={data.classroom_id}
                                                onChange={(e) =>
                                                    setData("classroom_id", e.target.value)
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
                                                data_label="All"
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
                                                handleFilterStudentHeadWiseReports(e)
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
                                        <Link
                                            href={route('fee_report.student_head_wise_fee_report')}
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
    );
};

export default StudentHeadWiseFeeReportFilter;
