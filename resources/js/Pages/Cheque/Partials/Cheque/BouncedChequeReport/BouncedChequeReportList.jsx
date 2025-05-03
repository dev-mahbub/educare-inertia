import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

const BouncedChequeReportList = ({ bouncedChequeReports = [] }) => {

    const [filterText, setFilterText] = useState("");


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

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            search: filterText
        }));
    },[filterText]);


    // filter students data
    const filteredChequeReports = useMemo(() => {
        return bouncedChequeReports.filter((item) => {
            const inputText = filterText?.toLowerCase().trim();

            const chequeNo = String(item?.cheque_no)?.toLowerCase();
            const bankName = String(item?.bank?.name)?.toLowerCase();
            const chequeDate = String(item?.cheque_date)?.toLowerCase();
            const receiptNo = String(item?.receipt_no)?.toLowerCase();
            const chequeAmount = String(item?.cheque_amount)?.toLowerCase();
            const chequePenalty = String(item?.cheque_penalty)?.toLowerCase();
            const admissionNo = item?.student?.admission_no?.toLowerCase();
            const studentName = `${item?.student?.first_name} ${item?.student?.middle_name} ${item?.student?.last_name}`.toLowerCase();
            const classroomTitle = item?.student?.classroom?.title?.toLowerCase();
            const paymentDate = String(item?.payment_date)?.toLowerCase();

            return (
                (chequeNo && chequeNo.includes(inputText)) ||
                (bankName && bankName.includes(inputText)) ||
                (chequeDate && chequeDate.includes(inputText)) ||
                (receiptNo && receiptNo.includes(inputText)) ||
                (chequeAmount && chequeAmount.includes(inputText)) ||
                (chequePenalty && chequePenalty.includes(inputText)) ||
                (studentName && studentName.includes(inputText)) ||
                (admissionNo && admissionNo.includes(inputText)) ||
                (classroomTitle && classroomTitle.includes(inputText)) ||
                (paymentDate && paymentDate.includes(inputText))
            );

        });
    }, [bouncedChequeReports, filterText])
    //filter students data


    const filterChequeReports = (e) => {
        e.preventDefault();
    };


    return (
        <>
            <div className="educare-card-title leading-none">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Bounced Cheque Report
                </h5>
            </div>
            <div className='educare-admission-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-admission-filtar-bar">
                    <div className="educare-admission-filtar-bar-filter">
                        <form onSubmit={filterChequeReports}>
                            <div className="educare-admission-filtar-bar-count">
                                <span>Total: {filteredChequeReports?.length}</span>
                            </div>

                            <div className="educare-admission-filtar-bar-filter-action educare-filter-action-btn ">
                                <div className="educare-input-field-styles">
                                    <TextInput
                                        id="search"
                                        value={data?.search}
                                        onChange={(e) =>
                                            setFilterText(e.target.value)
                                        }
                                        className="block"
                                        placeHolder="search here"
                                    />
                                </div>
                                {/* <div className="educare-select-field-styles">
                                    <SelectInput
                                        id="classroom_id"
                                        data_label="Class"
                                        data={classrooms}
                                        value={
                                            data.classroom_id
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "classroom_id",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.classroom_id
                                        }
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Tooltip
                                        title="Search"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <button
                                            type="submit"
                                            className="educare-secondary-btn-md-fill"
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </button>
                                    </Tooltip>
                                </div> */}
                                <div>
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
                                <div>
                                    <Tooltip
                                        title="Excel Sheet"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <Link
                                            href={route('cheque.bounced_report')}
                                            className="educare-gray-btn-md-fill"
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div><div className="educare-admission-list-inner">
                <div className="educare-admission-list-inner-wrapper">
                    <div className="educare-admission-list pb-none">
                        <table>
                            <thead>
                                <tr>
                                    <th>Cheque No.</th>
                                    <th>Bank Name</th>
                                    <th>Cheque Date</th>
                                    <th>Receipt No</th>
                                    <th>Amount</th>
                                    <th>Penalty</th>
                                    <th>Student Name</th>
                                    <th>Adm No.</th>
                                    <th>Class</th>
                                    <th>Pay Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredChequeReports?.length > 0 ? (
                                    filteredChequeReports?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.cheque_no}</td>
                                            <td>{item?.bank?.name}</td>
                                            <td>{item?.cheque_date}</td>
                                            <td>{item?.receipt_no}</td>
                                            <td>{parseFloat(item?.cheque_amount ?? 0)}</td>
                                            <td>{item?.cheque_penalty}</td>
                                            <td>{`${item?.student?.first_name} ${item?.student?.middle_name} ${item?.student?.last_name}`}</td>
                                            <td>{item?.student?.admission_no}</td>
                                            <td>{item?.student?.classroom?.title}</td>
                                            <td>{item?.payment_date}</td>
                                            <td>
                                                <span className="badge danger">Bounced</span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                        <tr>
                                            <td
                                                className="text-center text-red-500"
                                                colSpan="11"
                                            >
                                                Data not found
                                            </td>
                                        </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BouncedChequeReportList;
