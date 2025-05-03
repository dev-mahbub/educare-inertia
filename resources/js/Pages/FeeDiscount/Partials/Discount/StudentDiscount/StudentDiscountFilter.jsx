import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";


const StudentDiscountFilter = ({
    classrooms = [],
    discounts = [],
    setSelectedStudent,
    selectedStudent,
    students,
    selectedDiscount,
    setSelectedDiscount,
    setUnpaidFeesData,
    studentUnpaidFees,
    discountAddStatus,
    setDiscountAddStatus,
    student
}) => {

    const [filteredStudents, setFilteredStudents] = useState([]);

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
        student_id: "",
        discount_id: "",
        admission_no: "",
    });

    useEffect(() => {
        setSelectedStudent(student);
    }, [student]);

    useEffect(() => {
        if (discountAddStatus == true) {
            reset();
        }
    }, [discountAddStatus]);


    useEffect(() => {
        setFilteredStudents(students?.sort(customSort));
    }, [students]);


    useEffect(() => {
        if (selectedStudent?.id != null) {
            setData((prevData) => ({
                ...prevData,
                admission_no: selectedStudent?.admission_no ?? "",
                classroom_id: selectedStudent?.classroom_id ?? "",
                student_id: selectedStudent?.id ?? "",
            }));

            setUnpaidFeesData(studentUnpaidFees[selectedStudent?.id] ?? []);
        }
        else {
            setData((prevData) => ({
                ...prevData,
                student_id: selectedStudent?.id ?? "",
            }));

            setUnpaidFeesData([]);
        }
    }, [selectedStudent]);


    // handle admnission no change start
    const handleAdmissionNoChange = (e) => {
        const admission_no = e.target.value;

        setData((prevData) => ({
            ...prevData,
            admission_no: admission_no
        }));

        setDiscountAddStatus(false);
    }

    const handleAdmissionNoKeyPress = (e) => {
        const key = e.key;

        if (key == 'Enter') {
            e.preventDefault();

            const form_data = {
                admission_no: data?.admission_no,
            }

            router.post(route('fee_discount.student'), form_data);
        }
    }
    // handle admnission no change end


    // handle classroom change start
    const handleClassroomChange = (e) => {
        const classroom_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            admission_no: "",
            classroom_id: classroom_id,
            student_id: "",
        }));

        setDiscountAddStatus(false);

        const form_data = {
            classroom_id: classroom_id,
        }

        router.post(route('fee_discount.student'), form_data);
    }
    // handle classroom change end


    // handle student change start
    const handleStudentChange = (e) => {
        const student_id = e.target.value;
        const selected_student = students?.find(item => item?.id == student_id);

        setSelectedStudent(selected_student);

        setData((prevData) => ({
            ...prevData,
            admission_no: selected_student?.admission_no ?? "",
            student_id: selected_student?.id ?? "",
        }));

        setDiscountAddStatus(false);
    }
    // handle student change end


    // handle discount change start
    const handleDiscountChange = (e) => {
        const discount_id = e.target.value;
        const selected_discount = discounts?.find(item => item?.id == discount_id);

        setSelectedDiscount(selected_discount);

        setData((prevData) => ({
            ...prevData,
            discount_id: selected_discount?.id ?? "",
        }));

        setDiscountAddStatus(false);
    }
    // handle discount change end



    const ExpectedDiscountData = (e) => {
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


    // sort students by classroom roll start
    function customSort(a, b) {
        // Check if classroomRoll exists and roll_no is not null for both a and b
        if (a.classroom_roll && b.classroom_roll && a.classroom_roll.roll_no != null && b.classroom_roll.roll_no != null) {
            return a.classroom_roll.roll_no - b.classroom_roll.roll_no;
        } else if (!a.classroom_roll || a.classroom_roll.roll_no == null) {
            // Handle null values for a
            return 1; // Move a to the end of the sorted array
        } else {
            // Handle null values for b
            return -1; // Move b to the end of the sorted array
        }
    }
    // sort students by classroom roll end


    return (
        <>
            <div className='educare-admission-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={ExpectedDiscountData}>
                            <div className=" educare-header-filtar-bar-inner-main">
                                <div className="educare-card-title leading-none">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Student Discount
                                    </h5>
                                </div>
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={
                                                        data.admission_no
                                                    }
                                                    onChange={(e) =>
                                                        handleAdmissionNoChange(e)
                                                    }
                                                    onKeyPress={(e) => {
                                                        handleAdmissionNoKeyPress(e)
                                                    }}
                                                    className="block"
                                                    placeHolder="Admissoin No."
                                                />
                                                <InputError
                                                    message={
                                                        errors.admission_no
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    data_label="Class"
                                                    data={classrooms}
                                                    value={data.classroom_id}
                                                    selected={data.classroom_id}
                                                    onChange={(e) => {
                                                        handleClassroomChange(e);
                                                    }
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
                                                    data_label="Student"
                                                    data={filteredStudents}
                                                    value={data.student_id}
                                                    onChange={(e) => {
                                                        handleStudentChange(e)
                                                    }
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.student_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    data_label="Discount"
                                                    data={discounts}
                                                    value={data.discount_id}
                                                    selected={data.discount_id}
                                                    onChange={(e) => {
                                                        handleDiscountChange(e)
                                                    }
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
                                        <Link
                                            href="#"
                                            className="educare-secondary-btn-md-fill"
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </Link>
                                    </Tooltip>
                                </div> */}
                                    {/* <div>
                                    <Tooltip
                                        title="Reset"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <Link
                                            href={route('fee_discount.student')}
                                            className="educare-gray-btn-md-fill"
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
                                    </Tooltip>
                                </div> */}
                                    <div>
                                        <PrimaryButton
                                            // disabled={processing}
                                            className="educare-primary-btn-md-fill"
                                            type="button"
                                        >
                                            {selectedDiscount?.is_discount_percentage ? 'Percentage Discount' : 'Flat Discount'}
                                        </PrimaryButton>
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

export default StudentDiscountFilter;
