import InputError from "@/Components/InputError";
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from "@/Components/TextInput";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useState } from "react";

const BuyQuestionHeaderFilter = ({
    classNames,
    subjects
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
        search: "",
        class_name_id: "",
        subject_id: "",
    });

    // handle change class start
    const handleChangeClass = (value) => {
        setData((prevData) => ({
            ...prevData,
            class_name_id: value,
            subject_id: ""
        }));

        const form_data = {
            class_name_id: value
        }

        router.post(route('online_exam.buy_question'), form_data);
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
            subject_id: value
        }

        router.post(route('online_exam.buy_question'), form_data);
    }
    // handle change subject end

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();
    };

    //handle show advance search
    const [showAdvanceSearch, setShowAdvanceSearch] = useState(true);
    const handleShowAdvanceSearch = () => {
        setShowAdvanceSearch(!showAdvanceSearch);
    }


    return (
        <div className='educare-header-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={CommonHeaderFilterData}>
                        <div className='flex flex-wrap gap-2.5 justify-end items-center'>
                            <div className="educare-input-field-styles">
                                <TextInput
                                    id="search"
                                    value={
                                        data.search
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "search",
                                            e.target.value
                                        )
                                    }
                                    placeHolder="Search here"
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.search
                                    }
                                    className="mt-2"
                                />
                            </div>
                            <div className='educare-filter-action-btn flex flex-wrap gap-2'>
                                <div>
                                    <Tooltip
                                        title="Search"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <Link
                                            href="#"
                                            className="educare-secondary-btn-md-fill"
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Reset"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <Link
                                            href="#"
                                            className="educare-gray-btn-md-fill"
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                                <div>
                                    <PrimaryButton
                                        // disabled={processing}
                                        className="educare-warning-btn-md-fill"
                                        onClick={handleShowAdvanceSearch}
                                    >
                                        <i className={`icon-CaretDown ${showAdvanceSearch ? 'rotate-180' : 'rotate-0'} transition-all duration-300`}></i> Advance Search
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                        {
                            showAdvanceSearch ? (
                                <div className="educare-common-card mt-5">
                                    <div className="flex justify-end gap-2 flex-wrap">
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
                                            <InputError
                                                message={
                                                    errors.class_name_id
                                                }
                                                className="mt-2"
                                            />
                                        </div>
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
                                            <InputError
                                                message={
                                                    errors.subject_id
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : ''
                        }
                        <div>
                            <div className="flex justify-end flex-wrap gap-2 mt-5">
                                {
                                    data?.subject_id && (
                                        <PrimaryButton
                                            type="button"
                                            className="educare-success-btn-md-fill"
                                        >
                                            <i className='icon-PlusCircle'></i> Import All Folder
                                        </PrimaryButton>
                                    )
                                }

                                <PrimaryButton
                                    type="button"
                                    className="educare-primary-btn-md-fill"
                                    disabled={data?.class_name_id == "" || data?.subject_id == ""}
                                >
                                    Buy
                                </PrimaryButton>
                            </div>
                            <div>
                                <p className="text-end text-danger text-[14px]">
                                    There are 15,000 NCERT question. You can use these question to assign as homework, Buy these question for easy assignment
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BuyQuestionHeaderFilter;
