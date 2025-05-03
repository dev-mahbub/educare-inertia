import TextInput from "@/Components/TextInput";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import DatePicker from "react-datepicker";

const AllocationReturnReportFilter = ({ setLoading, returnProductLength = '' }) => {
    const {
        data,
        setData
    } = useForm({
        search_value: "",
        start_date: "",
        end_date: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (data) {
            router.post(route('product_return_report.list'), data);
            setLoading(false);
        }
    }

    const handleReset = (e) => {
        router.get(route('product_return_report.list'));
    }

    return (
        <>
            <div className="educare-card-title mr-auto pb-none">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Allocation return report
                </h5>
            </div>
            <div className="educare-header-filtar-bar-area z-[4] relative">
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form>
                            <div className="educare-header-filtar-bar-inner-main">
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <span>Total: {returnProductLength && returnProductLength}</span>
                                </div>

                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <div className="educare-header-filtar-bar-fields-wrap">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="search_value"
                                                    value={data.search}
                                                    onChange={(e) =>
                                                        setData(
                                                            "search_value",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeHolder="Type staff name"
                                                    type="text"
                                                    className="block"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <DatePicker
                                                    selected={
                                                        data.start_date &&
                                                        new Date(data.start_date)
                                                    }
                                                    onChange={(date) =>
                                                        setData("start_date", date)
                                                    }
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Date To"
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <DatePicker
                                                    selected={
                                                        data.end_date &&
                                                        new Date(data.end_date)
                                                    }
                                                    onChange={(date) =>
                                                        setData("end_date", date)
                                                    }
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Date To"
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
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
                                    <div>
                                        <Tooltip
                                            title="Reset"
                                            placement="top"
                                            arrow
                                            as="button"
                                            onClick={handleReset}
                                        >
                                            <Link
                                                href="#"
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
};

export default AllocationReturnReportFilter;
