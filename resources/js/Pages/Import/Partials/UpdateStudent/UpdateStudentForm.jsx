import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Autocomplete from '@mui/material/Autocomplete';
import CheckboxA from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { useEffect, useRef, useState } from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


export default function UpdateStudentForm({
    className = "",
    classrooms = [],
    columns = [],
    columnLabels = []
}) {
    const titleInput = useRef();
    const cityInput = useRef();;
    // const selectClassInput = useRef();
    const uploadStudentDocumentInput = useRef();

    const [classroomIds, setClassroomIds] = useState([]);
    const [params, setParams] = useState({});

    const {
        data,
        setData,
        errors,
        post,
        get,
        reset,
        recentlySuccessful,
    } = useForm({
        //input start
        classroom_ids: [],
        student_import_file: null,
        // checkbox start
        // new
        all_select_checkbox_id: false,
        ...columns,
        // old
        // all_select_checkbox_id: false,
        // admission_no_checkbox_id: false,
        // roll_number_checkbox_id: false,
        // student_first_name_checkbox_id: false,
        // student_middle_name_checkbox_id: false,
        // student_last_name_checkbox_id: false,
        // gender_name_checkbox_id: false,
        // address_name_checkbox_id: false,
        // category_name_checkbox_id: false,
        // blood_group_checkbox_id: false,

        // religion_name_checkbox_id: false,
        // father_name_checkbox_id: false,
        // father_email_checkbox_id: false,
        // father_sms_no_checkbox_id: false,
        // primary_qualification_checkbox_id: false,
        // father_occupation_checkbox_id: false,
        // father_company_checkbox_id: false,
        // father_designation_parent_checkbox_id: false,
        // mother_name_checkbox_id: false,
        // mother_sms_no_checkbox_id: false,
        // secondary_email_checkbox_id: false,
        // secondary_qualification_checkbox_id: false,
        // secondary_company_checkbox_id: false,

        // secondary_designation_checkbox_id: false,
        // guardian_name_checkbox_id: false,
        // guardian_relation_checkbox_id: false,
        // guardian_qualification_checkbox_id: false,
        // guardian_occupation_checkbox_id: false,
        // guardian_designation_checkbox_id: false,
        // guardian_department_checkbox_id: false,
        // guardian_officeAddress_checkbox_id: false,
        // guardian_contact_no_checkbox_id: false,
        // bank_name_checkbox_id: false,
        // bank_code_no_checkbox_id: false,
        // branch_name_checkbox_id: false,
        // mtcr_checkbox_id: false,
        // ifsc_checkbox_id: false,
        // account_number_checkbox_id: false,
        // house_checkbox_id: false,
        // caste_checkbox_id: false,
        // father_aadhar_checkbox_id: false,
        // mother_aadhar_checkbox_id: false,
        // employment_category_checkbox_id: false,
        // admission_class_checkbox_id: false,
        // student_height_checkbox_id: false,
        // student_weight_checkbox_id: false,
        // samagra_id_checkbox_id: false,
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            classroom_ids: classroomIds
        }))
    }, [classroomIds]);


    // set url params start
    useEffect(() => {
        setParams(() => {
            const updatedData = {};

            for (const key in data) {
                if (key == 'classroom_ids') {
                    // updatedData[key] = data[key]?.join(',');
                    updatedData[key] = JSON.stringify(data[key]);
                }
                else if (key != 'student_import_file' && key != 'all_select_checkbox_id') {
                    updatedData[key] = data[key];
                }
            }

            return updatedData;
        });
    }, [data]);
    // set url params end


    // handle classroom select start
    const handleClassroomSelect = (event, value) => {
        setClassroomIds(value?.map(item => item?.id));
    }
    // handle classroom select end


    const updateStudentData = (e) => {
        e.preventDefault();

        post(route("import.student_update.save"),{
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {

            },
        });
    };

    // checkbox select
    const handleUpdateStudentCheckbox = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "all_select_checkbox_id") {
            // old code
            // newFormData = {
            //     ...data,
            //     [name]: value,
            //     admission_no_checkbox_id: value,
            //     roll_number_checkbox_id: value,
            //     student_first_name_checkbox_id: value,
            //     student_middle_name_checkbox_id: value,
            //     student_last_name_checkbox_id: value,
            //     gender_name_checkbox_id: value,
            //     address_name_checkbox_id: value,
            //     category_name_checkbox_id: value,
            //     blood_group_checkbox_id: value,

            //     religion_name_checkbox_id: value,
            //     father_name_checkbox_id: value,
            //     father_email_checkbox_id: value,
            //     father_sms_no_checkbox_id: value,
            //     primary_qualification_checkbox_id: value,
            //     father_occupation_checkbox_id: value,
            //     father_company_checkbox_id: value,
            //     father_designation_parent_checkbox_id: value,
            //     mother_name_checkbox_id: value,
            //     mother_sms_no_checkbox_id: value,
            //     secondary_email_checkbox_id: value,
            //     secondary_qualification_checkbox_id: value,
            //     secondary_company_checkbox_id: value,

            //     secondary_designation_checkbox_id: value,
            //     guardian_name_checkbox_id: value,
            //     guardian_relation_checkbox_id: value,
            //     guardian_qualification_checkbox_id: value,
            //     guardian_occupation_checkbox_id: value,
            //     guardian_designation_checkbox_id: value,
            //     guardian_department_checkbox_id: value,
            //     guardian_officeAddress_checkbox_id: value,
            //     guardian_contact_no_checkbox_id: value,
            //     bank_name_checkbox_id: value,
            //     bank_code_no_checkbox_id: value,
            //     branch_name_checkbox_id: value,
            //     mtcr_checkbox_id: value,
            //     ifsc_checkbox_id: value,
            //     account_number_checkbox_id: value,
            //     house_checkbox_id: value,
            //     caste_checkbox_id: value,
            //     father_aadhar_checkbox_id: value,
            //     mother_aadhar_checkbox_id: value,
            //     employment_category_checkbox_id: value,
            //     admission_class_checkbox_id: value,
            //     student_height_checkbox_id: value,
            //     student_weight_checkbox_id: value,
            //     samagra_id_checkbox_id: value,
            // };

            //  new code
            let updatedColumns = columns;

            Object.keys(columns)?.map(item => {
                updatedColumns[item] = value;
            });

            newFormData = {
                ...data,
                [name]: value,
                ...updatedColumns
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // old code
            // any child uncheck, parent will uncheck
            // if (value === false) {
            //     newFormData.all_select_checkbox_id = false;
            // }
            // // after all child checked, then parent will check
            // else if (
            //     newFormData.admission_no_checkbox_id === true &&
            //     newFormData.roll_number_checkbox_id === true &&
            //     newFormData.student_first_name_checkbox_id === true &&
            //     newFormData.student_middle_name_checkbox_id === true &&
            //     newFormData.student_last_name_checkbox_id === true &&
            //     newFormData.gender_name_checkbox_id === true &&
            //     newFormData.address_name_checkbox_id === true &&
            //     newFormData.category_name_checkbox_id === true &&
            //     newFormData.blood_group_checkbox_id === true &&
            //     newFormData.religion_name_checkbox_id === true &&
            //     newFormData.father_name_checkbox_id === true &&
            //     newFormData.father_email_checkbox_id === true &&
            //     newFormData.father_sms_no_checkbox_id === true &&
            //     newFormData.primary_qualification_checkbox_id === true &&
            //     newFormData.father_occupation_checkbox_id === true &&
            //     newFormData.father_company_checkbox_id === true &&
            //     newFormData.father_designation_parent_checkbox_id === true &&
            //     newFormData.mother_name_checkbox_id === true &&
            //     newFormData.mother_sms_no_checkbox_id === true &&
            //     newFormData.secondary_email_checkbox_id === true &&
            //     newFormData.secondary_qualification_checkbox_id === true &&
            //     newFormData.secondary_company_checkbox_id === true &&
            //     newFormData.secondary_designation_checkbox_id === true &&
            //     newFormData.guardian_name_checkbox_id === true &&
            //     newFormData.guardian_relation_checkbox_id === true &&
            //     newFormData.guardian_qualification_checkbox_id === true &&
            //     newFormData.guardian_occupation_checkbox_id === true &&
            //     newFormData.guardian_designation_checkbox_id === true &&
            //     newFormData.guardian_department_checkbox_id === true &&
            //     newFormData.guardian_officeAddress_checkbox_id === true &&
            //     newFormData.guardian_contact_no_checkbox_id === true &&
            //     newFormData.bank_name_checkbox_id === true &&
            //     newFormData.bank_code_no_checkbox_id === true &&
            //     newFormData.branch_name_checkbox_id === true &&
            //     newFormData.mtcr_checkbox_id === true &&
            //     newFormData.ifsc_checkbox_id === true &&
            //     newFormData.account_number_checkbox_id === true &&
            //     newFormData.house_checkbox_id === true &&
            //     newFormData.caste_checkbox_id === true &&
            //     newFormData.father_aadhar_checkbox_id === true &&
            //     newFormData.mother_aadhar_checkbox_id === true &&
            //     newFormData.employment_category_checkbox_id === true &&
            //     newFormData.admission_class_checkbox_id === true &&
            //     newFormData.student_height_checkbox_id === true &&
            //     newFormData.student_weight_checkbox_id === true &&
            //     newFormData.samagra_id_checkbox_id === true
            // ) {
            //     newFormData.all_select_checkbox_id = true;
            // }

            // new code
            const hasUnchecked = Object.keys(newFormData)?.filter(item => item != 'classroom_ids' && item != 'student_import_file' && item != 'all_select_checkbox_id')?.some(item => newFormData[item] === false)
            // new code
            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.all_select_checkbox_id = false;
            }
            // after all child checked, then parent will check
            else if (hasUnchecked == false) {
                newFormData.all_select_checkbox_id = true;
            }
        }

        setData(newFormData);
    };
    // checkbox select

    return (
        <div className="educare-import-data-area">
            <form onSubmit={updateStudentData}>
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-12 xl:col-span-12 col-span-12">
                        <div className="educare-master-create-shift-form">
                            <div className="educare-upload-data-area">
                                <div className="educare-import-data-field-wrapper">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-6 maxLg:col-span-12">
                                            <div className="educare-card-title leading-none">
                                                <h5>
                                                    <i className="icon-ListBullets"></i>
                                                    Import Student Data
                                                </h5>
                                            </div>
                                            <div className="gap-[20px] bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-[20px] items-end">
                                                <div className="student-update-data flex gap-5 items-end">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            value="Select Class"
                                                        />
                                                        <div className="educare-input-type-file-styles">
                                                            <Autocomplete
                                                                multiple
                                                                id="checkboxes-tags-demo"
                                                                options={classrooms}
                                                                disableCloseOnSelect
                                                                getOptionLabel={(option) => option.title}
                                                                renderOption={(props, option, { selected }) => (
                                                                    <li {...props}>
                                                                    <CheckboxA
                                                                        icon={icon}
                                                                        checkedIcon={checkedIcon}
                                                                        style={{ marginRight: 8 }}
                                                                        checked={selected}
                                                                    />
                                                                        {option.title}
                                                                    </li>
                                                                )}
                                                                renderInput={(params) => (
                                                                    <TextField {...params} placeholder="Classes" />
                                                                )}
                                                                onChange={handleClassroomSelect}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="text-end">
                                                        <a
                                                            className="educare-primary-btn-md-fill"
                                                            // target="_blank"
                                                            href={route("import.student_update_import_template.download", params)}
                                                        >
                                                            <i className="icon-DownloadSimple mr-1"></i>Download template
                                                        </a>
                                                        {/* <PrimaryButton
                                                            className="educare-primary-btn-md-fill"
                                                            type="button"
                                                            onClick={(e) => {
                                                                handleDownloadTemplate(e);
                                                            }}
                                                        >
                                                            <i className="icon-DownloadSimple mr-1"></i>Download template
                                                        </PrimaryButton> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="educare-upload-data-wrapper p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg ">
                                                <div className="educare-classroom-table-wrapper">
                                                    <div className="educare-card-title">
                                                        <h5>Please select columns</h5>
                                                    </div>
                                                    <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        <div className="flex gap-[8px]">
                                                                            <div className="educare-checkbox-field-styles">
                                                                                <Checkbox
                                                                                    id="all_select_checkbox_id"
                                                                                    name="all_select_checkbox_id"
                                                                                    checked={
                                                                                        data.all_select_checkbox_id
                                                                                    }
                                                                                    onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            All
                                                                        </div>
                                                                    </th>
                                                                    <th>Column</th>
                                                                </tr>
                                                            </thead>

                                                            {/* new code  */}
                                                            <tbody>
                                                                {Object.keys(columns)?.length > 0 &&
                                                                    Object.keys(columns)?.map((columnName, index) => (
                                                                        <tr key={index}>
                                                                            <td>
                                                                                <div className="educare-checkbox-field-styles">
                                                                                    <Checkbox
                                                                                        id={columnName}
                                                                                        name={columnName}
                                                                                        checked={
                                                                                            data[columnName] ?? false
                                                                                        }
                                                                                        onChange={(e) => handleUpdateStudentCheckbox(e.target.name, e.target.checked)
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                {columnLabels[columnName] ?? ""}
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                }
                                                            </tbody>

                                                            {/* old code */}
                                                            {/* <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="admission_no_checkbox_id"
                                                                                name="admission_no_checkbox_id"
                                                                                checked={
                                                                                    data.admission_no_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        AdmissionNo
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="roll_number_checkbox_id"
                                                                                name="roll_number_checkbox_id"
                                                                                checked={
                                                                                    data.roll_number_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        RollNumber
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="student_first_name_checkbox_id"
                                                                                name="student_first_name_checkbox_id"
                                                                                checked={
                                                                                    data.student_first_name_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        StudentFirstName
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="student_middle_name_checkbox_id"
                                                                                name="student_middle_name_checkbox_id"
                                                                                checked={
                                                                                    data.student_middle_name_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        StudentMiddleName
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="student_last_name_checkbox_id"
                                                                                name="student_last_name_checkbox_id"
                                                                                checked={
                                                                                    data.student_last_name_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        StudentLastname
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="gender_name_checkbox_id"
                                                                                name="gender_name_checkbox_id"
                                                                                checked={
                                                                                    data.gender_name_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        Gender
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="address_name_checkbox_id"
                                                                                name="address_name_checkbox_id"
                                                                                checked={
                                                                                    data.address_name_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        Address
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="category_name_checkbox_id"
                                                                                name="category_name_checkbox_id"
                                                                                checked={
                                                                                    data.category_name_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        Category
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="blood_group_checkbox_id"
                                                                                name="blood_group_checkbox_id"
                                                                                checked={
                                                                                    data.blood_group_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        BloodGroup
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="religion_name_checkbox_id"
                                                                                name="religion_name_checkbox_id"
                                                                                checked={
                                                                                    data.religion_name_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        Religion
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="father_name_checkbox_id"
                                                                                name="father_name_checkbox_id"
                                                                                checked={
                                                                                    data.father_name_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        FatherName
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="father_sms_no_checkbox_id"
                                                                                name="father_sms_no_checkbox_id"
                                                                                checked={
                                                                                    data.father_sms_no_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        FatherSmsNo
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="father_email_checkbox_id"
                                                                                name="father_email_checkbox_id"
                                                                                checked={
                                                                                    data.father_email_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        FatherEmail
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="primary_qualification_checkbox_id"
                                                                                name="primary_qualification_checkbox_id"
                                                                                checked={
                                                                                    data.primary_qualification_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        PrimaryQualification
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="father_occupation_checkbox_id"
                                                                                name="father_occupation_checkbox_id"
                                                                                checked={
                                                                                    data.father_occupation_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        FatherOccupation
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="father_company_checkbox_id"
                                                                                name="father_company_checkbox_id"
                                                                                checked={
                                                                                    data.father_company_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        FatherCompany
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="father_designation_parent_checkbox_id"
                                                                                name="father_designation_parent_checkbox_id"
                                                                                checked={
                                                                                    data.father_designation_parent_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        FatherDesignation
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="mother_name_checkbox_id"
                                                                                name="mother_name_checkbox_id"
                                                                                checked={
                                                                                    data.mother_name_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        MotherName
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="mother_sms_no_checkbox_id"
                                                                                name="mother_sms_no_checkbox_id"
                                                                                checked={
                                                                                    data.mother_sms_no_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        MotherSmsNo
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="secondary_email_checkbox_id"
                                                                                name="secondary_email_checkbox_id"
                                                                                checked={
                                                                                    data.secondary_email_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        SecondaryEmail
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="secondary_qualification_checkbox_id"
                                                                                name="secondary_qualification_checkbox_id"
                                                                                checked={
                                                                                    data.secondary_qualification_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        SecondaryQualification
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="secondary_company_checkbox_id"
                                                                                name="secondary_company_checkbox_id"
                                                                                checked={
                                                                                    data.secondary_company_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        SecondaryCompany
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="secondary_designation_checkbox_id"
                                                                                name="secondary_designation_checkbox_id"
                                                                                checked={
                                                                                    data.secondary_designation_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        SecondaryDesignation
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="guardian_name_checkbox_id"
                                                                                name="guardian_name_checkbox_id"
                                                                                checked={
                                                                                    data.guardian_name_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        GuardianName
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="guardian_relation_checkbox_id"
                                                                                name="guardian_relation_checkbox_id"
                                                                                checked={
                                                                                    data.guardian_relation_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        GuardianRelation
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="guardian_qualification_checkbox_id"
                                                                                name="guardian_qualification_checkbox_id"
                                                                                checked={
                                                                                    data.guardian_qualification_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        GuardianQualification
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="guardian_occupation_checkbox_id"
                                                                                name="guardian_occupation_checkbox_id"
                                                                                checked={
                                                                                    data.guardian_occupation_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        GuardianOccupation
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="guardian_designation_checkbox_id"
                                                                                name="guardian_designation_checkbox_id"
                                                                                checked={
                                                                                    data.guardian_designation_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        GuardianDesignation
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="guardian_department_checkbox_id"
                                                                                name="guardian_department_checkbox_id"
                                                                                checked={
                                                                                    data.guardian_department_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        GuardianDepartment
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="guardian_officeAddress_checkbox_id"
                                                                                name="guardian_officeAddress_checkbox_id"
                                                                                checked={
                                                                                    data.guardian_officeAddress_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        GuardianOfficeAddress
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="guardian_contact_no_checkbox_id"
                                                                                name="guardian_contact_no_checkbox_id"
                                                                                checked={
                                                                                    data.guardian_contact_no_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        GuardianContactNo
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="bank_name_checkbox_id"
                                                                                name="bank_name_checkbox_id"
                                                                                checked={
                                                                                    data.bank_name_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        BankName
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="bank_code_no_checkbox_id"
                                                                                name="bank_code_no_checkbox_id"
                                                                                checked={
                                                                                    data.bank_code_no_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        BankCodeNo
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="branch_name_checkbox_id"
                                                                                name="branch_name_checkbox_id"
                                                                                checked={
                                                                                    data.branch_name_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        BranchName
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="mtcr_checkbox_id"
                                                                                name="mtcr_checkbox_id"
                                                                                checked={
                                                                                    data.mtcr_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        MICR
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="ifsc_checkbox_id"
                                                                                name="ifsc_checkbox_id"
                                                                                checked={
                                                                                    data.ifsc_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        IFSC
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="account_number_checkbox_id"
                                                                                name="account_number_checkbox_id"
                                                                                checked={
                                                                                    data.account_number_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        AccountNumber
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="house_checkbox_id"
                                                                                name="house_checkbox_id"
                                                                                checked={
                                                                                    data.house_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        House
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="caste_checkbox_id"
                                                                                name="caste_checkbox_id"
                                                                                checked={
                                                                                    data.caste_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        Caste
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="father_aadhar_checkbox_id"
                                                                                name="father_aadhar_checkbox_id"
                                                                                checked={
                                                                                    data.father_aadhar_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        FatherAadhar
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="mother_aadhar_checkbox_id"
                                                                                name="mother_aadhar_checkbox_id"
                                                                                checked={
                                                                                    data.mother_aadhar_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        MotherAadhar
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="employment_category_checkbox_id"
                                                                                name="employment_category_checkbox_id"
                                                                                checked={
                                                                                    data.employment_category_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        EmploymentCategory
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="admission_class_checkbox_id"
                                                                                name="admission_class_checkbox_id"
                                                                                checked={
                                                                                    data.admission_class_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        AdmissionClass
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="student_height_checkbox_id"
                                                                                name="student_height_checkbox_id"
                                                                                checked={
                                                                                    data.student_height_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        StudentHeight
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="student_weight_checkbox_id"
                                                                                name="student_weight_checkbox_id"
                                                                                checked={
                                                                                    data.student_weight_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        StudentWeight
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <Checkbox
                                                                                id="samagra_id_checkbox_id"
                                                                                name="samagra_id_checkbox_id"
                                                                                checked={
                                                                                    data.samagra_id_checkbox_id
                                                                                }
                                                                                onChange={(e) => handleUpdateStudentCheckbox(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        SamagraId
                                                                    </td>
                                                                </tr>
                                                            </tbody> */}
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-6 maxLg:col-span-12">
                                            <div className="educare-card-title">
                                                <h5>
                                                    <i className="icon-ListBullets"></i>
                                                    Upload Student Data
                                                </h5>
                                            </div>
                                            <div className="col-span-6 bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-[20px]">
                                                <div className="student-import-data flex gap-5 items-end">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            value="Browse for the excel sheet:"
                                                        />
                                                        <div className="educare-input-type-file-styles">
                                                            <input
                                                                id="student_import_file"
                                                                ref={
                                                                    uploadStudentDocumentInput
                                                                }
                                                                type="file"
                                                                name="student_import_file"
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "student_import_file",
                                                                        e.target
                                                                            .files[0]
                                                                    )
                                                                }
                                                            />
                                                            {/* <InputError
                                                                message={
                                                                    errors.student_import_file
                                                                }
                                                                className="mt-2"
                                                            /> */}
                                                        </div>
                                                    </div>
                                                    <div className="text-end">
                                                        <PrimaryButton
                                                            type="submit"
                                                            className="educare-secondary-btn-md-fill"
                                                        >
                                                            Upload Excel
                                                        </PrimaryButton>
                                                    </div>
                                                </div>
                                                <InputError
                                                    message={
                                                        errors.student_import_file
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="import-note-box px-[20px] py-[10px] pb-[15px] min-h-[500px]">
                                                <div className="educare-import-note-content">
                                                    <strong className="block text-danger mb-2">Important Instructions:</strong>
                                                    <div className="educare-import-note-list mt-[10px]  mb-[15px]">
                                                        <ul>
                                                            <li>
                                                                <div
                                                                    className="flex"
                                                                >
                                                                    <span className="text-sm font-bold">
                                                                        1.
                                                                    </span>
                                                                    <span
                                                                        className="ml-0.5"
                                                                    >
                                                                        <span className="text-sm block font-bold">
                                                                            Template Integrity: Please do not modify the provided template.
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    className="flex"
                                                                >
                                                                    <span className="text-sm font-bold">
                                                                        2.
                                                                    </span>
                                                                    <span
                                                                        className="ml-0.5"
                                                                    >
                                                                        <span className="text-sm block font-bold">
                                                                            Data Format: Ensure the data is in the correct format to upload successfully.
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    className="flex"
                                                                >
                                                                    <span className="text-sm font-bold">
                                                                        3.
                                                                    </span>
                                                                    <span
                                                                        className="ml-0.5"
                                                                    >
                                                                        <span className="text-sm block font-bold">
                                                                            Mandatory Fields:
                                                                        </span>
                                                                        <span className="text-sm block">
                                                                            Select the Class and the desired field are required to download the template.
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    className="flex"
                                                                >
                                                                    <span className="text-sm font-bold">
                                                                        4.
                                                                    </span>
                                                                    <span
                                                                        className="ml-0.5"
                                                                    >
                                                                        <span className="text-sm block font-bold">
                                                                            Date Format:
                                                                        </span>
                                                                        <span className="text-sm block">
                                                                            Dates must be in the DD/MM/YYYY format using separators (/, -, or .).
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    className="flex"
                                                                >
                                                                    <span className="text-sm font-bold">
                                                                        5.
                                                                    </span>
                                                                    <span
                                                                        className="ml-0.5"
                                                                    >
                                                                        <span className="text-sm block font-bold">
                                                                            Status:
                                                                        </span>
                                                                        <span className="text-sm block">
                                                                            Enter 0 for new students and 1 for promoted students.
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    className="flex"
                                                                >
                                                                    <span className="text-sm font-bold">
                                                                        6.
                                                                    </span>
                                                                    <span
                                                                        className="ml-0.5"
                                                                    >
                                                                        <span className="text-sm block font-bold">
                                                                            Gender:
                                                                        </span>
                                                                        <span className="text-sm block">
                                                                            Enter 1 for male, 2 for female, and 3 for other.
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    className="flex"
                                                                >
                                                                    <span className="text-sm font-bold">
                                                                        7.
                                                                    </span>
                                                                    <span
                                                                        className="ml-0.5"
                                                                    >
                                                                        <span className="text-sm block font-bold">
                                                                            Student Type:
                                                                        </span>
                                                                        <span className="text-sm block">
                                                                            Enter 1 for day scholar and 2 for hosteller. If not specified, the student will be considered as a day scholar.
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    className="flex"
                                                                >
                                                                    <span className="text-sm font-bold">
                                                                        8.
                                                                    </span>
                                                                    <span
                                                                        className="ml-0.5"
                                                                    >
                                                                        <span className="text-sm block font-bold">
                                                                            Do Not Modify:
                                                                        </span>
                                                                        <span className="text-sm block">
                                                                            Do not change or remove the columns for StudentId, Class, and Section in the template.
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
