import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import superAdminLogo from "../../../images/logo/superAdminLogo.png";
import loginIntroImage from "../../../images/illustration/login-intro.png";
import emailIcon from "../../../images/icon/email.png";
import lockIcon from "../../../images/icon/lock.png";

export default function ResetPassword({ status, token, email }) {
    
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div className="educare-login-area text-center">
                <div className="educare-login-wrapper bg-white">
                    <div className="educare-login-banner">
                        <div className="educare-login-banner-logo mb-14">
                            <img src={superAdminLogo} alt="Super Admin Logo" />
                        </div>
                        <div className="educare-login-banner-info mb-[70px]">
                            <div className="educare-login-banner-info-item">
                                <h4 className="educare-login-banner-info-title mb-5">
                                    Welcome Back!
                                </h4>
                                <p>
                                    EduCareStudy unites teachers and
                                    parents as partners in every success. One
                                    platform makes collaboration.
                                </p>
                            </div>
                        </div>
                        <div className="educare-login-banner-intro-img">
                            <img src={loginIntroImage} alt="intro image" />
                        </div>
                    </div>

                    <div className="educare-login-form-wraper text-left">
                        <h3 className="educare-login-form-title mb-4">Reset Password?</h3>
                        <p className="mb-7">
                            Reset your password? No problem. Just let us know
                            your email address and we will email you a password
                            reset link that will allow you to choose a new one.
                        </p>
                        <div className="educare-login-form">
                            {status && (
                                <div className="mb-4 font-medium text-sm text-success">
                                    {status}
                                </div>
                            )}
                            <form onSubmit={submit}>
                                <div className="educare-form-input-style mb-[26px]">
                                    <InputLabel htmlFor="email" value="Email" />
                                    <div className="educare-form-input-style-field">
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                        <span>
                                            <img
                                                src={emailIcon}
                                                alt="email icon"
                                            />
                                        </span>
                                    </div>
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="educare-form-input-style mb-[26px]">
                                    <InputLabel htmlFor="password" value="Password" />
                                    <div className="educare-form-input-style-field">
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            autoComplete="new-password"
                                            isFocused={true}
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData("password", e.target.value)
                                            }
                                        />
                                        <span>
                                            <img
                                                src={lockIcon}
                                                alt="lock icon"
                                            />
                                        </span>
                                    </div>
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="educare-form-input-style mb-[26px]">
                                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                                    <div className="educare-form-input-style-field">
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            autoComplete="new-password"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData("password_confirmation", e.target.value)
                                            }
                                        />
                                        <span>
                                            <img
                                               src={lockIcon}
                                                alt="lock icon"
                                            />
                                        </span>
                                    </div>
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                <div className="educare-login-form-btn mb-5">
                                    <PrimaryButton
                                        className=""
                                        disabled={processing}
                                    >
                                        Email Password Reset
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </GuestLayout>
    );
}
