import { Link } from '@inertiajs/react';
import React from 'react';
import Dropdown from '@/Components/Dropdown';

const SmsMenuCategory = () => {

    return (
        <div className='educare-mis-report-menu-area'>
            <div className="educare-mis-report-menu">
                <div className="educare-mis-report-menu-left">
                    <div className="educare-mis-report-menu-left-inner">
                        <i className='icon-cap'></i>
                        <h4>Communication Management SMS</h4>
                    </div>
                </div>
                <div className="educare-mis-report-menu-right">
                    <div className="educare-mis-report-category">
                        <div className="educare-mis-report-category-wrap">
                            <ul>
                                <li>
                                    <Link href={route('sms.create')}>New SMS</Link>
                                </li>
                                <li>
                                    <Link href={route('sms.sent')}>Sent SMS</Link>
                                </li>
                                <li>
                                    <Link href={route('sms.credit')}>Credit SMS</Link>
                                </li>
                                <li>
                                    <Link href={route('sms.sms_erp_credential')}>Erp Credential SMS</Link>
                                </li>
                                <li>
                                    <Link href={route('sms.sms_app_credential')}>App Credential SMS</Link>
                                </li>
                                <li>
                                    <Link href={route('sms.sms_delivery_summary')}>Delivery Summery SMS</Link>
                                </li>
                                <li>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <div
                                                type="button"
                                                className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                            >
                                                Circular
                                                <i className='icon-CaretDown'></i>
                                            </div>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('sms.circular')}>
                                                Design Circular
                                            </Dropdown.Link>
                                            <Dropdown.Link href={route('sms.sms_circular_generate')}>
                                                Generate Circular
                                            </Dropdown.Link>

                                        </Dropdown.Content>
                                    </Dropdown>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmsMenuCategory;