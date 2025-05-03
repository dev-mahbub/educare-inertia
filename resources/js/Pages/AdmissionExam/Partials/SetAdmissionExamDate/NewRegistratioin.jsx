import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";

const NewRegistratioin = ({
    registrations,
    selectedEnquiryIds,
    setSelectedEnquiryIds
}) => {

    const [selectAllEnquiryChecked, setSelectAllEnquiryChecked] = useState(false);

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

    const filteredRegistrations = useMemo(() => {
        const filterText = data?.search?.toLowerCase()?.trim();

        return registrations?.filter((item) => {
            const studentName = (item?.first_name+" "+item?.middle_name+" "+item?.last_name)?.toLowerCase();
            const fatherName = (item?.father_first_name+" "+item?.father_middle_name+" "+item?.father_last_name)?.toLowerCase();
            const fatherMobile = item?.father_mobile?.toLowerCase();
            const registrationNo = item?.registration_no?.toLowerCase();
            const testDate = item?.test_date?.toLowerCase();
            const testTime = item?.test_time?.toLowerCase();

            return (
                studentName?.includes(filterText) ||
                fatherName?.includes(filterText) ||
                fatherMobile?.includes(filterText) ||
                registrationNo?.includes(filterText) ||
                testDate?.includes(filterText) ||
                testTime?.includes(filterText)
            );
        })
    }, [registrations, data?.search]);

    useEffect(() => {
        if (selectedEnquiryIds?.length <= 0) {
            setSelectAllEnquiryChecked(false)
        }
        else {
            setSelectAllEnquiryChecked(selectedEnquiryIds?.length === registrations?.length)
        }
    }, [registrations, selectedEnquiryIds]);


    const handleCheckboxSelect = (name, value) => {
        if (name === "select_all_enquiry") {
            if (value === true) {
                setSelectedEnquiryIds(registrations.map((item) => item.id))
            }
            else {
                setSelectedEnquiryIds([])
            }

            setSelectAllEnquiryChecked(value);
        }
    };

    const setSelectedEnquiryId = (id) => {
        if ([...selectedEnquiryIds]?.includes(id)) {
            setSelectedEnquiryIds([...selectedEnquiryIds].filter((item) => item !== id));
        }
        else {
            setSelectedEnquiryIds([
                ...selectedEnquiryIds,
                id,
            ]);
        }
    };


    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="flex justify-between flex-wrap  items-center mb-2.5">
                        <div className="educare-card-title">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                New Registration
                            </h5>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: {filteredRegistrations?.length}</span>
                            </div>
                            <div className="educare-input-field-styles">
                                <TextInput
                                    value={
                                        data.search
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "search",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                    placeHolder="Type to search"
                                />
                                <InputError
                                    message={
                                        errors.search
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>

                                    <tr>
                                        <th>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        name="select_all_enquiry"
                                                        checked={
                                                           selectAllEnquiryChecked
                                                        }
                                                        onChange={(e) =>
                                                            handleCheckboxSelect(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </th>
                                        <th>Name</th>
                                        <th>Father Name</th>
                                        <th>Mobile</th>
                                        <th>Reg. No</th>
                                        <th>Test Date</th>
                                        <th>Test Time</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {filteredRegistrations?.length > 0 ?
                                        filteredRegistrations.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            name="enquiry_id"
                                                            checked={
                                                                selectedEnquiryIds.includes(item?.id)
                                                            }
                                                            onChange={(e) => {
                                                                    setSelectedEnquiryId(item?.id);
                                                                }
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{item?.first_name} {item?.middle_name} {item?.last_name}</td>
                                            <td>{item?.father_first_name} {item?.father_middle_name} {item?.father_last_name}</td>
                                            <td>{item?.father_mobile}</td>
                                            <td>{item?.registration_no}</td>
                                            <td>{item?.test_date}</td>
                                            <td>{item?.test_time}</td>
                                        </tr>
                                    ))
                                :
                                    <tr>
                                        <td className = "text-center text-red-500" colSpan = "7">
                                            Data not found
                                        </td>
                                    </tr>
                                }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewRegistratioin;
