import TextInput from '@/Components/TextInput';
import { useEffect, useState } from 'react';
import SaleDueProcess from './SaleDueProcess';

const SaleDueAmountDetail = ({
    paymentModes,
    selectedSaleLedger,
    data,
    setData,
    setSelectedSaleLedger
 }) => {
    //table inner toggle collapse start
    const [enqInnerActive, setEnqInnerActive] = useState([false, false, false])
    const handleEnqToggle = (index) => {
        setEnqInnerActive(prevState => {
            const newState = prevState.map((value, i) => i === index ? !value : false);
            return newState;
        });
    };
    //table inner toggle collapse end

    const [paidAmount, setPaidAmount] = useState('');

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            sale_ledger_id: selectedSaleLedger?.id ?? '',
            paid_amount: parseFloat(selectedSaleLedger?.due_amount ?? 0)?.toFixed(2),
            due_amount: parseFloat(0)?.toFixed(2)
        }));

        setPaidAmount(selectedSaleLedger?.due_amount ?? '');
    }, [selectedSaleLedger]);

    // handle change paid amount start
    const handleChangePaidAmount = (value) => {
        if(value == '' || isNaN(value)) {
            setPaidAmount('');
        } else if (value != '' && parseFloat(value) >  parseFloat(selectedSaleLedger?.due_amount ?? 0)) {
            setPaidAmount(parseFloat(selectedSaleLedger?.due_amount ?? 0)?.toFixed(2));
        } else {
            setPaidAmount(value);
        }
    }
    // handle change paid amount end

    // handle enter paid amount start
    const handleEnterPaidAmount = (e) => {
        // if (e.key == 'Enter' || e.type == 'click') {
        if (e.key == 'Enter') {
            let paid_amount = 0;
            let due_amount = 0;

            if (paidAmount == '' || isNaN(paidAmount)) {
                paid_amount = 0;
                due_amount = selectedSaleLedger?.due_amount ?? 0;
            } else {
                paid_amount = paidAmount;
                due_amount = selectedSaleLedger?.due_amount - paidAmount;
            }

            setData((prevData) => ({
                ...prevData,
                paid_amount: parseFloat(paid_amount)?.toFixed(2),
                due_amount: parseFloat(due_amount)?.toFixed(2)
            }));
        }
    }
    // handle enter paid amount end

    const handleTakeSaleDue = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-card-title pb-none">
                            <h5>
                                Amount Detail
                            </h5>
                        </div>
                        <form onSubmit={handleTakeSaleDue}>
                            <div className="educare-admission-list pb-none">
                                <table className='mt-4'>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Title</th>
                                            <th>Payable</th>
                                            <th>Paid</th>
                                            <th>Due</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedSaleLedger?.id != null &&
                                            <>
                                                <tr>
                                                    <td>
                                                        <div className='inline-block'>
                                                            <button
                                                                type="button"
                                                                className="educare-enq-arrow"
                                                                onClick={() => handleEnqToggle(0)}
                                                            >
                                                                <i
                                                                    className={`${enqInnerActive[0]
                                                                        ? "icon-arrow-up"
                                                                        : "icon-down-arrow"}`}
                                                                ></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td>{selectedSaleLedger?.title}</td>
                                                    <td>{parseFloat(selectedSaleLedger?.due_amount ?? 0)?.toFixed(2)}</td>
                                                    <td>{data?.paid_amount ?? 0}</td>
                                                    <td>{data?.due_amount ?? 0}</td>
                                                </tr>
                                                <tr className={`${enqInnerActive[0] ? "" : "hidden"}`}>
                                                    <td
                                                        colSpan="12"
                                                        className="educare-admission-list-enq-inner-wrap"
                                                    >
                                                        <table className="educare-admission-list-enq-inner">
                                                            <thead>
                                                                <tr>
                                                                    <th>Product</th>
                                                                    <th>Rate</th>
                                                                    <th>Qty.</th>
                                                                    <th>Tax</th>
                                                                    <th>Discount</th>
                                                                    <th>Amount</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {selectedSaleLedger?.sale_ledger_products?.length > 0 &&
                                                                    selectedSaleLedger.sale_ledger_products.map((item, index) => (
                                                                        <tr key={index}>
                                                                            <td>{item?.product?.title}</td>
                                                                            <td>{item?.rate ?? 0}</td>
                                                                            <td>{item?.quantity ?? 1}</td>
                                                                            <td>{item?.tax_amount}</td>
                                                                            <td>{item?.discount_amount}</td>
                                                                            <td>{item?.total_amount}</td>
                                                                        </tr>
                                                                    ))
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </>
                                        }

                                        <tr>
                                            <td colSpan={3}>
                                                <div>Hit "ENTER" button after entering "Paid" amount</div>
                                            </td>
                                            <td><div className='text-end pr-2.5'>Paid</div></td>
                                            <td>
                                                <div className='max-w-[80px] font-primary educare-input-field-styles-px-8'>
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="total_paid_amount"
                                                            value={
                                                                paidAmount
                                                            }
                                                            onChange={(e) =>
                                                                handleChangePaidAmount(e.target.value)
                                                            }
                                                            onKeyUp={(e) => {
                                                                handleEnterPaidAmount(e);
                                                            }}
                                                            className="block"
                                                        />
                                                        {/* <button
                                                            className="educare-success-btn-sm-fill"
                                                            type="button"
                                                            onClick={(e) => {
                                                                handleEnterPaidAmount(e)
                                                            }}
                                                        >
                                                            <i className="icon-Equals"></i>
                                                        </button> */}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={4}>
                                                <div className='text-end pr-2.5'>Due (Payable - Paid)</div>
                                            </td>
                                            <td>
                                                <strong className='text-danger'>{data?.due_amount ?? 0}</strong>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <SaleDueProcess
                paymentModes={paymentModes}
                data={data}
                setData={setData}
                setSelectedSaleLedger={setSelectedSaleLedger}
            />
        </>
    );
};

export default SaleDueAmountDetail;
