import { Tooltip } from '@mui/material';

const DailyAdmissionReportFilterTopbar = ({
    dailyAdmissionReport,
    params
}) => {
    return (
        <>
            <div className="educare-header-filter-topbar flex flex-wrap gap-2.5 items-center mb-2.5">
                <div className="educare-card-title mr-auto pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Daily Admission Report
                    </h5>
                </div>
                <div className="educare-filter-action-btn inline-flex gap-2">
                    {/* Replace changable buttons */}

                    {Object.keys(dailyAdmissionReport)?.length > 0 &&
                        <div>
                            <Tooltip title="Excel Sheet" placement="top" arrow>
                                <a
                                    target="_blank"
                                    href={route('export_excel.daily_admission_report', params)}
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
        </>
    );
};

export default DailyAdmissionReportFilterTopbar;
