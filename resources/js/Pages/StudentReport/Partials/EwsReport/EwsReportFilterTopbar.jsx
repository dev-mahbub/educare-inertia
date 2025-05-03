
import { Tooltip } from '@mui/material';
const EwsReportFilterTopbar = ({
    ewsReport
}) => {
    return (
        <>
            <div className='educare-header-filter-topbar flex flex-wrap gap-2.5 items-center mb-2.5'>
                    <div className="educare-card-title mr-auto pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            EWS Report
                        </h5>
                    </div>

                    <div className="educare-filter-action-btn inline-flex gap-2">
                        {/* Replace changable buttons */}

                    {Object.keys(ewsReport)?.length > 0 &&
                        <div>
                            <Tooltip
                                title="Download Excel"
                                placement="top"
                                arrow
                            >
                                <button type='button'
                                    className="educare-success-btn-md-fill"
                                >
                                    <i className="icon-FileX"></i>
                                </button>
                            </Tooltip>
                        </div>
                    }

                    {Object.keys(ewsReport)?.length > 0 &&
                        <div>
                            <Tooltip
                                title="Download Pdf"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <button type='button'
                                    className="educare-warning-btn-md-fill"
                                >
                                    <i className="icon-FilePdf"></i>
                                </button>
                            </Tooltip>
                        </div>
                    }

                        {/* Replace changable buttons */}
                    </div>
                </div>

        </>
    );
};

export default EwsReportFilterTopbar;
