import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentClassWiseReportFilter = ({
    setSelectValue,
    classrooms,
    studentDocumentCategories,
    studentDocumentReports
}) => {
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
        document_category_id: ""
    });

    useEffect(() => {
        setParams({
            classroom_id: data.classroom_id ?? "",
            document_category_id: data.document_category_id ?? ""
        });
    }, [data]);

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();
    };
    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    // handle change document category start
    const handleChangeDocumentCatgeory = (category) => {
        setData((prevData) => ({
            ...prevData,
            document_category_id: category
        }));

        const documentCategory = studentDocumentCategories?.find(item => item?.id == category);

        setSelectValue(documentCategory?.id == null ? 'Document' : documentCategory?.title)
    }
    // handle change document category end

    // handle filter document report data start
    const handleFilterDocumentReportData = (e) => {
        e.preventDefault();

        if(data?.classroom_id == "" || data?.document_category_id == "") {
            toast.error("Please select class and document", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            const form_data = {
                classroom_id: data?.classroom_id,
                document_category_id: data?.document_category_id
            }

            router.post(route('document.student_class_wise'), form_data);
        }
    }
    // handle filter document report data end

    return (
        <div className="educare-header-filtar-bar-area z-[4] relative mb-2.5">
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={CommonHeaderFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            {/* delete count if don't need */}
                            <div className="educare-card-title mr-auto pb-none">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Student Document Report
                                </h5>
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
                                                message={errors.classroom_id}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="document_category_id"
                                                data_label="Documents"
                                                data={studentDocumentCategories}
                                                value={data.document_category_id}
                                                onChange={(e) => {
                                                        handleChangeDocumentCatgeory(e.target.value)
                                                    }
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.document_category_id
                                                }
                                                className="mt-2"
                                            />
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
                                            onClick={handleFilterDocumentReportData}
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </button>
                                    </Tooltip>
                                </div>

                                {(studentDocumentReports?.document_submitted?.length > 0 || studentDocumentReports?.document_not_submitted?.length > 0) &&
                                    <div>
                                        <Tooltip
                                            title="Download Excel"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <a
                                                href={route('export_excel.document.student_class_wise_report', params)}
                                                target="_blank"
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
                                            href="#"
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
    );
};

export default StudentClassWiseReportFilter;
