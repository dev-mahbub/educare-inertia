import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";


const StudentAvailingDiscountFilter = ({
    studentFeeDiscounts = [],
    setStudentFeeDiscountsData,
    totalReportCount,
    classrooms = [],
    discounts = [],
    setLoading
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
        classroom_id: "",
        discount_id: "",
        search: "",
    });

    // handle search input change start
    const handleSearch = (e) => {
        const filter_text = e.target.value;

        setData((prevData) => ({
            ...prevData,
            search: filter_text
        }));

        if (Object.keys(studentFeeDiscounts)?.length > 0) {
            const filteredStudentFeeDiscountReports = Object.values(studentFeeDiscounts)?.filter((item) => {
                const inputText = filter_text?.toLowerCase()?.trim();
                const studentAdmissionNo = item?.student?.admission_no?.toLowerCase();
                const rollNo = item?.student?.classroom_roll?.roll_no?.toLowerCase();
                const studentName = (`${item?.student?.first_name} ${item?.student?.middle_name} ${item?.student?.last_name}`)?.toLowerCase();
                const classroomTitle = item?.student?.classroom?.title?.toLowerCase();
                const discountTitle = item?.discount?.title?.toLowerCase();
                const discountType = item?.discount?.is_discount_percentage ? 'percentage' : 'flat';
                const createdBy = (`${item?.created_by?.first_name} ${item?.created_by?.middle_name} ${item?.created_by?.last_name}`)?.toLowerCase();

                return (
                    studentName && studentName?.includes(inputText) ||
                    rollNo && rollNo?.includes(inputText) ||
                    studentAdmissionNo && studentAdmissionNo?.includes(inputText) ||
                    classroomTitle && classroomTitle?.includes(inputText) ||
                    discountTitle && discountTitle?.includes(inputText) ||
                    discountType && discountType?.includes(inputText) ||
                    createdBy && createdBy?.includes(inputText)
                );
            });

            setStudentFeeDiscountsData(filteredStudentFeeDiscountReports);
        }
        else {
            setStudentFeeDiscountsData([]);
        }
    }
    // handle search input change end


    // handle classroom change start
    const handleClassroomChange = (e) => {
        const classroom_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            classroom_id: classroom_id
        }));

        const form_data = {
            classroom_id: classroom_id,
            discount_id: data?.discount_id
        }

        handleStudentDiscountFilter(form_data)
    }
    // handle classroom change end


    // handle classroom change start
    const handleDiscountChange = (e) => {
        const discount_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            discount_id: discount_id
        }));

        const form_data = {
            classroom_id_id: data?.classroom_id,
            discount_id: discount_id
        }

        handleStudentDiscountFilter(form_data)
    }
    // handle classroom change end


    // handle student discount filter start
    const handleStudentDiscountFilter = (form_data) => {
        setLoading(false);

        router.post(route('fee_discount.report'), form_data);
    }
    // handle student discount filter end


    const StudentDiscountData = (e) => {
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



    return (
        <>
            <div className="educare-card-title leading-none">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Fee Discount Report
                </h5>
            </div>
            <div className='educare-admission-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={StudentDiscountData}>
                            <div className=" educare-header-filtar-bar-inner-main">
                                <div className="educare-admission-filtar-bar-count">
                                    <span>Total: {totalReportCount}</span>
                                </div>
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="search"
                                                    value={
                                                        data.search
                                                    }
                                                    onChange={(e) =>
                                                        handleSearch(e)
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
                                                    id="classroom_id"
                                                    data_label="All Class"
                                                    data={classrooms}
                                                    value={data.classroom_id}
                                                    onChange={(e) =>
                                                        handleClassroomChange(e)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.classroom_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="discount_id"
                                                    data_label="Discount"
                                                    data={discounts}
                                                    value={data.discount_id}
                                                    onChange={(e) =>
                                                        handleDiscountChange(e)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.discount_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                    </div>
                                </div>
                                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
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
                                                onClick={(e) => {
                                                    handleStudentDiscountFilter(e)
                                                }}
                                            >
                                                <i className="icon-search-interface-symbol"></i>
                                            </button>
                                        </Tooltip>
                                    </div> */}
                                    <div>
                                        <Tooltip
                                            title="Excel Sheet"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <Link
                                                href="#"
                                                className="educare-success-btn-md-fill"
                                            >
                                                <i className="icon-FileX"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip
                                            title="Import Student Discount"
                                            placement="top"
                                            arrow
                                        >
                                            <Link
                                                href="#"
                                                className="educare-dark-btn-md-fill"
                                            >
                                                <i className="icon-upload"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                    {/* <div>
                                        <Tooltip
                                            title="Reset"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <Link
                                                href={route('fee_discount.report')}
                                                className="educare-gray-btn-md-fill"
                                            >
                                                <i className="icon-ArrowsClockwise"></i>
                                            </Link>
                                        </Tooltip>
                                    </div> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentAvailingDiscountFilter;
