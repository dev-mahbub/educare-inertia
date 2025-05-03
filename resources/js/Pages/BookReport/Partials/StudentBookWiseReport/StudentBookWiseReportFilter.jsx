import TextInput from '@/Components/TextInput';
import { Link, router, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';

const StudentBookWiseReportFilter = ({
    setLoading,
}) => {
    const {
        data,
        setData,
    } = useForm({
        book_acc_no: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.post(route('book_report.student_book_wise'), data);
        setLoading(false);
    }

    return (
        <form>
            <div className='flex flex-wrap gap-2.5 justify-between items-center mb-2.5'>
                <div className="educare-card-title pb-none">
                    <h5>
                        <i className="icon-Notebook"></i>
                        BOOK WISE REPORT
                    </h5>
                </div>
                <div className='flex flex-wrap gap-2.5 items-center'>
                    <div className="educare-input-field-styles">
                        <TextInput
                            id="book_acc_no"
                            value={
                                data.book_acc_no
                            }
                            onChange={(e) =>
                                setData(
                                    "book_acc_no",
                                    e.target.value
                                )
                            }
                            placeHolder="Acc no"
                            className="block"
                        />
                    </div>
                    <div className='educare-filter-action-btn flex flex-wrap gap-2'>
                        <div>
                            <Tooltip
                                title="Search"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <button
                                    type="button"
                                    onClick={(e) => handleSearch(e)}
                                    className="educare-secondary-btn-md-fill"
                                >
                                    <i className="icon-search-interface-symbol"></i>
                                </button>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip
                                title="Back"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <Link
                                    href={route('book.return')}
                                    className="educare-secondary-btn-md-fill"
                                >
                                    <i className="icon-back"></i>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default StudentBookWiseReportFilter;
