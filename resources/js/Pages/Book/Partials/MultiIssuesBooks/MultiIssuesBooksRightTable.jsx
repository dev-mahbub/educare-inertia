import { useForm } from "@inertiajs/react";
import React from "react";
import TextInput from "../../../../Components/TextInput"
import InputError from "../../../../Components/InputError"
import Checkbox from "../../../../Components/Checkbox"
import DatePicker from "react-datepicker";
import PrimaryButton from "../../../../Components/PrimaryButton"
import InputLabel from "../../../../Components/InputLabel"

const MultiIssuesBooksRightTable = () => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        note_optional_id: "",
        note_optional_id_tow: "",
        return_checkbox_1: "",
        return_checkbox_2: "",
        late_fine: "",
        return_selected_date: new Date(),
        allocate_date: new Date(),
        issued_for_day: "",
        issue_select_check: "",
    });

    const handleIssueTableData = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <form onSubmit={handleIssueTableData}>
                <div className="educare-card-title mr-auto pb-none mb-2.5">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Already Issued Books
                    </h5>
                </div>
                {/* table one  */}
                <div className="educare-admission-list-inner-wrapper">
                    <div className="educare-admission-list pb-none">
                        <table>
                            <thead>
                                <tr>
                                    <th>Accno</th>
                                    <th>Book Title</th>
                                    <th>Issued Date</th>
                                    <th>Due Date</th>
                                    <th>Returned on</th>
                                    <th>Note</th>
                                    <th>Return</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>N2023-2024:43</td>
                                    <td>Book Title 3</td>
                                    <td>26 Jan 2024</td>
                                    <td>28 Jan 2024</td>
                                    <td>Test</td>
                                    <td>
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                value={
                                                    data.note_optional_id
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "note_optional_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                                placeHolder="Note (Optional)"
                                            />
                                            <InputError
                                                message={
                                                    errors.note_optional_id
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="educare-checkbox-field-styles">
                                            <Checkbox
                                                name="return_checkbox_1"
                                                checked={
                                                    data.return_checkbox_1
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "return_checkbox_1",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>N2023-2024:45</td>
                                    <td>Book Title 3</td>
                                    <td>26 Jan 2024</td>
                                    <td>28 Jan 2024</td>
                                    <td>Test</td>
                                    <td>
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                value={
                                                    data.note_optional_id_tow
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "note_optional_id_tow",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                                placeHolder="Note (Optional)"
                                            />
                                            <InputError
                                                message={
                                                    errors.note_optional_id_tow
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="educare-checkbox-field-styles">
                                            <Checkbox
                                                name="return_checkbox_2"
                                                checked={
                                                    data.return_checkbox_2
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "return_checkbox_2",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* here will be filter  */}
                <div className="flex flex-wrap gap-5 justify-end mt-5">
                    <div className="educare-input-field-styles max-w-[250px]">
                        <TextInput
                            value={
                                data.late_fine
                            }
                            onChange={(e) =>
                                setData(
                                    "late_fine",
                                    e.target.value
                                )
                            }
                            className="block"
                            placeHolder="Late fine"
                        />
                        <InputError
                            message={
                                errors.late_fine
                            }
                            className="mt-2"
                        />
                    </div>
                    <div className="educare-input-field-styles max-w-[250px]">
                        <DatePicker
                            selected={
                                data?.return_selected_date && new Date(data?.return_selected_date)
                            }
                            onChange={(date) =>
                                setData("return_selected_date", date)
                            }
                            showYearDropdown
                            showMonthDropdown
                            useShortMonthInDropdown
                            showPopperArrow={false}
                            peekNextMonth
                            dropdownMode="select"
                            isClearable
                            dateFormat="dd/MM/yyyy"
                            placeholderText="11-Mar-2024"
                            className="w-full"
                        />
                    </div>
                    <PrimaryButton
                        // disabled={processing}
                        className="educare-secondary-btn-md-fill"
                    >
                        Return Selected Book
                    </PrimaryButton>
                </div>
                {/* end here will be filter  */}

                {/* table two */}
                <div className="educare-card-title mr-auto pb-none mt-5 mb-2.5">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Added book to issue
                    </h5>
                </div>
                <div className="educare-admission-list-inner-wrapper ">
                    <div className="educare-admission-list pb-none">
                        <table>
                            <thead>
                                <tr>
                                    <th>Accno</th>
                                    <th>Is Available ?</th>
                                    <th>Is Allocated ?</th>
                                    <th>Issue Day</th>
                                    <th>Issue</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>N2023-2024:21</td>
                                    <td>
                                        <span className="badge warning">Issued</span>
                                    </td>
                                    <td>Yes</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>N2023-2024:22</td>
                                    <td>
                                        <span className="badge warning">Issued</span>
                                    </td>
                                    <td>Yes</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>N2023-2024:23</td>
                                    <td>
                                        <span className="badge success">Available</span>
                                    </td>
                                    <td>No</td>
                                    <td>
                                        <div className="educare-input-field-styles max-w-[150px]">
                                            <TextInput
                                                value={
                                                    data.issued_for_day
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "issued_for_day",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                                placeHolder="Issued for Day"
                                            />
                                            <InputError
                                                message={
                                                    errors.issued_for_day
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="issue_select_check"
                                                    name="issue_select_check"
                                                    checked={
                                                        data.issue_select_check
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "issue_select_check",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor="issue_select_check"
                                                    value="Select"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex flex-wrap gap-5 justify-end mt-5">
                    <div className="educare-input-field-styles max-w-[250px]">
                        <DatePicker
                            selected={
                                data?.allocate_date && new Date(data?.allocate_date)
                            }
                            onChange={(date) =>
                                setData("allocate_date", date)
                            }
                            showYearDropdown
                            showMonthDropdown
                            useShortMonthInDropdown
                            showPopperArrow={false}
                            peekNextMonth
                            dropdownMode="select"
                            isClearable
                            dateFormat="dd/MM/yyyy"
                            placeholderText="11-Mar-2024"
                            className="w-full"
                        />
                    </div>
                    <PrimaryButton
                        // disabled={processing}
                        className="educare-primary-btn-md-fill"
                    >
                        Allocate Book
                    </PrimaryButton>
                    <PrimaryButton
                        // disabled={processing}
                        className="educare-gray-btn-md-stroke"
                    >
                        Reset
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
};

export default MultiIssuesBooksRightTable;
