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

const ConsolidatedDueReportFilter = ({
    fees = [],
    feeCategories = [],
    student_status_array = [],
    setLoading,
    setConsolidatedDueReportsData,
    consolidatedDueReportsData,
    setClassroomReports,
    params,
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
        student_status: "",
        from_fee_id: "",
        to_fee_id: "",
        fee_category_id: "",
        voucher: "",
    });

    useEffect(() => {
        setParams({
            student_status: data?.student_status ?? "",
            from_fee_id: data?.from_fee_id ?? "",
            to_fee_id: data?.to_fee_id ?? "",
            fee_category_id: data?.fee_category_id ?? "",
            voucher: data?.voucher ?? "",
        });
    }, [data]);


    // handle from fee change start
    const handleFromFeeChange = (e) => {
        const from_fee_id = e.target.value;

        setFilteredToFees(fees?.filter(item => item?.id >= from_fee_id));

        setData((prevData) => ({
            ...prevData,
            from_fee_id: from_fee_id,
            to_fee_id: ""
        }));
    }
    // handle from fee change end


    // handle form and data reset start
    const handleReset = () => {
        reset();
        setLoading(false);
        setFilteredToFees([]);
        setConsolidatedDueReportsData([]);
        setClassroomReports({});
    }
    // handle form and data reset end


    // handle filter consolidated due report start
    const filterConsolidatedDueReports = (e) => {
        e.preventDefault();

        if(data?.from_fee_id == "" || data?.to_fee_id == "") {
            toast.error("Please select from installment and to installment.", {
                position: 'top-right',
                autoClose: 1500,
            })
        }
        else {
            setConsolidatedDueReportsData([]);
            setClassroomReports({});
            setLoading(false);

            router.post(route('fee_report.consolidated_dues_report'), data);
        }
    }
    // handle filter consolidated due report end



    const ConsolidatedDueReportFilterData = (e) => {
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
            <div className="educare-card-title mr-auto pb-none">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Consolidated Due Report
                </h5>
            </div>
            <div className='educare-header-filtar-bar-area z-[4] relative my-2'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={ConsolidatedDueReportFilterData}>
                            <div className=" educare-header-filtar-bar-inner-main items-center">
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
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
                                </div>
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>

                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    data_label="All Student"
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
                                                    data_label="Fee Category"
                                                    data={feeCategories}
                                                    value={data.fee_category_id}
                                                    onChange={(e) =>
                                                        setData("fee_category_id", e.target.value)
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
                                                    filterConsolidatedDueReports(e)
                                                }}
                                            >
                                                <i className="icon-search-interface-symbol"></i>
                                            </button>
                                        </Tooltip>
                                    </div>
                                    {Object.keys(consolidatedDueReportsData)?.length > 0 &&
                                        <div>
                                            <Tooltip
                                                title="Download Excel"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <a
                                                    target="_blank"
                                                    href={route('export_excel.consolidated_due_report', params)}
                                                    className="educare-success-btn-md-fill"
                                                >
                                                    <i className="icon-FileX"></i>
                                                </a>
                                            </Tooltip>
                                        </div>
                                    }

                                    {Object.keys(consolidatedDueReportsData)?.length > 0 &&
                                        <div>
                                            <Tooltip
                                                title="Download Pdf"
                                                placement="top"
                                                arrow
                                            >
                                                <a
                                                    target="_blank"
                                                    href={route('pdf_fee_demand_slip.consolidated_due_report', params)}
                                                    className="educare-warning-btn-md-fill"
                                                >
                                                    <i className="icon-FilePdf"></i>
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
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConsolidatedDueReportFilter;
