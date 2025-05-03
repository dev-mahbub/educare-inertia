import Checkbox from '@/Components/Checkbox';
import TextInput from '@/Components/TextInput';
import { Tooltip } from "@mui/material";
import { useEffect, useState } from 'react';

const AlumniCredentialList = ({
    alumnies,
    data,
    setData
}) => {
    const [checkedData, setCheckedData] = useState([]);
    const [alumniData, setAlumniData] = useState(alumnies);

    useEffect(() => {
        setAlumniData(alumnies?.filter(item => item?.title?.toLowerCase()?.includes(data?.search?.toLowerCase()?.trim())));
    }, [alumnies, data?.search]);

    // Handle checkbox selection start
    const handleAlumniSelect = (name, value, id) => {
        let newFormData = { ...data };
        let newCheckedIds = [...data.selected_ids];

        if (name === "select_all") {
            newFormData.select_all = value;

            if (value) {
                newCheckedIds = alumnies.map(item => item.id);
            } else {
                newCheckedIds = [];
            }

            newFormData.selected_ids = newCheckedIds;
        } else {
            if (value) {
                newCheckedIds.push(id);
            } else {
                newCheckedIds = newCheckedIds.filter(checkedId => checkedId !== id);
            }

            newFormData.selected_ids = newCheckedIds;
            newFormData.select_all = newCheckedIds.length === alumnies.length;
        }

        const newCheckedData = alumnies.filter(item => newCheckedIds.includes(item.id));

        setData(newFormData);
        setCheckedData(newCheckedData);
    };
    // Handle checkbox selection start

    // handle remove selected item start
    const handleRemoveSelectedItem = (id) => {
        let selectedIds = [...data.selected_ids];

        setData((prevData) => ({
            ...prevData,
            select_all: false,
            selected_ids: selectedIds?.filter(selectedId => selectedId != id)
        }));

        setCheckedData(checkedData?.filter(item => item?.id != id));
    }
    // handle remove selected item end

    return (
        <>

            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 lg:col-span-6">
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
                                    placeHolder="Enter Search Text..."
                                />
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto table-body-dark">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            name="select_all"
                                                            checked={data.select_all || false}
                                                            onChange={(e) =>
                                                                handleAlumniSelect(e.target.name, e.target.checked)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </th>
                                            <th>All Alumnies</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {alumniData.length > 0 ? (
                                            alumniData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    name={"alumni_" + item.id}
                                                                    checked={data.selected_ids.includes(item.id)}
                                                                    onChange={(e) =>
                                                                        handleAlumniSelect(e.target.name, e.target.checked, item.id)
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{item?.title}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={2} className="text-center">Data not found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            {/* <span className='text-headingLight'>s=</span> */}
                            <div>
                                <span className='text-headingLight font-medium'>{checkedData.length} Alumni selected</span>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto table-body-dark">
                                <table>
                                    <tbody>
                                        {checkedData.length > 0 ? (
                                            checkedData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.class}</td>
                                                    <td>
                                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                            <div>
                                                                <Tooltip title="Delete" placement="top" arrow>
                                                                    <button
                                                                        className="educare-danger-btn-sm-fill"
                                                                        type="button"
                                                                        onClick={() => {
                                                                            handleRemoveSelectedItem(item?.id)
                                                                        }}
                                                                    >
                                                                        <i className="icon-TrashSimple"></i>
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <></>
                                        )}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AlumniCredentialList;
