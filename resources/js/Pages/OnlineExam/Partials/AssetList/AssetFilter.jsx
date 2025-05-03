import SelectInput from '@/Components/SelectInput';
import { Link, router } from '@inertiajs/react';

const AssetFilter = ({
    subjects,
    classNames,
    onlineTopics,
    data,
    setData
}) => {

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    // handle change class start
    const handleChangeClass = (value) => {
        setData((prevData) => ({
            ...prevData,
            class_name_id: value
        }));

        const form_data = {
            subject_id: data?.subject_id,
            online_topic_id: data?.online_topic_id,
            class_name_id: value
        }

        router.post(route('online_exam.asset_list'), form_data);
    }
    // handle change class end

    // handle change subject start
    const handleChangeSubject = (value) => {
        setData((prevData) => ({
            ...prevData,
            subject_id: value
        }));

        const form_data = {
            class_name_id: data?.class_name_id,
            online_topic_id: data?.online_topic_id,
            subject_id: value
        }

        router.post(route('online_exam.asset_list'), form_data);
    }
    // handle change subject end

    // handle change subject start
    const handleChangeTopic = (value) => {
        setData((prevData) => ({
            ...prevData,
            online_topic_id: value
        }));

        const form_data = {
            class_name_id: data?.class_name_id,
            subject_id: data?.subject_id,
            online_topic_id: value
        }

        router.post(route('online_exam.asset_list'), form_data);
    }
    // handle change subject end

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div className='grid grid-cols-12 gap-5'>
                    <div className="col-span-12 md:col-span-4 xl:col-span-3">
                        <div className="educare-input-field-styles">
                            <SelectInput
                                data_label="Class"
                                data={classNames}
                                value={
                                    data.class_name_id
                                }
                                onChange={(e) =>
                                    handleChangeClass(e.target.value)
                                }
                                className="block"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-4 xl:col-span-3">
                        <div className="educare-input-field-styles">
                            <SelectInput
                                data_label="Subject"
                                data={subjects}
                                value={
                                    data.subject_id
                                }
                                onChange={(e) =>
                                    handleChangeSubject(e.target.value)
                                }
                                className="block"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-4 xl:col-span-3">
                        <div className="educare-input-field-styles">
                            <SelectInput
                                data_label="Topic"
                                data={onlineTopics}
                                value={
                                    data.online_topic_id
                                }
                                onChange={(e) =>
                                    handleChangeTopic(e.target.value)
                                }
                                className="block"
                            />
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className='flex justify-end'>
                            <Link
                                href={route('online_exam.create_asset')}
                                className="educare-primary-btn-md-fill"
                            >
                                <i className='icon-PlusCircle'></i> Add Passage
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AssetFilter;
