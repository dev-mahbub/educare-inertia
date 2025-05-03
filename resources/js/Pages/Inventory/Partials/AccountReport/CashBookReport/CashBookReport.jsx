import { router, useForm } from '@inertiajs/react';
import DatePicker from "react-datepicker";

const CashBookReport = ({
    cashBookReport
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
        payment_date: new Date()
    });

    const headerTopData = (e) => {
        e.preventDefault();
    };

    // handle change payment date start
    const handleChangePaymentDate = (date) => {
        setData((prevData) => ({
            ...prevData,
            payment_date: date
        }));

        const form_data = {
            payment_date: date
        }

        router.post(route('cash_book_report.list'), form_data);
    }
    // handle change payment date end


    return (
        <>
            <form onSubmit={headerTopData}>
                <div className='flex flex-wrap gap-2.5 justify-between items-center mb-2.5'>
                    <div className="educare-card-title pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Cash Book
                        </h5>
                    </div>
                    <div className='flex flex-wrap gap-2.5 items-center'>
                        <div className="educare-input-field-styles">
                            <DatePicker
                                selected={
                                    data?.payment_date
                                        ? new Date(
                                            data?.payment_date
                                        )
                                        : new Date()
                                }
                                onChange={(date) =>
                                    handleChangePaymentDate(date)
                                }
                                showYearDropdown
                                showMonthDropdown
                                useShortMonthInDropdown
                                showPopperArrow={false}
                                peekNextMonth
                                dropdownMode="select"
                                isClearable
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select date"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </form>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Opening Balance</th>
                            <th>{parseFloat(cashBookReport.opening_balance ?? 0)?.toFixed(2)}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Receipt</td>
                            <td>{parseFloat(cashBookReport.credit ?? 0)?.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Debit</td>
                            <td>{parseFloat(cashBookReport.debit ?? 0)?.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><h6 className="text-[15px] font-semibold text-heading font-primary">
                                Balance
                            </h6></td>
                            <td>{parseFloat(cashBookReport.balance ?? 0)?.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CashBookReport;
