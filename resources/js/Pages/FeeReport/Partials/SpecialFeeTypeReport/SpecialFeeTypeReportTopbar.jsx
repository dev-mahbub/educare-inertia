
import { Tooltip } from '@mui/material';

const SpecialFeeTypeReportTopbar = ({
    params,
    specialFeeTypeReport
}) => {
    return (
        <>
            <div className='mb-2.5'>
                <div className='educare-header-filter-topbar flex flex-wrap gap-2.5 items-center'>
                    <div className="educare-card-title mr-auto pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Special Fee Type Reports
                        </h5>
                    </div>

                    <div className="educare-filter-action-btn inline-flex gap-2">
                        {/* Replace changable buttons */}
                        {Object.keys(specialFeeTypeReport)?.length >= 0 &&
                            <div>
                                <Tooltip
                                    title="Download Excel"
                                    placement="top"
                                    arrow
                                >
                                    <a
                                    target='_blank'
                                        href={route('export_excel.special_fee_type_report', params)}
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
                                    </a>
                                </Tooltip>
                            </div>
                        }
                        {/* Replace changable buttons */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SpecialFeeTypeReportTopbar;
