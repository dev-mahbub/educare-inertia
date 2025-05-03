import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from '@/Components/RadioInput';
import { Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';


export default function PublishExamPopUp({ className = '', publishExamPopUp, setPublishExamPopUp, examData = {}}) {

    const [classroomArrayData, setClassroomArrayData] = useState([]);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        patch,
        errors,
    } = useForm({
        classroom_array: classroomArrayData,
    });


    useEffect(() => {
        setClassroomArrayData(examData?.classrooms?.map(classroom => ({
            classroom_id: classroom.id,
            exam_status: classroom?.pivot?.exam_status
        })))
        setData('classroom_array', examData?.classrooms?.map(classroom => ({
            classroom_id: classroom.id,
            exam_status: classroom?.pivot?.exam_status
        })))
    }, [examData])

    useEffect(() => {
        setData('classroom_array', classroomArrayData)
    }, [classroomArrayData])


    const closeModal = () => {
        setPublishExamPopUp(false);
        reset();
    };

    const updateExamStatus = (e) => {
        e.preventDefault();

        patch(route("exam_status.update", examData?.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            }
        });
    }


    const handleExamStatusChange = (classroom_id, exam_status) => {
        setClassroomArrayData((prevClassrooms) =>
            prevClassrooms?.map((classroom) =>
                classroom.classroom_id === classroom_id
                    ? { ...classroom, exam_status: exam_status }
                    : classroom
            )
        );
    };


    console.log(classroomArrayData);
    console.log(examData);

    return (
        <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
            <Modal show={publishExamPopUp} onClose={closeModal}>
                <form onSubmit={updateExamStatus} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b-0 mb-0 border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Publish Exam</h5>
                        </div>
                        <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10 mb-5">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            Class
                                        </th>
                                        <th>Is Publish?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {examData?.classrooms?.length > 0 ? (
                                        examData?.classrooms?.map((item, index)=> (
                                            <tr key={index}>
                                                <td>
                                                    <Link>{item?.title}</Link>
                                                </td>
                                                <td>
                                                    {item?.pivot?.exam_status}

                                                    {/* {data.classroom_array.length} */}
                                                    <div className="educare-create-school-settings-list-check min-width-full">
                                                        <div className="educare-radio-field-styles flex gap-3">
                                                            <RadioInput
                                                                name={`exam_status_${index}`}
                                                                value="Published"
                                                                checked={item?.pivot?.exam_status === "Published"}
                                                                onChange={() => handleExamStatusChange(item?.id, 'Published')}
                                                            />
                                                            <RadioInput
                                                                name={`exam_status_${index}`}
                                                                value="Not Published"
                                                                checked={item?.pivot?.exam_status === "Unpublished"}
                                                                onChange={() => handleExamStatusChange(item?.id, 'Unpublished')}
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    {/* <div className='flex flex-wrap gap-2.5'>
                                                        <button type='button'
                                                            className="badge success"
                                                            onClick={() => {
                                                                handleExamStatusChange(item?.id, 'Published')
                                                            }}
                                                        >
                                                            Published
                                                        </button>
                                                        <button type='button'
                                                            className="badge danger"
                                                            onClick={() => {
                                                                handleExamStatusChange(item?.id, 'Unpublished')
                                                            }}
                                                        >
                                                            Not Published
                                                        </button>
                                                    </div> */}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className = "text-center text-red-500" colSpan = "7">
                                                Data not found
                                            </td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-2.5">
                        <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                        {examData?.classrooms?.length > 0 &&
                            <PrimaryButton className="educare-primary-btn-md-fill">Save</PrimaryButton>
                        }
                    </div>
                </form>
            </Modal>
        </section>
    );
}
