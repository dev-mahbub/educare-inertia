import { useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';

export default function HolidayPolicyEditPopupForm({ editPopupOpen, setEditPopupOpen, editData, holiday_policy_days, holiday_policy_days_rule }) {

    const [days, setDays] = useState('');
    const [data, setData] = useState('');
    useEffect(() => {
        if (typeof editData?.rule_title !== "undefined") {
            setData(editData);
            setDays(editData?.rule_title?.split(", "))
        }
    }, [editData]);

    const handleUpdate = (e) => {
        e.preventDefault();
        data.rule_title = days;
        router.patch(route('holiday_policy.update', editData.id), data);
        closeModal();
        router.get(route('holiday_policy.list'));
    };

    const closeModal = () => {
        setEditPopupOpen(false);
        router.get(route('holiday_policy.list'));
    };

    const handleCheckboxChange = (value) => {
        if (days.includes(value)) {
            setDays(days.filter((item) => item !== value));
        } else {
            setDays([...days, value]);
        }
    };

    return (
        <div className='educare-admission-follow-up-area space-y-6'>
            <Modal show={editPopupOpen} onClose={closeModal}>
                <form onSubmit={handleUpdate} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Holiday</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">

                            {/* Start Field  */}
                            <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                <div className="col-span-3 maxXs:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="day"
                                            value="Day*"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-9 maxXs:col-span-12">
                                    <div className="educare-select-field-styles">
                                        <SelectInput
                                            id="name"
                                            data_label="day"
                                            data={holiday_policy_days}
                                            value={data.name}
                                            onChange={(e) => setData({ ...data, name: e.target.value })}
                                            type="text"
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
                                            htmlFor="add_class"
                                            value="Rule*"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-9 maxXs:col-span-12">
                                    <div className="educare-radio-field-styles flex flex-col gap-y-4">

                                        {holiday_policy_days_rule?.length && holiday_policy_days_rule?.map((item) => (
                                            <div key={item.id}>
                                                <input
                                                    type="checkbox"
                                                    id={`edit_${item.id}`}
                                                    name={`rule_title[${item.id}]`}
                                                    data-select-all="b-check"
                                                    className="checkme mr-2"
                                                    checked={days?.includes(item?.title)}
                                                    onChange={() => handleCheckboxChange(item?.title)}
                                                />
                                                <InputLabel
                                                    htmlFor={`edit_${item.id}`}
                                                    value={item.title}
                                                />
                                            </div>
                                        ))}
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
