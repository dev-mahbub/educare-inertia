import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from '@/Components/RadioInput';
import SecondaryButton from '@/Components/SecondaryButton';
import SelectInput from "@/Components/SelectInput";
import { concatName } from '@/Hooks/GlobalFunction';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function AdmitCardCertificatePopup({
    admitCardPopupOpen,
    setAdmitCardPopupOpen,
    classrooms = [],
    studentNames = [],
    students = [],
    feeTypes = [],
    feeTitles = [],
    classroomWthExam = [],
    certificateId
}) {
    const [studentData, setStudentData] = useState([]);
    const [examData, setExamData] = useState('');

    const {
        data,
        setData,
    } = useForm({
        classroom_id: "",
        student_list: "class_wise",
        is_admit_card_without_due: false,
        selected_student: [],
        from_installment_id: "",
        to_installment_id: "",
        exam_id: "",
        digital_sign: false,
    });

    const handleClassroom = (classroomId) => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: classroomId,
            selected_student: [],
        }));
        setStudentData(students?.filter((item) => item?.classroom_id == classroomId));
        setExamData(classroomWthExam?.filter((item) => item?.classroom_id == classroomId));
    }

    const closeModal = () => {
        setAdmitCardPopupOpen(false);
    };

    const handleSelectedStudent = (id) => {
        const isSelected = data.selected_student.some((student) => student.student_id === id);
        const updatedSelectedStudents = isSelected
            ? data.selected_student.filter((student) => student.student_id !== id)
            : [...data.selected_student, { student_id: id }];

        setData('selected_student', updatedSelectedStudents);
    }

    // old
    // const encodedData = encodeURIComponent(JSON.stringify(data));

    const handleData = () => {
        // new
        const studentIds = data?.selected_student?.map((item) => item?.student_id);

        const form_data = {
            certificate_id: certificateId,
            classroom_id: data?.classroom_id ?? "",
            student_list: data?.student_list ?? "class_wise",
            is_admit_card_without_due: data?.is_admit_card_without_due ?? false,
            student_ids: JSON.stringify(studentIds),
            from_installment_id: data?.from_installment_id ?? "",
            to_installment_id: data?.to_installment_id ?? "",
            exam_id: data?.exam_id ?? "",
            digital_sign: data?.digital_sign ?? false
        }

        window.open(route('admit_card_certificate_generator', form_data), '_blank');

        // old
        // window.open(route('admit_card_certificate_generator', { data: encodedData }), '_blank');
    }

    // handle select all student start
    const handleSelectAllStudent = (value) => {
        const selectedStudents = value ? studentData?.map(student => ({student_id: student?.id})) : [];

        setData('selected_student', selectedStudents);
    }
    // handle select all student end

    return (
        <form onSubmit={handleData}>
            <div className='educare-admission-follow-up-area space-y-6'>
                <Modal show={admitCardPopupOpen} onClose={closeModal} className="educare-xl-width-modal">
                    <div className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Generate Admit Card Certificate</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-5">
                                        <div className="educare-create-school-settings-list-check min-width-full flex">
                                            <div className="educare-radio-field-styles flex gap-3 mb-3">
                                                <RadioInput
                                                    name="student_list"
                                                    value="Class wise"
                                                    checked={data.student_list === "class_wise"}
                                                    onChange={() => {
                                                        setData((prev) => ({
                                                            ...data,
                                                            "student_list": "class_wise",
                                                            "selected_student": [],
                                                        }));
                                                    }}
                                                />
                                                <RadioInput
                                                    name="student_list"
                                                    value="Individual"
                                                    checked={data.student_list === "individual"}
                                                    onChange={() => {
                                                        setData((prev) => ({
                                                            ...data,
                                                            "student_list": "individual",
                                                            "selected_student": [],
                                                        }));
                                                    }}
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document mb-3 ml-3">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="digital_sign"
                                                        name="digital_sign"
                                                        checked={
                                                            data.digital_sign
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "digital_sign",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="digital_sign"
                                                        value="Digital Sign."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="classroom_id"
                                                data_label="class"
                                                data={classrooms}
                                                value={data.classroom_id}
                                                onChange={(e) => handleClassroom(e.target.value)}
                                                className="block"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="exam_id"
                                                data_label="test"
                                                data={examData}
                                                value={data?.exam_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "exam_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-3">
                                        <div className="flex">
                                            <PrimaryButton type="button" className="educare-primary-btn-md-fill" onClick={handleData}>
                                                {/* <a target="_blank" rel="noopener noreferrer" href={{ route('admit_card_certificate_generator', ['data' => encodedData]) }}> */}
                                                Generate
                                                {/* </a> */}
                                            </PrimaryButton>
                                            <SecondaryButton type="button" className="ml-3" onClick={closeModal}>
                                                Cancel
                                            </SecondaryButton>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-7">
                                        <div className="educare-create-school-settings-list-check min-width-full">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="is_admit_card_without_due"
                                                        name="is_admit_card_without_due"
                                                        checked={
                                                            data.is_admit_card_without_due
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "is_admit_card_without_due",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="is_admit_card_without_due"
                                                        value="Print Admit Card for Selected Installments (No Dues Student)"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {data?.is_admit_card_without_due &&
                                        <div className="col-span-5">
                                            <div className="grid grid-cols-12 gap-5">
                                                <div className="col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="from_installment_id"
                                                                    value="From Installments"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <SelectInput
                                                            id="from_installment_id"
                                                            data_label="installment"
                                                            data={feeTitles}
                                                            value={data?.from_installment_id}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "from_installment_id",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="to_installment_id"
                                                                    value="To Installments"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <SelectInput
                                                            id="to_installment_id"
                                                            data_label="to installment"
                                                            data={feeTitles}
                                                            value={data?.to_installment_id}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "to_installment_id",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            {data?.student_list === 'individual' && <div className="educare-classroom-form-area">
                                <div className="educare-classroom-table-wrapper">
                                    <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    id={`select_all_student`}
                                                                    name="select_all_student"
                                                                    onChange={(e) => handleSelectAllStudent(e.target.checked)}
                                                                    checked={data?.selected_student?.length > 0 && data?.selected_student?.length == studentData?.length}
                                                                />
                                                            </div>
                                                        </div>
                                                    </th>
                                                    <th>Adm No.</th>
                                                    <th>Roll No</th>
                                                    <th>Student Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {studentData?.length ?
                                                    studentData?.map((item, index) => (
                                                        <tr key={item?.id}>
                                                            <td>
                                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                    <div className="educare-create-school-settings-list-check width-full">
                                                                        <Checkbox
                                                                            id={`student_${index}`}
                                                                            name="student_name"
                                                                            onChange={(e) => handleSelectedStudent(item?.id)}
                                                                            checked={data?.selected_student?.map((student) => student?.student_id)?.includes(item?.id)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>{item?.admission_no}</td>
                                                            <td>{item?.roll_no}</td>
                                                            <td>{concatName(item?.first_name, item?.middle_name, item?.last_name)}</td>
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
                            </div>}
                        </div>
                    </div>
                </Modal>
            </div>
        </form>
    );
}
