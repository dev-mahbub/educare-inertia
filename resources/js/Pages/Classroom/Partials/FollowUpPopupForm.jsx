import { useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import DatePicker from "react-datepicker";
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';

export default function FollowUpPopupForm({ className = '', modalFollowUpOpen, setModalFollowUpOpen }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const followupActivityIdInput = useRef();
    const followupNextIdInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        followup_activity_id: '',
        followup_next_id: '',
        next_followup_checkbox_id: '',
    });

    const followUpFormData = (e) => {
        e.preventDefault();
        // destroy(route('profile.destroy'), {
        //     preserveScroll: true,
        //     onSuccess: () => closeModal(),
        //     onError: () => passwordInput.current.focus(),
        //     onFinish: () => reset(),
        // });
    };

    const closeModal = () => {
        setModalFollowUpOpen(false);
        reset();
    };

    return (
        <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
            <Modal show={modalFollowUpOpen} onClose={closeModal}>
                <form onSubmit={followUpFormData} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b border-border">
                        <div className="educare-popup-form-header py-3">
                            <h5>Follow Up</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="followup_activity_id"
                                    value="Activity*"
                                />

                                <TextInput
                                    id="followup_activity_id"
                                    ref={followupActivityIdInput}
                                    value={data.followup_activity_id}
                                    onChange={(e) =>
                                        setData(
                                            "followup_activity_id",
                                            e.target.value
                                        )
                                    }
                                    type="text"
                                    className="block"
                                />

                                <InputError
                                    message={errors.followup_activity_id}
                                    className="mt-2"
                                />
                            </div>
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="followup_start_date_id"
                                    value="Activity Date*"
                                />
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    showYearDropdown
                                    showMonthDropdown
                                    useShortMonthInDropdown
                                    showPopperArrow={false}
                                    peekNextMonth
                                    dropdownMode="select"
                                    isClearable
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Start date"
                                />
                            </div>
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="followup_start_date_id"
                                    value="Follow Date"
                                />
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    showYearDropdown
                                    showMonthDropdown
                                    useShortMonthInDropdown
                                    showPopperArrow={false}
                                    peekNextMonth
                                    dropdownMode="select"
                                    isClearable
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="End date"
                                />
                            </div>
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="followup_next_id"
                                    value="Next Action"
                                />

                                <TextInput
                                    id="followup_next_id"
                                    ref={followupNextIdInput}
                                    value={data.followup_next_id}
                                    onChange={(e) =>
                                        setData(
                                            "followup_next_id",
                                            e.target.value
                                        )
                                    }
                                    type="text"
                                    className="block"
                                />

                                <InputError
                                    message={errors.followup_next_id}
                                    className="mt-2"
                                />
                            </div>
                            <div className="educare-checkbox-field-styles">
                                <InputLabel
                                    htmlFor="next_followup_checkbox_id"
                                    value="Next Action"
                                    className='block'
                                />
                                <Checkbox
                                    name="next_followup_checkbox_id"
                                    checked={data.next_followup_checkbox_id}
                                    onChange={(e) =>
                                        setData(
                                            "next_followup_checkbox_id",
                                            e.target.checked
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <PrimaryButton className="ml-3 inline-flex h-10 items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150" disabled={processing}>
                           Save
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}