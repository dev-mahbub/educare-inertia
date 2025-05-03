import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import SelectInput2 from '@/Components/SelectInput2';
import TextareaInput from '@/Components/TextareaInput';

export default function SmsSettingEditPopupForm({ editPopupOpen, setEditPopupOpen, editData, smsTypeArr, classNames }) {

    const [data, setData] = useState(editData);
    useEffect(() => {
        setData(editData);
    }, [editData])

    console.log(data);

    const handleUpdate = (e) => {
        e.preventDefault();
        router.patch(route('sms_setting.update', editData.id), data);
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
                            <h5>SMS Update</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">

                            <div className="col-span-12">
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
                                        value={data?.title}
                                        onChange={(e) => setData({ ...data, title: e.target.value })}
                                        className="block"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="class_name_id"
                                                value="Audience"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        id="class_name_id"
                                        data_label="Class"
                                        data={classNames}
                                        value={data?.class_name_id}
                                        onChange={(e) => setData({ ...data, class_name_id: e.target.value })}
                                        className="block"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="context"
                                                value="Context"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        id="context"
                                        data_label="context"
                                        data={smsTypeArr}
                                        value={data?.context}
                                        onChange={(e) => setData({ ...data, context: e.target.value })}
                                        className="block"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="description"
                                                value="Approved DLT SMS Template"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <TextareaInput
                                        id="description"
                                        value={data?.description}
                                        onChange={(e) => setData({ ...data, description: e.target.value })}
                                        className="block"
                                        placeholder="Message Template"
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
