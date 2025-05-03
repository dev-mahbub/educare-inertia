import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect } from "react";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const StudentSubjectWiseReportFilter = ({
    subjects,
    classrooms,
    students,
    student
}) => {
    // const [filterStudent, setFilterStudent] = useState([]);
    // const [filteredSubjects, setFilteredSubjects] = useState([]);

    const {
        data,
        setData,
    } = useForm({
        classroom_id: "",
        student_id: "",
        subject_id: "",
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            student_id: student?.id ?? "",
        }));
    }, [student]);

    // Handle Classroom Changes
    const handleClassroomChange = (id) => {
        // setFilteredSubjects(
        //     subjects?.filter((item) => item?.classroom_id == id)
        // );
        // setFilterStudent(
        //     getActiveStudent?.filter((item) => item?.classroom_id == id)
        // );

        setData((prevData) => ({
            ...prevData,
            classroom_id: id,
            student_id: "",
            subject_id: "",
        }));

        const form_data = {
            classroom_id: id
        }

        router.post(route("academic_report.student_subject_wise_report"), form_data);
    };

    const handleSearchField = (e) => {
        e.preventDefault();
        router.post(route("academic_report.student_subject_wise_report"), data);
    };

    //scrollable filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollable filter bar end here

    // toast.error("Please select a student.", {
    //     position: 'top-right',
    //     autoClose: 1500,
    // })


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
        <div className="educare-header-filtar-bar-area z-[4] relative">
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Student Subject Wise Report
                                </h5>
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
                                            transform: `translateX(-${
                                                currentIndex * 120
                                            }px)`,
                                        }}
                                    >
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Class"
                                                data={classrooms}
                                                value={data.classroom_id}
                                                onChange={(e) =>
                                                    handleClassroomChange(
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block"
                                            />
                                        </div>
                                        {/* <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Student"
                                                data={filterStudent}
                                                value={data.student_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "student_id",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block"
                                            />
                                        </div> */}
                                        <div className="educare-select-field-styles">
                                            <FormControl>
                                                {data?.student_id == "" &&
                                                    <InputLabel shrink={false}>Select Student</InputLabel>
                                                }
                                                <Select
                                                    value={data?.student_id}
                                                    onChange={(e) => {
                                                        setData('student_id' , e.target.value)
                                                    }}
                                                    id="grouped-select"
                                                    className="w-[160px] h-[40px]"
                                                >
                                                    <MenuItem value="">
                                                        <em>Select Student</em>
                                                    </MenuItem>
                                                    {Object.values(students)?.map((groupedStudents, index) => [
                                                        <ListSubheader className="material-selet-subheader" key={`header-${index}`}>
                                                            {groupedStudents?.student_type ?? ""}
                                                        </ListSubheader>,
                                                        ...Object.values(groupedStudents?.options)?.sort(customSort).map((option, optionIndex) => (
                                                            <MenuItem
                                                                key={`option-${index}-${optionIndex}`}
                                                                value={option.id}
                                                            >
                                                                {option?.title ?? ""}
                                                            </MenuItem>
                                                        )),
                                                    ])}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Subject"
                                                data={subjects}
                                                value={data.subject_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "subject_id",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block"
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
                                            className="educare-secondary-btn-md-fill"
                                            onClick={(e) => {
                                                handleSearchField(e);
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
                                            href="#"
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

export default StudentSubjectWiseReportFilter;
