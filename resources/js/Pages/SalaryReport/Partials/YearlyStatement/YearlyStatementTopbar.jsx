import { Tooltip } from "@mui/material";

const YearlyStatementTopbar = ({
    totalReportCount,
    params
}) => {
    return (
        <>
            <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                <div className="educare-card-title pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Yearly Bank Statement
                    </h5>
                </div>
                <div className="flex flex-wrap gap-2.5 items-center">
                    <div className="educare-filter-action-btn flex flex-wrap gap-2">
                        {totalReportCount > 0 &&
                            <div>
                                <Tooltip
                                    title="Download Pdf"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <a
                                        target="_blank"
                                        href={route('pdf_salary.yearly_bank_statement', params)}
                                        className="educare-warning-btn-md-fill"
                                    >
                                        <i className="icon-FilePdf"></i>
                                    </a>
                                </Tooltip>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default YearlyStatementTopbar;
