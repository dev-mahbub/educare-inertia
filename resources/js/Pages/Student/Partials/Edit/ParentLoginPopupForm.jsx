import { useEffect, useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import DatePicker from "react-datepicker";
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import TextareaInput from '@/Components/TextareaInput';

export default function ParentLoginPopupForm({ siteData, student, parentLoginPopupOpen, setParentLoginPopupOpen, parentLoginData }) {

    const { data, setData } = useForm({
        id: parentLoginData?.id,
        username: "",
        password: "",
    });

    const handleParentLoginUpdate = (e) => {
        e.preventDefault();
        router.put(route('student.parent_login_update', parentLoginData.id), data);
        closeModal();
    };

    const closeModal = () => {
        setParentLoginPopupOpen(false);
    };

    let parentPass = '';

    if (siteData?.loginCredential?.password == 'student_name') {
        let middleName = student?.middle_name ? ' ' + student?.middle_name : ''
        let lastName = student?.last_name ? ' ' + student?.last_name : ''
        parentPass = student?.first_name + middleName + lastName
    }
    // set parent_name as a password
    else if (siteData?.loginCredential?.password === 'parent_name') {
        let middleName = parentLoginData?.middle_name ? ' ' + parentLoginData?.middle_name : ''
        let lastName = parentLoginData?.last_name ? ' ' + parentLoginData?.last_name : ''
        parentPass = parentLoginData?.first_name + middleName + lastName
    }
    // set admission_no as a password
    else if (siteData?.loginCredential?.password === 'admission_no') {
        parentPass = student?.admission_no
    }
    // set birth_date_at as a password
    else if (siteData?.loginCredential?.password === 'birth_date') {
        parentPass = student?.birth_date_at
    }
    // set father_mobile as a username
    else if (siteData?.loginCredential?.password === 'father_mobile') {
        parentPass = parentLoginData?.phone
    }

    return (
        <section className='educare-admission-follow-up-area space-y-6'>
            <Modal show={parentLoginPopupOpen} onClose={closeModal}>
                <form onSubmit={handleParentLoginUpdate}>
                    <div className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Parent Login Details</h5>
                            </div>
                            <div className="educare-popup-form-header py-3">
                                <h4>Current Username and Password</h4>
                            </div>
                            <div className="mt-5">
                                {/* Start Field  */}
                                <div>
                                    <p><span className="font-semibold">Username</span> : <span>{parentLoginData?.username}</span></p>
                                </div>
                                <div className="mt-1">
                                    <p><span className="font-semibold">Password</span> : <span>
                                    { (parentLoginData?.parent_pass != null) ?
                                        parentLoginData?.username
                                    :
                                        parentPass
                                    }
                                    </span></p>

                                </div>
                                {/* Start Field  */}
                            </div>
                            <div className="educare-popup-form-header py-3">
                                <h4>Change Username and Password in below:</h4>
                            </div>

                            <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">

                                {/* Start Field  */}
                                <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                    <div className="col-span-3 maxXs:col-span-12">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="parent_username"
                                                value="Username"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-9 maxXs:col-span-12">
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="parent_username"
                                                onChange={(e) => setData("username", e.target.value)}
                                                type="text"
                                                className="block"
                                                required
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
                                                htmlFor="parent_password"
                                                value="Password"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-9 maxXs:col-span-12">
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="parent_password"
                                                onChange={(e) => setData("password", e.target.value)}
                                                type="password"
                                                className="block"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Start Field  */}
                            </div>

                        </div>
                        <div className="mt-6 flex justify-end">
                            <PrimaryButton
                                type="submit"
                                className="ml-3 inline-flex h-10 items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white tracking-widest hover:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150">
                                Update
                            </PrimaryButton>
                            <SecondaryButton
                                type="button"
                                className="ml-3"
                                onClick={closeModal}>Cancel</SecondaryButton>
                        </div>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
