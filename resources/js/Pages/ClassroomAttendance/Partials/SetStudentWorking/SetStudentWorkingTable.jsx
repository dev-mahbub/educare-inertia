import InputError from "@/Components/InputError";
import Loader from "@/Components/Loader";
import SelectInput from "@/Components/SelectInput";
import SelectInput2 from "@/Components/SelectInput2";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
const SetStudentWorkingTable = ({
    studentDetails = [],
    academicSession = [],
    monthArr = [],
    classNames = [],
    classrooms = [],
    academicYearId = '',
    monthId = '',
    classId = '',
    classroomId = '',
}) => {

    const [classroomData, setClassroomData] = useState(classrooms?.filter((item) => item.class_name_id == classId));
    const [loading, setLoading] = useState(false);

    const {
        data,
        setData,
        errors,
        post,
        reset,
    } = useForm({
        student_id: "",
        working_days: "",
        bonus_days: "",
        month_id: monthId,
        academic_year_id: academicYearId,
        class_name_id: classId,
        classroom_id: classroomId,
        is_show_list: false,
    });

    const handleClassName = (id) => {
        const filteredClassroom = classrooms?.filter((item) => item.class_name_id == id);
        setClassroomData(filteredClassroom);
    }

    const handelSearch = (e) => {
        e.preventDefault();
        router.post(route('classroom_attendance.set_student_working'), data);
        setLoading(false);
    }

    const handelReset = (e) => {
        e.preventDefault();
        router.get(route('classroom_attendance.set_student_working'));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('classroom_attendance.set_student_working_save'), data, {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    useEffect(() => {
        setData({
            ...data,
            student_id: '',
            month_id: monthId,
            academic_year_id: academicYearId,
            class_name_id: classId,
            classroom_id: classroomId,
            is_show_list: true,
        });
        setLoading(false);
    }, [studentDetails]);

    console.log('data', data);
    console.log('studentDetails', studentDetails);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="educare-header-filtar-bar-area z-[4] relative">
                    <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                        <div className="educare-header-filtar-bar-main">
                            <div className=" educare-header-filtar-bar-inner-main">
                                {/* delete count if don't need */}
                                <div className="educare-card-title pb-none">
                                    <h5>
                                        <i className="icon-WarningCircle"></i>
                                        Set student wise bonus days
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
                                                transform: `translateX(-${currentIndex * 120
                                                    }px)`,
                                            }}
                                        >
                                            {/* Replace changable inputs */}
                                            <div className="educare-input-field-styles">
                                                <SelectInput
                                                    id="month_id"
                                                    data_label="Month"
                                                    data={monthArr}
                                                    value={data.month_id}
                                                    onChange={(e) =>
                                                        setData(
                                                            "month_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.month_id}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div className="educare-input-field-styles">
                                                <SelectInput
                                                    id="academic_year_id"
                                                    data_label="Year"
                                                    data={academicSession}
                                                    value={data.academic_year_id}
                                                    onChange={(e) =>
                                                        setData(
                                                            "academic_year_id",
                                                            e.target.value
                                                        )
                                                    }
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
                                                    onChange={(e) => {
                                                        setData({
                                                            ...data,
                                                            "is_show_list": false,
                                                            "class_name_id": e.target.value
                                                        })
                                                        handleClassName(e.target.value);
                                                    }
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.class_name_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <SelectInput2
                                                    id="classroom_id"
                                                    data_label="Section"
                                                    data={classroomData}
                                                    selectedData={data.classroom_id}
                                                    // value={data.classroom_id}
                                                    onChange={(e) =>
                                                        setData({
                                                            ...data,
                                                            "is_show_list": false,
                                                            "classroom_id": e.target.value
                                                        }
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.classroom_id}
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
                                            <Link
                                                href="#"
                                                className="educare-secondary-btn-md-fill"
                                                onClick={(e) => handelSearch(e)}
                                                type="button"
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
                                                onClick={(e) => handelReset(e)}
                                                type="button"
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
                <div className="educare-admission-list-inner-wrapper">
                    <div className="educare-admission-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Roll No</th>
                                    <th>Adm No</th>
                                    <th>Father Name</th>
                                    <th>Total Working Days</th>
                                    <th>Bonus Days</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <Loader></Loader>
                            ) : (
                                <tbody>
                                    {studentDetails?.length && data?.is_show_list ? (
                                        studentDetails?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.student_name}</td>
                                                <td>{item?.classroom_roll}</td>
                                                <td>{item?.admission_no}</td>
                                                <td>{item?.father_name}</td>
                                                <td>
                                                    <div className="educare-input-field-styles">
                                                        {item?.student_id === data?.student_id ?
                                                            <>
                                                                <TextInput
                                                                    id="working_days"
                                                                    defaultValue={item?.working_days}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "working_days",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    type="number"
                                                                />
                                                                <InputError
                                                                    message={errors.working_days}
                                                                    className="mt-2"
                                                                />
                                                            </>
                                                            :
                                                            <TextInput
                                                                id="working_days"
                                                                defaultValue={item?.working_days}
                                                                disabled={true}
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "working_days",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="block disabled"
                                                            />
                                                        }


                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="educare-input-field-styles">
                                                        {item?.student_id === data?.student_id ?
                                                            <>
                                                                <TextInput
                                                                    id="bonus_days"
                                                                    defaultValue={item?.bonus_days}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "bonus_days",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    type="number"
                                                                />
                                                                <InputError
                                                                    message={errors.bonus_days}
                                                                    className="mt-2"
                                                                />
                                                            </>
                                                            :
                                                            <TextInput
                                                                id="bonus_days"
                                                                defaultValue={item?.bonus_days}
                                                                disabled={true}
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "bonus_days",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="block disabled"
                                                            />
                                                        }

                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                        {item?.student_id === data?.student_id ? (
                                                            <>
                                                                <div>
                                                                    <Tooltip
                                                                        title="Remove"
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            className="educare-danger-btn-sm-fill"
                                                                            onClick={(e) => {
                                                                                setData({
                                                                                    ...data,
                                                                                    student_id: "",
                                                                                    working_days: "",
                                                                                    bonus_days: "",
                                                                                })
                                                                            }
                                                                            }
                                                                        >
                                                                            X
                                                                        </button>
                                                                    </Tooltip>
                                                                </div>
                                                                <div>
                                                                    <Tooltip
                                                                        title="Save"
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <button
                                                                            className="educare-success-btn-sm-fill"
                                                                            type="submit"
                                                                        // onClick={(e) => handleSubmit(e)}
                                                                        >
                                                                            <i className="icon-check-1"></i>
                                                                        </button>
                                                                    </Tooltip>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div>
                                                                    <Tooltip
                                                                        title="Edit"
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <button
                                                                            onClick={(e) => {
                                                                                setData({
                                                                                    ...data,
                                                                                    student_id: item?.student_id,
                                                                                    classroom_id: item?.classroom_id,
                                                                                    class_name_id: item?.class_name_id,
                                                                                    working_days: item?.working_days,
                                                                                    bonus_days: item?.bonus_days,
                                                                                })
                                                                            }
                                                                            }
                                                                            className="educare-warning-btn-sm-fill"
                                                                            type="button"
                                                                        >
                                                                            <i className="icon-pen"></i>
                                                                        </button>
                                                                    </Tooltip>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="12">
                                                Data not found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            )}
                        </table>
                    </div>
                </div>
            </form>
        </>
    );
};

export default SetStudentWorkingTable;
