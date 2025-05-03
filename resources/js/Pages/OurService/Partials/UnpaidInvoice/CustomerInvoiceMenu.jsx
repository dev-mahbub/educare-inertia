import { Link } from '@inertiajs/react';

const CustomerInvoiceMenu = ({title}) => {
    return (
        <div className='educare-mis-report-menu-area bg-white'>
            <div className="educare-mis-report-menu">
                <div className="educare-mis-report-menu-left">
                    <div className="educare-mis-report-menu-left-inner">
                        <i className='icon-cap'></i>
                        <h4>{title}</h4>
                    </div>
                </div>
                <div className="educare-mis-report-menu-right">
                    <div className="educare-mis-report-category">
                        <div className="educare-mis-report-category-wrap">
                            <ul>
                                <li>
                                    <Link href='/our-service/unpaid-invoice'>ERP Unpaid Invoice</Link>
                                </li>
                                <li>
                                    <Link href='/our-service/paid-invoice'>ERP Paid Invoice</Link>
                                </li>
                                <li>
                                    <Link href='/our-service/buy-service'>Buy Services</Link>
                                </li>
                                <li>
                                    <Link href='/our-service/buy-sms'>Buy SMS</Link>
                                </li>
                                <li>
                                    <Link href='/our-service/my-subscription'>My Subscription</Link>
                                </li>

                                {/* do not remove */}
                                {/* <li>
                                    <Link href='/our-service/buy-biometric'>Buy Biometric</Link>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerInvoiceMenu;
