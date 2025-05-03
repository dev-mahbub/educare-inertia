import React from "react";
import Checkbox from "@/Components/Checkbox";
import MemberManageLeftFilter from "./MemberManageLeftFilter";
import PrimaryButton from "@/Components/PrimaryButton";


const MemberManageLeftList = ({ setCheckedData, handleCheckedDataToMove, data, setData, errors }) => {


    const sampleData = [
        { id: 1, name: "Kiran Gpta", admissionNo: "11", checkValue: "checkOne" },
        { id: 2, name: "Pallavi Roy", admissionNo: "12", checkValue: "checkTwo" },
        { id: 3, name: "Rimmi Roy", admissionNo: "13", checkValue: "checkThree" },
    ]
    const teacherData = [
        { id: 1, name: "Mahbub", phone: "01798888888", checkValue: "checkOne" },
        { id: 2, name: "Tanzil", phone: "01798888888", checkValue: "checkTwo" },
        { id: 3, name: "Rakib", phone: "01798888888", checkValue: "checkThree" },
    ]

 
    const handleCheckboxSelect = (name, value) => {
        let newFormData;

        if (data.select_team_participants === "studentOnly") {
            if (name === "select_all") {
                newFormData = {
                    ...data,
                    [name]: value,
                    checkOne: value,
                    checkTwo: value,
                    checkThree: value,
                };
                if (value) {
                    setCheckedData(sampleData);
                } else {
                    setCheckedData({}); // Clear checkedData when "Select All" is unchecked
                }
            } else {
                newFormData = {
                    ...data,
                    [name]: value,
                };
                // any child uncheck, parent will uncheck
                if (value === false) {
                    newFormData.select_all = false;
                } else {
                    // Check if all child checkboxes are checked
                    const allChecked = sampleData.every((row) => newFormData[row.checkValue]);
                    newFormData.select_all = allChecked;
                }
                // filter and set checkedData
                const selectedRows = sampleData.filter((row) => newFormData[row.checkValue]);
                setCheckedData(selectedRows);
            }
        }
        //select teacher only
        else if (data.select_team_participants === "teacherOnly") {
            if (name === "select_all") {
                newFormData = {
                    ...data,
                    [name]: value,
                    checkOne: value,
                    checkTwo: value,
                    checkThree: value,
                };
                if (value) {
                    setCheckedData(teacherData);
                } else {
                    setCheckedData({}); // Clear checkedData when "Select All" is unchecked
                }
            } else {
                newFormData = {
                    ...data,
                    [name]: value,
                };
                // any child uncheck, parent will uncheck
                if (value === false) {
                    newFormData.select_all = false;
                } else {
                    // Check if all child checkboxes are checked
                    const allChecked = teacherData.every((row) => newFormData[row.checkValue]);
                    newFormData.select_all = allChecked;
                }
                // filter and set checkedData
                const selectedRows = teacherData.filter((row) => newFormData[row.checkValue]);
                setCheckedData(selectedRows);
            }
            
        };
        setData(newFormData);
    };

    return (
        <>
            <MemberManageLeftFilter
                data={data}
                setData={setData}
                errors={errors}
            />
            <div className="educare-input-field-notes mb-2.5">
                <ul>
                    <li>
                        <i className="icon-info mr-1"></i>
                        Check members for team and then select team
                    </li>
                </ul>
            </div>
            {
                data.select_team_participants === "TeamParticipant"? "" : ""
            }
            {
                data.select_team_participants === "teacherOnly" ? (
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    name="select_all"
                                                    checked={data.select_all}
                                                    onChange={(e) =>
                                                        handleCheckboxSelect(
                                                            e.target.name,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </th>
                                    <th>Teacher Name</th>
                                    <th>Phone No</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teacherData?.length > 0 ? (
                                    teacherData?.map((row, id) => (
                                        <tr key={id}>
                                            <td>
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            name={`${row.checkValue}`}
                                                            checked={data[row.checkValue]}
                                                            onChange={(e) =>
                                                                handleCheckboxSelect(
                                                                    e.target.name,
                                                                    e.target.checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{row.name}</td>
                                            <td>{row.phone}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="text-center text-red-500" colSpan="10">
                                            Data not found
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                ) : ""
            }
            {
                data.select_team_participants === "studentOnly" ? (
                    <div>
                        {
                            data.select_class === "class" ? (
                                <div className="educare-default-table xs:overflow-x-auto">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                name="select_all"
                                                                checked={data.select_all}
                                                                onChange={(e) =>
                                                                    handleCheckboxSelect(
                                                                        e.target.name,
                                                                        e.target.checked
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>Admission No.</th>
                                                <th>Student Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sampleData?.length > 0 ? (
                                                sampleData?.map((row, id) => (
                                                    <tr key={id}>
                                                        <td>
                                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                <div className="educare-create-school-settings-list-check width-full">
                                                                    <Checkbox
                                                                        name={`${row.checkValue}`}
                                                                        checked={data[row.checkValue]}
                                                                        onChange={(e) =>
                                                                            handleCheckboxSelect(
                                                                                e.target.name,
                                                                                e.target.checked
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{row.admissionNo}</td>
                                                        <td>{row.name}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="10">
                                                        Data not found
                                                    </td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </table>
                                </div>
                            ) : ""
                        }
                    </div>
                ) : ""
            }
            <div className="flex justify-end mt-2.5">
                <PrimaryButton
                    // disabled={processing}
                    className="educare-primary-btn-md-fill"
                    onClick={handleCheckedDataToMove}
                >
                    Move
                    <i className="icon-ArrowRight ml-1"></i>
                </PrimaryButton>
            </div>
        </>
    );
};

export default MemberManageLeftList;