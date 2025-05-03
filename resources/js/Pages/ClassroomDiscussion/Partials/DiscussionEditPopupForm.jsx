import { useEffect, useRef, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextareaInput from '@/Components/TextareaInput';
import SelectInput from '@/Components/SelectInput';
import DatePicker from "react-datepicker";
import SelectInput2 from '@/Components/SelectInput2';

export default function DiscussionEditPopupForm({ editPopupOpen, setEditPopupOpen, editData, class_discussion, subject_titles, subject_grades, topics, choices }) {

    const [data, setData] = useState(editData);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        setData(editData);
        setStartDate(new Date(editData.start_date_at)); 
        setEndDate(new Date(editData.end_date_at));
    }, [editData])

    const handleUpdate = (e) => {
        e.preventDefault();
        data.start_date_at = startDate,
        data.end_date_at = endDate,
        router.patch(route('classroom_discussion.update', data.id), data);
        closeModal();
    };

    const closeModal = () => {
        setEditPopupOpen(false);
    };

    return (
        <div className="educare-admission-follow-up-area space-y-6">
            <Modal show={editPopupOpen} onClose={closeModal}>
                <form onSubmit={handleUpdate} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Discussion class</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-6 max2Xl:col-span-12 minMaxLg:col-span-6 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="grade"
                                            value="Grade"
                                        />
                                        <SelectInput2
                                            id="grade"
                                            data_label="Grade"
                                            data={subject_grades}
                                            selectedData={data.grade}
                                            onChange={(e) => setData({ ...data, grade: e.target.value })}
                                            type="text"
                                            className="mt-1 block w-full"
                                            required
                                        />

                                    </div>
                                </div>
                                <div className="col-span-6 max2Xl:col-span-12 minMaxLg:col-span-6 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="subject_id"
                                            value="Subject"
                                        />
                                        <SelectInput2
                                            id="subject_id"
                                            data_label="Subject"
                                            data={subject_titles}
                                            selectedData={data.subject_id}
                                            onChange={(e) => setData({ ...data, subject_id: e.target.value })}
                                            type="text"
                                            className="mt-1 block w-full"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 max2Xl:col-span-12 minMaxLg:col-span-6 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="choice"
                                            value="Choice"
                                        />
                                        <SelectInput2
                                            id="choice"
                                            data_label="Choice"
                                            data={choices}
                                            selectedData={data.choice}
                                            onChange={(e) => setData({ ...data, choice: e.target.value })}
                                            type="text"
                                            className="mt-1 block w-full"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 max2Xl:col-span-12 minMaxLg:col-span-6 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="topic_id"
                                            value="Topic"
                                        />
                                        <SelectInput
                                            id="topic_id"
                                            data_label="Topic"
                                            data={topics}
                                            value={data.topic_id}
                                            selectedData={data.topic_id}
                                            onChange={(e) => setData({ ...data, topic_id: e.target.value })}
                                            type="text"
                                            className="mt-1 block w-full"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 hidden">
                                    <div className="educare-button-field-styles warning-button-styles flex items-end min-h-full">
                                        <SecondaryButton className="focus:ring-supportingB">
                                            Find Questions
                                        </SecondaryButton>
                                    </div>
                                </div>
                                <div className="col-span-6 max2Xl:col-span-12 minMaxLg:col-span-6 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="start_date_at"
                                            value="Start Date"
                                        />
                                        <DatePicker
                                            id="start_date_at"
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
                                            placeholderText="Start Date"
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 max2Xl:col-span-12 minMaxLg:col-span-6 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="end_date_at"
                                            value="End Date"
                                        />
                                        <DatePicker
                                            id="end_date_at"
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
                                <div className="col-span-12 hidden">
                                    <div className="educare-button-field-styles secondary-button-styles flex items-end min-h-full">
                                        <SecondaryButton className="focus:ring-supportingA">
                                            Get Asked Question
                                        </SecondaryButton>
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="title"
                                            value="Discussion Topic"
                                        />
                                        <TextInput
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData({ ...data, title: e.target.value })}
                                            type="text"
                                            className="block"
                                            placeHolder="Write your topic"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="description"
                                            value="Discussion Description"
                                        />
                                        <TextareaInput
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData({ ...data, description: e.target.value })}
                                            className="block"
                                            placeholder="Write your description"
                                        />
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <PrimaryButton className="ml-3 inline-flex h-10 items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white tracking-widest hover:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150">
                            Update
                        </PrimaryButton>
                        <SecondaryButton className="ml-3" onClick={closeModal}>Cancel</SecondaryButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
