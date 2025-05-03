import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';


const NullifyFeeReportFilter = ({ setFilterText, totalReportCount = null }) => {

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

    const NullifySubmit = (e) => {
        e.preventDefault();
    }

    const handleReset = () => {
        setFilterText("");
        setData('search', "");
    }

    return (
        <>
            <form onSubmit={NullifySubmit}>
                <div className="educare-common-card-title">
                    <h5>
                        <i className="icon-info"></i>
                        Nullify Fee Report
                    </h5>
                </div>
                <div className='flex flex-wrap justify-between gap-5 py-2'>
                    <div className="educare-admission-filtar-bar-count">
                        <span>Total Count: {totalReportCount}</span>
                    </div>
                    <div className="educare-admission-filtar-bar-filter-action flex flex-wrap gap-2">
                        <div className="educare-input-field-styles">
                            <TextInput
                                value={
                                    data.search
                                }
                                onChange={(e) => {
                                    setFilterText(e.target.value);
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
                        <div className="educare-button-field-styles">
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
                        <div className="educare-button-field-styles">
                            <Tooltip
                                title="Reset"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <button
                                    type="button"
                                    className="educare-gray-btn-md-fill"
                                    onClick={handleReset}
                                >
                                    <i className="icon-ArrowsClockwise"></i>
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default NullifyFeeReportFilter;
