import React from 'react';
import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';

const UpgradeMenu = ({ title = '' }) => {
    return (
        <div className='educare-mis-report-menu-area'>
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
                                    <Link href='#'>Students</Link>
                                </li>
                                <li>
                                    <Link href='#'>Search</Link>
                                </li>

                                <li>
                                    <div
                                        type="button"
                                        className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                    >
                                        Class Summery
                                    </div>
                                </li>
                                <li>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <div
                                                type="button"
                                                className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                            >
                                                Report
                                                <i className='icon-CaretDown'></i>
                                            </div>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href="#">
                                                Custom Download
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Pre-defined Download
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Parent Income
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Parent Income per Month
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                EWS
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Student Age Report
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Document Report
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Monthly Admission Report
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Student Promoted Report
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </li> <li>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <div
                                                type="button"
                                                className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                            >
                                                Certificate
                                                <i className='icon-CaretDown'></i>
                                            </div>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href="#">
                                                Student
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Teacher
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Certificate List
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Generated Certificate
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Custom ID CARD
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </li>
                                <li>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <div
                                                type="button"
                                                className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                            >
                                                TC
                                                <i className='icon-CaretDown'></i>
                                            </div>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href="#">
                                                Generate TC
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                TC Summary Report
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Generated TC Report
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </li>
                                <li>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <div
                                                type="button"
                                                className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                            >
                                                Inactive
                                                <i className='icon-CaretDown'></i>
                                            </div>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href="#">
                                                Make Student Inactive
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Inactive Student Report
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </li>
                                <li>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <div
                                                type="button"
                                                className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                            >
                                                Sibling
                                                <i className='icon-CaretDown'></i>
                                            </div>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href="#">
                                                Existing Sibling
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Posible Sibling
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </li>
                                <li>
                                    <Link href='#'>Upgrade</Link>
                                </li>
                                <li>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <div
                                                type="button"
                                                className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                            >
                                                Change Academics
                                                <i className='icon-CaretDown'></i>
                                            </div>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href="#">
                                                Change Status
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Change Class
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Change Section
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Change Course Duration
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </li>

                                <li>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <div
                                                type="button"
                                                className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                            >
                                                Update Student
                                                <i className='icon-CaretDown'></i>
                                            </div>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('student.update_details')}>
                                                Update Details
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Update Biometric
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Update User Password
                                            </Dropdown.Link><Dropdown.Link
                                                href="#"
                                            >
                                                Bulk Upload Student Image
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

export default UpgradeMenu;
