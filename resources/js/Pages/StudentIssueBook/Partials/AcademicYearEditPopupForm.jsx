import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { router } from "@inertiajs/react";
import DatePicker from "react-datepicker";
import Checkbox from "@/Components/Checkbox";
import moment from "moment";
import React, { useEffect, useState } from "react";

export default function AcademicYearEditPopupForm({ editPopupOpen, setEditPopupOpen, editData }) {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(() => {
        const nextYearDate = new Date();
        nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
        return nextYearDate;
      });

    const [data, setData] = useState(editData);
    useEffect(() => {
        setData(editData);
        setStartDate(new Date(editData?.start_date_at));
        setEndDate(new Date(editData?.end_date_at));
    }, [editData])

    useEffect(() => {
        if (startDate && endDate) {
            const startYear = moment(startDate).format("YYYY");
            const endYear = moment(endDate).format("YYYY");
            const academicSession = `${startYear}-${endYear}`;
            setData({ ...data, academic_session: academicSession })
        }
    }, [startDate, endDate]);

    const handleUpdate = (e) => {
        e.preventDefault();
        data.start_date_at = startDate;
        data.end_date_at = endDate;
        router.patch(route('academic_year.update', data.id), data);
        closeModal();
    };

    const closeModal = () => {
        setEditPopupOpen(false);
    };


    return (
        <div className='educare-admission-follow-up-area space-y-6'>
            <Modal show={editPopupOpen} onClose={closeModal}>
                <form onSubmit={handleUpdate} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Update academic year</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">

                            {/* Start Field  */}
                            <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                <div className="col-span-3 maxXs:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="start_date_at"
                                            value="Start Date*"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-9 maxXs:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <DatePicker
                                            selected={startDate}
                                            name="start_date_at"
                                            onChange={(date) => setStartDate(date)}
                                            isClearable
                                            placeholderText="Start date"
                                            dateFormat="dd-MMM-yyyy" />
                                    </div>
                                </div>
                            </div>
                            {/* Start Field  */}

                            {/* Start Field  */}
                            <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                <div className="col-span-3 maxXs:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="end_date_at"
                                            value="End Date*"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-9 maxXs:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <DatePicker
                                            selected={endDate}
                                            name="end_date_at"
                                            onChange={(date) => setEndDate(date)}
                                            isClearable
                                            placeholderText="End date"
                                            dateFormat="dd-MMM-yyyy" />
                                    </div>
                                </div>
                            </div>
                            {/* Start Field  */}

                            {/* Start Field  */}
                            <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                <div className="col-span-3 maxXs:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="academic_session"
                                            value="Academic session*"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-9 maxXs:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            id="academic_session"
                                            value={data?.academic_session}
                                            onChange={(e) => setData({ ...data, academic_session: e.target.value })}
                                            type="text"
                                            className="block"
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Start Field  */}

                            {/* Start Field  */}
                            <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                <div className="col-span-3 maxXs:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="display_order"
                                            value="Display order"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-9 maxXs:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            id="display_order"
                                            value={data?.display_order}
                                            onChange={(e) => setData({ ...data, display_order: e.target.value })}
                                            type="number"
                                            className="block"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Start Field  */}

                            {/* Start Field  */}
                            <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                <div className="col-span-3 maxXs:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            value="Copy from current Academic session"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-9 maxXs:col-span-12">
                                    <div className="flex justify-between">
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="edit_is_copy_class"
                                                    name="is_copy_class"
                                                    checked={
                                                        data.is_copy_class
                                                    }
                                                    onChange={(e) => setData({ ...data, is_copy_class: e.target.checked })}
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor="edit_is_copy_class"
                                                    value="Is copy class"
                                                />
                                            </div>
                                        </div>
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="edit_is_copy_admission_criteria"
                                                    name="is_copy_admission_criteria"
                                                    checked={
                                                        data.is_copy_admission_criteria
                                                    }
                                                    onChange={(e) => setData({ ...data, is_copy_admission_criteria: e.target.checked })}
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor="edit_is_copy_admission_criteria"
                                                    value="Is copy admission criteria"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Start Field  */}
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
