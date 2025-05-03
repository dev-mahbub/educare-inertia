import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function UpdateRegStatus({
    className = '',
    regStatusPopup,
    setRegStatusPopup,
    selectedRegistrationData = {},
    registrationStatusArray = []
}) {

    const {
        data,
        setData,
        delete: destroy,
        processing,
        patch,
        reset,
        errors,
    } = useForm({
        registration_status: "",
    });

    useEffect(() => {
        setData('registration_status', selectedRegistrationData?.registration_status ?? "" );
    }, [selectedRegistrationData]);

    const updateRegistrationStatus = (e) => {
        e.preventDefault();
        errors['registration_status'] = "";

        patch(route('admissionRegistrarionStatus.update', selectedRegistrationData?.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            // onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setRegStatusPopup(false);
        reset();
    };

    return (
        <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
            <Modal show={regStatusPopup} onClose={closeModal}>
                <form onSubmit={updateRegistrationStatus} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b-0 mb-0 border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Confirmation</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-input-field-styles">
                                <div className="grid grid-cols-12 gap-x-5">
                                    <div className="sm:col-span-6 col-span-12">
                                        <ul>
                                            <li className='mb-2'>
                                                <span className='text-[16px] font-normal text-headingLightest'>Name : </span>
                                                <span className='text-[16px] font-semibold text-headingLight'>{selectedRegistrationData.first_name} {selectedRegistrationData.middle_name} {selectedRegistrationData.last_name}</span>
                                            </li>
                                            <li className='mb-2'>
                                                <span className='text-[16px] font-normal text-headingLightest'>Class : </span>
                                                <span className='text-[16px] font-semibold text-headingLight'>{selectedRegistrationData.title}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sm:col-span-6 col-span-12">
                                        <ul>
                                            <li className='mb-2'>
                                                <span className='text-[16px] font-normal text-headingLightest'>Father Name : </span>
                                                <span className='text-[16px] font-semibold text-headingLight'>{selectedRegistrationData.father_first_name}</span>
                                            </li>
                                            <li className='mb-2'>
                                                <span className='text-[16px] font-normal text-headingLightest'>Mobile No : </span>
                                                <span className='text-[16px] font-semibold text-headingLight'>{selectedRegistrationData.contact_number}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="registration_status"
                                    value="Update Registration Status"
                                />
                                <SelectInput
                                    id="registration_status"
                                    data_label="Status"
                                    data={registrationStatusArray}
                                    value={
                                        data.registration_status
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "registration_status",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.registration_status
                                    }
                                    className="mt-2"
                                />
                            </div>
                            {data.registration_status !== "" && null && undefined ?
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="registration_update_note"
                                        value="Note"
                                    />
                                    <TextInput
                                        id="registration_update_note"
                                        value={
                                            data.registration_update_note
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "registration_update_note",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.registration_update_note
                                        }
                                        className="mt-2"
                                    />
                                </div>
                                : ''
                            }
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-2.5">
                        <PrimaryButton type="button" className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                        <PrimaryButton type="submit" className="educare-primary-btn-md-fill">Update</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
