import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';


const AdjustFeeReportFilter = ({
    setFilterText,
    totalCount
}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        search: "",
    });

    const refundSubmit = (e) => {
        e.preventDefault();
    }

    const handleReset = () => {
        setFilterText("");

        setData('search', "")
    }

    return (
        <>
            <form onSubmit={refundSubmit}>
                <div className="educare-common-card-title">
                    <h5>
                        <i className="icon-info"></i>
                        Adjust Fee Report
                    </h5>
                </div>
                <div className='flex flex-wrap justify-between gap-5 py-2'>
                    <div className="educare-admission-filtar-bar-count">
                        <span>Total Count: {totalCount}</span>
                    </div>
                    <div className="educare-admission-filtar-bar-filter-action flex flex-wrap gap-2">
                        <div className="educare-input-field-styles">
                            <TextInput
                                value={
                                    data.search
                                }
                                onChange={(e) => {
                                    setFilterText(e.target.value)

                                    setData(
                                        "search",
                                        e.target.value
                                    )
                                }
                                }
                                className="block"
                                placeHolder="Search here"
                            />
                            <InputError
                                message={
                                    errors.search
                                }
                                className="mt-2"
                            />
                        </div>
                        {/* <div className="educare-button-field-styles">
                            <Tooltip
                                title="Search"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <Link
                                    href="#"
                                    className="educare-secondary-btn-md-fill"
                                >
                                    <i className="icon-search-interface-symbol"></i>
                                </Link>
                            </Tooltip>
                        </div> */}
                        {totalCount > 0 &&
                            <div className="educare-button-field-styles">
                                <Tooltip
                                    title="PDF"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <Link
                                        href="#"
                                        className="educare-warning-btn-md-fill"
                                    >
                                        <i className="icon-FilePdf"></i>
                                    </Link>
                                </Tooltip>
                            </div>
                        }

                        {totalCount > 0 &&
                            <div className="educare-button-field-styles">
                                <Tooltip
                                    title="Download Excel"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <a
                                        href={route('export_excel.adjust_fee_report')}
                                        target="_blank"
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
                                    </a>
                                </Tooltip>
                            </div>
                        }
                        <div className="educare-button-field-styles">
                            <Tooltip
                                title="Reset"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <butotn
                                    type="button"
                                    className="educare-gray-btn-md-fill cursor-pointer"
                                    onClick={() => {
                                        handleReset();
                                    }}
                                >
                                    <i className="icon-ArrowsClockwise"></i>
                                </butotn>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AdjustFeeReportFilter;
