import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AssignRollList({ classroom, studentsSortData, students, rolls }) {

    const [duplicateIds, setDuplicateIds] = useState([]);

    const concatName = (first_name = "Name", middle_name = null, last_name = null) => {
        const nameParts = [first_name, middle_name, last_name].filter(Boolean);
        return nameParts.join(' ');
    };

    let stdCount = 0;

    const {
        data,
        setData,
        errors,
        post,
        reset,
    } = useForm({
        class_name: classroom?.title,
        class_monitor_name: concatName(classroom?.student_first_name, classroom?.student_middle_name, classroom?.student_last_name),
        class_teacher_name: concatName(classroom?.teacher_first_name, classroom?.teacher_middle_name, classroom?.teacher_last_name),
        classroom_id: classroom?.id,
        total_students: classroom?.promoted_students,
        // total_students: classroom?.total_students + classroom?.promoted_students,
        student_rolls: rolls.map(roll => ({ studentId: roll.studentId, studentRoll: roll.studentRoll })),
        search: "",
    });

    const filteredStudentData = useMemo(() => {
        const filterText = data?.search?.trim()?.toLowerCase();

        return studentsSortData?.sort(customSort)?.filter(item => {
            return item?.filter(studentData => {
                const admissionNo = studentData?.admission_no?.toLowerCase();
                const studentName = (`${studentData?.first_name ?? ""} ${studentData?.middle_name ?? ""} ${studentData?.last_name ?? ""}`)?.toLowerCase();

                return (
                    admissionNo && admissionNo?.includes(filterText) ||
                    studentName && studentName?.includes(filterText)
                );
            })?.length > 0;
        });
    }, [data.search, studentsSortData]);

    useEffect(() => {
        const studentIds = [];
        let duplicateRollGroup = {};

        studentsSortData?.forEach((studentData) => {
            studentIds.push(...studentData?.map(item => item?.id))
        });

        data?.student_rolls?.filter(item => {
            return studentIds?.includes(item?.studentId)
        })?.forEach((item) => {
            if (item?.studentRoll != "" && item?.studentRoll != null) {
                if (!duplicateRollGroup[item?.studentRoll]) {
                    duplicateRollGroup[item?.studentRoll] = [];
                }

                if (!duplicateRollGroup[item?.studentRoll].includes(item?.studentId)) {
                    duplicateRollGroup[item?.studentRoll].push(item.studentId);
                }
            }
        });

        setDuplicateIds(duplicateRollGroup);
    }, [data?.student_rolls, studentsSortData]);

    const assignTableData = (e) => {
        e.preventDefault();

        const studentIds = [];

        studentsSortData?.forEach((studentData) => {
            const id = studentData[0]?.id;

            if(!studentIds?.includes(id)) {
                studentIds.push(id)
            }
        });


        const studentRolls = data?.student_rolls?.filter(item => {
            return studentIds?.includes(item?.studentId) && (item?.studentRoll != "" || item?.studentRoll != null)
        })?.map(item => item?.studentRoll);

        // let duplicateRollGroup = {};

        // data?.student_rolls?.filter(item => {
        //     return studentIds?.includes(item?.studentId)
        // })?.forEach((item) => {
        //     if (!duplicateRollGroup[item?.studentRoll]) {
        //         duplicateRollGroup[item?.studentRoll] = [];
        //     }

        //     duplicateRollGroup[item?.studentRoll].push(item.studentId);
        // });

        // setDuplicateIds(duplicateRollGroup);

        const hasDuplicates = new Set(studentRolls?.filter(Boolean))?.size !== studentRolls?.filter(Boolean)?.length;

        if (hasDuplicates) {
            toast.error("Duplicate Roll No.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            post(route("classroom.assign_roll_save"), {
                preserveScroll: true,
                onSuccess: () => reset(),
            });
        }
    };

    const handleRoll = (studentId, studentRoll) => {
        setData((prevData) => ({ ...prevData, [studentId]: studentRoll }));
        setData((prevFormData) => {
            const existingRoll = prevFormData.student_rolls.find((item) => item.studentId === studentId);
            if (existingRoll) {
                return {
                    ...prevFormData,
                    student_rolls: prevFormData.student_rolls.map((item) =>
                        item.studentId === studentId ? { ...item, studentRoll } : item
                    ),
                };
            } else {
                // Add new class data
                return {
                    ...prevFormData,
                    student_rolls: [...prevFormData.student_rolls, { studentId, studentRoll }],
                };
            }
        });
    };

    const handleBack = () => {
        router.get(route('classroom.time_table_list'));
    }

    const handleGenerateRoll = (e) => {
        e.preventDefault();
        // const updatedStudentRolls1 = students.map((student, index) => ({
        //     studentId: student.id,
        //     studentRoll: index + 1
        // }));

        const updatedStudentRolls = [];
        let rollCount = 0;

        studentsSortData?.forEach(stdRow => {
            stdRow?.forEach(student => {
                updatedStudentRolls.push({
                    studentId: student.id,
                    studentRoll: ++rollCount
                })
            });
        });

        setData((prevFormData) => ({
            ...prevFormData,
            student_rolls: updatedStudentRolls
        }));
    };

    const handleClearRoll = (e) => {
        e.preventDefault();
        const updatedStudentRolls = [];
        studentsSortData?.forEach(stdRow => {
            stdRow?.forEach(student => {
                updatedStudentRolls.push({
                    studentId: student.id,
                    studentRoll: ""
                })
            });
        });

        setData((prevFormData) => ({
            ...prevFormData,
            student_rolls: updatedStudentRolls
        }));
    };

    // sort students by classroom roll start
    function customSort(a, b) {
        // Check if classroomRoll exists and roll_no is not null for both a and b
        if (a[0].classroom_roll && b[0].classroom_roll && a[0].classroom_roll.roll_no != null && b[0].classroom_roll.roll_no != null) {
            return a[0].classroom_roll.roll_no - b[0].classroom_roll.roll_no;
        } else if (!a[0].classroom_roll || a[0].classroom_roll.roll_no == null) {
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
            <div className="educare-master-create-shift-area">
                <form onSubmit={assignTableData}>
                    <div className="educare-common-card">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className="educare-common-card-title">
                                <h5>
                                    <i className="icon-UsersThree"></i>
                                    Assign Roll Number
                                </h5>
                            </div>
                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                <div className="educare-master-create-shift-form">
                                    <div className="educare-create-school-details-form-wrap">
                                        <div className="educare-time-table-controller-wrapper">
                                            <div className="educare-custom-table">
                                                <div className="educare-custom-table-body">
                                                    <div className="educare-assign-table-wrap">
                                                        <div className="grid grid-cols-12 gap-5 gap-y-2">
                                                            <div className="lg:col-span-3 md:col-span-4 maxSm:col-span-12">
                                                                <div className="educare-input-field-styles">
                                                                    <InputLabel
                                                                        htmlFor="class_name"
                                                                        value="Class name"
                                                                    />
                                                                    <TextInput
                                                                        id="class_name"
                                                                        value={data.class_name}
                                                                        className="block"
                                                                        disabled={true}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="lg:col-span-3 md:col-span-4 maxSm:col-span-12">
                                                                <div className="educare-input-field-styles">
                                                                    <InputLabel
                                                                        htmlFor="class_teacher_name"
                                                                        value="Class Teacher Name"
                                                                    />
                                                                    <TextInput
                                                                        id="class_teacher_name"
                                                                        value={data.class_teacher_name}
                                                                        className="block"
                                                                        disabled={true}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="lg:col-span-3 md:col-span-4 maxSm:col-span-12">
                                                                <div className="educare-input-field-styles">
                                                                    <InputLabel
                                                                        htmlFor="class_monitor_name"
                                                                        value="Class Monitor Name"
                                                                    />
                                                                    <TextInput
                                                                        id="class_monitor_name"
                                                                        value={data.class_monitor_name}
                                                                        className="block"
                                                                        disabled={true}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="lg:col-span-3 md:col-span-4 maxSm:col-span-12">
                                                                <div className="educare-input-field-styles">
                                                                    <InputLabel
                                                                        htmlFor="total_student"
                                                                        value="Total student"
                                                                    />
                                                                    <TextInput
                                                                        id="total_student"
                                                                        value={data.total_students}
                                                                        className="block"
                                                                        disabled={true}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="lg:col-span-3 md:col-span-4 maxSm:col-span-12">
                                                                <div className="educare-input-field-styles">
                                                                    <InputLabel
                                                                        htmlFor="search"
                                                                        value="Search"
                                                                    />
                                                                    <TextInput
                                                                        id="search"
                                                                        value={data?.search}
                                                                        className="block"
                                                                        placeHolder="admission no, student's name"
                                                                        onChange={(e) => {
                                                                            setData("search", e.target.value)
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <form onSubmit={assignTableData}>
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                Sl. No
                                            </th>
                                            <th>Roll No</th>
                                            <th>Admission No.</th>
                                            <th>Student Name</th>
                                            <th>Parent Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredStudentData?.length ?
                                            filteredStudentData?.map((stdRow, index) => (
                                                stdRow?.map((item, index2) => (
                                                <tr key={index +'_'+ index2}>
                                                    <td>{++stdCount}</td>
                                                    <td className="max-w-xs">
                                                        <div className="educare-input-field-styles">
                                                            <TextInput
                                                                id={`student_rolls_${item.id}`}
                                                                name={`student_rolls[${item.id}]`}
                                                                value={data.student_rolls.find((sRoll) => sRoll.studentId === item.id)?.studentRoll}
                                                                onChange={(e) =>
                                                                    handleRoll(item.id, e.target.value)
                                                                }
                                                                type="number"
                                                                    className={`my-1 block ${duplicateIds[data.student_rolls.find((sRoll) => sRoll.studentId === item.id)?.studentRoll]?.length > 1 ? '!border-danger !text-danger focus:!ring-danger focus:!border-danger' : ''}`}
                                                            />
                                                            <InputError
                                                                    message={duplicateIds[data.student_rolls.find((sRoll) => sRoll.studentId === item.id)?.studentRoll]?.length > 1 ? 'duplicate error' : ''}
                                                                className="mt-2"
                                                            />
                                                        </div>

                                                    </td>
                                                    <td>{item?.admission_no}</td>
                                                    <td>
                                                        {`${item?.first_name ?? ""}  ${item?.middle_name ?? ""}  ${item?.last_name ?? ""}`}
                                                    </td>
                                                    <td>{item?.father?.first_name} {item?.father?.middle_name} {item?.father?.last_name}</td>
                                                </tr>
                                                ))
                                            ))
                                            :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                            </tr>
                                        }

                                    </tbody>
                                </table>
                                <div className='flex flex-wrap justify-end gap-4 mb-7 bg-white p-4'>
                                    <PrimaryButton
                                        className="educare-primary-btn-md-fill"
                                        type="button"
                                        onClick={handleBack}
                                    >
                                        Back
                                    </PrimaryButton>
                                    <PrimaryButton
                                        className="educare-primary-btn-md-fill"
                                        type="button"
                                        onClick={(e) => handleClearRoll(e)}
                                    >
                                        Clear All
                                    </PrimaryButton>
                                    <PrimaryButton
                                        className="educare-primary-btn-md-fill hidden"
                                        type="button"
                                        onClick={(e) => handleGenerateRoll(e)}
                                    >
                                        Generate Roll No
                                    </PrimaryButton>
                                    <PrimaryButton
                                        className="educare-primary-btn-md-fill"
                                        type="submit"
                                    >
                                        Save
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
}
