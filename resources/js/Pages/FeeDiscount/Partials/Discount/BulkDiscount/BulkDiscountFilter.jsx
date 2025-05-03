import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

const BulkDiscountFilter = ({
    classrooms = [],
    discounts = [],
    sendSlecetedDiscountDataToParent,
    sendSubmitEventToParent,
    discountAddStatus = false,
    setDiscountAddStatus,
    setStudentsData
}) => {
    const [selectedDiscount, setSelectedDiscount] = useState({});

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
        discount_id: "",
    });

    useEffect(() => {
        if (discountAddStatus == true) {
            setSelectedDiscount({});
        }
    }, [discountAddStatus]);

    useEffect(() => {
        if (discountAddStatus === true) {
            reset();
            setDiscountAddStatus(false);
        }
    }, [discountAddStatus, setDiscountAddStatus]);

    useEffect(() => {
        let count = 0;

        if (selectedDiscount != null) {
            sendSlecetedDiscountDataToParent(selectedDiscount);
        } else {
            if (count === 0) {
                sendSlecetedDiscountDataToParent({});
            }
            count++;
        }
    }, [selectedDiscount]);

    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    const handleFormReset = (e) => {
        e.preventDefault();

        reset();
        setSelectedDiscount({});
        sendSlecetedDiscountDataToParent([]);
        setStudentsData([]);
    };

    const handleDiscountApply = (e) => {
        e.preventDefault();
        sendSubmitEventToParent(e);
    };

    // handle classroom change start
    const handleClassroomChange = (e) => {
        const classroom_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            classroom_id: classroom_id
        }));

        const form_data = {
            classroom_id: classroom_id
        }

        router.post(route('fee_discount.bulk'), form_data)
    };
    // handle classroom change end

    return (
        <>
            <div className="educare-card-title leading-none">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Student Bulk Discount
                </h5>
            </div>
            <div className="educare-admission-filtar-bar-area z-[4] relative">
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={handleDiscountApply}>
                            <div className=" educare-header-filtar-bar-inner-main justify-between">
                                <div className="educare-header-filtar-bar-inner-main-wrap">
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
                                                    data_label="Class"
                                                    data={classrooms}
                                                    value={data.classroom_id}
                                                    onChange={(e) => {
                                                        handleClassroomChange(e)
                                                    }}
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.classroom_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    data_label="Discount"
                                                    data={discounts}
                                                    value={data.discount_id}
                                                    onChange={(e) => {
                                                        setData(
                                                            "discount_id",
                                                            e.target.value
                                                        );
                                                        setSelectedDiscount(
                                                            discounts.find(
                                                                (discount) =>
                                                                    discount.id ==
                                                                    e.target
                                                                        .value
                                                            )
                                                        );
                                                    }}
                                                    type="text"
                                                    className="block"
                                                />

                                                <InputError
                                                    message={errors.discount_id}
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
                                    {selectedDiscount &&
                                        Object.keys(selectedDiscount).length >
                                            0 && (
                                            <div>
                                                <PrimaryButton
                                                    type="button"
                                                    className="educare-secondary-btn-md-fill"
                                                >
                                                    {selectedDiscount?.is_discount_percentage
                                                        ? "Percentage Discount"
                                                        : "Flat Discount"}
                                                </PrimaryButton>
                                            </div>
                                        )}
                                    <div>
                                        <Tooltip
                                            title="Reset"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <button
                                                type="button"
                                                onClick={handleFormReset}
                                                className="educare-gray-btn-md-fill"
                                            >
                                                <i className="icon-ArrowsClockwise"></i>
                                            </button>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <PrimaryButton
                                            type="submit"
                                            className="educare-primary-btn-md-fill"
                                        >
                                            Apply Discount
                                        </PrimaryButton>
                                    </div>
                                    {/* Replace changable buttons */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BulkDiscountFilter;
