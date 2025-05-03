import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useRef, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function UpdateFilter({
    students = '',
    classNames,
    classrooms,
    formData,
    setFormData,
    setSelectedStudentIds,
    selectedStudentIds,
    data,
    setData,
    reset,
    errors
}) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const examStatusInput = useRef();

    // const {
    //     data,
    //     setData,
    //     errors,
    //     post,
    //     reset,
    //     processing,
    //     recentlySuccessful,
    // } = useForm({
    //     exam_status: "",
    //     ews_id: "",
    //     search_query: "",
    //     special_child: "",
    //     year_id: "",
    //     class_id: "",
    //     reg_status: "",
    //     class_name_id: "",
    //     classroom_id: "",
    // });

    // handle class name change start
    const handleClassNameChange = (e) => {
        const class_name_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            class_name_id: class_name_id,
            classroom_id: ""
        }));

        const form_data = {
            class_name_id: class_name_id
        }

        router.post(route('student.update_details'), form_data)
    }
    // handle class name change end

    // handle classroom change start
    const handleClassroomChange = (e) => {
        const classroom_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            classroom_id: classroom_id
        }));
    }
    // handle classroom change end

    // handle filter student start
    const handleFilterStudent = (e) => {
        e.preventDefault();

        if(data?.classroom_id == "") {
            toast.error("Please select section", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else {
            const form_data = {
                class_name_id: data?.class_name_id ?? "",
                classroom_id: data?.classroom_id ?? "",
                search_query: data?.search_query ?? ""
            }

            setSelectedStudentIds([]);

            router.post(route('student.update_details'), form_data);
        }
    }
    // handle filter student end

    // handle update all student start
    const handleUpdateAllStudent = (e) => {
        e.preventDefault();

        if (selectedStudentIds?.length > 0) {
            router.post(route("student.update_details_save"), formData, {
                onSuccess: () => {
                    reset();
                    setFormData([]);
                    setSelectedStudentIds([]);
                }
            });
        }
        else {
            toast.error("Please select atleast one row to update", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
    }
    // handle update all student end

    const registrationFilterData = (e) => {
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


    return (
        <div className='educare-admission-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={registrationFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-admission-filtar-bar-count">
                                <span>Total: {students && students?.length}</span>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        <div className="educare-input-field-styles">
                                                <Tooltip
                                                    title="Save All"
                                                    placement="top"
                                                    arrow
                                                    as="button"
                                                >
                                                    <button
                                                        type="button"
                                                        className="educare-secondary-btn-md-fill"
                                                        onClick={(e) => {
                                                            handleUpdateAllStudent(e)
                                                        }}
                                                    >
                                                        Save All
                                                    </button>
                                                </Tooltip>
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="search_query"
                                                value={data.search_query}
                                                onChange={(e) => setData("search_query", e.target.value)}
                                                placeHolder="Search"
                                                type="text"
                                                className="block"
                                            />
                                            <InputError message={errors.search_query} className="mt-2" />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="class_id"
                                                data_label="Class"
                                                data={classNames}
                                                value={data.class_name_id}
                                                onChange={(e) =>
                                                    handleClassNameChange(e)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.class_name_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="section_id"
                                                data_label="Section"
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
                                            onClick={(e) => {
                                                handleFilterStudent(e)
                                            }}
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                                {/* <div>
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
                                </div> */}
                                <div>
                                    <Tooltip
                                        title="Reset"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <Link
                                            href={route('student.update_details')}
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
    );
};
