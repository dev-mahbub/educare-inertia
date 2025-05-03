import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Checkbox from '@/Components/Checkbox';

export default function ShareExamPopup({ className = '', shareExamPopup, setShareExamPopup }) {
    const initialData = [
        {
            id: 1,
            teacher: "Ankita Kumari"
        },
        {
            id: 2,
            teacher: "Irfan Khan"
        },
    ];

    const {
        data,
        setData,
        reset,
    } = useForm({
        share_check: {},
        teachers: initialData,
    });

    const shareExamPopupData = (e) => {
        e.preventDefault();
        // Handle the form submission
    };

    const closeModal = () => {
        setShareExamPopup(false);
        reset();
    };

    const handleCheckboxChange = (teacherId) => {
        setData('share_check', {
            ...data.share_check,
            [teacherId]: !data.share_check[teacherId], 
        });
    };

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={shareExamPopup} onClose={closeModal}>
                    <form onSubmit={shareExamPopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper mb-5">
                            <div className="educare-popup-form-header py-3">
                                <h5>Share Exam</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-default-table xs:overflow-x-auto max-h-[400px] overflow-y-scroll">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Check</th>
                                                <th>Teacher</th>
                                            </tr>
                                        </thead>
                                        <tbody className='bg-border/50'>
                                            {
                                                data.teachers.length > 0 ? (
                                                    data.teachers.map((teacher) => (
                                                        <tr key={teacher.id}>
                                                            <td>
                                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                    <div className="educare-create-school-settings-list-check width-full">
                                                                        <Checkbox
                                                                            name={`share_check_${teacher.id}`}
                                                                            checked={data.share_check[teacher.id] || false}
                                                                            onChange={() => handleCheckboxChange(teacher.id)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>{teacher.teacher}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="2">Data not found</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                            <PrimaryButton className="educare-primary-btn-md-fill" type="submit">Save</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
