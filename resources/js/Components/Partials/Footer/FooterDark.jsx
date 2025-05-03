import React from "react";
import siteLogo from "../../../../images/logo/superAdminLogo.png";
import { Link } from "@inertiajs/react";

const FooterDark = () => {
    return (
        <div className="front-footer-main footer-dark">
            <div className="educare-dashboard-footer">
                <div className="educare-site-login-banner-bottom">
                    <div className="inline-flex gap-2.5 items-center">
                        <span className="text-white/90 font-normal font-primary text-[14px]">
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
                        <li><Link href={route('dashboard')}>About Us</Link></li>
                        <li><Link href={route('dashboard')}>Contact Us</Link></li>
                        <li><Link href={route('dashboard')}>Privacy Policy</Link></li>
                        <li><Link href={route('dashboard')}>Terms & Conditions</Link></li>
                        <li><Link href={route('dashboard')}>Cancellation/Refund Policy</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FooterDark;
