import { Link } from '@inertiajs/react';
import React from 'react';

const StaffMenu = ({title}) => {
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
                                    <Link href="/staffs"><i className='icon-alert'></i>Active Staffs</Link>
                                </li>
                                <li>
                                    <Link href="/staff/inactive"><i className='icon-alert'></i> Inactive Staffs</Link>
                                </li>
                                <li>
                                    <Link href="/import/staff"><i className='icon-upload'></i>Import</Link>
                                </li>
                                <li>
                                    <Link href="#" as='button'><i className='icon-DownloadSimple'></i>Download</Link>
                                </li>
                                <li>
                                    <Link href="/staff/create"><i className='icon-PlusCircle'></i>Create Staff</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffMenu;
