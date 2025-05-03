import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect } from "react";

const SpecialFeeTypeReportFilter = ({
    classrooms = [],
    fees = [],
    specialFeeTypes = [],
    specialFeeTypeReport,
    setLoading,
    setParams
}) => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        fee_id: "",
        fee_type_id: "",
        classroom_id: "",
    });

    useEffect(() => {
        setParams({
            fee_id: data?.fee_id ?? "",
            fee_type_id: data?.fee_type_id ?? "",
            classroom_id: data?.classroom_id ?? "",
        });
    }, [data]);


    //handle filter special fee type report start
    const filterSpecialFeeTypeReport = (e) => {
        e.preventDefault();

        setLoading(false);

        post(route("fee_report.special_fee_type_report"), {
            preserveScroll: true,
            onSuccess: () => {},
            onError: (errors) => {},
        });
    };
    //handle filter special fee type report end


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
                    <form onSubmit={filterSpecialFeeTypeReport}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total Count: {Object.keys(specialFeeTypeReport)?.length}</span>
                            </div>
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        {/* Replace changable inputs */}
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="fee_id"
                                                data_label="Installment"
                                                data={fees}
                                                value={data.fee_id}
                                                onChange={(e) =>
                                                    setData("fee_id", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.fee_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="fee_type_id"
                                                data_label="Type"
                                                data={specialFeeTypes}
                                                value={data.fee_type_id}
                                                onChange={(e) =>
                                                    setData("fee_type_id", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.fee_type_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="classroom_id"
                                                data_label="Class"
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
                                        {/* Replace changable inputs */}
                                    </div>
                                    <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
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
                                            type="submit"
                                            className="educare-secondary-btn-md-fill"
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
                                            href={route('fee_report.special_fee_type_report')}
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

export default SpecialFeeTypeReportFilter;
