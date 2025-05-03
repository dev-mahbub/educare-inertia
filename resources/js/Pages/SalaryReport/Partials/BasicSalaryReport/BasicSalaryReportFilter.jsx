import TextInput from "@/Components/TextInput";
import { Tooltip } from "@mui/material";

const BasicSalaryReportFilter = ({
    staffEarnings,
    data,
    setData
}) => {
    return (
        <>
            <div className="educare-card-title pb-none mb-2.5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Teacher Basic Salary
                </h5>
            </div>
            <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                <div>
                    <span className="min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA">
                        Total : {staffEarnings?.length}
                    </span>
                </div>
                <div className="flex flex-wrap gap-2.5 items-center">
                    <div className="educare-input-field-styles">
                        <TextInput
                            id="search"
                            value={data.search}
                            onChange={(e) =>
                                setData("search", e.target.value)
                            }
                            placeHolder="Search Report"
                            className="block"
                        />
                    </div>
                    {staffEarnings?.length > 0 &&
                        <div className="educare-filter-action-btn flex flex-wrap gap-2">
                            <div>
                                <Tooltip
                                    title="Download Excel"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <a
                                        href={route('export_excel.salary.basic_salary_report')}
                                        target="_blank"
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
                                    </a>
                                </Tooltip>
                            </div>
                            <div className="hidden">
                                <Tooltip
                                    title="Download Excel"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <a
                                        href="#"
                                        target="_blank"
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
                                    </a>
                                </Tooltip>
                            </div>

                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default BasicSalaryReportFilter;
