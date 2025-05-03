import SelectInput from '@/Components/SelectInput';
import { router } from '@inertiajs/react';

const ClassOnlineHeader = ({
    classrooms,
    subjects,
    data,
    setData,
    currentDate
}) => {

    // handle classroom change start
    const handleClassroomChange = (e) => {
        const classroom_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            classroom_id: classroom_id,
            subject_id: ""
        }));

        const form_data = {
            classroom_id: classroom_id
        }

        router.post(route('online_class.attendance'), form_data);
    }
    // handle classroom change end

    // handle subject change start
    const handleSubjectChange = (e) => {
        const subject_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            subject_id: subject_id
        }));

        const form_data = {
            classroom_id: data?.classroom_id,
            subject_id: subject_id,
            attendance_date: data?.attendance_date,
        }

        router.post(route('online_class.attendance'), form_data);
    }
    // handle subject change end

    return (

        <>
            <div className='flex justify-between flex-wrap items-start'>
                <div className='grid grid-cols-12 gap-5 pb-5'>
                    <div className='col-span-12 md:col-span-4'>
                        <div className="educare-input-field-styles">
                            <SelectInput
                                data_label="Class"
                                data={classrooms}
                                value={
                                    data?.classroom_id
                                }
                                onChange={(e) =>
                                    handleClassroomChange(e)
                                }
                                className="block"
                            />
                        </div>
                    </div>
                    <div className='col-span-12 md:col-span-4'>
                        <div className="educare-input-field-styles">
                            <SelectInput
                                data_label="Subject"
                                data={subjects}
                                value={
                                    data?.subject_id
                                }
                                onChange={(e) =>
                                    handleSubjectChange(e)
                                }
                                className="block"
                            />
                        </div>
                    </div>
                </div>
                <span className='badge success'>{currentDate}</span>
            </div>
        </>
    );
};

export default ClassOnlineHeader;
