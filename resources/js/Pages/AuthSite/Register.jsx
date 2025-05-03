import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import instituteLogo from "../../../images/logo/logo-thumb.png";
import instituteLogoSmall from "../../../images/logo/logo-thumb-small.png";
import appIcon from "../../../images/logo/app-icon-1.png";
import appIcon2 from "../../../images/logo/app-icon-2.png";
import mapIcon from "../../../images/icon/map.png";
import siteIntro from "../../../images/illustration/site-login-intro.png";
import emailIcon from "../../../images/icon/email.png";
import lockIcon from "../../../images/icon/lock.png";

//form password field
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
//form password field

export default function Register() {
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

            <div className="educare-login-area text-center bg-dark">
                <div className="educare-site-login-wrapper">
                    <div className="educare-site-login-banner order-1 maxMd:order-2 flex flex-col justify-end">
                        <div className="educare-site-login-banner-top">
                            <div className="educare-site-login-banner-logo">
                                <div className="educare-site-login-banner-logo-left">
                                    <div className="bg-[#B0EBFF] educare-site-login-banner-logo-left-thumb">
                                        <a href="#"><img src={instituteLogo} alt="logo not found" /></a>
                                    </div>
                                </div>
                                <div className="educare-site-login-banner-logo-right">
                                    <h4>Demo Public School</h4>
                                    <span>Affiliate Code: 09127610</span>
                                    <a href="#" className="educare-school-address"><img src={mapIcon} alt="" /> Shivaji Nagar, Pune</a>
                                    <div className="educare-site-login-banner-logo-right-btn">
                                        <a href="#"><img src={appIcon} alt="" /></a>
                                        <a href="#"><img src={appIcon2} alt="" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="educare-site-login-banner-content">
                                <div className="educare-site-login-banner-content-address">
                                    <span>State:</span>
                                    <h6>Uttar Pradesh</h6>
                                </div>
                                <div className="educare-site-login-banner-content-address">
                                    <span>City:</span>
                                    <h6>Nodia</h6>
                                </div>
                                <div className="educare-site-login-banner-content-address">
                                    <span>Medium:</span>
                                    <h6>English</h6>
                                </div>
                                <div className="educare-site-login-banner-content-address">
                                    <span>Established:</span>
                                    <h6>1990</h6>
                                </div>
                                <div className="educare-site-login-banner-content-address">
                                    <span>Board:</span>
                                    <h6>CBSE</h6>
                                </div>
                            </div>
                        </div>
                        <div className="educare-site-login-banner-welcome">
                            <div className="z-[1] relative">
                                <h4>Welcome to,</h4>
                                <p>Parent's Portal of Demo Public School</p>
                                <p>Demo Public School unites teachers and parents as partners in every success. One platform makes collaboration simple.</p>
                                <p>Demo Public School encourages parents and staffs to use our Phone App.This is our effort to bring teachers closer to parents and students. Please login here and start connecting.</p>
                            </div>
                            <div className="educare-site-login-banner-welcome-img">
                                <img src={siteIntro} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="educare-site-login-form-wraper order-2 maxMd:order-1 text-left">
                        <div className="bg-[#B0EBFF] educare-site-login-form-logo mb-4">
                            <img src={instituteLogoSmall} alt="" />
                        </div>
                        <h3 className="educare-login-form-title mb-8">Registration Here</h3>
                        <div className="educare-login-form educare-site-login-form">
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
                                </div>

                                <div className="educare-form-input-style mb-5">
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

                                <p className="text-[16px] font-medium text-headingLight font-primary mb-6">
                                    Already registered?
                                    <Link
                                        href={route("login")}
                                        className="text-primary ml-1"
                                    >
                                        Login
                                    </Link>
                                </p>
                                <div className="educare-site-login-form-social">
                                    <a href="#"></a>
                                    <a href="#"></a>
                                    <a href="#"></a>
                                    <a href="#"></a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form> */}
        </GuestLayout>
    );
}
