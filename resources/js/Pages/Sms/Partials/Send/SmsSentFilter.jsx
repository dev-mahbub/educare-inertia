import React, { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import TertiaryButton from '@/Components/TertiaryButton';
import SuccessButton from '@/Components/SuccessButton';
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import DatePicker from "react-datepicker";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function SmsSentFilter({className = ""}) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const sentSmsOneInput = useRef();
    const sentSmsTwoInput = useRef();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        sent_sms_all_one: "",
        send_sms_all_two: "",

    });

    const SmsSentFilterData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.job_posting_month_id) {
                    reset("job_posting_month_id");
                    jobPostingMonthInput.current.focus();
                }
            },
        });
    };
    
    return (
        <div className='educare-student-birthday-filter-area z-[4] relative'>
            <div className="mb-3 educare-filter-bar">
                <div className="educare-default-filter">
                    <form onSubmit={SmsSentFilterData}>
                        <div className="educare-student-birthday-filter-title">
                            <h5 className="text-[18px] font-semibold text-headingLight">Sent messages history</h5>
                        </div>
                        <div className="flex items-center flex-wrap gap-x-5 gap-y-2">
                            <div className="educare-admission-filter-bar-filter-fields-wrap relative">
                                <div className="educare-birthday-filter-fields flex flex-wrap items-center gap-2">
                                    <div className="educare-input-field-styles">
                                        <SelectInput
                                            id="sent_sms_all_one"
                                            data_label="All"
                                            data={[]}
                                            ref={
                                                sentSmsOneInput
                                            }
                                            value={
                                                data.sent_sms_all_one
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "sent_sms_all_one",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.sent_sms_all_one
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="educare-input-field-styles">
                                        <SelectInput
                                            id="send_sms_all_two"
                                            data_label="All"
                                            data={[]}
                                            ref={
                                                sentSmsTwoInput
                                            }
                                            value={
                                                data.send_sms_all_two
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "send_sms_all_two",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.send_sms_all_two
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="educare-input-field-styles">
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
                                    <div className="educare-input-field-styles">
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
                            </div>
                            <div className="educare-admission-filtar-bar-filter-action">
                                <div className="educare-button-field-styles">
                                    <PrimaryButton
                                        disabled={processing}
                                        className="bg-supportingA"
                                    >
                                        <i className="icon-FileX"></i>
                                    </PrimaryButton>
                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600"><i className="icon-FileX"></i></p>
                                    </Transition>
                                </div>
                                <div className="educare-button-field-styles">
                                    <PrimaryButton
                                        disabled={processing}
                                        className="bg-supportingB"
                                    >
                                        <i className="icon-search-interface-symbol"></i>
                                    </PrimaryButton>
                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600"><i className="icon-search-interface-symbol"></i></p>
                                    </Transition>
                                </div>
                                <div className="educare-button-field-styles">
                                    <PrimaryButton
                                        disabled={processing}
                                        className="bg-supportingC"
                                    >
                                        <i className="icon-ArrowsClockwise"></i>
                                    </PrimaryButton>
                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600"><i className="icon-ArrowsClockwise"></i></p>
                                    </Transition>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
