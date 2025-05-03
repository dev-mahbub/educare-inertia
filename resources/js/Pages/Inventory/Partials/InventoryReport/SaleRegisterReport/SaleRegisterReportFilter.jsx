import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import DatePicker from "react-datepicker";

const SaleRegisterReportFilter = ({
    setLoading,
    saleReportLength,
    ledgers,
    data,
    setData
}) => {

    const handleSearch = (e) => {
        e.preventDefault();
        if (data) {
            router.post(route('sale_register_report.list'), data);
            setLoading(false);
        }
    }

    const handleReset = (e) => {
        router.get(route('sale_register_report.list'));
    }

    //scrollable filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollable filter bar end here

    return (
        <>
            <div className="educare-card-title mr-auto pb-none">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Sale Register
                </h5>
            </div>

            <div className="educare-header-filtar-bar-area z-[4] relative">
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: {saleReportLength && saleReportLength}</span>
                            </div>
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
                                            transform: `translateX(-${currentIndex * 120
                                                }px)`,
                                        }}
                                    >
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles">
                                                <SelectInput
                                                    id="ledger_id"
                                                    data_label="Sale Ledger"
                                                    data={ledgers}
                                                    value={
                                                        data.ledger_id
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "ledger_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="search_value"
                                                value={data.search}
                                                onChange={(e) => setData("search_value", e.target.value)}
                                                placeHolder="Search"
                                                type="text"
                                                className="block"
                                            />
                                        </div>

                                        <div className="educare-select-field-styles">
                                            <DatePicker
                                                selected={data?.start_date && new Date(data?.start_date)}
                                                onChange={(date) => setData("start_date", date)}
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
                                        <div className="educare-select-field-styles">
                                            <DatePicker
                                                selected={data?.end_date && new Date(data?.end_date)}
                                                onChange={(date) => setData("end_date", date)}
                                                showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select"
                                                isClearable
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="End date"
                                                className="w-full"
                                            />
                                        </div>
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
                                <div>
                                    <Tooltip
                                        title="Search"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <Link
                                            href="#"
                                            className="educare-secondary-btn-md-fill"
                                            onClick={handleSearch}
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                                {saleReportLength > 0 &&
                                    <div>
                                        <Tooltip
                                            title="Download PDF"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <a
                                                href={route('pdf_account.sale_ledger_report', data)}
                                                target="_blank"
                                                className="educare-warning-btn-md-fill"
                                            >
                                                <i className="icon-FilePdf"></i>
                                            </a>
                                        </Tooltip>
                                    </div>
                                }

                                {saleReportLength > 0 &&
                                    <div>
                                        <Tooltip
                                            title="Download Excel"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <a
                                                href={route('export_excel.inventory.sale_ledger_report', data)}
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
                                            onClick={handleReset}
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SaleRegisterReportFilter;
