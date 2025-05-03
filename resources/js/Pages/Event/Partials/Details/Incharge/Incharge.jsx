import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm } from '@inertiajs/react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CheckboxA from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Incharge = ({
    staffRoles,
    eventData,
    classGroups,
    staffs
}) => {

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const [filteredStaffs, setFilteredStaffs] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedStaffs, setSelectedStaffs] = useState(eventData?.staffs ?? []);
    const [staffIds, setStaffIds] = useState([]);
    const [tempStaffIds, setTempStaffIds] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        event_id: eventData?.id ?? "",
        role_type: "",
        class_group: "",
        staffs: [],
    });

    useEffect(() => {
        setStaffIds(selectedStaffs?.map(item => item?.id));
    }, [selectedStaffs]);

    useEffect(() => {
        setTempStaffIds(selectedOptions?.map(item => item?.id));
    }, [selectedOptions]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            staffs: staffIds
        }));
    }, [staffIds]);

    // handle change role start
    const handleChangeRole = (e) => {
        const role_type = e.target.value;

        setData((prevData) => ({
            ...prevData,
            role_type: role_type
        }));

        setFilteredStaffs(staffs?.filter(item => item?.user_roll_type == role_type));
    }
    // handle change role end

    //remove staff data
    const removeIncharge = (staffIndex) => {
        const newData = [...selectedStaffs];

        const selectedStaff = selectedStaffs[staffIndex];

        newData.splice(staffIndex, 1);

        const newOptions = selectedOptions?.filter(item => item?.id != selectedStaff?.id);

        setSelectedOptions(newOptions);
        setSelectedStaffs(newData);
    }

    // handle select staff start
    const handleSelectStaff = (event, value) => {
        setSelectedOptions(value);
    };
    // handle select staff end


    // handle add staff start
    const handleAddStaff = (e) => {
        e.preventDefault();

        if (selectedOptions?.length == 0) {
            toast.error("Please select at least one incharge to add for Event.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            const currentStaffs = [...selectedStaffs];
            const currentStaffIds = currentStaffs?.map(item => item?.id);
            const newStaffs = selectedOptions?.filter(item => !currentStaffIds?.includes(item?.id));

            setSelectedStaffs([...currentStaffs, ...newStaffs]);
        }
    };
    // handle add staff end

    // handle save event staff data start
    const handleSaveEventStaffData = (e) => {
        e.preventDefault();

        if (staffIds?.length == 0) {
            toast.error("Please select at least one incharge to add for Event.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            post(route('event.incharge.save', eventData?.id))
        }
    }
    // handle save event staff data end

    const handleInchargeData = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className='educare-event-create-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70'>
                <div className="incharge-event-wrapper flex mb-4 ">
                    <p className='mr-4'>InCharge of events : </p>
                    <div className='flex flex-wrap gap-2'>
                        {selectedStaffs.length > 0 &&
                            selectedStaffs.map((item, index) => (
                                <div key={index}>
                                    <div className=' bg-border px-2 py-1 rounded-md flex items-center text-heading'>
                                        <span>{item?.title}</span>
                                        <i
                                            className='icon-XCircle items-center ml-1 text-[18px] text-white cursor-pointer'
                                            onClick={() => removeIncharge(index)}
                                        >
                                        </i>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="educare-input-field-styles bg-danger/10 py-2 px-4 my-2 flex items-center mb-5">
                    <i className='icon-info mr-2'></i>
                    <span>Please select InCharge for this event and click on "Add InCharge" button .</span>
                </div>
                <form onSubmit={handleInchargeData}>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    value="Teacher Role"
                                />
                                <SelectInput
                                    data_label="Role"
                                    data={staffRoles}
                                    value={
                                        data.role_type
                                    }
                                    onChange={(e) =>
                                        handleChangeRole(e)
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.role_type
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    value="Class Group"
                                />
                                <SelectInput
                                    data_label="Class Group"
                                    data={classGroups}
                                    value={
                                        data.class_group
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "class_group",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.class_group
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        {data?.role_type != "" &&
                            <div className="col-span-12">
                                <div
                                    className="flex items-center"
                                >
                                    <div className="educare-input-type-file-styles w-full">
                                        <Autocomplete
                                            multiple
                                            id="checkboxes-tags-demo"
                                            options={filteredStaffs}
                                            value={selectedOptions}
                                            onChange={handleSelectStaff}
                                            disableCloseOnSelect
                                            getOptionLabel={(option) => option.title}
                                            renderOption={(props, option, { selected }) => (
                                                <li {...props}>
                                                    <CheckboxA
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={tempStaffIds?.includes(option.id)}
                                                    />
                                                    {option.title}
                                                </li>
                                            )}
                                            renderInput={(params) => (
                                                <TextField {...params} placeholder="Enter Search Text" />
                                            )}
                                        />
                                    </div>
                                    <div className="educare-button-field-styles w-[170px] ml-1">
                                        <PrimaryButton
                                            className="educare-primary-btn-md-fill !bg-info"
                                            type="button"
                                            onClick={(e) => {
                                                handleAddStaff(e)
                                            }}
                                        >
                                            Add Incharge
                                        </PrimaryButton>
                                    </div>

                                </div>
                            </div>
                        }
                    </div>
                </form>
                <div className="col-span-12 mt-5">
                    <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                        <Link
                            className="educare-gray-btn-lg-stroke"
                            href={route('event.list')}
                        >
                            Cancel
                        </Link>
                        <PrimaryButton
                            className="educare-primary-btn-lg-fill"
                            type="button"
                            onClick={(e) => {
                                handleSaveEventStaffData(e)
                            }}
                        >
                            Save
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Incharge;
