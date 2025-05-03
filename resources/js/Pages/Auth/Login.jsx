import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import emailIcon from "../../../images/icon/email.png";
import facebookIcon from "../../../images/icon/facebook.png";
import googleIcon from "../../../images/icon/google.png";
import lockIcon from "../../../images/icon/lock.png";
import loginIntroImage from "../../../images/illustration/login-intro.png";
import superAdminLogo from "../../../images/logo/superAdminLogo.png";

//form password field
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FilledInput from '@mui/material/FilledInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
//form password field

export default function Login({ status, canResetPassword }) {
    //form password field
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    //form password field

    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
        school_id: 1,
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    const { flash } = usePage().props;

    return (
        <GuestLayout>
            <Head title="Log in" />

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
                        <h3 className="educare-login-form-title mb-4">
                            Login Here
                        </h3>
                        <p className="mb-7">
                            Login with your data that you registration.
                        </p>
                        <div className="educare-login-form-social-btn mb-6 hidden">
                            <a href="#" className="hidden">
                                <img src={googleIcon} alt="google icon" /> Login
                                with Google
                            </a>
                            <a href="#" className="hidden">
                                <img src={facebookIcon} alt="facebook icon" />{" "}
                                Login with Facebook
                            </a>
                        </div>
                        <div className="educare-login-form">
                            {status && (
                                <div className="mb-4 font-medium text-sm text-success">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit}>
                                <div className="educare-form-input-style mb-[26px]">
                                    <InputLabel
                                        htmlFor="username"
                                        value="Username"
                                    />
                                    <div className="educare-form-input-style-field">
                                        <TextInput
                                            id="username"
                                            type="username"
                                            name="username"
                                            value={data.username}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "username",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <span>
                                            <img
                                                src={emailIcon}
                                                alt="username"
                                            />
                                        </span>
                                        {flash.error && (
                                            <p className="error danger">
                                                {flash.error}
                                            </p>
                                        )}
                                    </div>
                                    <InputError
                                        message={errors.username}
                                        className="mt-2"
                                    />
                                </div>

                                {/* <div className="educare-form-input-style">
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
                                            autoComplete="current-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
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

                                <div className="educare-form-input-style">
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

                                <div className="flex minMaxMd:gap-2 sm:gap-5 justify-between items-center mt-3 mb-7">
                                    <label className="inline-block">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <span className="ml-2 cursor-pointer text-[16px] maxXs:text-[15px] text-headingLight font-normal font-primary">
                                            Remember me
                                        </span>
                                    </label>

                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="text-[16px] maxXs:text-[15px] text-primary font-normal font-primary"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>
                                <div className="educare-login-form-btn mb-5">
                                    <PrimaryButton
                                        className=""
                                        disabled={processing}
                                    >
                                        Log in
                                    </PrimaryButton>
                                </div>

                                <p className="text-[16px] font-medium text-headingLight font-primary maxSm:mb-6 hidden">
                                    Need a Account?
                                    <Link
                                        href={route("register")}
                                        className="text-primary ml-1"
                                    >
                                        Registration
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
