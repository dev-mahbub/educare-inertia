import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

const GuardianFilter = ({
    guardians = [],
    setGuardiansData
}) => {

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
        search_input: "",
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            search_input: filterText
        }));
    }, [filterText]);

    // filter guardians data start
    const filteredGuardians = useMemo(() => {
        return Object.values(guardians)?.filter((item) => {
            const inputText = filterText?.toLowerCase().trim();

            const guardianId = item?.guardianid?.toLowerCase();
            const guardianName = item?.guardian_name?.toLowerCase();
            const guardianPhone = item?.guardian_phone?.toLowerCase();
            const guardianEmail = item?.guardian_email?.toLowerCase();

            return (
                (guardianId && guardianId.includes(inputText)) ||
                (guardianName && guardianName.includes(inputText)) ||
                (guardianPhone && guardianPhone.includes(inputText)) ||
                (guardianEmail && guardianEmail.includes(inputText)) ||
                (
                    Object.values(item?.student_data)?.some(student => student?.name?.toLowerCase().includes(inputText)) ||
                    Object.values(item?.student_data)?.some(student => String(student?.admission_no).toLowerCase().includes(inputText)) ||
                    Object.values(item?.student_data)?.some(student => student?.roll_no?.toLowerCase().includes(inputText)) ||
                    Object.values(item?.student_data)?.some(student => String(student?.classroom_title).toLowerCase().includes(inputText)) ||
                    Object.values(item?.student_data)?.some(student => student?.father_name?.toLowerCase().includes(inputText)) ||
                    Object.values(item?.student_data)?.some(student => String(student?.father_email).toLowerCase().includes(inputText)) ||
                    Object.values(item?.student_data)?.some(student => String(student?.father_phone).toLowerCase().includes(inputText))
                )
            );
        });
    }, [guardians, filterText]);

    useEffect(() => {
        setGuardiansData(filteredGuardians);
    }, [filteredGuardians]);
    // filter guardians data end


    const headerTopData = (e) => {
        e.preventDefault();
    };

    // handle reset start
    const handleReset = () => {
        setFilterText("");
        reset();
    };
    // handle reset end

    return (
        <form onSubmit={headerTopData} className="mb-2.5">
            <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                <div className="educare-card-title pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Guardian Report
                    </h5>
                </div>
                <div className="flex flex-wrap gap-2.5 items-center">
                    <div>
                        <span className="min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA">
                            Total : {Object.keys(filteredGuardians)?.length}
                        </span>
                    </div>
                    <div className="educare-input-field-styles">
                        <TextInput
                            id="search_input"
                            value={data.search_input}
                            onChange={(e) =>
                                setFilterText(e.target.value)
                            }
                            placeHolder="Search here"
                            className="block"
                        />
                        <InputError
                            message={errors.search_input}
                            className="mt-2"
                        />
                    </div>
                    <div className="educare-filter-action-btn flex flex-wrap gap-2">
                        {/* <div>
                            <Tooltip
                                title="Search"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <Link
                                    href="#"
                                    className="educare-secondary-btn-md-fill"
                                >
                                    <i className="icon-search-interface-symbol"></i>
                                </Link>
                            </Tooltip>
                        </div> */}

                        <div>
                            <Tooltip
                                title="Reset"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <button
                                    type="button"
                                    className="educare-gray-btn-md-fill"
                                    onClick={(e) => {
                                        handleReset();
                                    }}
                                >
                                    <i className="icon-ArrowsClockwise"></i>
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default GuardianFilter;
