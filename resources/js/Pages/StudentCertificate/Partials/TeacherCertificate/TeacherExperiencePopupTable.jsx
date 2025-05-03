import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import SelectInput from "@/Components/SelectInput";

export default function TeacherExperiencePopupTable({ teacherNames, teacherExperiencePopupOpen, setTeacherExperiencePopupOpen }) {

    const {
        data,
        setData,
        reset,
    } = useForm({
        teacher_id: "",
    });

    const encodedData = encodeURIComponent(JSON.stringify(data));

    const handleData = () => {
        window.open(route('teacher_experience_certificate_generator', { data: encodedData }), '_blank');
    }

    const closeModal = () => {
        setTeacherExperiencePopupOpen(false);
        reset();
    };

    return (
        <>
            <div className="educare-admission-follow-up-area space-y-6">
                <Modal show={teacherExperiencePopupOpen} onClose={closeModal}>
                    <form>
                        <div className="p-[30px] pt-2.5">
                            <div className="educare-popup-form-wrapper mb-5 ">
                                <div className="educare-popup-form-header py-3 mb-2.5">
                                    <h5>Generate Teacher Exprience</h5>
                                </div>
                                <div className='flex items-center flex-wrap gap-5'>
                                    <div className="educare-input-field-styles">
                                        <SelectInput
                                            id="teacher_id"
                                            data_label="teacher"
                                            data={teacherNames}
                                            value={data.teacher_id}
                                            onChange={(e) => setData("teacher_id", e.target.value)}
                                            className="block"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2.5">
                                        <PrimaryButton type="button" className="educare-primary-btn-md-fill" onClick={handleData}>Generate</PrimaryButton>
                                        <PrimaryButton type="button" className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        </>
    );
}
