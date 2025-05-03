import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { router, useForm } from '@inertiajs/react';

const TeachingCoursesHeader = ({
    classrooms,
    subjects,
    currentDate
}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        classroom_id: "",
        subject_id: "",
    });

    // handle change classroom start
    const handleClassroomChange = (id) => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: id,
            subject_id: ""
        }));

        const form_data = {
            classroom_id: id
        }

        router.post(route('teacher_course.list'), form_data);
    }
    // handle change classroom end

    // handle change subject start
    const handleSubjectChange = (id) => {
        setData((prevData) => ({
            ...prevData,
            subject_id: id
        }));

        const form_data = {
            classroom_id: data?.classroom_id,
            subject_id: id
        }

        router.post(route('teacher_course.list'), form_data);
    }
    // handle change subject end

    return (

        <>
            <div className='flex justify-between flex-wrap items-start mb-4'>
                <div className='grid grid-cols-12 gap-5 pb-4'>
                    <div className='col-span-12 md:col-span-4'>
                        <div className="educare-input-field-styles">
                            <SelectInput
                                data_label="Class"
                                data={classrooms}
                                value={
                                    data.classroom_id
                                }
                                onChange={(e) =>
                                    handleClassroomChange(e.target.value)
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
                    </div>
                    <div className='col-span-12 md:col-span-4'>
                        <div className="educare-input-field-styles">
                            <SelectInput
                                data_label="Subject"
                                data={subjects}
                                value={
                                    data.subject_id
                                }
                                onChange={(e) =>
                                    handleSubjectChange(e.target.value)
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.subject_id
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>
                <span className='badge success'>{currentDate}</span>
            </div>
        </>
    );
};

export default TeachingCoursesHeader;
