import { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import instituteLogo from "../../../images/logo/logo-thumb.png";
import instituteLogoSmall from "../../../images/logo/logo-thumb-small.png";
import appIcon from "../../../images/logo/app-icon-1.png";
import appIcon2 from "../../../images/logo/app-icon-2.png";
import mapIcon from "../../../images/icon/map.png";
import siteIntro from "../../../images/illustration/site-login-intro.png";
import emailIcon from "../../../images/icon/email.png";
import lockIcon from "../../../images/icon/lock.png";
import siteLogo from "../../../images/logo/superAdminLogo.png";
import Footer from '../../Components/Partials/Footer/Footer';
//form password field
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
//form password field

export default function Login({
    school,
    domainName,
    image,
    status,
    canResetPassword,
}) {
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
        school_id: school?.id,
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

    return (
        <GuestLayout>
            <Head title="Log in" />
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
                            <h3 className="educare-login-form-title mb-8">
                                Login Here
                            </h3>
                            <div className="educare-login-form educare-site-login-form">
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
                                                    setData("password", e.target.value)
                                                }
                                            />
                                            <span><img src={lockIcon} alt="lock icon" /></span>
                                            <span className="eye-icon"><img src={eyeIcon} alt="eye icon" /></span>
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

                                    <div className="flex minMaxMd:gap-2 sm:gap-5 maxXs:gap-2.5 maxXs:flex-wrap justify-between items-center mt-3 mb-7">
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
                                            <span className="ml-2 maxXs:ml-1 cursor-pointer text-[16px] maxXs:text-[15px] text-headingLight font-normal font-primary">
                                                Remember me
                                            </span>
                                        </label>

                                        {canResetPassword && (
                                            <Link
                                                href={route("password.request")}
                                                className="text-[16px] maxXs:text-[15px] text-primary font-normal font-primary"
                                            >
                                                Forgot Password?
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

                                    <p className="text-[16px] font-medium text-headingLight font-primary mb-11 maxSm:mb-6 hidden">
                                        <span className="text-[16px] font-medium text-headingLight font-primary mr-1">
                                            Need a Account?
                                        </span>
                                        <Link
                                            href={route("register")}
                                            className="text-primary"
                                        >
                                            Registration
                                        </Link>
                                    </p>
                                    <div className="educare-site-login-form-social">
                                        <a href="#">
                                            <i className="icon-facebook"></i>
                                        </a>
                                        <a href="#">
                                            <i className="icon-youtube"></i>
                                        </a>
                                        <a href="#">
                                            <i className="icon-LinkedinLogo"></i>
                                        </a>
                                        <a href="#">
                                            <i className="icon-TwitterLogo"></i>
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="dashboard-footer">
                <Footer />
            </footer>
        </GuestLayout>
    );
}
