import SelectInput2 from "@/Components/SelectInput2";
import ToggleCheckboxInput from "@/Components/ToggleCheckboxInput";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function ChangeStatusList({ classrooms = [], students = [], classroom_id }) {

    const [classroomId, setClassroomId] = useState(null);

    const initialFormData = Object.values(students)?.map((item) => ({
        id: item.id || '',
        is_checked: item.student_status == 'Promoted' ? true : false
    }));

    const [data, setData] = useState(initialFormData);
    useEffect(() => {
        setData(initialFormData);
    }, [students]);

    const handleCheckboxSelect = (index, checked) => {
        setData((prevData) => {
            const newData = [...prevData];
            newData[index] = { ...newData[index], is_checked: checked };
            return newData;
        });
    };

    const handleUpdateBio = (id, status) => {
        const bioStatus = { id, status }
        router.post(route('student.update_change_status'), bioStatus, {
            onSuccess: () => {
                router.post(route('student.change_status'), { classroom_id: classroomId})
            },
            onError: (errors) => {
                router.post(route('student.change_status'), { classroom_id: classroomId })
            }
        });
    };

    const handleClassRoom = (classroom_id) => {
        if (classroom_id === 'Select Class') {
            setClassroomId(null);
            router.post(route('student.change_status'), { classroom_id: "" })
            // router.get(route('student.change_status'));
        } else if (!isNaN(parseInt(classroom_id))) {
            setClassroomId(classroom_id);

            // router.get('/student/change-status?class_room_id=' + classroom_id);
            router.post(route('student.change_status'), { classroom_id: classroom_id })
        }
    }

    const concatName = (first_name = null, middle_name = null, last_name = null) => {
        const nameParts = [first_name, middle_name, last_name].filter(Boolean);
        return nameParts.join(' ');
    };

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-7 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-PaperPlaneTilt"></i>
                                    Students
                                </h5>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sl. No</th>
                                            <th>Promote</th>
                                            <th>Student</th>
                                            <th>Admission no</th>
                                            <th>Parent name</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(students)?.length > 0 ?
                                            Object.values(students)?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>
                                                        <div className="educare-toggle-checkbox-button-styles">
                                                            <ToggleCheckboxInput
                                                                id={`is_checked_${index}`}
                                                                name={`is_checked_${index}`}
                                                                checked={data[index]?.is_checked || false}
                                                                onChange={(e) => handleCheckboxSelect(index, e.target.checked)}
                                                            />
                                                            <label htmlFor={`is_checked_${index}`}>
                                                                <span className="on">P</span>
                                                                <span className="off">N</span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {concatName(
                                                            item?.first_name,
                                                            item?.middle_name,
                                                            item?.last_name
                                                        )}
                                                    </td>
                                                    <td>
                                                        {item?.admission_no || ''}
                                                    </td>
                                                    <td>
                                                        {concatName(
                                                            item?.father_first_name,
                                                            item?.father_middle_name,
                                                            item?.father_last_name
                                                        )}
                                                    </td>
                                                    <td>
                                                        <span className={`badge ${data[index]?.student_status === 'New' ? 'primary' : 'info'}`}>
                                                            {item?.student_status}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="educare-create-school-settings-list-success"
                                                            onClick={() => handleUpdateBio(data[index]?.id, data[index]?.is_checked)}
                                                        >
                                                            <i className="inline-block icon-check-1"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )) :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="7">Data not found</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 xl:col-span-5 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-PaperPlaneTilt"></i>
                                        Student status
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12">
                                                <div className="col-span-6">
                                                    <div className="educare-common-card-title">
                                                        <h5>
                                                            <i className="icon-BookBookmark"></i>
                                                            Student status
                                                        </h5>
                                                    </div>
                                                    <div className="educare-input-field-styles">
                                                        <SelectInput2
                                                            id="classroom_id"
                                                            data_label="Class"
                                                            data={classrooms}
                                                            value={classrooms.classroom_id}
                                                            selectedData={classroomId}
                                                            onChange={(e) =>
                                                                handleClassRoom(e.target.value)
                                                            }
                                                            className="block"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
