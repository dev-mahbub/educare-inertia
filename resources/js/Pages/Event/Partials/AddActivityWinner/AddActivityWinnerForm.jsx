import InputLabel from '@/Components/InputLabel';
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import { Link, useForm } from '@inertiajs/react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CheckboxA from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddActivityWinnerForm = ({
    eventData,
    eventActivity,
    participants
}) => {

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [participantsData, setParticipantsData] = useState(eventActivity?.participants ?? []);
    const [winnersData, setWinnersData] = useState([]);
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

        setWinnersData(participantsData?.filter(item => item?.is_winner));
    }, [participantsData]);


    //remove student data start
    const removeParticipant = (studentId) => {
        const newData = [...participantsData];

        const newOptions = selectedOptions?.filter(item => item?.id != studentId);

        setSelectedOptions(newOptions);
        setParticipantsData(newData?.map(item => {
            if(item?.student_id == studentId) {
                item['is_winner'] = false;
            }

            return item;
        }));
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
            toast.error("Please select at least one winner to add for Event.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            const currentParticipants = [...participantsData];
            const currentParticipantIds = currentParticipants?.map(item => item?.student_id);

            // filter new participants that do not exist in the current data
            const newParticipants = selectedOptions?.filter(item => !currentParticipantIds?.includes(item?.id))?.map(item => ({
                student_id: item?.id,
                is_winner: true,
                title: item?.title
            }));

            // update is_winner value for existing participants in new data
            const updatedParticipants = currentParticipants?.map(participant => {
                const newParticipant = selectedOptions.find(item => item.id == participant.student_id);

                if (newParticipant) {
                    return {
                        ...participant,
                        is_winner: true
                    };
                }

                return participant;
            });

            setParticipantsData([...updatedParticipants, ...newParticipants]);
        }
    };
    // handle add staff end

    // handle save event activity participant start
    const handleSaveEventActivityParticipant = (e) => {
        e.preventDefault();

        if (winnersData?.length == 0) {
            toast.error("Please select at least one winner to add for Event.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            post(route('event.activity.save_winner', { eventId: eventData?.id, activityId: eventActivity?.id }))
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
                            <p className='mr-4'>Winners : </p>
                            <div className='flex flex-wrap gap-2'>
                                {winnersData?.length > 0 &&
                                    winnersData?.map((item, index) => (
                                        <div key={index}>
                                            <div className=' bg-border px-2 py-1 rounded-md flex items-center text-heading'>
                                                <span>{item?.title}</span>
                                                <i
                                                    className='icon-XCircle items-center ml-1 text-[18px] text-white cursor-pointer'
                                                    onClick={() => removeParticipant(item?.student_id)}
                                                >
                                                </i>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-span-12 md:col-span-6">
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
                    </div> */}
                    <div className="col-span-12">
                        <div
                            className="flex items-center"
                        >
                            <div className="educare-input-type-file-styles w-full">
                                <Autocomplete
                                    multiple
                                    id="checkboxes-tags-demo"
                                    options={participants}
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

export default AddActivityWinnerForm;
