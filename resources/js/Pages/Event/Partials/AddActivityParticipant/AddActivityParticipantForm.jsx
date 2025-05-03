import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from '@/Components/SelectInput';
import { Transition } from "@headlessui/react";
import { Link, router, useForm } from '@inertiajs/react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CheckboxA from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddActivityParticipantForm = ({
    eventData,
    eventActivity,
    classrooms,
    houses,
    students
}) => {
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [participantsData, setParticipantsData] = useState(eventActivity?.participants ?? []);
    const [tempStudentIds, setTempStudentIds] = useState([]);

    const {
        data,
        setData,
        errors,
        put,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        event_id: eventData?.id ?? "",
        classroom_id: "",
        house_id: "",
        participants: [],
    });

    useEffect(() => {
        setTempStudentIds(selectedOptions?.map(item => item?.id));
    }, [selectedOptions]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            participants: participantsData
        }));
    }, [participantsData]);

    // handle change classroom start
    const handleChangeClassroom = (e) => {
        const classroom_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            classroom_id: classroom_id
        }));

        const form_data = {
            classroom_id: classroom_id,
            house_id: data?.house_id
        }

        router.post(route('event.activity.add_participant', {eventId: eventData?.id, activityId: eventActivity?.id}), form_data);

        setSelectedOptions([]);
    }
    // handle change classroom end

    // handle change house start
    const handleChangeHouse = (e) => {
        const house_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            house_id: house_id
        }));

        const form_data = {
            classroom_id: data?.classroom_id,
            house_id: house_id
        }

        router.post(route('event.activity.add_participant', {eventId: eventData?.id, activityId: eventActivity?.id}), form_data);

        setSelectedOptions([]);
    }
    // handle change house end

    //remove student data start
    const removeParticipant = (index) => {
        const newData = [...participantsData];

        const selectedParticipant = participantsData[index];

        if (selectedParticipant?.is_winner != true) {
            newData.splice(index, 1);

            const newOptions = selectedOptions?.filter(item => item?.id != selectedParticipant?.student_id);

            setSelectedOptions(newOptions);
            setParticipantsData(newData);
        } else {
            toast.error("Participant cannot be removed.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
    }
    //remove student data end

    // handle select staff start
    const handleSelectStudent = (event, value) => {
        setSelectedOptions(value);
    };
    // handle select staff end

    // handle add participant start
    const handleAddParticipant = (e) => {
        e.preventDefault();

        if (selectedOptions?.length == 0) {
            toast.error("Please select at least one participant to add for Event.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            const currentParticipants = [...participantsData];
            const currentParticipantIds = currentParticipants?.map(item => item?.student_id);
            const newParticipants = selectedOptions?.filter(item => !currentParticipantIds?.includes(item?.id))?.map(item => ({
                student_id: item?.id,
                is_winner: false,
                title: item?.title
            }));

            setParticipantsData([...currentParticipants, ...newParticipants]);
        }
    };
    // handle add staff end

    // handle save event activity participant start
    const handleSaveEventActivityParticipant = (e) => {
        e.preventDefault();

        if (participantsData?.length == 0) {
            toast.error("Please select at least one participant to add for Event.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }  else {
            post(route('event.activity.save_participant', { eventId: eventData?.id, activityId: eventActivity?.id }))
        }
    }
    // handle save event activity participant end

    const dummyData = (e) => {
        e.preventDefault();
    };

    return (
        <div className="educare-event-create-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <form onSubmit={dummyData}>
                <div className="grid grid-cols-12 gap-5 items-center">
                    <div className="col-span-12">
                        <div className="educare-input-field-styles flex items-center">
                            <div
                                className="mr-2"
                            >
                                <InputLabel
                                    className="!mb-0"
                                    htmlFor="title"
                                    value="Event Title:"
                                />
                            </div>
                            <h3
                                className="font-bold text-[23px]"
                            >
                                {eventData?.title}
                            </h3>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="educare-input-field-styles flex items-center">
                            <div
                                className="mr-2"
                            >
                                <InputLabel
                                    className="!mb-0"
                                    htmlFor="title"
                                    value="Activity Title:"
                                />
                            </div>
                            <h3
                                className="font-bold text-[23px]"
                            >
                                {eventActivity?.title}
                            </h3>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="incharge-event-wrapper flex mb-4">
                            <p className='mr-4'>Participants : </p>
                            <div className='flex flex-wrap gap-2'>
                                {participantsData?.length > 0 &&
                                    participantsData?.map((item, index) => (
                                        <div key={index}>
                                            <div className=' bg-border px-2 py-1 rounded-md flex items-center text-heading'>
                                                <span>{item?.title}</span>
                                                <i
                                                    className='icon-XCircle items-center ml-1 text-[18px] text-white cursor-pointer'
                                                    onClick={() => removeParticipant(index)}
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
                            <span>Please select students for this event and click on "Add Participants" button .</span>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <InputLabel
                                value="Class"
                            />
                            <SelectInput
                                data_label="Class"
                                data={classrooms}
                                value={
                                    data.classroom_id
                                }
                                onChange={(e) =>
                                    handleChangeClassroom(e)
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.classroom_id
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <InputLabel
                                value="House"
                            />
                            <SelectInput
                                data_label="House"
                                data={houses}
                                value={
                                    data.house_id
                                }
                                onChange={(e) =>
                                    handleChangeHouse(e)
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.house_id
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                    {data?.classroom_id != "" &&
                        <div className="col-span-12">
                            <div
                                className="flex items-center"
                            >
                                <div className="educare-input-type-file-styles w-full">
                                    <Autocomplete
                                        multiple
                                        id="checkboxes-tags-demo"
                                        options={students}
                                        value={selectedOptions}
                                        onChange={handleSelectStudent}
                                        disableCloseOnSelect
                                        getOptionLabel={(option) => option.title}
                                        renderOption={(props, option, { selected }) => (
                                            <li {...props}>
                                                <CheckboxA
                                                    icon={icon}
                                                    checkedIcon={checkedIcon}
                                                    style={{ marginRight: 8 }}
                                                    checked={tempStudentIds?.includes(option.id)}
                                                />
                                                {option.title}
                                            </li>
                                        )}
                                        renderInput={(params) => (
                                            <TextField {...params} placeholder="Enter Search Text" />
                                        )}
                                    />
                                </div>
                                <div className="educare-button-field-styles w-[210px] ml-1">
                                    <PrimaryButton
                                        className="educare-primary-btn-md-fill !bg-info"
                                        type="button"
                                        onClick={(e) => {
                                            handleAddParticipant(e)
                                        }}
                                    >
                                        Add Participants
                                    </PrimaryButton>
                                </div>

                            </div>
                        </div>
                    }
                </div>
            </form>
            <div className="educare-button-field-styles mt-2.5 text-end">
                <div className="educare-button-field-styles flex flex-wrap gap-4 justify-end  border-grayLight/20">
                    <PrimaryButton
                        disabled={processing}
                        className="educare-primary-btn-lg-fill"
                        type="button"
                        onClick={(e) => {
                            handleSaveEventActivityParticipant(e)
                        }}
                    >
                        Save
                    </PrimaryButton>
                    <Link
                        href={route('event.details', eventData?.id)}
                        className="educare-gray-btn-lg-fill"
                    >
                        Cancel
                    </Link>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Save</p>
                    </Transition>
                </div>
            </div>
        </div>
    );
};

export default AddActivityParticipantForm;
