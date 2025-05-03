import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect } from "react";

const EpfWageReportFilter = ({
    paymentMonths,
    totalReportCount,
    setFilterText
}) => {

    const {
        data,
        setData,
        errors
    } = useForm({
        payment_month_id: "",
        search: "",
    });

    useEffect(() => {
        setFilterText(data.search.trim().toLowerCase());
    }, [data.search]);

    // handle filter report start
    const handleFilterReport = (e) => {
        e.preventDefault();

        const form_data = {
            payment_month_id: data?.payment_month_id
        }

        router.post(route('salary_report.epf_wage'), form_data);
    }
    // handle filter report end

    const CommonHeaderFilterData = (e) => {
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
        <div>
            <div className="educare-card-title pb-none mb-2.5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    EPF Report
                </h5>
            </div>
            <div className='educare-header-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={CommonHeaderFilterData}>
                            <div className=" educare-header-filtar-bar-inner-main">
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <span>Total: {totalReportCount}</span>
                                </div>
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            {/* Replace changable inputs */}
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="payment_month_id"
                                                    data_label="Month"
                                                    data={paymentMonths}
                                                    value={data.payment_month_id}
                                                    onChange={(e) =>
                                                        setData("payment_month_id", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.payment_month_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="search"
                                                    value={data.search}
                                                    onChange={(e) => setData("search", e.target.value)}
                                                    placeHolder="Search"
                                                    type="text"
                                                    className="block"
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
                                                type="button"
                                                className="educare-secondary-btn-md-fill"
                                                onClick={handleFilterReport}
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
                                                href={route('salary_report.epf_wage')}
                                                className="educare-gray-btn-md-fill"
                                            >
                                                <i className="icon-ArrowsClockwise"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>

                                    {(data?.payment_month_id != '' && totalReportCount > 0) &&
                                        <>
                                            <div>
                                                <Tooltip
                                                    title="Download PF Report"
                                                    placement="top"
                                                    arrow
                                                    as="button"
                                                >
                                                    <a
                                                        href={route('export_excel.salary.epf_wage_report', {payment_month_id: data.payment_month_id})}
                                                        target="_blank"
                                                        className="educare-success-btn-md-fill"
                                                    >
                                                        <i className="icon-FileX"></i>
                                                    </a>
                                                </Tooltip>
                                            </div>
                                            <div>
                                                <Tooltip
                                                    title="Download PF Wages Report"
                                                    placement="top"
                                                    arrow
                                                    as="button"
                                                >
                                                    <a
                                                        href={route('export_excel.salary.pf_report', { payment_month_id: data.payment_month_id })}
                                                        target="_blank"
                                                        className="educare-success-btn-md-fill"
                                                    >
                                                        <i className="icon-FileX"></i>
                                                    </a>
                                                </Tooltip>
                                            </div>
                                        </>
                                    }

                                    {/* Replace changable buttons */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EpfWageReportFilter;
