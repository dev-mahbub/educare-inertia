import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExpectedDiscountReportFilter = ({
    fees = [],
    discounts = [],
    setLoading,
    expectedStudentFeeDiscountReportData = []
}) => {
    const [filteredToFees, setFilteredToFees] = useState([]);
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
        search: "",
        discount_id: "",
        from_fee_id: "",
        to_fee_id: "",
    });

    useEffect(() => {
        setParams({
            search: data?.search,
            discount_id: data?.discount_id,
            from_fee_id: data?.from_fee_id,
            to_fee_id: data?.to_fee_id,
        });
    }, [data]);

    const ExpectedDiscountData = (e) => {
        e.preventDefault();

        // post(route("school.save"), {
        //     preserveScroll: true,
        //     onSuccess: () => reset(),
        //     onError: (errors) => {
        //         // if (errors.landmarks_id) {
        //         //     reset("landmarks_id");
        //         //     landmarksInput.current.focus();
        //         // }
        //     },
        // });
    };
    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here


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

    // handle filter discount report start
    const handleDiscountReportFilter = (e) => {
        e.preventDefault();

        if (data?.from_fee_id != "" && data?.to_fee_id != "") {
            setLoading(false);

            post(route('fee_discount.expected_report'));
        }
        else {
            toast.error("Please select from and to installments", {
                position: 'top-right',
                autoClose: 1500,
            });
        }

    }
    // handle filter discount report end


    return (
        <>

            <div className='educare-admission-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={ExpectedDiscountData}>
                            <div className=" educare-header-filtar-bar-inner-main minMax2Xl:flex-wrap minMax2Xl:justify-end">
                                <div className="educare-card-title leading-none pb-none">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Expected Discount Report
                                    </h5>
                                </div>
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={
                                                        data.search
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "search",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder="Search"
                                                />
                                                <InputError
                                                    message={
                                                        errors.search
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="discount_id"
                                                    data_label="All"
                                                    data={discounts}
                                                    value={data.discount_id}
                                                    onChange={(e) =>
                                                        setData("discount_id", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.discount_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="from_fee_id"
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
                                                    id="to_fee_id"
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
                                                onClick={handleDiscountReportFilter}
                                            >
                                                <i className="icon-search-interface-symbol"></i>
                                            </button>
                                        </Tooltip>
                                    </div>
                                    {Object.keys(expectedStudentFeeDiscountReportData)?.length > 0 &&
                                        <div>
                                            <Tooltip
                                                title="PDF"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <Link
                                                    href="#"
                                                    className="educare-danger-btn-md-fill"
                                                >
                                                    <i className="icon-FilePdf"></i>
                                                </Link>
                                            </Tooltip>
                                        </div>
                                    }

                                    {Object.keys(expectedStudentFeeDiscountReportData)?.length > 0 &&
                                        <div>
                                            <Tooltip
                                                title="Excel Sheet"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <a
                                                    href={route('export_excel.expected_discount_report', params)}
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
                                                href={route('fee_discount.expected_report')}
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

export default ExpectedDiscountReportFilter;
