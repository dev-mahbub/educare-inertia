import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import Loader from "@/Components/Loader";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { concatName } from '@/Hooks/GlobalFunction';
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentTeacherLedgerTableAndFilter = ({
    classrooms,
    stuTeaTypeArr,
    dataList,
}) => {

    const [loading, setLoading] = useState(false);
    const [dataListData, setDataListData] = useState(dataList);

    const {
        data,
        setData,
        post,
        errors
    } = useForm({
        ledger_type: "",
        classroom_id: "",
        search_value: "",
        selected_ids: [],
        selected_all: "",
    });

    useEffect(() => {
        setDataListData(dataList);
        setLoading(false);
    }, [dataList]);

    const handleFilter = (e) => {
        e.preventDefault();

        if (data?.ledger_type == '') {
            toast.error("Please select type!", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else if (data?.ledger_type == 'Student' && data?.classroom_id == '') {
            toast.error("Please select class!", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            setData({
                ...data,
                selected_ids: [],
                selected_all: "",
            });

            setDataListData([]);

            router.post(route('student_teacher_ledger.list'), data);

            setLoading(false);
        }
    }


    // student
    const handleSearch = (e, value) => {
        e.preventDefault();

        setData((prevData) => ({
            ...prevData,
            search_value: value
        }));

        const searchData = dataList.filter(item =>
            concatName(item?.first_name, item?.middle_name, item?.last_name).toLowerCase().includes(value?.toLowerCase()) ||
            item?.phone?.toLowerCase()?.includes(value?.toLowerCase())
        );

        setDataListData(searchData);
    };

    const handleCheckbox = (id) => {
        const isSelected = data.selected_ids.some((selected_id) => selected_id === id);
        const updatedSelectedData = isSelected
            ? data.selected_ids.filter((selected_id) => selected_id !== id)
            : [...data.selected_ids, id];

        setData((prevData) => ({
            ...prevData,
            selected_ids: updatedSelectedData,
            selected_all: updatedSelectedData?.length == dataListData?.filter(item => item?.ledger == null)?.length
        }));
    }

    const handleAll = (isChecked) => {
        if (isChecked) {
            const updatedSelectedData = dataListData?.filter(item => item?.ledger == null)?.map((item) => item.id);

            setData((prevData) => ({
                ...prevData,
                selected_ids: updatedSelectedData,
                selected_all: dataListData?.filter(item => item?.ledger == null)?.length > 0 && updatedSelectedData?.length == dataListData?.filter(item => item?.ledger == null)?.length
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                selected_ids: [],
                selected_all: false
            }));
        }
    };

    // handle change ledger type start
    const handleChangeLedgerType = (value) => {
        setData((prevData) => ({
            ...prevData,
            selected_ids: [],
            classroom_id: "",
            ledger_type: value,
            selected_all: false,
            search_value: ""
        }));

        setDataListData([]);
    }
    // handle change ledger type end

    // handle sync ledger start
    const handleSyncLedger = (e) => {
        e.preventDefault();

        if (data?.ledger_type == '') {
            toast.error("Please select type!", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else if(data?.selected_ids?.length == 0) {
            toast.error("Please select atleast one!", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            post(route('student_teacher_ledger.save'), {
                onSuccess: () => {
                    setData({
                        ...data,
                        selected_ids: [],
                        selected_all: "",
                        search_value: ""
                    });

                    router.post(route('student_teacher_ledger.list'), data);
                },
                onError: (errors) => {
                    for (const key in errors) {
                        if (['ledger_type', 'selected_ids']?.includes(key)) {
                            toast.error(errors[key], {
                                position: 'top-right',
                                autoClose: 1500,
                            });

                            break;
                        }
                    }

                    router.post(route('student_teacher_ledger.list'), data);
                }
            });
        }
    }
    // handle sync ledger end


    //scrollable filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollable filter bar end here


    return (
        <>
            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Make Ledger
                </h5>
            </div>
            <div className="educare-header-filtar-bar-area z-[4] relative mb-2.5">
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form>
                            <div className=" educare-header-filtar-bar-inner-main">
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <span>Total: {dataListData?.length}</span>
                                </div>
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span
                                            className="educare-header-filter-prev"
                                            onClick={handlePrevClick}
                                        >
                                            <i className="icon-left-chevron"></i>
                                        </span>
                                        <div
                                            className="educare-header-filtar-bar-fields-wrap"
                                            ref={listRef}
                                            style={{
                                                transform: `translateX(-${currentIndex * 120
                                                    }px)`,
                                            }}
                                        >
                                            {/* Replace changeable inputs */}
                                            {data?.ledger_type && <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="search_value"
                                                    value={data.search_value}
                                                    onChange={(e) => handleSearch(e, e.target.value)}
                                                    placeHolder="Search"
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.search_value}
                                                    className="mt-2"
                                                />
                                            </div>}


                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="ledger_type"
                                                    data_label="Ledger"
                                                    data={stuTeaTypeArr}
                                                    value={data.ledger_type}
                                                    onChange={(e) =>
                                                        handleChangeLedgerType(e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.ledger_type
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>

                                            {data.ledger_type ===
                                                "Student" && (
                                                    <>
                                                        <div className="educare-select-field-styles">
                                                            <SelectInput
                                                                id="classroom_id"
                                                                data_label=" Class"
                                                                data={classrooms}
                                                                value={
                                                                    data.classroom_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "classroom_id",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                type="text"
                                                                className="block"
                                                            />
                                                        </div>
                                                    </>
                                                )}

                                            {/* Replace changeable inputs */}
                                        </div>
                                        <span
                                            className="educare-header-filter-next"
                                            onClick={handleNextClick}
                                        >
                                            <i className="icon-chevron"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                    {/* Replace changable buttons */}
                                    <div>
                                        <Tooltip
                                            title="Search"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <button
                                                className="educare-secondary-btn-md-fill"
                                                type="button"
                                                onClick={(e) => handleFilter(e)}
                                            >
                                                <i className="icon-search-interface-symbol"></i>
                                            </button>
                                        </Tooltip>
                                    </div>

                                    {dataListData?.length > 0 &&
                                        <div>
                                            <Tooltip
                                                title="Sync Ledger"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <button
                                                    type="button"
                                                    className="educare-primary-btn-md-fill"
                                                    onClick={handleSyncLedger}
                                                >
                                                    Sync To Ledger
                                                </button>
                                            </Tooltip>
                                        </div>
                                    }

                                    {/* Replace changable buttons */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="selected_all"
                                            name="selected_all"
                                            onChange={(e) => handleAll(e.target.checked)}
                                            checked={data.selected_all}
                                        />
                                    </div>
                                </div>
                            </th>
                            {(data?.ledger_type === 'Student' || data?.ledger_type === 'RegistrationForStudents') &&
                                <>
                                    <th>Roll No.</th>
                                    <th>Admission No.</th>
                                </>
                            }
                            <th>Name</th>
                            <th>Mobile No</th>
                        </tr>
                    </thead>
                    {loading ? (
                        <Loader></Loader>
                    ) : (
                        <tbody>
                            {dataListData?.length > 0 ? (
                                dataListData?.map((item, index) =>
                                (
                                    <tr key={index} className={`${item?.ledger != null ? 'bg-success' : ''}`}>
                                        <td>
                                            {item?.ledger == null &&
                                                <div className="educare-create-school-settings-list-check min-width-full">
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id={`name_${index}`}
                                                                name={`name_${index}`}
                                                                onChange={() => handleCheckbox(item?.id)}
                                                                checked={data.selected_ids.some(id => id === item.id)}
                                                            />
                                                        </div>
                                                        {/* <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor={`name_${index}`}
                                                                value={item?.first_name}
                                                            />
                                                        </div> */}
                                                    </div>
                                                </div>
                                            }
                                        </td>
                                        {(data?.ledger_type === 'Student' || data?.ledger_type === 'RegistrationForStudents') &&
                                            <>
                                                <td>{item?.classroom_roll?.roll_no}</td>
                                                <td>{item?.admission_no}</td>
                                            </>
                                        }
                                        <td>{concatName(item?.first_name, item?.middle_name, item?.last_name)}</td>
                                        <td>{item?.phone}</td>
                                    </tr>
                                )
                                )
                            ) : (
                                <tr>
                                    <td className="text-center text-red-500" colSpan="12">
                                        Data not found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    )}
                </table>
            </div>
        </>
    );
};

export default StudentTeacherLedgerTableAndFilter;
