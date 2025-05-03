import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from '@/Components/RadioInput';
import SecondaryButton from '@/Components/SecondaryButton';
import SelectInput from "@/Components/SelectInput";
import TextInput from '@/Components/TextInput';
import { concatName } from '@/Hooks/GlobalFunction';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function StudentIdCertificatePopup({
    studentIdPopupOpen,
    setStudentIdPopupOpen,
    classrooms = [],
    students = [],
    templateId,
    setTemplateId
}) {
    const [studentData, setStudentData] = useState([]);

    const {
        data,
        setData,
    } = useForm({
        classroom_id: "",
        admission_no: "",
        student_list: "class_wise",
        selected_student: [],
        student_ids: []
    });

    const handleClassroom = (classroomId) => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: classroomId,
            selected_student: [],
        }));
        setStudentData(students?.filter((item) => item?.classroom_id == classroomId));
    }

    const closeModal = () => {
        setStudentIdPopupOpen(false);
        setTemplateId(null);
    };

    const handleSelectedStudent = (id) => {
        const isSelected = data.selected_student.some((student) => student.student_id === id);
        const updatedSelectedStudents = isSelected
            ? data.selected_student.filter((student) => student.student_id !== id)
            : [...data.selected_student, { student_id: id }];

        setData('selected_student', updatedSelectedStudents);
    }

    const encodedData = encodeURIComponent(JSON.stringify(data));

    const handleData = () => {
        window.open(route('student_id_certificate_generator', { data: encodedData }), '_blank');
    }

    // handle generate student id card certificate start
    const handleGenerateStudentIdCard = (e) => {
        e.preventDefault();

        if(data?.student_list == 'class_wise') {
            if(data?.classroom_id == "") {
                toast.error("Please select a class", {
                    position: 'top-right',
                    autoClose: 1500,
                });
            }
            else {
                const params = {
                    template_id: templateId,
                    student_list: data?.student_list,
                    classroom_id: data?.classroom_id
                }

                window.open(route('pdf_certificate_generator.student_id_card_certificate', params));
            }
        } else if (data?.student_list == 'individual') {
            if (data?.selected_student?.length == 0) {
                toast.error("Please select at least one student", {
                    position: 'top-right',
                    autoClose: 1500,
                });
            }
            else {
                const studentIds = data?.selected_student?.map((item) => item?.student_id);

                const params = {
                    template_id: templateId,
                    student_list: data?.student_list,
                    student_ids: JSON.stringify(studentIds),
                }

                window.open(route('pdf_certificate_generator.student_id_card_certificate', params));
            }
        } else if (data?.student_list == 'admission_no') {
            if (data?.admission_no == "") {
                toast.error("Admission No is required", {
                    position: 'top-right',
                    autoClose: 1500,
                });
            }
            else {
                const params = {
                    template_id: templateId,
                    student_list: data?.student_list,
                    admission_no: data?.admission_no
                }

                window.open(route('pdf_certificate_generator.student_id_card_certificate', params));
            }
        }
    }
    // handle generate student id card certificate end


    return (
        <form onSubmit={handleGenerateStudentIdCard}>
            <div className='educare-admission-follow-up-area space-y-6'>
                <Modal show={studentIdPopupOpen} onClose={closeModal} className="educare-xl-width-modal">
                    <div className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Generate Admit Card Certificate</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12 sm:col-span-6 lg:col-span-2">
                                        <div className="educare-create-school-settings-list-check min-width-full">
                                            <div className="educare-radio-field-styles">
                                                <RadioInput
                                                    name="student_list"
                                                    value="Class wise"
                                                    checked={data.student_list === "class_wise"}
                                                    onChange={() => {
                                                        setData({
                                                            ...data,
                                                            "student_list": "class_wise",
                                                            "selected_student": [],
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6 lg:col-span-2">
                                        <div className="educare-create-school-settings-list-check min-width-full">
                                            <div className="educare-radio-field-styles">
                                                <RadioInput
                                                    name="student_list"
                                                    value="Individual"
                                                    checked={data.student_list === "individual"}
                                                    onChange={() => {
                                                        setData({
                                                            ...data,
                                                            "student_list": "individual",
                                                            "classroom_id" : "",
                                                            "selected_student": [],
                                                        });
                                                        setStudentData([]);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6 lg:col-span-2">
                                        <div className="educare-create-school-settings-list-check min-width-full">
                                            <div className="educare-radio-field-styles">
                                                <RadioInput
                                                    name="admission_no"
                                                    value="Admission no"
                                                    checked={data.student_list === "admission_no"}
                                                    onChange={() => {
                                                        setData({
                                                            ...data,
                                                            "student_list": "admission_no",
                                                            "selected_student": [],
                                                            "classroom_id" : "",
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {data?.student_list !== 'admission_no' && <div className="col-span-12 sm:col-span-6 lg:col-span-2">
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
                                    </div>}

                                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                                        <div className="flex justify-end">
                                            <PrimaryButton type="button" className="educare-primary-btn-md-fill" onClick={handleGenerateStudentIdCard}>
                                                Generate
                                            </PrimaryButton>
                                            <SecondaryButton type="button" className="ml-3" onClick={closeModal}>
                                                Cancel
                                            </SecondaryButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {data?.student_list === 'individual' && <div className="educare-classroom-form-area">
                                <div className="educare-classroom-table-wrapper">
                                    <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th></th>
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
                            {data?.student_list === 'admission_no' &&
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="admission_no"
                                                value="Enter all admission No. in comma separated value to generate id card"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <TextInput
                                        id="admission_no"
                                        value={
                                            data?.admission_no
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "admission_no",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </Modal>
            </div>
        </form>
    );
}
