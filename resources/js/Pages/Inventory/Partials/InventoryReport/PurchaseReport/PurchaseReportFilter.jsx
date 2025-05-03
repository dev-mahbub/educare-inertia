// import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router } from "@inertiajs/react";
import { Autocomplete, TextField, Tooltip } from "@mui/material";
import DatePicker from "react-datepicker";

const PurchaseReportFilter = ({
    partyAccountNames = [],
    purchaseReportLength = '',
    setLoading,
    data,
    setData
}) => {

    const handleSearch = (e) => {
        e.preventDefault();
        if (data) {
            router.post(route('purchase_report.list'), data);
            setLoading(false);
        }
    }

    const handleReset = (e) => {
        router.get(route('purchase_report.list'));
    }

    //scrollable filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollable filter bar end here

    return (
        <div className="educare-header-filtar-bar-area z-[4] relative">
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form>
                        <div className=" educare-header-filtar-bar-inner-main">
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: {purchaseReportLength && purchaseReportLength}</span>
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
                                            transform: `translateX(-${currentIndex * 120
                                                }px)`,
                                        }}
                                    >
                                        <div className="educare-input-type-file-styles min-w-[160px]">
                                            <Autocomplete
                                                disablePortal
                                                options={partyAccountNames}
                                                getOptionLabel={(option) => option.title ?? ''}
                                                value={data?.party_account_id != null &&
                                                    ({
                                                        "id": data?.party_account_id,
                                                    "title": partyAccountNames?.find(partyAccount => partyAccount.id == data?.party_account_id)?.title,
                                                    })
                                                }
                                                onChange={(e, value) => {
                                                    setData(
                                                        "party_account_id",
                                                        value?.id
                                                    )
                                                }}
                                                renderInput={(
                                                    params
                                                ) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder="Select Party Account"
                                                    />
                                                )}
                                            />
                                        </div>
                                        {/* <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="party_account_id"
                                                data_label="Party account"
                                                data={partyAccountNames}
                                                onChange={(e) =>
                                                    setData(
                                                        "party_account_id",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block"
                                            />
                                        </div> */}
                                        <div className="educare-select-field-styles">
                                            <DatePicker
                                                selected={data?.start_date && new Date(data?.start_date)}
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
                                                placeholderText="Start date"
                                                className="w-full"
                                            />
                                        </div>

                                        <div className="educare-select-field-styles">
                                            <DatePicker
                                                selected={data?.end_date && new Date(data?.end_date)}
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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PurchaseReportFilter;
