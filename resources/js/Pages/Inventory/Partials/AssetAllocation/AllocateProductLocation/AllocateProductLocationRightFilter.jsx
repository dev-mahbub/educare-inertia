import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import DatePicker from "react-datepicker";
const CommonHeaderFilter = ({
    alocateItem,
    data,
    setData,
    errors,
    handleAllocateProduct
}) => {

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();
    };
    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    return (
        <div className="educare-header-filtar-bar-area z-[4] relative">
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={CommonHeaderFilterData}>
                        <div className="educare-header-filtar-bar-inner-main flex flex-wrap">
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
                                        {/* Replace changable inputs */}

                                        <div className="educare-input-field-styles">
                                            <DatePicker
                                                selected={
                                                    data?.allocate_date
                                                        ? new Date(
                                                            data?.allocate_date
                                                        )
                                                        : ""
                                                }
                                                onChange={(date) =>
                                                    setData(
                                                        "allocate_date",
                                                        date
                                                    )
                                                }
                                                showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select"
                                                isClearable
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Allocate Date"
                                                className="w-full"
                                            />
                                            <InputError
                                                message={errors?.allocate_date}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="total_available"
                                                value={alocateItem?.available_stock ?? 0}
                                                // onChange={(e) =>
                                                //     setData(
                                                //         "total_available",
                                                //         e.target.value
                                                //     )
                                                // }
                                                placeHolder="Total Available"
                                                className="block cursor-not-allowed"
                                                disabled
                                            />
                                            {/* <InputError
                                                message={errors.total_available}
                                                className="mt-2"
                                            /> */}
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="allocate_quantity"
                                                value={data.allocate_quantity}
                                                onChange={(e) =>
                                                    setData(
                                                        "allocate_quantity",
                                                        e.target.value > alocateItem?.available_stock ? 0 : e.target.value
                                                    )
                                                }
                                                placeHolder="Allocate Qty"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors?.allocate_quantity}
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
                                {/* <div>
                                    <Tooltip
                                        title="Search"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <Link
                                            href="#"
                                            className="educare-secondary-btn-md-fill"
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </Link>
                                    </Tooltip>
                                </div> */}
                                <div>
                                    <button
                                        type="button"
                                        className="educare-success-btn-md-fill"
                                        onClick={handleAllocateProduct}
                                    >
                                        Allocate
                                    </button>
                                </div>

                                <div>
                                    <Tooltip
                                        title="Reset"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <Link
                                            href={route('allocate_product_location.list')}
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

export default CommonHeaderFilter;
