import { Tooltip } from "@mui/material";

const BankStatementFilterTopbar = ({
    totalReportCount,
    params
}) => {

    const CommonHeaderFilterTopData = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <form onSubmit={CommonHeaderFilterTopData} className="mb-2.5">
                <div className="educare-header-filter-topbar flex flex-wrap gap-2.5 items-center">
                    <div className="educare-card-title mr-auto pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Bank Statement
                        </h5>
                    </div>

                    <div className="educare-filter-action-btn inline-flex gap-2">
                        {/* Replace changable buttons */}

                        {totalReportCount > 0 &&
                            <>
                                <div>
                                    <Tooltip title="Download Excel" placement="top" arrow>
                                        <a
                                            target="_blank"
                                            href={route('export_excel.salary.staff_bank_statement', params)}
                                            className="educare-success-btn-md-fill"
                                        >
                                            <i className="icon-FileX"></i>
                                        </a>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Download Bank Statement"
                                        placement="top"
                                        arrow
                                    >
                                        <a
                                            target="_blank"
                                            href={route('pdf_salary.bank_statement', params)}
                                            className="educare-warning-btn-md-fill"
                                        >
                                            <i className="icon-FilePdf"></i>
                                        </a>
                                    </Tooltip>
                                </div>
                                <div className="hidden">
                                    <Tooltip
                                    title="Download Monthly Pay Statement"
                                        placement="top"
                                        arrow
                                    >
                                        <button
                                            type="button"
                                            className="educare-warning-btn-md-fill"
                                        >
                                            <i className="icon-FilePdf"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                            </>
                        }

                        {/* Replace changable buttons */}
                    </div>
                </div>
            </form>
        </>
    );
};

export default BankStatementFilterTopbar;
