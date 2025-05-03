import { Link } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import React from 'react';

const RouteWiseDueReportTopbar = () => {
    return (
        <>
            <div>
                <div className="educare-card-title mr-auto pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Route Wise Due Report
                    </h5>
                </div>
                <div className='flex justify-between flex-wrap items-center mb-2.5'>
                    <div className="educare-header-filtar-bar-count mr-auto">
                        <span>Total Count: 3</span>
                    </div>
                    <div>
                        <Tooltip
                            title="Excel Sheet"
                            placement="top"
                            arrow
                            as="button"
                        >
                            <Link
                                href="#"
                                className="educare-success-btn-md-fill"
                            >
                                <i className="icon-FileX"></i>
                            </Link>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RouteWiseDueReportTopbar;