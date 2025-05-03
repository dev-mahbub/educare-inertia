import Loader from '@/Components/Loader';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import FeeDetails from './FeeDetails';
import FeePaymentForm from './FeePaymentForm';
import FeePaymentProcess from './FeePaymentProcess';
import FeeStructure from './FeeStructure';
import SiblingDetails from './SiblingDetails';


const FeePaymentMain = ({
    classrooms = [],
    students = [],
    banks = [],
    paymentModes = [],
    studentFeeInstallments = [],
    studentFeeVouchers = [],
    studentFeePaymentReports = [],
    filteredStudentsData = [],
    student = {},
    studentFeeDiscount = {},
    discounts = [],
    bankAccounts = [],
    extraFeeTypes = [],
    studentTransportVouchers = [],
    autoSelectFee,
    selectFeeSequentially,
    feeReceiptPageSize,
    feeReceiptCopy,
    isBackDateAllowed
}) => {
    const [loading, setLoading] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState({});
    const [studentFeeInstallmentsData, setStudentFeeInstallmentsData] = useState([]);
    const [studentFeeVouchersData, setStudentFeeVouchersData] = useState([]);
    const [studentTransportVouchersData, setStudentTransportVouchersData] = useState([]);
    const [selectedFeeInstallments, setSelectedFeeInstallments] = useState([]);
    const [feeInstallmentsDataArray, setFeeInstallmentsDataArray] = useState([]);
    const [selectedDiscount, setSelectedDiscount] = useState({});
    const [feePaymentType, setFeePaymentType] = useState('fee_installment');
    const [studenHasDiscount, setStudenHasDiscount] = useState(false);
    const [totalAmountPaid, setTotalAmountPaid] = useState(0);
    const [totalAmountDiscount, setTotalAmountDiscount] = useState(0);
    const [currentDueAmount, setCurrentDueAmount] = useState(0);

    const [selectedFeeIds, setSelectedFeeIds] = useState([]);
    const [selectedVoucherIds, setSelectedVoucherIds] = useState([]);
    const [selectedTransportVoucherIds, setSelectedTransportVoucherIds] = useState([]);

    const [selectedInstallments, setSelectedInstallments] = useState({
        fee_installment : [],
        general_voucher : [],
        transport_voucher : [],
    });

    useEffect(() => {
        setStudentFeeInstallmentsData(studentFeeInstallments);
        setLoading(false);

        const currentMonth = new Date().toLocaleString('default', { month: 'long' }).toLowerCase();
        let currentMonthInstallment = {};

        if (Object.keys(studentFeeInstallments)?.length > 0) {
            currentMonthInstallment = Object.values(studentFeeInstallments['feeInstallments'])?.find(item => {
                if (item?.fee?.title) {
                    const title = item.fee.title.toLowerCase();
                    return title.includes(currentMonth.toLowerCase());
                }
                return false;
            });

            setCurrentDueAmount(Object.values(studentFeeInstallments['feeInstallments'])?.filter(item => item?.payment_status != 'Paid' && item?.fee?.id <= currentMonthInstallment?.fee?.id)?.reduce((total, item) => total + item?.total_due_amount ?? 0, 0));
        }

        if (autoSelectFee == true && Object.keys(studentFeeInstallments)?.length > 0) {
            // new code start
            const feeIds = Object.values(studentFeeInstallments['feeInstallments'])?.filter(item => item?.payment_status != 'Paid' && item?.fee?.id <= currentMonthInstallment?.fee?.id)?.map(item => item?.fee?.id);
            // new code end

            // old code
            // const feeIds = Object.values(studentFeeInstallments['feeInstallments'])?.filter(item => item?.payment_status != 'Paid')?.map(item => item?.fee?.id);
            // old code end

            setSelectedInstallments((prevData) => ({
                ...prevData,
                fee_installment: feeIds
            }));
        }
    }, [studentFeeInstallments]);


    useEffect(() => {
        setStudentFeeVouchersData(studentFeeVouchers);
    }, [studentFeeVouchers]);

    useEffect(() => {
        setStudentTransportVouchersData(studentTransportVouchers);
    }, [studentTransportVouchers]);

    useEffect(() => {
        setSelectedDiscount(studentFeeDiscount);

        if (studentFeeDiscount?.id != null) {
            setStudenHasDiscount(true)
        }
        else {
            setStudenHasDiscount(false)
        }
    }, [studentFeeDiscount]);

    // set selected student data
    useEffect(() => {
        if (student?.id != null) {
            setSelectedStudent(student)
        }
        else {
            setSelectedStudent({});
            setSelectedDiscount({});
        }
    }, [student]);
    // end set selected student data


    // get selected student fee installments start
    const getStudentFeeInstallments = (form_data) => {
        setStudentFeeInstallmentsData([]);
        setStudentFeeVouchersData([]);
        setStudentTransportVouchersData([]);
        setLoading(false);
        setSelectedDiscount({});
        setSelectedFeeInstallments([]);
        setSelectedFeeIds([]);
        setSelectedInstallments({
            fee_installment: [],
            general_voucher: [],
            transport_voucher: [],
        });

        router.post(route("fee.installment_payment"), form_data);
    }
    // get selected student fee installments end

    // store selected installments from child start
    const selectedFeeInstallmentsFromChild = (data) => {
        setSelectedFeeInstallments(data);
    }

    const selectedFeeInstallmentsDataFromChild = (data) => {
        setFeeInstallmentsDataArray(data);
    }
    // store selected installments from child end

    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-6">
                    <FeePaymentForm
                        classrooms={classrooms}
                        students={students}
                        setSelectedStudent={setSelectedStudent}
                        selectedStudent={selectedStudent}
                        studentFeeInstallmentsData={studentFeeInstallmentsData}
                        setStudentFeeInstallmentsData={setStudentFeeInstallmentsData}
                        studentFeeVouchersData={studentFeeVouchersData}
                        setStudentFeeVouchersData={setStudentFeeVouchersData}
                        studentTransportVouchersData={studentTransportVouchersData}
                        setStudentTransportVouchersData={setStudentTransportVouchersData}
                        filteredStudentsData={filteredStudentsData}
                        setLoading={setLoading}
                        getStudentFeeInstallments={getStudentFeeInstallments}
                        setSelectedDiscount={setSelectedDiscount}
                        setSelectedFeeIds={setSelectedFeeIds}
                        setSelectedInstallments={setSelectedInstallments}
                        setFeeInstallmentsDataArray={setFeeInstallmentsDataArray}
                        setSelectedFeeInstallments={setSelectedFeeInstallments}
                        currentDueAmount={currentDueAmount}
                    />
                    {loading ?
                        <div className="flex justify-center">
                            <Loader></Loader>
                        </div>
                    :
                        <>
                            {(selectedStudent?.id != null && selectedStudent?.siblings?.length > 0) &&
                                <SiblingDetails
                                    siblings={selectedStudent?.siblings}
                                    getStudentFeeInstallments={getStudentFeeInstallments}
                                />
                            }

                            {selectedStudent?.id != null &&
                                <FeeDetails
                                    selectedStudent={selectedStudent}
                                    guardians={selectedStudent?.guardians}
                                    feeInstallments={studentFeeInstallmentsData?.feeInstallments}
                                    feeVouchers={studentFeeVouchersData?.feeVouchers}
                                    transportVouchers={studentTransportVouchersData?.transportVouchers}
                                    sendSelectedFeeInstallmentDataToParent={selectedFeeInstallmentsFromChild}
                                    getStudentFeeInstallments={getStudentFeeInstallments}
                                    setFeePaymentType={setFeePaymentType}
                                    selectedFeeIds={selectedFeeIds}
                                    setSelectedFeeIds={setSelectedFeeIds}
                                    selectedVoucherIds={selectedVoucherIds}
                                    setSelectedVoucherIds={setSelectedVoucherIds}
                                    selectedTransportVoucherIds={selectedTransportVoucherIds}
                                    setSelectedTransportVoucherIds={setSelectedTransportVoucherIds}
                                    selectedInstallments={selectedInstallments}
                                    setSelectedInstallments={setSelectedInstallments}
                                    studentFeePaymentReports={studentFeePaymentReports}
                                    selectFeeSequentially={selectFeeSequentially}
                                    feeReceiptPageSize={feeReceiptPageSize}
                                    feeReceiptCopy={feeReceiptCopy}
                                />
                            }
                        </>
                    }
                </div>
                <div className="col-span-12 xl:col-span-6">
                    <FeeStructure
                        feeInstallments={selectedFeeInstallments}
                        sendFeeInstallmentsDataToParent={selectedFeeInstallmentsDataFromChild}
                        studentFeeDiscount={studentFeeDiscount}
                        selectedDiscount={selectedDiscount}
                        setSelectedDiscount={setSelectedDiscount}
                        discounts={discounts}
                        selectedStudent={selectedStudent}
                        feePaymentType={feePaymentType}
                        studenHasDiscount={studenHasDiscount}
                        setSelectedFeeIds={setSelectedFeeIds}
                        extraFeeTypes={extraFeeTypes}
                        setTotalAmountPaid={setTotalAmountPaid}
                        setTotalAmountDiscount={setTotalAmountDiscount}
                        setSelectedInstallments={setSelectedInstallments}
                        selectedInstallments={selectedInstallments}
                    />
                    <FeePaymentProcess
                        paymentModes={paymentModes}
                        banks={banks}
                        studentId={selectedStudent?.id}
                        feeInstallmentsDataArray={feeInstallmentsDataArray}
                        setFeeInstallmentsDataArray={setFeeInstallmentsDataArray}
                        feePaymentType={feePaymentType}
                        setSelectedFeeIds={setSelectedFeeIds}
                        getStudentFeeInstallments={getStudentFeeInstallments}
                        bankAccounts={bankAccounts}
                        totalPaidAmount={totalAmountPaid}
                        totalDiscountAmount={totalAmountDiscount}
                        feeReceiptPageSize={feeReceiptPageSize}
                        feeReceiptCopy={feeReceiptCopy}
                        setSelectedInstallments={setSelectedInstallments}
                        isBackDateAllowed={isBackDateAllowed}
                    />
                </div>
            </div>
        </>
    );
};

export default FeePaymentMain;
