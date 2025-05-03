import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import emailIcon from "../../../images/icon/email.png";
import loginIntroImage from "../../../images/illustration/login-intro.png";
import superAdminLogo from "../../../images/logo/superAdminLogo.png";

export default function ForgotPassword({ status, metaData }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            {/* <Head title="Forgot Password" /> */}
            <Head
                title={metaData?.title ?? 'Forgot Password'}
            >
                <meta name="title" content={metaData?.title} />
                <meta name="description" content={metaData?.description} />
                <meta name="keywords" content={metaData?.keywords} />
            </Head>

            {/* <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("email", e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form> */}

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
                        <h3 className="educare-login-form-title mb-4">Forgot Password?</h3>
                        <p className="mb-7">
                            Forgot your password? No problem. Just let us know
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
