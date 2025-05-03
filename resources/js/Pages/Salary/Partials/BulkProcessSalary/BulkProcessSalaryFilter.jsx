import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useState } from "react";

const BulkProcessSalaryFilter = ({
    paymentMonths,
    setStaffIds,
    staffEarnings,
    setPaymentMonthId,
    staffCategories,
    setStaffCategoryId,
    setStaffSubCategoryId
}) => {

    const [staffSubCategories, setStaffSubCategories] = useState([]);

    const {
        data,
        setData,
        errors
    } = useForm({
        payment_month_id:"",
        staff_category_id:"",
        staff_sub_category_id:""
    });

    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    // handle change payment month start
    const handleChangePaymentMonth = (value) => {
        setData((prevData) => ({
            ...prevData,
            payment_month_id: value
        }));

        setPaymentMonthId(value);

        setStaffIds([]);

        const form_data = {
            ...data,
            payment_month_id: value
        }

        router.post(route('salary.bulk_process_salary'), form_data);
    }
    // handle change payment month end

    // handle change staff category start
    const handleChangeStaffCategory = (value) => {
        setData((prevData) => ({
            ...prevData,
            staff_category_id: value
        }));

        setStaffCategoryId(value);
        setStaffSubCategoryId(null);
        setStaffIds([]);
        setStaffSubCategories(staffCategories?.find(item => item?.id == value)?.sub_categories ?? [])

        const form_data = {
            ...data,
            staff_category_id: value
        }

        router.post(route('salary.bulk_process_salary'), form_data);
    }
    // handle change staff category end

    // handle change staff sub category start
    const handleChangeStaffSubCategory = (value) => {
        setData((prevData) => ({
            ...prevData,
            staff_sub_category_id: value
        }));

        setStaffSubCategoryId(value);
        setStaffIds([]);

        const form_data = {
            ...data,
            staff_sub_category_id: value
        }

        router.post(route('salary.bulk_process_salary'), form_data);
    }
    // handle change staff sub category end

    return (
        <div className="educare-header-filtar-bar-area z-[4] relative">
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    {/* <form onSubmit={CommonHeaderFilterData}>
                    </form> */}
                    <div className=" educare-header-filtar-bar-inner-main">
                        {/* delete count if don't need */}
                        <div className="educare-header-filtar-bar-count mr-auto">
                            <span>Total: {staffEarnings?.length}</span>
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
                                            id="payment_month_id"
                                            data_label="Month"
                                            data={paymentMonths}
                                            value={
                                                data.payment_month_id
                                            }
                                            onChange={(e) =>
                                                handleChangePaymentMonth(e.target.value)
                                            }
                                            type="text"
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.payment_month_id
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="educare-select-field-styles">
                                        <SelectInput
                                            id="staff_category_id"
                                            data_label="Staff Category"
                                            data={staffCategories}
                                            value={data.staff_category_id}
                                            onChange={(e) =>
                                                handleChangeStaffCategory(e.target.value)
                                            }
                                            type="text"
                                            className="block"
                                        />
                                    </div>

                                    <div className="educare-select-field-styles">
                                        <SelectInput
                                            id="staff_sub_category_id"
                                            data_label="Sub Category"
                                            data={staffSubCategories}
                                            value={
                                                data.staff_sub_category_id
                                            }
                                            onChange={(e) =>
                                                handleChangeStaffSubCategory(e.target.value)
                                            }
                                            type="text"
                                            className="block"
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
                                    <button
                                        type="button"
                                        className="educare-secondary-btn-md-fill"
                                    >
                                        <i className="icon-search-interface-symbol"></i>
                                    </button>
                                </Tooltip>
                            </div> */}

                            <div>
                                <Tooltip
                                    title="Reset"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <Link
                                        href={route('salary.bulk_process_salary')}
                                        className="educare-gray-btn-md-fill"
                                    >
                                        <i className="icon-ArrowsClockwise"></i>
                                    </Link>
                                </Tooltip>
                            </div>
                            {/* Replace changable buttons */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BulkProcessSalaryFilter;
