import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from '@/Components/SelectInput';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from '@/Components/TextInput';
import { Transition } from "@headlessui/react";
import { Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";

const NewsForm = ({
    statusArr,
    newsTypes,
    audienceTypes,
    classrooms,
    news
}) => {

    const [startDate, setStartDate] = useState(news?.start_date ? new Date(news?.start_date) : null);
    const [endDate, setEndDate] = useState(news?.end_date ? new Date(news?.end_date) : null);
    const [classroomIds, setClassroomIds] = useState(news?.news_classrooms?.map(item => item?.classroom_id));
    const [classroomCheckedAll, setClassroomCheckedAll] = useState(false);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        title: news?.title ?? "",
        audience_type: news?.audience_type ?? "",
        status: news?.status ?? "",
        news_type: news?.news_type ?? "",
        start_date: "",
        end_date: "",
        description: news?.description ?? "",
        is_published: news?.is_published ?? false,
        news_image: "",
        classroom_ids: [],
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            classroom_ids: classroomIds
        }))
    }, [classroomIds]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            start_date: startDate
        }));
    }, [startDate]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            end_date: endDate
        }));
    }, [endDate]);


    useEffect(() => {
        if (classroomIds?.length <= 0) {
            setClassroomCheckedAll(false);
        }
        else {
            setClassroomCheckedAll(classroomIds?.length === classrooms?.length);
        }
    }, [classroomIds, classrooms]);

    // handle audience type change start
    const handleChangeAudience = (e) => {
        const audience_type = e.target.value;

        setData((prevData) => ({
            ...prevData,
            audience_type: audience_type
        }));

        setClassroomIds([]);
    }
    // handle audience type change end

    // handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        let updatedClassroomIds = [...classroomIds];

        // parent will check, all child will check
        if (name === "select_all_class") {
            if (value) {
                updatedClassroomIds = classrooms?.map(item => item?.id);
            }
            else {
                updatedClassroomIds = [];
            }
        } else {
            if (classroomIds?.includes(value)) {
                updatedClassroomIds = updatedClassroomIds?.filter(item => item != value);
            }
            else {
                updatedClassroomIds = [...updatedClassroomIds, value];
            }
        }

        setClassroomIds(updatedClassroomIds)
    };
    // handle Checkbox end

    const dummyData = (e) => {
        e.preventDefault();
    };

    // handle news save start
    const handleNewsSave = (e) => {
        e.preventDefault();

        data['_method'] = 'put';

        post(route('news.update', news?.id));
    }
    // handle news save end

    return (
        <div className="educare-event-create-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
                <form onSubmit={dummyData}>
                    <div className="grid grid-cols-12 gap-5 items-end">
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="title"
                                            value="Title"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <TextInput
                                    id="title"
                                    value={
                                        data.title
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.title
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="audience_type"
                                            value="Audience"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <SelectInput
                                    id="audience_type"
                                    data_label="Audience"
                                    data={audienceTypes}
                                    value={
                                        data.audience_type
                                    }
                                    onChange={(e) => {
                                        handleChangeAudience(e)
                                    }
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.audience_type
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="status"
                                    value="Status"
                                />
                                <SelectInput
                                    id="status"
                                    data_label="Status"
                                    data={statusArr}
                                    value={
                                        data.status
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "status",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.status
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="news_type"
                                            value="News Type"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <SelectInput
                                    id="news_type"
                                    data_label="News Type"
                                    data={newsTypes}
                                    value={
                                        data.news_type
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "news_type",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.news_type
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            value="Flash Start Date"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) =>
                                        setStartDate(date)
                                    }
                                    showYearDropdown
                                    showMonthDropdown
                                    useShortMonthInDropdown
                                    showPopperArrow={false}
                                    peekNextMonth
                                    dropdownMode="select"
                                    isClearable
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Start date"
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    value="Flash End Date"
                                />
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) =>
                                        setEndDate(date)
                                    }
                                    showYearDropdown
                                    showMonthDropdown
                                    useShortMonthInDropdown
                                    showPopperArrow={false}
                                    peekNextMonth
                                    dropdownMode="select"
                                    isClearable
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="End Date"
                                    className="w-full"
                                />
                            </div>
                        </div>

                        {data?.audience_type == "Student" &&
                            <div className="col-span-12">
                                <div className="educare-radio-select-item border border-border/50 px-[15px] py-[15px] rounded-sm">
                                    <div className="flex flex-wrap gap-3">
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="select_all_class"
                                                    name="select_all_class"
                                                    checked={
                                                        classroomCheckedAll
                                                    }
                                                    onChange={(e) =>
                                                        handleCheckboxSelect(e.target.name,e.target.checked)
                                                    }
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor="select_all_class"
                                                    value="All Class"
                                                />
                                            </div>
                                        </div>
                                        {classrooms?.length > 0 &&
                                            classrooms?.map((item, index) => (
                                                <div key={index} className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id={`classroom_id_${item?.id}`}
                                                            name={`classroom_id_${item?.id}`}
                                                            checked={
                                                                classroomIds?.includes(item?.id)
                                                            }
                                                            onChange={(e) =>
                                                                handleCheckboxSelect(e.target.name, item?.id)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor={`classroom_id_${item?.id}`}
                                                            value={item?.title}
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        }

                        <div className="col-span-12">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="description"
                                    value="News"
                                />
                                <TextareaInput
                                    id="description"
                                    value={
                                        data.description
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "description",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.description
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-input-field-styles">
                                <InputLabel value="Upload Document" />
                                <div className="educare-input-type-file-styles">
                                    <input
                                        id="news_image"
                                        type="file"
                                        name="news_image"
                                        onChange={(e) =>
                                            setData(
                                                "news_image",
                                                e.target
                                                    .files[0]
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document mb-2">
                                <div className="educare-create-school-settings-list-check width-full">
                                    <Checkbox
                                        id="is_published"
                                        name="is_published"
                                        checked={
                                            data.is_published
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "is_published",
                                                e.target
                                                    .checked
                                            )
                                        }
                                    />
                                </div>
                                <div className="educare-create-school-settings-list-title width-full">
                                    <InputLabel
                                        htmlFor="is_published"
                                        value=" Publish News"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="educare-input-field-notes">
                                <h6>Note :</h6>
                                <ul>
                                    <li>
                                        1. File format-png,bmp,jpg,pdf Files allowed.
                                    </li>
                                    <li>
                                        2. Maximum File Size 1Mb.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="educare-button-field-styles mt-2.5 text-end">
                <div className="educare-button-field-styles flex flex-wrap gap-4 justify-end  border-grayLight/20">
                    <PrimaryButton
                        disabled={processing}
                        className="educare-primary-btn-lg-fill"
                        type="button"
                        onClick={(e) => {
                            handleNewsSave(e)
                        }}
                    >
                        Save
                    </PrimaryButton>
                    <Link
                        className="educare-gray-btn-lg-fill"
                        href={route('news.list')}
                    >
                        Cancel
                    </Link>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Save</p>
                    </Transition>
                </div>
            </div>
        </div>
    );
};

export default NewsForm;
