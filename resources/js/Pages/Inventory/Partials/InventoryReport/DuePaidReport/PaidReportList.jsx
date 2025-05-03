import Loader from '@/Components/Loader';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';

const PaidReportList = ({ paidReportForStudent = [] }) => {

    const [paidReportData, setPaidReportData] = useState(paidReportForStudent);
    const [loading, setLoading] = useState(false);

    const {
        data,
        setData,
    } = useForm({
        search_value2: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (data) {
            router.post(route('due_paid_report.list'), data);
            setLoading(false);
        }
    }

    useEffect(() => {
        setPaidReportData(paidReportForStudent)
        setLoading(false);
    }, [paidReportForStudent]);


    return (
        <>
            <form>
                <div className='flex flex-wrap gap-2.5 justify-between items-center mb-2.5'>
                    <div className="educare-card-title pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Sale Paid Report
                        </h5>
                    </div>
                    <div className='flex flex-wrap gap-2.5 items-center'>
                        <div className="educare-input-field-styles">
                            <TextInput
                                id="search_value2"
                                value={
                                    data.search_value2
                                }
                                onChange={(e) =>
                                    setData(
                                        "search_value2",
                                        e.target.value
                                    )
                                }
                                placeHolder="Search here"
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
                                        className="educare-secondary-btn-md-fill"
                                        onClick={handleSearch}
                                        type="button"
                                    >
                                        <i className="icon-search-interface-symbol"></i>
                                    </button>
                                </Tooltip>
                            </div>

                            {paidReportData?.length > 0 &&
                                <div>
                                    <Tooltip
                                        title="Download Pdf"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <a
                                            href={route('pdf_account.sale_paid_report')}
                                            target='_blank'
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
            </form>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Name</th>
                            <th>Adm.No.</th>
                            <th>Class</th>
                            <th>Mobile</th>
                            <th>Paid</th>
                        </tr>
                    </thead>
                    {loading ? (
                        <Loader></Loader>
                    ) : (
                        <tbody>
                            {paidReportData?.length > 0 ? (
                                <>
                                    {paidReportData?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{++index}</td>
                                            <td>{item?.name}</td>
                                            <td>{item?.admission_no}</td>
                                            <td>{item?.classroom_title}</td>
                                            <td>{item?.phone}</td>
                                            <td>{parseFloat(item.paid_amount ?? 0)?.toFixed(2)}</td>
                                        </tr>
                                    ))}

                                    <tr>
                                        <td>Total</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>{paidReportData.reduce((total, item) => total + parseFloat(item.paid_amount ?? 0), 0)?.toFixed(2)}</td>
                                    </tr>
                                </>
                            ) : (
                                <tr>
                                    <td className="text-center text-red-500" colSpan="12">
                                        Data not found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    )}
                </table>
            </div>
        </>
    );
};

export default PaidReportList;
