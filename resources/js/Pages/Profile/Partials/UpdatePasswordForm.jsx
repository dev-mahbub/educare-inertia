import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Update Password</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>


            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                
            <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-12">
                        <div className="educare-input-field-styles">
                            <div className="educare-input-field-styles-label-wrap">
                                <div className="educare-input-field-styles-label">
                                    <InputLabel
                                        htmlFor="current_password"
                                        value="Current Password"
                                    />
                                    <sup>*</sup>
                                </div>
                            </div>
                            <TextInput
                                id="current_password"
                                autoComplete="current-password"
                                value={
                                    data.current_password
                                }
                                type="password"
                                onChange={(e) =>
                                    setData(
                                        "current_password",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.current_password
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-12">
                        <div className="educare-input-field-styles">
                            <div className="educare-input-field-styles-label-wrap">
                                <div className="educare-input-field-styles-label">
                                    <InputLabel
                                        htmlFor="password"
                                        value="New Password"
                                    />
                                    <sup>*</sup>
                                </div>
                            </div>
                            <TextInput
                                id="password"
                                autoComplete="new-password"
                                value={
                                    data.password
                                }
                                type="password"
                                onChange={(e) =>
                                    setData(
                                        "password",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.password
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-12">
                        <div className="educare-input-field-styles">
                            <div className="educare-input-field-styles-label-wrap">
                                <div className="educare-input-field-styles-label">
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Confirm Password"
                                    />
                                    <sup>*</sup>
                                </div>
                            </div>
                            <TextInput
                                id="password_confirmation"
                                autoComplete="new-password"
                                value={
                                    data.password_confirmation
                                }
                                type="password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.password_confirmation
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>
            </div>


                <div className="flex items-center gap-4">
                    <PrimaryButton 
                        disabled={processing}
                        className="h-12 bg-primary text-white text-[16px] rounded-md font-medium px-6 font-primary inline-block"
                    >
                        Update Password
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Update.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
