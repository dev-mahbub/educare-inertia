import Checkbox from '@/Components/Checkbox';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from '@/Components/RadioInput';
import { useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TeacherCertificatePopupTable({
    teacherNames,
    teacherIdPopupOpen,
    setTeacherIdPopupOpen,
    templateId,
    setTemplateId
}) {

    const {
        data,
        setData,
        reset,
    } = useForm({
        teacher_list: "all_teacher",
        selected_teacher: [],
    });

    const handleSelectedStudent = (id) => {
        const isSelected = data?.selected_teacher.some((teacher) => teacher.teacher_id === id);
        const updatedSelectedTeachers = isSelected
            ? data?.selected_teacher.filter((teacher) => teacher.teacher_id !== id)
            : [...data?.selected_teacher, { teacher_id: id }];

        setData('selected_teacher', updatedSelectedTeachers);
    }

    const encodedData = encodeURIComponent(JSON.stringify(data));

    const handleData = () => {
        window.open(route('teacher_id_certificate_generator', { data: encodedData }), '_blank');
    }

    const closeModal = () => {
        setTemplateId(null)
        setTeacherIdPopupOpen(false);
        reset();
    };

    // handle generate teacher id card certificate start
    const handleGenerateTeacherIdCard = (e) => {
        e.preventDefault();

        if (data?.teacher_list == 'all_teacher') {
            const params = {
                template_id: templateId,
                teacher_list: data?.teacher_list,
            }

            window.open(route('pdf_certificate_generator.teacher_id_card_certificate', params));
        } else if (data?.teacher_list == 'individual') {
            if (data?.selected_teacher?.length == 0) {
                toast.error("Please select at least one staff", {
                    position: 'top-right',
                    autoClose: 1500,
                });
            }
            else {
                const staffIds = data?.selected_teacher?.map((item) => item?.teacher_id);

                const params = {
                    template_id: templateId,
                    teacher_list: data?.teacher_list,
                    staff_ids: JSON.stringify(staffIds)
                }

                window.open(route('pdf_certificate_generator.teacher_id_card_certificate', params));
            }
        }
    }
    // handle generate teacher id card certificate end

    return (
        <>
            <div className="educare-admission-follow-up-area space-y-6">
                <Modal show={teacherIdPopupOpen} onClose={closeModal}>
                    <form>
                        <div className="p-[30px] pt-2.5">
                            <div className="educare-popup-form-wrapper mb-5 ">
                                <div className="educare-popup-form-header py-3 mb-2.5">
                                    <h5>Generate Teacher Id Card</h5>
                                </div>
                                <div className='flex items-center justify-between flex-wrap'>
                                    <div className="educare-radio-field-styles flex gap-3 mb-2.5">
                                        <RadioInput
                                            name="all_teacher"
                                            value="All Teacher"
                                            checked={data?.teacher_list === "all_teacher"}
                                            onChange={() => setData("teacher_list", "all_teacher")}
                                        />
                                        <RadioInput
                                            name="all_teacher"
                                            value="Individual"
                                            checked={data?.teacher_list === "individual"}
                                            onChange={() => setData("teacher_list", "individual")}
                                        />
                                    </div>
                                    <div className="flex flex-wrap justify-end gap-2.5">
                                        <PrimaryButton type="button" className="educare-primary-btn-md-fill" onClick={handleGenerateTeacherIdCard}>Generate</PrimaryButton>
                                        <PrimaryButton type="button" className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                                    </div>
                                </div>


                                {
                                    data?.teacher_list === "individual" && <>
                                        <div className="educare-popup-form pt-5 maxSm:py-4 flex flex-col gap-3">
                                            <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Teacher Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {teacherNames?.length ?
                                                            teacherNames?.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                                <Checkbox
                                                                                    id={`teacher_${index}`}
                                                                                    name="teacher_name"
                                                                                    onChange={() => handleSelectedStudent(item?.id)}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>{item?.title}</td>
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
                                    </>
                                }
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        </>
    );
}
