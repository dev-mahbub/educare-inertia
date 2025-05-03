import React from "react";
import siteLogo from "../../../../images/logo/educarelogo.png";
import { Link } from "@inertiajs/react";

const Footer = () => {
    return (
        <div className="front-footer-main">
            <div className="front-container front-footer-container">
                <div className="educare-dashboard-footer">
                    <div className="educare-site-login-banner-bottom">
                        <div className="inline-flex gap-2.5 items-center">
                            <span className="text-headingLight font-normal font-primary text-[14px]">
                                Powered By :
                            </span>
                            <Link href={route('dashboard')}>
                            <img
                                className="max-w-[160px]"
                                src={siteLogo}
                                alt="logo"
                            />
                            </Link>
                        </div>
                    </div>
                    <div className="footer-menus">
                        <ul className="sublevel-nav-A flex gap-2.5 items-center">
                            <li><Link href={route('front_page.about')}>About Us</Link></li>
                            <li><Link href={route('front_page.contactus')}>Contact Us</Link></li>
                            <li><Link href={route('front_page.privacy_policy')}>Privacy Policy</Link></li>
                            <li><Link href={route('front_page.term')}>Terms & Conditions</Link></li>
                            <li><Link href={route('front_page.cancellation')}>Cancellation/Refund Policy</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
