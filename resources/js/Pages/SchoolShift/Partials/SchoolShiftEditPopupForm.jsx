import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import SelectInput2 from '@/Components/SelectInput2';
import { router } from '@inertiajs/react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";

export default function SchoolShiftEditPopupForm({ editPopupOpen, setEditPopupOpen, editData, shiftType }) {

    const intStartTime = moment(editData?.start_time_at, 'HH:mm:ss').toDate();
    const intEndTime = moment(editData?.end_time_at, 'HH:mm:ss').toDate();

    const [startTime, setStartTime] = useState(editData.start_time_at);
    const [endTime, setEndTime] = useState(editData.end_time_at);

    const timeFormet = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    const [data, setData] = useState(editData);
    useEffect(() => {
        setData(editData);
        setStartTime(intStartTime);
        setEndTime(intEndTime);
    }, [editData])

    const handleUpdate = (e) => {
        e.preventDefault();
        data.start_time_at = startTime ? timeFormet(startTime) : '';
        data.end_time_at = endTime ? timeFormet(endTime) : '';
        router.patch(route('school_shift.update', editData.id), data);
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
                            <h5>School shift</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-school-shift-input-field">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="editTitle"
                                        value="Shift title *"
                                    />
                                    <SelectInput2
                                        id="editTitle"
                                        data_label="shift"
                                        data={shiftType}
                                        selectedData={data.title}
                                        onChange={(e) => setData({ ...data, title: e.target.value })}
                                        type="text"
                                        className="mt-1 block w-full"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="educare-school-shift-input-field">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="edit_start_time_at"
                                        value="Start time*"
                                    />
                                    <DatePicker
                                        id="edit_start_time_at"
                                        name="start_time_at"
                                        selected={startTime}
                                        onChange={(date) =>
                                            setStartTime(date)
                                        }
                                        showYearDropdown
                                        showMonthDropdown
                                        useShortMonthInDropdown
                                        showPopperArrow={false}
                                        peekNextMonth
                                        dropdownMode="select"
                                        isClearable
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={1}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                        placeholderText="Start time"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className="educare-school-shift-input-field">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="edit_end_time_at"
                                        value="End time*"
                                    />
                                    <DatePicker
                                        name="end_time_at"
                                        id="edit_end_time_at"
                                        selected={endTime}
                                        onChange={(date) =>
                                            setEndTime(date)
                                        }
                                        showYearDropdown
                                        showMonthDropdown
                                        useShortMonthInDropdown
                                        showPopperArrow={false}
                                        peekNextMonth
                                        dropdownMode="select"
                                        isClearable
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={1}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                        placeholderText="End time"
                                        className="w-full"
                                    />
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
