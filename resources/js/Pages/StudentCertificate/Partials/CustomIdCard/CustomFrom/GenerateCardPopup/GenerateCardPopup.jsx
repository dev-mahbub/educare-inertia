import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function GenerateCardPopup({
    className = '',
    generateCardPopup,
    setGenerateCardPopup,
    classrooms,
    idCardCertificateData,
    students,
    staffs
}) {
    const [studentsData, setStudentsData] = useState([]);
    const [studentIds, setStudentIds] = useState([]);
    const [allStudentChecked, setAllStudentChecked] = useState(false);
    const [staffIds, setStaffIds] = useState([]);
    const [allStaffChecked, setAllStaffChecked] = useState(false);

    const {
        data,
        setData,
        processing,
        reset,
        errors,
    } = useForm({
        classroom_id: "",
        student_ids: [],
        staff_ids: [],
    });

    useEffect(() => {
        if (students) {
            setStudentsData(Object.values(students)?.sort(customSort));
        }
        else {
            setStudentsData([]);
        }
    }, [students]);

    useEffect(() => {
        if (studentIds?.length <= 0) {
            setAllStudentChecked(false)
        }
        else {
            setAllStudentChecked(studentIds?.length === Object.keys(studentsData)?.length)
        }

        setData((prevData) => ({
            ...prevData,
            student_ids: studentIds
        }));
    }, [studentIds]);

    useEffect(() => {
        if (staffIds?.length <= 0) {
            setAllStaffChecked(false)
        }
        else {
            setAllStaffChecked(staffIds?.length === Object.keys(staffs)?.length)
        }

        setData((prevData) => ({
            ...prevData,
            staff_ids: staffIds
        }));
    }, [staffIds]);

    // handle classroom change start
    const handleClassroomChange = (e) => {
        const classroom_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            classroom_id: classroom_id
        }));

        const form_data = {
            template_id: idCardCertificateData?.id ?? "",
            classroom_id: classroom_id
        }

        router.post(route('student_certificate.custom_id_card'), form_data);
    }
    // handle classroom change end


    // handle student checkbox select start
    const handleStudentCheckboxSelect = (name, value) => {
        if (name == 'select_all') {
            if (value === true) {
                setStudentIds(Object.values(studentsData)?.map((item) => item.id));
            }
            else {
                setStudentIds([]);
            }

            setAllStudentChecked(value);
        } else {
            if (studentIds?.includes(value)) {
                setStudentIds([...studentIds]?.filter(item => item != value));
            }
            else {
                setStudentIds([...studentIds, value]);
            }
        }
    };
    // handle student checkbox select end

    // handle staff checkbox select start
    const handleStaffCheckboxSelect = (name, value) => {
        if (name == 'select_all') {
            if (value === true) {
                setStaffIds(Object.values(staffs)?.map((item) => item.id));
            }
            else {
                setStaffIds([]);
            }

            setAllStaffChecked(value);
        } else {
            if (staffIds?.includes(value)) {
                setStaffIds([...staffIds]?.filter(item => item != value));
            }
            else {
                setStaffIds([...staffIds, value]);
            }
        }
    };
    // handle staff checkbox select end


    const GenerateCardPopupData = (e) => {
        e.preventDefault();
    };

    const closeModal = () => {
        setGenerateCardPopup(false);
        reset();
        setStudentsData([]);
        setStudentIds([]);
    };

    // handle generate id card start
        const handleGenerateIdCard = (e) => {
            e.preventDefault();

            if (idCardCertificateData?.audience_type == 'Student') {
                if(data?.classroom_id == "") {
                    toast.error("Please select a class.", {
                        position: 'top-right',
                        autoClose: 1500,
                    });
                }
                else if (data?.student_ids?.length == 0) {
                    toast.error("Please select at least one student.", {
                        position: 'top-right',
                        autoClose: 1500,
                    });
                }
                else {
                    const params = {
                        template_id: idCardCertificateData?.id ?? "",
                        classroom_id: data?.classroom_id ?? "",
                        student_ids: JSON.stringify(data?.student_ids ?? []),
                    }

                    const url = route('pdf_certificate_generator.id_card_certificate', params)

                    window.open(url);
                }
            }else if (idCardCertificateData?.audience_type == 'Teacher') {
                if (data?.staff_ids?.length == 0) {
                    toast.error("Please select at least one staff.", {
                        position: 'top-right',
                        autoClose: 1500,
                    });
                }
                else {
                    const params = {
                        template_id: idCardCertificateData?.id ?? "",
                        staff_ids: JSON.stringify(data?.staff_ids ?? []),
                    }

                    const url = route('pdf_certificate_generator.id_card_certificate', params)

                    window.open(url);
                }
            }
        }
    // handle generate id card end

    // sort students by classroom roll start
    function customSort(a, b) {
        // Check if classroomRoll exists and roll_no is not null for both a and b
        if (a.roll_no != "" && b.roll_no != "") {
            return a.roll_no - b.roll_no;
        } else if (a.roll_no == "") {
            // Handle null values for a
            return 1; // Move a to the end of the sorted array
        } else {
            // Handle null values for b
            return -1; // Move b to the start of the sorted array
        }
    }
    // sort students by classroom roll end

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={generateCardPopup} onClose={closeModal}>
                    <form onSubmit={GenerateCardPopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Generate Certificate</h5>
                            </div>
                            {idCardCertificateData?.audience_type == 'Student' &&
                                <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            value="Class"
                                        />
                                        <SelectInput
                                            data_label="Class"
                                            data={classrooms}
                                            value={
                                                data.classroom_id
                                            }
                                            onChange={(e) =>
                                                handleClassroomChange(e)
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.classroom_id
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>Student</h5>
                                        <div>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="select_all"
                                                        name="select_all"
                                                        checked={allStudentChecked}
                                                        onChange={(e) =>
                                                            handleStudentCheckboxSelect(
                                                                e.target.name,
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="select_all"
                                                        value="All"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {data?.classroom_id != "" ? (
                                                <div className='flex flex-col justify-start items-start'>
                                                {studentsData && Object.keys(studentsData)?.length > 0 ? (
                                                        Object.values(studentsData)?.map((item, index) => (
                                                            <div key={index} className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                <div className="educare-create-school-settings-list-check width-full">
                                                                    <Checkbox
                                                                        id={`student_id_${item?.id}`}
                                                                        name={`student_id`}
                                                                        checked={studentIds?.includes(item?.id)}
                                                                        onChange={(e) =>
                                                                            handleStudentCheckboxSelect(
                                                                                e.target.name,
                                                                                item?.id
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="educare-create-school-settings-list-title width-full">
                                                                    <InputLabel
                                                                        htmlFor={`student_id_${item?.id}`}
                                                                        value={`${item?.roll_no ?? ""} - ${item?.first_name ?? ""} ${item?.middle_name ?? ""} ${item?.last_name ?? ""}`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : ''}
                                                </div>
                                            ) : ''
                                        }
                                    </div>
                                </div>
                            }

                            {idCardCertificateData?.audience_type == 'Teacher' &&
                                <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                    <div className="mt-2">
                                        <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>Teacher</h5>
                                        <div>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="select_all"
                                                        name="select_all"
                                                        checked={allStaffChecked}
                                                        onChange={(e) =>
                                                            handleStaffCheckboxSelect(
                                                                e.target.name,
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="select_all"
                                                        value="All"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col justify-start items-start'>
                                            {staffs && Object.keys(staffs)?.length > 0 ? (
                                                Object.values(staffs)?.map((item, index) => (
                                                    <div key={index} className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id={`staff_id_${item?.id}`}
                                                                name={`staff_id`}
                                                                checked={staffIds?.includes(item?.id)}
                                                                onChange={(e) =>
                                                                    handleStaffCheckboxSelect(
                                                                        e.target.name,
                                                                        item?.id
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor={`staff_id_${item?.id}`}
                                                                value={`${item?.first_name ?? ""} ${item?.middle_name ?? ""} ${item?.last_name ?? ""}`}
                                                            />
                                                        </div>
                                                    </div>
                                                ))
                                            ) : ''}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton type="button" className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                            <PrimaryButton type="button" className="educare-primary-btn-md-fill" onClick={handleGenerateIdCard}>Generate</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
