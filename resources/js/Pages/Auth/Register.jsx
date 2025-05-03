import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import superAdminLogo from "../../../images/logo/superAdminLogo.png";
import loginIntroImage from "../../../images/illustration/login-intro.png";
import googleIcon from "../../../images/icon/google.png";
import facebookIcon from "../../../images/icon/facebook.png";
import emailIcon from "../../../images/icon/email.png";
import lockIcon from "../../../images/icon/lock.png";

//form password field
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
//form password field

export default function Register({status}) {
    //form password field
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordC, setShowPasswordC] = useState(false);
    const handleClickShowPasswordC = () => setShowPasswordC((show) => !show);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseDownPasswordC = (event) => {
        event.preventDefault();
    };
    //form password field
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
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

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="educare-login-area text-center">
                <div className="educare-login-wrapper bg-dark">
                    <div className="educare-login-banner">
                        <div className="educare-login-banner-logo mb-14">
                            <img src={superAdminLogo} alt="Super Admin Logo" />
                        </div>
                        <div className="educare-login-banner-info mb-[45px]">
                            <div className="educare-login-banner-info-item">
                                <h4 className="educare-login-banner-info-title mb-5">
                                    Welcome Back!
                                </h4>
                                <p>
                                    Demo Public School unites teachers and
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
                        <h3 className="educare-login-form-title mb-6">
                            Registration Here
                        </h3>
                        <p className="mb-7">You can signup here</p>
                        <div className="educare-login-form-social-btn mb-6 hidden">
                            <a href="#" className="">
                                <img src={googleIcon} alt="google icon" />{" "}
                                Registration with Google
                            </a>
                            <a href="#" className="hidden">
                                <img src={facebookIcon} alt="facebook icon" />{" "}
                                Registration with Facebook
                            </a>
                        </div>
                        <div className="educare-login-form">
                            {status && (
                                <div className="mb-4 font-medium text-sm text-success">
                                    {status}
                                </div>
                            )}
                            <form onSubmit={submit}>
                                <div className="educare-form-input-style mb-5">
                                    <InputLabel htmlFor="name" value="Name" />
                                    <div className="educare-form-input-style-field">
                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            autoComplete="name"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            required
                                        />
                                        <span>
                                            <img
                                                src={emailIcon}
                                                alt="email icon"
                                            />
                                        </span>
                                    </div>
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="educare-form-input-style mb-5">
                                    <InputLabel htmlFor="email" value="Email" />
                                    <div className="educare-form-input-style-field">
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            required
                                        />
                                        <span>
                                            <img
                                                src={emailIcon}
                                                alt="email icon"
                                            />
                                        </span>
                                    </div>
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="educare-form-input-style mb-5">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                    />
                                    <div className="educare-form-input-style-field">
                                        <div className="educare-input-eye-style">
                                            <FilledInput
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                // placeholder="Enter your password"
                                                autoComplete="current-password"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={
                                                                handleClickShowPassword
                                                            }
                                                            onMouseDown={
                                                                handleMouseDownPassword
                                                            }
                                                            edge="end"
                                                        >
                                                            {showPassword ? (
                                                                <VisibilityOff />
                                                            ) : (
                                                                <Visibility />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </div>
                                        <span>
                                            <img
                                                src={lockIcon}
                                                alt="lock icon"
                                            />
                                        </span>
                                    </div>

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="educare-form-input-style mb-5">
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Confirm Password"
                                    />
                                    <div className="educare-form-input-style-field">
                                        <div className="educare-input-eye-style">
                                            <FilledInput
                                                type={showPasswordC ? 'text' : 'password'}
                                                // placeholder="Enter your password"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPasswordC}
                                                            onMouseDown={handleMouseDownPasswordC}
                                                            edge="end"
                                                        >
                                                            {showPasswordC ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </div>
                                        <span>
                                            <img
                                                src={lockIcon}
                                                alt="lock icon"
                                            />
                                        </span>
                                    </div>

                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>

                                {/* <div className="educare-form-input-style mb-5">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                    />
                                    <div className="educare-form-input-style-field">
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <span>
                                            <img
                                                src={lockIcon}
                                                alt="lock icon"
                                            />
                                        </span>
                                        <span className="eye-icon">
                                            <img src={eyeIcon} alt="eye icon" />
                                        </span>
                                    </div>

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div> */}

                                {/* <div className="educare-form-input-style mb-5">
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Confirm Password"
                                    />
                                    <div className="educare-form-input-style-field">
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <span>
                                            <img
                                                src={lockIcon}
                                                alt="lock icon"
                                            />
                                        </span>
                                        <span className="eye-icon">
                                            <img src={eyeIcon} alt="eye icon" />
                                        </span>
                                    </div>

                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div> */}

                                <div className="educare-login-form-btn mb-5">
                                    <PrimaryButton
                                        className=""
                                        disabled={processing}
                                    >
                                        Registration
                                    </PrimaryButton>
                                </div>

                                <p className="text-[16px] font-medium text-headingLight font-primary maxSm:mb-6">
                                    Already registered?
                                    <Link
                                        href={route("login")}
                                        className="text-primary ml-1"
                                    >
                                        Login
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
