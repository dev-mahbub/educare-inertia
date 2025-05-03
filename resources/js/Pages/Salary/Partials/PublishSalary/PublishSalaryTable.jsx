import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import { useEffect, useState } from "react";
const PublishSalaryTable = ({
    staffSalaryPayments,
    staffSalaryPaymentIds,
    setStaffSalaryPaymentIds
}) => {

    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        if (staffSalaryPaymentIds?.length == staffSalaryPayments?.length && staffSalaryPayments?.length > 0) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [staffSalaryPaymentIds, staffSalaryPayments]);

    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        if (name === "select_all") {
            if(value == true) {
                setStaffSalaryPaymentIds(staffSalaryPayments?.map(item => item?.id));
            } else {
                setStaffSalaryPaymentIds([]);
            }
        } else {
            let updatedData = [...staffSalaryPaymentIds];

            if (updatedData?.includes(value)) {
                updatedData = updatedData?.filter(item => item != value);
            } else {
                updatedData = [...staffSalaryPaymentIds, value];
            }

            setStaffSalaryPaymentIds(updatedData);
        }
    };

    return (
        <>
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Month</th>
                                <th>Employee Id</th>
                                <th>Gender</th>
                                <th>Designation</th>
                                <th>DOB</th>
                                <th>DOJ</th>
                                <th>Total Earning</th>
                                <th>Total Deduction</th>
                                <th>Paid Amount</th>
                                <th>
                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                        <div className="educare-create-school-settings-list-check width-full">
                                            <Checkbox
                                                id="select_all"
                                                name="select_all"
                                                checked={
                                                    selectAll
                                                }
                                                onChange={(e) =>
                                                    handleCheckboxSelect(
                                                        e.target.name,
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="educare-create-school-settings-list-title width-full">
                                            <InputLabel
                                                htmlFor="select_all"
                                                value="Select All"
                                            />
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffSalaryPayments?.length > 0 ?
                                staffSalaryPayments.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            {`${item?.staff?.first_name ?? ''} ${item?.staff?.middle_name ?? ''} ${item?.staff?.last_name ?? ''}`}
                                        </td>
                                        <td>{item?.payment_month?.title}</td>
                                        <td>{item?.staff?.employee_id}</td>
                                        <td>{item?.staff?.gender}</td>
                                        <td>{item?.staff?.designation?.name}</td>
                                        <td>{item?.staff?.date_of_birth}</td>
                                        <td>{item?.staff?.date_of_join}</td>
                                        <td>{parseInt(item?.total_earning_amount ?? 0)}</td>
                                        <td>{parseInt(item?.total_deduction_amount ?? 0)}</td>
                                        <td>{parseInt(item?.paid_amount ?? 0)}</td>
                                        <td>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id={`staff_salary_payment_${item?.id}`}
                                                        name={`staff_salary_payment_${item?.id}`}
                                                        checked={staffSalaryPaymentIds?.includes(item?.id)}
                                                        onChange={(e) =>
                                                            handleCheckboxSelect(
                                                                e.target.name,
                                                                item?.id
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            :
                                <tr>
                                    <td
                                        className="text-center text-red-500"
                                        colSpan="10"
                                    >
                                        Data not found
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default PublishSalaryTable;
