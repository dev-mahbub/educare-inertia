import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';
import React from 'react';

const NoticeMenuCategory = () => {

    return (
        <div className='educare-mis-report-menu-area'>
            <div className="educare-mis-report-menu">
                <div className="educare-mis-report-menu-left">
                    <div className="educare-mis-report-menu-left-inner">
                        <i className='icon-cap'></i>
                        <h4>Notice</h4>
                    </div>
                </div>
                <div className="educare-mis-report-menu-right">
                    <div className="educare-mis-report-category">
                        <div className="educare-mis-report-category-wrap">
                            <ul>
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
                                                Dummy dropdown
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Dummy dropdown
                                            </Dropdown.Link>
                                            <Dropdown.Link href="#">
                                                Dummy dropdown
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Dummy dropdown
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
                                                Certificates
                                                <i className='icon-CaretDown'></i>
                                            </div>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href="#">
                                                Dummy dropdown
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Dummy dropdown
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
                                                Dummy dropdown
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Dummy dropdown
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
                                                Dummy dropdown
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Dummy dropdown
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
                                                Dummy dropdown
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Dummy dropdown
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </li>
                                <li>
                                    <Link href="#">Class Summary</Link>
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
                                                Dummy dropdown
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Dummy dropdown
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
                                            <Dropdown.Link href="#">
                                                Dummy dropdown
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href="#"
                                            >
                                                Dummy dropdown
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

export default NoticeMenuCategory;