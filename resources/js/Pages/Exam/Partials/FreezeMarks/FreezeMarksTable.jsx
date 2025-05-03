import DangerButton from '@/Components/DangerButton';
import SelectInput from "@/Components/SelectInput";
import SuccessButton from '@/Components/SuccessButton';
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FreezeMarksTable = ({
    exams,
    freezeMarksSubjectWiese,
    classNames,
    classrooms,
    subjects,
    data,
    setData,
    setFilteredClassNames,
    setFilteredClassrooms,
    setFilteredSubjects
}) => {

    // handle search start
    const handleSearchFielter = (e) => {
        e.preventDefault();

        if(data?.exam_id == "" || data?.class_name_id == "" || data?.classroom_id == "") {
            toast.error("Please select exam and class.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            const form_data = {
                type: 'subject_wise',
                exam_id: data?.exam_id,
                class_name_id: data?.class_name_id,
                classroom_id: data?.classroom_id,
                subject_id: data?.subject_id
            }

            router.post(route('exam.freeze_marks'), form_data);
        }
    }
    // handle search end

    // handle reset start
    const handleReset = (e) => {
        e.preventDefault();

        setFilteredClassNames([]);
        setFilteredClassrooms([]);
        setFilteredSubjects([]);

        setData((prevData) => ({
            ...prevData,
            exam_id: "",
            class_name_id: "",
            classroom_id: "",
            subject_id: ""
        }));

        const form_data = {
            type: 'subject_wise',
            exam_id: "",
            class_name_id: "",
            classroom_id: "",
            subject_id: ""
        }

        router.post(route('exam.freeze_marks'), form_data);
    }
    // handle reset end

    // handle change exam start
    const handleExamChange = (e) => {
        const exam_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            exam_id: exam_id,
            class_name_id: "",
            classroom_id: "",
            subject_id: ""
        }));

        setFilteredClassNames([]);
        setFilteredClassrooms([]);
        setFilteredSubjects([]);

        const form_data = {
            type: 'subject_wise',
            exam_id: exam_id
        }

        router.post(route('exam.freeze_marks'), form_data);
    }
    // handle change exam end

    // handle change class name start
    const handleClassNameChange = (e) => {
        const class_name_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            class_name_id: class_name_id,
            classroom_id: "",
            subject_id: ""
        }));

        setFilteredClassrooms([]);
        setFilteredSubjects([]);

        const form_data = {
            type: 'subject_wise',
            exam_id: data?.exam_id,
            class_name_id: class_name_id
        }

        router.post(route('exam.freeze_marks'), form_data);
    }
    // handle change class name end

    // handle change classroom start
    const handleClassroomChange = (e) => {
        const classroom_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            classroom_id: classroom_id,
            subject_id: ""
        }));

        setFilteredSubjects([]);

        const form_data = {
            type: 'subject_wise',
            exam_id: data?.exam_id,
            class_name_id: data?.class_name_id,
            classroom_id: classroom_id,
        }

        router.post(route('exam.freeze_marks'), form_data);
    }
    // handle change classroom end

    // handle freeze subject wise start
    const handleFreezeSubjectWise = (e, examId, classroomId, subjectId, statusType) => {
        e.preventDefault();

        const form_data = {
            type: 'subject_wise',
            exam_id: examId,
            classroom_id: classroomId,
            subject_id: subjectId,
            status_type: statusType,
            _method: 'put'
        }

        router.post(route('exam.freeze_marks_status.update'), form_data, {
            onSuccess: () => {
                const form_data = {
                    type: 'subject_wise',
                    exam_id: data?.exam_id,
                    class_name_id: data?.class_name_id,
                    classroom_id: data?.classroom_id,
                    subject_id: data?.subject_id
                }

                router.post(route('exam.freeze_marks'), form_data);
            }
        });
    }
    // handle freeze subject wise end

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();
    };
    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    return (
        <>
            <div className="educare-header-filtar-bar-area z-[4] relative">
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={CommonHeaderFilterData}>
                            <div className=" educare-header-filtar-bar-inner-main">
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <span>Total: {freezeMarksSubjectWiese?.length}</span>
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
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="exam_id"
                                                    data_label="Schedule"
                                                    data={exams}
                                                    value={data?.exam_id}
                                                    onChange={(e) =>
                                                        handleExamChange(e)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="class_name_id"
                                                    data_label="Class"
                                                    data={classNames}
                                                    value={data?.class_name_id}
                                                    onChange={(e) =>
                                                        handleClassNameChange(e)
                                                    }
                                                    type="text"
                                                    className="block"

                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="classroom_id"
                                                    data_label="Section"
                                                    data={classrooms}
                                                    value={data?.classroom_id}
                                                    onChange={(e) =>
                                                        handleClassroomChange(e)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="subject_id"
                                                    data_label="Subject"
                                                    data={subjects}
                                                    value={data?.subject_id}
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
                                                    handleSearchFielter(e)
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
                                            <button
                                                type="button"
                                                className="educare-gray-btn-md-fill"
                                                onClick={handleReset}
                                            >
                                                <i className="icon-ArrowsClockwise"></i>
                                            </button>
                                        </Tooltip>
                                    </div>
                                    {/* Replace changable buttons */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* table */}

            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Class Name</th>
                                <th>Subject</th>
                                <th>Test Name</th>
                                <th>Test Date</th>
                                <th>Test Duration</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {freezeMarksSubjectWiese?.length > 0 &&
                                freezeMarksSubjectWiese?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item?.classroom_title}</td>
                                        <td>{item.subject_title}</td>
                                        <td>{item.exam_title}</td>
                                        {/* <td>{item?.date_at}</td>
                                        <td>{item?.duration}</td> */}
                                        <td></td>
                                        <td></td>
                                        {/* <td>{item.status}</td> */}
                                        <td>
                                            {item?.is_mark_freezed == false ?
                                                <DangerButton
                                                    className="educare-danger-btn-md-fill"
                                                    onClick={(e) =>(
                                                        handleFreezeSubjectWise(e, item?.exam_id, item?.classroom_id, item?.subject_id, 'Freeze')
                                                    )}
                                                >
                                                    Freeze
                                                </DangerButton>
                                            :
                                                <DangerButton
                                                    className="educare-danger-btn-md-fill"
                                                    onClick={(e) =>(
                                                        e.preventDefault()
                                                    )}
                                                    type="button"
                                                >
                                                    Already freezed
                                                </DangerButton>
                                            }

                                            <SuccessButton
                                                className="educare-success-btn-md-fill"
                                                onClick={(e) =>(
                                                    handleFreezeSubjectWise(e, item?.exam_id, item?.classroom_id, item?.subject_id, 'UnFreeze')
                                                )}
                                            >
                                                Un Freeze
                                            </SuccessButton>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default FreezeMarksTable;
