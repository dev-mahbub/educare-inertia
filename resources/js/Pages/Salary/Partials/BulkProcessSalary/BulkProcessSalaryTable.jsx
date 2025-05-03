import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import { concatName } from "@/Hooks/GlobalFunction";
import BulkProcessSalaryFilter from "./BulkProcessSalaryFilter";

const BulkProcessSalaryTable = ({
    paymentMonths,
    staffEarnings,
    staffIds,
    setStaffIds,
    selectAll,
    setPaymentMonthId,
    staffCategories,
    setStaffCategoryId,
    setStaffSubCategoryId
}) => {

    // handle select staff start
    const handleCheckboxSelect = (name, value) => {
        let newStaffIds;

        if(name == 'select_all') {
            if(value) {
                newStaffIds = staffEarnings?.filter(item => item?.is_paid == false)?.map(item => item?.staff_id);
            } else {
                newStaffIds = [];
            }
        } else {
            if(staffIds?.includes(value)) {
                newStaffIds = staffIds?.filter(id => id != value);
            } else {
                newStaffIds = [...staffIds, value];
            }
        }

        setStaffIds(newStaffIds);
    };
    // handle select staff end

    return (
        <>
            <BulkProcessSalaryFilter
                paymentMonths={paymentMonths}
                setStaffIds={setStaffIds}
                staffEarnings={staffEarnings}
                setPaymentMonthId={setPaymentMonthId}
                staffCategories={staffCategories}
                setStaffCategoryId={setStaffCategoryId}
                setStaffSubCategoryId={setStaffSubCategoryId}
            />
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="select_all"
                                            name="select_all"
                                            checked={selectAll}
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
                                        />
                                    </div>
                                </div>
                            </th>
                            <th>Name</th>
                            <th>Employee Id</th>
                            <th>Earning</th>
                            <th>Deduction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffEarnings?.length > 0 ?
                            staffEarnings.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {item?.is_paid == false &&
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id={`staff_id_${item?.staff_id}`}
                                                        name={`staff_id_${item?.staff_id}`}
                                                        checked={staffIds.includes(item?.staff_id)}
                                                        onChange={(e) =>
                                                            handleCheckboxSelect(
                                                                e.target.name,
                                                                item?.staff_id
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor={`staff_id_${item?.staff_id}`}
                                                    />
                                                </div>
                                            </div>
                                        }
                                    </td>
                                    <td>{concatName(item?.staff?.first_name, item?.staff?.middle_name, item?.staff?.last_name)}</td>
                                    <td>{item?.staff?.employee_id}</td>
                                    <td>{item?.earning_amount}</td>
                                    <td>{item?.deduction_amount}</td>
                                </tr>
                            ))
                        :
                            <tr>
                                <td className="text-center text-red-500" colSpan="5">
                                    Data not found
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default BulkProcessSalaryTable;
