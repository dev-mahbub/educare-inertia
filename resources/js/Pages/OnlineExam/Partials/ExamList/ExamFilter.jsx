import SelectInput from '@/Components/SelectInput';
import { Link, router } from '@inertiajs/react';

const ExamFilter = ({
    virtualExamModes,
    classNames,
    subjects,
    data,
    setData
}) => {

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    // handle change form value start
    const handleChangeFormValue = (field, value) => {
        const form_data = {
            ...data,
            [field]: value
        }

        setData(form_data);

        router.post(route('online_exam.exam_list'), form_data);
    }
    // handle change form value end

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
                                    handleChangeFormValue(
                                        "class_name_id",
                                        e.target.value
                                    )
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
                                    handleChangeFormValue(
                                        "subject_id",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-4 xl:col-span-3">
                        <div className="educare-input-field-styles">
                            <SelectInput
                                data_label="Exam Mode"
                                data={virtualExamModes}
                                value={
                                    data.exam_mode
                                }
                                onChange={(e) =>
                                    handleChangeFormValue(
                                        "exam_mode",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className='flex justify-end items-center gap-4 flex-wrap'>
                            <div className='flex gap-1 flex-wrap hidden'>
                                <a href="#"  className='text-[14px]'><span className='text-info'>Help: How to Conduct an exam? </span> |</a>
                                <a href="#"  className='text-[14px]'><span className='text-info'>Frequently Asked Questions </span> |</a>
                                <a href="#"  className='text-[14px]'><span className='text-info'>All Articles</span></a>
                            </div>
                            <Link
                                href={route('online_exam.create_exam')}
                                className="educare-primary-btn-md-fill"
                            >
                                <i className='icon-PlusCircle'></i> Create an Exam
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ExamFilter;
