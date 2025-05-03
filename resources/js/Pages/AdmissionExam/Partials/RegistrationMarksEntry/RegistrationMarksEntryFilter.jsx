import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationMarksEntryFilter = ({
    academicYears,
    classNames,
    enquiries,
    exams,
    data,
    setData,
    errors
 }) => {

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();
    };

    // handle academic year change start
    const handleAcademicYearChange = (e) => {
        const academic_year_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            academic_year_id: academic_year_id,
            class_name_id: "",
            enquiry_id: "",
            exam_id: "",
        }));

        const form_data = {
            academic_year_id: academic_year_id,
        }

        router.post(route('admission_exam.registration_marks_entry'), form_data);
    }
    // handle academic year change end

    // handle class change start
    const handleClassChange = (e) => {
        const class_name_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            class_name_id: class_name_id,
            enquiry_id: "",
            exam_id: "",
        }));

        const form_data = {
            academic_year_id: data?.academic_year_id ?? "",
            class_name_id: class_name_id,
        }

        router.post(route('admission_exam.registration_marks_entry'), form_data);
    }
    // handle class change end

    // handle filter data start
    const handleFilterData = (e) => {
        e.preventDefault();

        if (data?.academic_year_id == "" || data?.class_name_id == "" || data?.enquiry_id == "" || data?.exam_id == "") {
            toast.error("Please select all fields.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            const form_data = {
                academic_year_id: data?.academic_year_id ?? "",
                class_name_id: data?.class_name_id ?? "",
                enquiry_id: data?.enquiry_id ?? "",
                exam_id: data?.exam_id ?? "",
            }

            router.post(route('admission_exam.registration_marks_entry'), form_data);
        }
    }
    // handle filter data end


    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    // route name: admission_exam.registration_marks_entry

    return (
        <div className="educare-header-filtar-bar-area z-[4] relative">
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={CommonHeaderFilterData} className="mb-2.5">
                        <div className=" educare-header-filtar-bar-inner-main">
                            {/* delete count if don't need */}
                            <div className="educare-card-title mr-auto pb-none">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Enter Registration Marks
                                </h5>
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

                                        <div className="educare-input-field-styles">
                                        <SelectInput
                                                    data_label="Academic Year"
                                                    data={academicYears}
                                                    value={data.academic_year_id}
                                                    onChange={(e) =>
                                                        handleAcademicYearChange(e)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.academic_year_id}
                                                    className="mt-2"
                                                />
                                        </div>

                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="class_name_id"
                                                data_label="Class"
                                                data={classNames}
                                                value={data.class_name_id}
                                                onChange={(e) =>
                                                    handleClassChange(e)
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.class_name_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="enquiry_id"
                                                data_label="Student"
                                                data={enquiries}
                                                value={data.enquiry_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "enquiry_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.enquiry_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="exam_id"
                                                data_label="Exam"
                                                data={exams}
                                                value={data.exam_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "exam_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.exam_id}
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
                                            onClick={(e) => {
                                                handleFilterData(e)
                                            }}
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
                                        <Link
                                            href={route('admission_exam.registration_marks_entry')}
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

export default RegistrationMarksEntryFilter;
