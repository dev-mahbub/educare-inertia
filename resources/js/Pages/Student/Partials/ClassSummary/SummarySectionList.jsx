import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";

const SummarySectionList = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({

    });
    const classSectionData = (e) => {
        e.preventDefault();
    };
    return (
        <form onSubmit={classSectionData}>
            <div className="educare-admission-list-area">
                <div className="flex flex-wrap gap-2.5 items-center justify-between mb-2.5">
                    <h5 className="text-[18px] font-semibold font-primary text-headingLight">
                        Section{" "}
                    </h5>
                    <div className="educare-filter-action-btn flex gap-1">
                        <div>
                            <Tooltip title="Excel Sheet" placement="top" arrow>
                                <Link
                                    href="#"
                                    className="educare-success-btn-md-fill"
                                    as="button"
                                >
                                    <i className="icon-FileX"></i>
                                </Link>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip title="Reset" placement="top" arrow>
                                <Link href="#" className="educare-gray-btn-md-fill">
                                    <i className="icon-ArrowsClockwise"></i>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list table-width-full without-action-last-child pb-none">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Section</th>
                                        <th>
                                            <Tooltip
                                                title="Total"
                                                placement="top"
                                                arrow
                                            >
                                                <span>06</span>
                                            </Tooltip>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>VII A</td>
                                        <td>
                                            <Link href="#" as="button">
                                                2
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>VII B</td>
                                        <td>
                                            <Link href="#" as="button">
                                                2
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>XI A</td>
                                        <td>
                                            <Link href="#" as="button">
                                                2
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SummarySectionList;
