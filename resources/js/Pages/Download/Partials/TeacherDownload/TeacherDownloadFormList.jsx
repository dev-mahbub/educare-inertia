import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import RadioInput from "@/Components/RadioInput";
import SelectInput from "@/Components/SelectInput";
import React from "react";

const TeacherDownloadFormList = ({data, setData, errors}) => {

    const handleResetRadio = () => {
        setData({
            downloadTeacherType: "",
        })
    }


    return (
        <>

            <div className="educare-class-form-box-wrapper">
                <div className="educare-create-school-details-form-wrap">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-DownloadSimple"></i>
                            Predefined Download
                        </h5>
                    </div>
                    <div className="educare-classroom-table-wrapper">
                        <div className="educare-default-table xs:overflow-x-auto">
                            <table>
                                <tbody>
                                    {/*Teacher download*/}
                                    <tr>
                                        <td colSpan={2}>
                                            <div className="educare-create-school-settings-list-check min-width-full">
                                                <div className="educare-radio-field-styles">
                                                    <RadioInput
                                                        name="downloadTeacherType"
                                                        value="Download Teacher"
                                                        checked={data.downloadTeacherType === "download_teacher"}
                                                        onChange={() => setData("downloadTeacherType", "download_teacher")}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    {/*Gender wise download*/}
                                    <tr>
                                        <td>
                                            <div className="educare-create-school-settings-list-check min-width-full">
                                                <div className="educare-radio-field-styles">
                                                    <RadioInput
                                                        name="downloadTeacherType"
                                                        value="Gender Wise Download"
                                                        checked={data.downloadTeacherType === "gender_wise"}
                                                        onChange={() => setData("downloadTeacherType", "gender_wise")}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {
                                                data.downloadTeacherType === "gender_wise" ? (
                                                    <div className="educare-input-field-styles">
                                                        <SelectInput
                                                            data_label="Gender"
                                                            data={[]}
                                                            value={
                                                                data.select_gender_wise
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "select_gender_wise",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.select_gender_wise
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                ) : ""
                                            }
                                        </td>
                                    </tr>
                                    {/*Religion wise download */}
                                    <tr>
                                        <td>
                                            <div className="educare-create-school-settings-list-check min-width-full">
                                                <div className="educare-radio-field-styles">
                                                    <RadioInput
                                                        name="downloadTeacherType"
                                                        value="Religion wise Download"
                                                        checked={data.downloadTeacherType === "religion_wise"}
                                                        onChange={() => setData("downloadTeacherType", "religion_wise")}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {
                                                data.downloadTeacherType === "religion_wise" ? (
                                                    <div className="educare-input-field-styles">
                                                        <SelectInput
                                                            data_label="Religion"
                                                            data={[]}
                                                            value={
                                                                data.select_religious_wise
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "select_religious_wise",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.select_religious_wise
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                ) : ""
                                            }
                                        </td>
                                    </tr>
                                    {/*Category Wise download */}
                                    <tr>
                                        <td>
                                            <div className="educare-create-school-settings-list-check min-width-full">
                                                <div className="educare-radio-field-styles">
                                                    <RadioInput
                                                        name="downloadTeacherType"
                                                        value="Category Wise Download"
                                                        checked={data.downloadTeacherType === "category_wise"}
                                                        onChange={() => setData("downloadTeacherType", "category_wise")}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {
                                                data.downloadTeacherType === "category_wise" ? (
                                                    <div className="educare-input-field-styles">
                                                        <SelectInput
                                                            data_label="Category"
                                                            data={[]}
                                                            value={
                                                                data.select_category_wise
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "select_category_wise",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.select_category_wise
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                ) : ""
                                            }
                                        </td>
                                    </tr>
                                    {/*House Wise download */}
                                    <tr>
                                        <td>
                                            <div className="educare-create-school-settings-list-check min-width-full">
                                                <div className="educare-radio-field-styles">
                                                    <RadioInput
                                                        name="downloadTeacherType"
                                                        value="House Wise Download"
                                                        checked={data.downloadTeacherType === "house_wise"}
                                                        onChange={() => setData("downloadTeacherType", "house_wise")}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {
                                                data.downloadTeacherType === "house_wise" ? (
                                                    <div className="educare-input-field-styles">
                                                        <SelectInput
                                                            data_label="House"
                                                            data={[]}
                                                            value={
                                                                data.select_house_wise
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "select_house_wise",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.select_house_wise
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                ) : ""
                                            }
                                        </td>
                                    </tr>
                                    {/*Designation Wise download */}
                                    <tr>
                                        <td>
                                            <div className="educare-create-school-settings-list-check min-width-full">
                                                <div className="educare-radio-field-styles">
                                                    <RadioInput
                                                        name="downloadTeacherType"
                                                        value="Designation Wise Download"
                                                        checked={data.downloadTeacherType === "designation_wise"}
                                                        onChange={() => setData("downloadTeacherType", "designation_wise")}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {
                                                data.downloadTeacherType === "designation_wise" ? (
                                                    <div className="educare-input-field-styles">
                                                        <SelectInput
                                                            data_label="Designation"
                                                            data={[]}
                                                            value={
                                                                data.select_designation_wise
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "select_designation_wise",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.select_designation_wise
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                ) : ""
                                            }
                                        </td>
                                    </tr>
                                    {/*Job Type download */}
                                    <tr>
                                        <td>
                                            <div className="educare-create-school-settings-list-check min-width-full">
                                                <div className="educare-radio-field-styles">
                                                    <RadioInput
                                                        name="downloadTeacherType"
                                                        value="Job Type Wise Download"
                                                        checked={data.downloadTeacherType === "job_type_wise"}
                                                        onChange={() => setData("downloadTeacherType", "job_type_wise")}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {
                                                data.downloadTeacherType === "job_type_wise" ? (
                                                    <div className="educare-input-field-styles">
                                                        <SelectInput
                                                            data_label="Job Type "
                                                            data={[]}
                                                            value={
                                                                data.select_job_type_wise
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "select_job_type_wise",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.select_job_type_wise
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                ) : ""
                                            }
                                        </td>
                                    </tr>
                                    {/*Department download */}
                                    <tr>
                                        <td>
                                            <div className="educare-create-school-settings-list-check min-width-full">
                                                <div className="educare-radio-field-styles">
                                                    <RadioInput
                                                        name="downloadTeacherType"
                                                        value="Department Wise Download"
                                                        checked={data.downloadTeacherType === "department_wise"}
                                                        onChange={() => setData("downloadTeacherType", "department_wise")}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {
                                                data.downloadTeacherType === "department_wise" ? (
                                                    <div className="educare-input-field-styles">
                                                        <SelectInput
                                                            data_label="Department"
                                                            data={[]}
                                                            value={
                                                                data.select_department_wise
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "select_department_wise",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.select_department_wise
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                ) : ""
                                            }
                                        </td>
                                    </tr>
                                    {/*Class Group download */}
                                    <tr>
                                        <td>
                                            <div className="educare-create-school-settings-list-check min-width-full">
                                                <div className="educare-radio-field-styles">
                                                    <RadioInput
                                                        name="downloadTeacherType"
                                                        value="Class Group Wise Download"
                                                        checked={data.downloadTeacherType === "class_group_wise"}
                                                        onChange={() => setData("downloadTeacherType", "class_group_wise")}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {
                                                data.downloadTeacherType === "class_group_wise" ? (
                                                    <div className="educare-input-field-styles">
                                                        <SelectInput
                                                            data_label="Class Group"
                                                            data={[]}
                                                            value={
                                                                data.select_class_group_wise
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "select_class_group_wise",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.select_class_group_wise
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                ) : ""
                                            }
                                        </td>
                                    </tr>
                                    {/*Employee Id Wise download */}
                                    <tr>
                                        <td colSpan={2}>
                                            <div className="educare-create-school-settings-list-check min-width-full">
                                                <div className="educare-radio-field-styles">
                                                    <RadioInput
                                                        name="downloadTeacherType"
                                                        value="Employee Id Wise Download"
                                                        checked={data.downloadTeacherType === "employee_type_wise"}
                                                        onChange={() => setData("downloadTeacherType", "employee_type_wise")}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-end gap-2.5 mt-2">
                <PrimaryButton
                    className="educare-gray-btn-md-stroke"
                    onClick={handleResetRadio}
                >
                    Reset
                </PrimaryButton>
                <PrimaryButton
                    className="educare-primary-btn-md-fill"
                >
                    <i className="icon-DownloadSimple mr-1"></i>
                    Download Excel
                </PrimaryButton>
            </div>
        </>
    );
};

export default TeacherDownloadFormList;