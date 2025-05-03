import { useState } from 'react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from "@/Components/SelectInput";

export default function CharacterCertificatePopup({
    characterPopupOpen,
    setCharacterPopupOpen,
    classrooms = [],
    studentNames = []
}) {

    const [studentNameData, setStudentNameData] = useState([]);

    const {
        data,
        setData,
    } = useForm({
        classroom_id: "",
        student_id: "",
    });

    const handleClassroom = (classroomId) => {
        setData((prevData) => ({
            ...prevData,
            student_id: "",
            classroom_id: classroomId,
        }));
        setStudentNameData(studentNames?.filter((item) => item?.classroom_id == classroomId));
    }

    const closeModal = () => {
        setCharacterPopupOpen(false);
    };



    return (
        <div className='educare-admission-follow-up-area space-y-6'>
            <Modal show={characterPopupOpen} onClose={closeModal}>
                <div className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Generate Character Certificate</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                            <div className="grid grid-cols-12 mb-[17px] gap-5">
                                <div className="col-span-12">
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
                                <div className="col-span-12">
                                    <div className="educare-input-field-styles">
                                        <SelectInput
                                            id="student_id"
                                            data_label="student"
                                            data={studentNameData}
                                            value={data?.student_id}
                                            onChange={(e) =>
                                                setData(
                                                    "student_id",
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
                    </div>

                    <div className="mt-6 flex justify-end">
                        {data?.student_id && (
                            <PrimaryButton type="button" className="educare-primary-btn-md-fill">
                                <a target="_blank" rel="noopener noreferrer" href={route('character_certificate_generator', data?.student_id)}>
                                    Generate
                                </a>
                            </PrimaryButton>
                        )}
                        <SecondaryButton type="button" className="ml-3" onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
