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

import instituteLogo from "../../../images/logo/logo-thumb.png";
import instituteLogoSmall from "../../../images/logo/logo-thumb-small.png";
import appIcon from "../../../images/logo/app-icon-1.png";
import appIcon2 from "../../../images/logo/app-icon-2.png";
import mapIcon from "../../../images/icon/map.png";
import siteIntro from "../../../images/illustration/site-login-intro.png";
import siteLogo from "../../../images/logo/superAdminLogo.png";

export default function ResetPassword({ status, token, email, school, domainName, image }) {
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

            <div className="educare-login-area bg-dark p-[30px]">
                <div className="text-center bg-dark">
                    <div className="educare-site-login-wrapper relative">
                        <div className="educare-site-login-banner order-1 maxMd:order-2">
                            <div className="educare-site-login-banner-top">
                                <div className="educare-site-login-banner-logo">
                                    <div className="educare-site-login-banner-logo-left">
                                        <div className="bg-[#B0EBFF] educare-site-login-banner-logo-left-thumb">
                                            <a href="#">
                                                <img
                                                    src={
                                                        image
                                                            ? image
                                                            : instituteLogo
                                                    }
                                                    className="max-w-[150px]"
                                                    alt="logo not found"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="educare-site-login-banner-logo-right">
                                        <h4>{school?.title}</h4>
                                        <span>
                                            Affiliate Code:{" "}
                                            {school?.affiliation_no}
                                        </span>
                                        <a
                                            href="#"
                                            className="educare-school-address"
                                        >
                                            <img src={mapIcon} alt="" />{" "}
                                            {school?.street_address}
                                        </a>
                                        <div className="educare-site-login-banner-logo-right-btn">
                                            <a href="#">
                                                <img src={appIcon} alt="" />
                                            </a>
                                            <a href="#">
                                                <img src={appIcon2} alt="" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="educare-site-login-banner-content">
                                    <div className="educare-site-login-banner-content-address">
                                        <span>State:</span>
                                        <h6>{school?.state_name}</h6>
                                    </div>
                                    <div className="educare-site-login-banner-content-address">
                                        <span>City:</span>
                                        <h6>{school?.city}</h6>
                                    </div>
                                    <div className="educare-site-login-banner-content-address">
                                        <span>Medium:</span>
                                        <h6>{school?.medium}</h6>
                                    </div>
                                    <div className="educare-site-login-banner-content-address">
                                        <span>Established:</span>
                                        <h6>{school?.established_at}</h6>
                                    </div>
                                    <div className="educare-site-login-banner-content-address">
                                        <span>Board:</span>
                                        <h6>{school?.board_title}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="educare-site-login-banner-welcome">
                                <div className="z-[1] relative">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: school?.description,
                                        }}
                                    />
                                </div>
                                <div className="educare-site-login-banner-welcome-img">
                                    <img src={siteIntro} alt="logo" />
                                </div>
                            </div>
                        </div>
                        <div className="educare-site-login-form-wraper order-2 maxMd:order-1 text-left">
                            <div className="bg-[#B0EBFF] educare-site-login-form-logo mb-4 mt-[50px] maxMd:mt-5">
                                <img
                                    src={image ? image : instituteLogoSmall}
                                    className="max-w-[100px] max-h-20"
                                    alt="logo"
                                />
                            </div>
                            <h3 className="educare-login-form-title mb-4">Reset Password?</h3>

                            <p className="mb-7">
                                Reset your password? No problem. Just let us know
                                your email address and we will email you a password
                                reset link that will allow you to choose a new one.
                            </p>
                            <div className="educare-login-form educare-site-login-form">
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
                    <div className="educare-site-login-banner-bottom pt-7 w-full bg-dark text-left left-0">
                        <div className="inline-flex gap-2.5 items-center">
                            <span className="text-headingLight font-normal font-primary text-[14px]">
                                Powered By :
                            </span>
                            <img
                                className="max-w-[180px]"
                                src={siteLogo}
                                alt="logo"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
