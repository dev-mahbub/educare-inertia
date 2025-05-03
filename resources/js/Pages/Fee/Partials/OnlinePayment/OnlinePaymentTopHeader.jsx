import { Link } from '@inertiajs/react';

const OnlinePaymentTopHeader = ({
    school
}) => {
    return (
        <>
            <div className="online-payment-top-header">
                <div className="front-container">
                    <ul>
                        <li>
                            <Link href="#">
                                <i className="icon-Question"></i>
                                <span>Help Desk</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={route('login')}>
                                <i className="icon-LockSimple"></i>
                                <span>parent Login</span>
                            </Link>
                        </li>
                        <li>
                            <i className="icon-email"></i>
                            <span>Email : {school?.mail}</span>
                        </li>
                        <li>
                            <i className="icon-PhoneCall"></i>
                            <span>Call Us: {school?.phone}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default OnlinePaymentTopHeader;
