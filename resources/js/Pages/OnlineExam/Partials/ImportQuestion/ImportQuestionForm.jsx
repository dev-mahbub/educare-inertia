import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import { router, useForm } from "@inertiajs/react";

const ImportQuestionForm = ({
    subjects,
    classNames,
    onlineTopics,
    languages
}) => {
    const importQuestion = []

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        language: "",
        class_name_id: "",
        subject_id: "",
        online_topic_id: "",
        import_file: ""
    });

    // handle change class start
    const handleChangeClass = (value) => {
        setData((prevData) => ({
            ...prevData,
            class_name_id: value,
            subject_id: "",
            online_topic_id: ""
        }));

        const form_data = {
            class_name_id: value
        }

        router.post(route('online_exam.import_question'), form_data);
    }
    // handle change class end

    // handle change subject start
    const handleChangeSubject = (value) => {
        setData((prevData) => ({
            ...prevData,
            subject_id: value,
            online_topic_id: ""
        }));

        const form_data = {
            class_name_id: data?.class_name_id,
            subject_id: value
        }

        router.post(route('online_exam.import_question'), form_data);
    }
    // handle change subject end

    // handle import question start
    const handleImportQuestion = (e) => {
        e.preventDefault();

        post(route('import.virtual_question.save'), {
            onSuccess: () => {
                reset();
            },
            onError: () => {
                router.post(route('online_exam.import_question'), data);
            }
        })
    }
    // handle import question end

    // handle download import template start
    const handleDownloadImportTemplate = () => {
        window.open(route('export_excel.online_exam.question_import_template'));
    }
    // handle download import template end

    return (
        <div className="educare-common-card">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <div className="educare-common-card-title">
                    <h5>
                        <i className="icon-DownloadSimple"></i>
                        Import Question
                    </h5>
                </div>
                <div className="educare-common-card-wrap-border">
                    <div className="grid grid-cols-12 xs:gap-5 sm:gap-7 lg:gap-5">
                        <div className="col-span-12 xl:col-span-8">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="Language"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <SelectInput
                                            data_label="Language"
                                            data={languages}
                                            value={
                                                data.language
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "language",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.language
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="Class"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
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
                                        <InputError
                                            message={
                                                errors.class_name_id
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6 xl:col-span-4 ">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="Subject"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
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
                                        <InputError
                                            message={
                                                errors.subject_id
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6 xl:col-span-4 ">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            value="Topic"
                                        />
                                        <SelectInput
                                            data_label="Topic"
                                            data={onlineTopics}
                                            value={
                                                data.online_topic_id
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "online_topic_id",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.online_topic_id
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6 xl:col-span-4 ">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="Import File"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <div className="educare-input-type-file-styles">
                                            <input
                                                id="import_file"
                                                type="file"
                                                name="import_file"
                                                onChange={(e) =>
                                                    setData(
                                                        "import_file",
                                                        e.target
                                                            .files[0]
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={
                                                    errors.import_file
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-end mt-5'>
                                <PrimaryButton
                                    // disabled={processing}
                                    className="educare-primary-btn-md-fill"
                                    type="button"
                                    onClick={handleImportQuestion}
                                >
                                    <i className='icon-UploadSimple'></i> Upload
                                </PrimaryButton>
                            </div>
                            <div className="col-span-12 hidden">
                                <div className="educare-classroom-table-wrapper">
                                    <div className="educare-card-title">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            Import status
                                        </h5>
                                    </div>
                                    <div className="educare-default-table xs:overflow-x-auto">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Is Imported</th>
                                                </tr>
                                            </thead>
                                            <tbody className='bg-border/70'>
                                                {
                                                    importQuestion.length > 0 ? (
                                                        importQuestion.map((item, index) => <tr>
                                                            <td>{item.title}</td>
                                                            <td>{item.import}</td>
                                                        </tr>)
                                                    ) : <tr>
                                                        <td colSpan={2}>Please import question!</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-4">
                            <div className="educare-input-field-notes my-2">
                                <ul>
                                    <li>Important Instructions</li>
                                </ul>
                            </div>
                            <div className='flex items-center flex-wrap gap-2'>
                                <PrimaryButton
                                    type="button"
                                    className="educare-secondary-btn-md-fill"
                                    onClick={handleDownloadImportTemplate}
                                >
                                    <i className='icon-DownloadSimple'></i> Download Template
                                </PrimaryButton>
                                <a href='#' className='text-info text-[18px] flex items-center gap-1 hidden'>
                                    <i className='icon-Question'></i>
                                    <span>Help</span>
                                </a>
                                <div>
                                    <ul>
                                        <li className='flex items-center mt-1 text-danger'>
                                            <i className='icon-StopCircle mr-1 text-[18px]'></i>
                                            <span>Read important instructions give in the template.</span>
                                        </li>
                                        <li className='flex items-center mt-1 text-heading'>
                                            <i className='icon-StopCircle mr-1 text-[18px]'></i>
                                            <span>Do not make change in template.</span>
                                        </li>
                                        <li className=''>
                                            <div className='flex items-center mt-1 text-heading'>
                                                <i className='icon-StopCircle mr-1 text-[18px]'></i>
                                                <span>Question Type.</span>
                                            </div>
                                            <div className='ml-7'>
                                                <ul>
                                                    <li className='flex mt-1 text-headingLight'>
                                                        <span className='mr-1 text-[18px]'>1.</span>
                                                        <span>Multiple Choice - only one correct answer</span>
                                                    </li>
                                                    <li className='flex mt-1 text-headingLight'>
                                                        <span className='mr-1 text-[18px]'>2.</span>
                                                        <span>Multiple Selection - one or more correct answer(saperated by comma)</span>
                                                    </li>
                                                    <li className='flex mt-1 text-headingLight'>
                                                        <span className='mr-1 text-[18px]'>3.</span>
                                                        <span>Fill in the blanks - only one correct answer</span>
                                                    </li>
                                                    <li className='flex mt-1 text-headingLight'>
                                                        <span className='mr-1 text-[18px]'>4.</span>
                                                        <span>Yes/No or True/False - only one correct answer</span>
                                                    </li>
                                                    <li className='flex mt-1 text-headingLight'>
                                                        <span className='mr-1 text-[18px]'>5.</span>
                                                        <span>Descriptive - no answers</span>
                                                    </li>
                                                    <li className='flex mt-1 text-headingLight'>
                                                        <span className='mr-1 text-[18px]'>6.</span>
                                                        <span>Short Answer - only one correct answer</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportQuestionForm;
