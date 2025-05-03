import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Autocomplete, TextField, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductTransactionReportFilter = ({
    sumOpeningStock = '',
    productNames = [],
    setLoading,
    availableStock,
    setParams
}) => {
    const [selectedOptions, setSelectedOptions] = useState(null);

    const {
        data,
        setData,
    } = useForm({
        product_id: "",
        start_date: new Date(),
        end_date: new Date(),
    });

    useEffect(() => {
        setParams({
            product_id: data.product_id,
            start_date: data.start_date,
            end_date: data.end_date
        });
    }, [data]);

    const handleSelectChange = (event, value) => {
        setSelectedOptions(value);
        setData('product_id', value?.id);
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if (data.product_id && data.start_date != "" && data.end_date != "") {
            router.post(route('product_transaction_report.list'), data);
            setLoading(false);
        } else {
            toast.error("Please select product and date!", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
    }

    const handleReset = () => {
        router.get(route('product_transaction_report.list'));
    }


    //scrollable filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollable filter bar end here

    return (
        <>
            <div className="educare-card-title mr-auto pb-none mb-5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Product Transaction Report
                </h5>
            </div>
            <div className="educare-header-filtar-bar-area z-[4] relative">
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form>
                            <div className=" educare-header-filtar-bar-inner-main">

                                <div className="educare-header-filtar-bar-count flex flex-wrap gap-2.5">
                                    <span>Opening Stock: {sumOpeningStock && sumOpeningStock}</span>
                                    <span>Current Stock: {availableStock}</span>
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
                                                <div className="educare-input-type-file-styles">
                                                    <Autocomplete
                                                        disablePortal
                                                        options={productNames}
                                                        value={selectedOptions}
                                                        onChange={handleSelectChange}
                                                        renderInput={(
                                                            params
                                                        ) => (
                                                            <TextField
                                                                {...params}
                                                                label=""
                                                                placeholder="Select"
                                                            />
                                                        )}
                                                    />
                                                </div>
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
                                                    placeholderText="End date"
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
                                            <button
                                                type="button"
                                                className="educare-secondary-btn-md-fill"
                                                onClick={handleSearch}
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
                                                onClick={handleReset}
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

export default ProductTransactionReportFilter;
