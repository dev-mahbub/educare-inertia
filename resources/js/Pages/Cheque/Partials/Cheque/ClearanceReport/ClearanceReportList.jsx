import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";

const ClearanceReportList = ({ chequeClearanceReports = [] }) => {

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
    }, [filterText]);


    const filterChequesData = (e) => {
        e.preventDefault();

        // setFilterText(data.search);
    };


    // handle filter reports start
    const filteredClearedCheques = useMemo(() => {
        return chequeClearanceReports.filter((item) => {
            const inputText = filterText?.toLowerCase().trim();

            const cheque_no = String(item?.cheque_no)?.toLowerCase();
            const bank_name = item?.bank?.name?.toLowerCase();
            const cheque_date = item?.cheque_date?.toLowerCase();
            const receipt_no = String(item?.receipt_no)?.toLowerCase();
            const amount = String(item?.cheque_amount)?.toLowerCase();
            const studentName = `${item?.student?.first_name} ${item?.student?.middle_name} ${item?.student?.last_name}`.toLowerCase();
            const admissionNo = item?.student?.admission_no?.toLowerCase();
            const classroomTitle = item?.student?.classroom?.title?.toLowerCase();
            const clearance_date = item?.cheque_clearance_date?.toLowerCase();
            const clearance_note = item?.cheque_clearance_note?.toLowerCase();

            return (
                (cheque_no && cheque_no.includes(inputText)) ||
                (bank_name && bank_name.includes(inputText)) ||
                (cheque_date && cheque_date.includes(inputText)) ||
                (receipt_no && receipt_no.includes(inputText)) ||
                (amount && amount.includes(inputText)) ||
                (studentName && studentName.includes(inputText)) ||
                (admissionNo && admissionNo.includes(inputText)) ||
                (classroomTitle && classroomTitle.includes(inputText)) ||
                (clearance_date && clearance_date.includes(inputText)) ||
                (clearance_note && clearance_note.includes(inputText))
            );

        });
    }, [chequeClearanceReports, filterText]);
    // handle filter reports start


    return (
        <>
            <div className="educare-card-title leading-none">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Cheque Clearance Report
                </h5>
            </div>
            <div className='educare-admission-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-admission-filtar-bar">
                    <div className="educare-admission-filtar-bar-filter">
                        <form onSubmit={filterChequesData}>
                            <div className="educare-admission-filtar-bar-count">
                                <span>Total: {filteredClearedCheques?.length}</span>
                            </div>

                            <div className="educare-admission-filtar-bar-filter-action educare-filter-action-btn ">
                                <div className="educare-input-field-styles">
                                    <TextInput
                                        id="search"
                                        value={
                                            data.search
                                        }
                                        onChange={(e) =>{
                                            // setData(
                                            //     "search",
                                            //     e.target.value
                                            // )

                                            setFilterText(e.target.value)
                                        }
                                        }
                                        className="block"
                                        placeHolder='Search here'
                                    />
                                    <InputError
                                        message={
                                            errors.search
                                        }
                                        className="mt-2"
                                    />
                                </div>
                                {/* <div>
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
                                    <th>Student Name</th>
                                    <th>Adm No.</th>
                                    <th>Class</th>
                                    <th>Clearance Date</th>
                                    <th>Clearance Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredClearedCheques?.length > 0 ? (
                                    filteredClearedCheques?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.cheque_no}</td>
                                            <td>{item?.bank?.name}</td>
                                            <td>{item?.cheque_date}</td>
                                            <td>{item?.receipt_no}</td>
                                            <td>{parseFloat(item?.cheque_amount ?? 0)}</td>
                                            <td>{`${item?.student?.first_name} ${item?.student?.middle_name} ${item?.student?.last_name}`}</td>
                                            <td>{item?.student?.admission_no}</td>
                                            <td>{item?.student?.classroom?.title}</td>
                                            <td>{item?.cheque_clearance_date}</td>
                                            <td>{item?.cheque_clearance_note}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            className="text-center text-red-500"
                                            colSpan="10"
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

export default ClearanceReportList;
