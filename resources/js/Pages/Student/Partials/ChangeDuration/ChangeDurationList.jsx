import SelectInput2 from "@/Components/SelectInput2";
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const ChangeDurationList = ({
    students = [],
    classrooms = [],
    searchValue = "",
    classroom_id = "",
}) => {
    const [dateValues, setDateValues] = useState({
        id: "",
        start_date_at: "",
        end_date_at: "",
        extension_date_at: "",
    });
    const [editedStudentId, setEditedStudentId] = useState(null);
    const handleInputChange = (id, field, value) => {
        setDateValues((prevData) => ({ ...prevData, id, [field]: value }));
    };

    useEffect(() => {
        setEditedStudentId(null);
    }, [students]);

    const handleSearch = (value) => {
        if (value) {
            router.get("/student/change-duration?search_query=" + value);
        } else {
            router.get("/student/change-duration");
        }
    };

    const handleClassRoom = (classRoomId) => {
        if (classRoomId === "Select Class") {
            router.get(route("student.change_duration"));
        } else if (!isNaN(parseInt(classRoomId))) {
            router.get("/student/change-duration?class_room_id=" + classRoomId);
        }
    };

    const concatName = (first_name, middle_name, last_name) => {
        const nameParts = [first_name, middle_name, last_name].filter(Boolean);
        return nameParts.join(" ");
    };

    const handleChangeDuration = (e) => {
        e.preventDefault();
        router.post(route("student.change_duration_update"), dateValues);
    };

    const handleEditClick = (
        id,
        start_date_at,
        end_date_at,
        extension_date_at
    ) => {
        setEditedStudentId(id);
        setDateValues({ id, start_date_at, end_date_at, extension_date_at });
        useEffect(() => {
            setDateValues({
                id,
                start_date_at,
                end_date_at,
                extension_date_at,
            });
        }, [dateValues]);
    };

    const handleEditCancel = () => {
        setEditedStudentId(null);
        setDateValues("");
    };


    return (
        <>
            {/* class change filter */}
            <div className="educare-admission-filtar-bar-area z-[4] relative">
                <div className="py-3 pt-0 educare-admission-filtar-bar">
                    <div className="educare-admission-filtar-bar-filter educare-registration-filtar-bar-filter justify-between">
                        <div className="educare-admission-filtar-bar-count">
                            <span>Total: {students && students.length}</span>
                        </div>
                        <div className="educare-admission-filtar-bar-filter-fields-wrap relative">
                            <div className="educare-admission-filtar-bar-filter-fields">
                                <div className="educare-input-field-styles lg:hidden"></div>
                                <div className="educare-input-field-styles">
                                    <TextInput
                                        id="student_search"
                                        defaultValue={searchValue}
                                        onChange={(e) =>
                                            handleSearch(e.target.value)
                                        }
                                        placeHolder="Search"
                                        type="text"
                                        className="block"
                                    />
                                </div>
                                <div className="educare-select-field-styles">
                                    <SelectInput2
                                        id="classroom_id"
                                        data_label="Class"
                                        data={classrooms}
                                        value={classrooms.classroom_id}
                                        selectedData={classroom_id}
                                        onChange={(e) =>
                                            handleClassRoom(e.target.value)
                                        }
                                        className="block"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* class change filter */}
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sl. NO</th>
                                        <th>Admission No</th>
                                        <th>Student Name</th>
                                        <th>Mobile</th>
                                        <th>Father Name</th>
                                        <th>Address</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Extension</th>
                                        <th
                                            style={{
                                                minWidth: "65px",
                                                important: "true",
                                            }}
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students?.length ? (
                                        students?.map((student, index) => (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{student?.admission_no}</td>
                                                <td>
                                                    {concatName(
                                                        student?.first_name,
                                                        student?.middle_name,
                                                        student?.last_name
                                                    )}
                                                </td>
                                                <td>
                                                    {student?.father_mobile}
                                                </td>
                                                <td>
                                                    {concatName(
                                                        student?.father_first_name,
                                                        student?.father_middle_name,
                                                        student?.father_last_name
                                                    )}
                                                </td>
                                                <td>
                                                    {student?.present_address}
                                                </td>
                                                <td>
                                                    {editedStudentId ===
                                                    student.id ? (
                                                        <div className="educare-input-field-styles">
                                                            <DatePicker
                                                                selected={
                                                                    dateValues.start_date_at
                                                                        ? new Date(
                                                                              dateValues.start_date_at
                                                                          )
                                                                        : null
                                                                }
                                                                onChange={(
                                                                    date
                                                                ) =>
                                                                    handleInputChange(
                                                                        student?.id,
                                                                        "start_date_at",
                                                                        date
                                                                    )
                                                                }
                                                                showYearDropdown
                                                                showMonthDropdown
                                                                useShortMonthInDropdown
                                                                showPopperArrow={
                                                                    false
                                                                }
                                                                peekNextMonth
                                                                dropdownMode="select"
                                                                isClearable
                                                                dateFormat="dd/MM/yyyy"
                                                                placeholderText="Select Date"
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {student?.start_date_at &&
                                                                moment(
                                                                    student?.start_date_at
                                                                ).format(
                                                                    "DD MMM, YYYY"
                                                                )}
                                                        </>
                                                    )}
                                                </td>
                                                <td>
                                                    {editedStudentId ===
                                                    student.id ? (
                                                        <div className="educare-input-field-styles">
                                                            <DatePicker
                                                                selected={
                                                                    dateValues.end_date_at
                                                                        ? new Date(
                                                                              dateValues.end_date_at
                                                                          )
                                                                        : null
                                                                }
                                                                onChange={(
                                                                    date
                                                                ) =>
                                                                    handleInputChange(
                                                                        student?.id,
                                                                        "end_date_at",
                                                                        date
                                                                    )
                                                                }
                                                                showYearDropdown
                                                                showMonthDropdown
                                                                useShortMonthInDropdown
                                                                showPopperArrow={
                                                                    false
                                                                }
                                                                peekNextMonth
                                                                dropdownMode="select"
                                                                isClearable
                                                                dateFormat="dd/MM/yyyy"
                                                                placeholderText="Select Date"
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {student?.end_date_at &&
                                                                moment(
                                                                    student?.end_date_at
                                                                ).format(
                                                                    "DD MMM, YYYY"
                                                                )}
                                                        </>
                                                    )}
                                                </td>
                                                <td>
                                                    {editedStudentId ===
                                                    student.id ? (
                                                        <div className="educare-input-field-styles">
                                                            <DatePicker
                                                                selected={
                                                                    dateValues.extension_date_at
                                                                        ? new Date(
                                                                              dateValues.extension_date_at
                                                                          )
                                                                        : null
                                                                }
                                                                onChange={(
                                                                    date
                                                                ) =>
                                                                    handleInputChange(
                                                                        student?.id,
                                                                        "extension_date_at",
                                                                        date
                                                                    )
                                                                }
                                                                showYearDropdown
                                                                showMonthDropdown
                                                                useShortMonthInDropdown
                                                                showPopperArrow={
                                                                    false
                                                                }
                                                                peekNextMonth
                                                                dropdownMode="select"
                                                                isClearable
                                                                dateFormat="dd/MM/yyyy"
                                                                placeholderText="Select Date"
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {student?.extension_date_at &&
                                                                moment(
                                                                    student?.extension_date_at
                                                                ).format(
                                                                    "DD MMM, YYYY"
                                                                )}
                                                        </>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                        {editedStudentId ===
                                                        student.id ? (
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
                                                                            onClick={
                                                                                handleEditCancel
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
                                                                            type="button"
                                                                            onClick={
                                                                                handleChangeDuration
                                                                            }
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
                                                                            onClick={() =>
                                                                                handleEditClick(
                                                                                    student?.id,
                                                                                    student?.start_date_at,
                                                                                    student?.end_date_at,
                                                                                    student?.extension_date_at
                                                                                )
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
                                            <td
                                                className="text-center text-red-500"
                                                colSpan="10"
                                            >
                                                Data not found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangeDurationList;
