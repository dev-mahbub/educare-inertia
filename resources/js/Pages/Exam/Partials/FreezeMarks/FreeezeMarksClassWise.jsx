import Checkbox from '@/Components/Checkbox';
import DangerButton from '@/Components/DangerButton';
import InputError from "@/Components/InputError";
import InputLabel from '@/Components/InputLabel';
import SuccessButton from '@/Components/SuccessButton';
import TextInput from '@/Components/TextInput';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FreeezeMarksClassWise = ({
    data,
    setData,
    errors,
    classNames,
    selectedClassNameIds,
    setSelectedClassNameIds
}) => {

    const [checkAllClassName, setCheckAllClassName] = useState(false);
    const [searchData, setSearchData] = useState(classNames);
    const [updateSearchData, setUpdateSearchData] = useState('');

    const handleSearchField = (value) => {
        setUpdateSearchData(value);

        let searchData = [];

        if (Array.isArray(classNames)) {
            // If classNames is already an array, use it directly
            searchData = classNames.filter(item => item?.title.toLowerCase().includes(value.toLowerCase()));
        } else if (typeof classNames === 'object') {
            // If classNames is an object, convert it to an array first using Object.values
            const classNamesArray = Object.values(classNames);
            searchData = classNamesArray.filter(item => item?.title.toLowerCase().includes(value.toLowerCase()));
        } else {
            // classNames has an unexpected type, handle it appropriately
            console.error('Unexpected type for classNames:', typeof classNames);
        }

        setSearchData(searchData);
    }

    useEffect(() => {
        setSearchData(classNames);
    }, [classNames]);


    useEffect(() => {
        if (selectedClassNameIds?.length <= 0) {
            setCheckAllClassName(false)
        }
        else {
            setCheckAllClassName(selectedClassNameIds?.length === Object.keys(classNames)?.length)
        }

        setData((prevData) => ({
            ...prevData,
            class_name_ids: selectedClassNameIds,
        }));
    },[selectedClassNameIds]);


    const handleCheckboxSelect = (name, value) => {
        if(name === 'select_all_class_id') {
            if (value === true) {
                setSelectedClassNameIds(Object.values(classNames)?.map((item) => item?.id))
            }
            else {
                setSelectedClassNameIds([])
            }

            setCheckAllClassName(value);
        }
    };

    const dummyData = (e) => {
        e.preventDefault();
    };


    const setSelectedClassnameId = (id) => {
        if ([...selectedClassNameIds]?.includes(id)) {
            setSelectedClassNameIds((prevData) => prevData?.filter(item => item !== id));
        } else {
            setSelectedClassNameIds((prevData) => ([
                ...prevData,
                id
            ]));
        }
    }


    // handle freeze marks start
    const handleFreezMarks = (e, statusType) => {
        e.preventDefault();

        if(selectedClassNameIds?.length == 0) {
            toast.error("Please select at least one class", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            data['status_type'] = statusType;
            data['_method'] = 'put';

            router.post(route('exam.freeze_marks_status.update'), data, {
                onSuccess: () => {
                    const form_data = {
                        type: 'class_wise',
                        exam_id: data?.exam_id
                    }

                    router.post(route('exam.freeze_marks'), form_data);
                }
            });
        }

    }
    // handle freeze marks end

    return (
        <>
            {/* scheduled test class form start*/}
            <div className="flex flex-wrap justify-between gap-2.5 mb-5">
                <h5 className="text-headingLight font-semibold text-xl">Class : </h5>
                <div className="flex flex-wrap gap-2.5">
                    <div className="educare-input-field-styles">
                        <TextInput
                            value={
                                updateSearchData
                            }
                            onChange={(e) =>
                                handleSearchField(e.target.value)
                            }
                            className="block"
                        />
                        <InputError
                            message={
                                errors.class_wise
                            }
                            className="mt-2"
                        />
                    </div>
                    <div className='flex flex-wrap gap-2'>
                        <DangerButton
                            // disabled={processing}
                            className="educare-danger-btn-md-fill"
                            onClick={(e) =>(
                                handleFreezMarks(e, 'Freeze')
                            )}
                        >
                            Freeze
                        </DangerButton>
                        <SuccessButton
                            // disabled={processing}
                            className="educare-success-btn-md-fill"
                            onClick={(e) =>(
                                handleFreezMarks(e, 'UnFreeze')
                            )}
                        >
                            Un Freeze
                        </SuccessButton>
                    </div>
                </div>
            </div>
            {/* scheduled test class form end*/}


            <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
                <form onSubmit={dummyData}>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12">
                            <div className="flex flex-col gap-5">
                                <div className="flex gap-2.5 justify-start">
                                    <div>
                                        <Checkbox
                                            id="select_all_class_id"
                                            name="select_all_class_id"
                                            checked={checkAllClassName}
                                            onChange={(e) => handleCheckboxSelect(e.target.name, e.target.checked)}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="select_all_class_id"
                                            value="Select All"
                                        />
                                    </div>
                                </div>

                                {Object.values(searchData)?.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`flex justify-start gap-2.5`}
                                    >
                                        <div>
                                            <Checkbox
                                                id={`${item?.title.toLowerCase()}_id_a`}
                                                name={`${item?.title.toLowerCase()}_id_a`}
                                                checked={selectedClassNameIds?.includes(item?.id)}
                                                onChange={(e) => {
                                                    setSelectedClassnameId(item?.id)
                                                } }
                                            />
                                        </div>
                                        <div
                                            className="flex justify-between flex-1"
                                        >
                                            <InputLabel
                                                htmlFor={`${item?.title.toLowerCase()}_id_a`}
                                                value={item?.title}
                                            />

                                            {item?.is_mark_freezed == true &&
                                                <div
                                                    className="w-full text-end"
                                                >
                                                    <span
                                                        className="badge bg-warning"
                                                    >
                                                        Already freezed
                                                    </span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FreeezeMarksClassWise;
