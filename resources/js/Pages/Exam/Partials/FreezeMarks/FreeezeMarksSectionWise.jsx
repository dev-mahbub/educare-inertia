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

const FreeezeMarksSectionWise = ({
    data,
    setData,
    errors,
    classrooms,
    selectedClassSectionIds,
    setSelectedClassSectionIds
}) => {
    const [checkAllClassName, setCheckAllClassName] = useState(false);

    const [classNameData, setClassNameData] = useState(classrooms);
    const [searchData, setSearchData] = useState('');

    useEffect(() => {
        setClassNameData(classrooms);
    }, [classrooms]);

    useEffect(() => {
        if (selectedClassSectionIds?.length <= 0) {
            setCheckAllClassName(false)
        }
        else {
            setCheckAllClassName(selectedClassSectionIds?.length === Object.keys(classrooms)?.length)
        }

        setData((prevData) => ({
            ...prevData,
            classroom_ids: selectedClassSectionIds,
        }));
    },[selectedClassSectionIds]);


    const handleCheckboxSelect = (name, value) => {
        if(name === 'select_all_section_id') {
            if (value === true) {
                setSelectedClassSectionIds(Object.values(classrooms)?.map((item) => item?.id))
            }
            else {
                setSelectedClassSectionIds([])
            }

            setCheckAllClassName(value);
        }
    };

    const dummyData = (e) => {
        e.preventDefault();
    };


    const setSelectedClassSectionId = (id) => {
        if ([...selectedClassSectionIds]?.includes(id)) {
            setSelectedClassSectionIds((prevData) => prevData?.filter(item => item !== id));
        } else {
            setSelectedClassSectionIds((prevData) => ([
                ...prevData,
                id
            ]));
        }
    }


    const handleFreezMarks = (e, statusType) => {
        e.preventDefault();

        if(selectedClassSectionIds?.length == 0) {
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
                        type: 'section_wise',
                        exam_id: data?.exam_id
                    }

                    router.post(route('exam.freeze_marks'), form_data);
                }
            });
        }
    }


    const handleSearch = (value) => {
        setSearchData(value);
        const filteredData = classrooms.filter(item =>
            item?.title.toLowerCase().includes(value.toLowerCase())
        );
        setClassNameData(filteredData);
    }

    return (
        <>
            {/* scheduled test class form start*/}
            <div className="flex flex-wrap justify-between gap-2.5 mb-5">
                <h5 className="text-headingLight font-semibold text-xl">Class : </h5>
                <div className="flex flex-wrap gap-2.5">
                    <div className="educare-input-field-styles">
                        <TextInput
                            value={searchData}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="block"
                        />
                        <InputError
                            message={
                                errors.section_wise
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
                                            id="select_all_section_id"
                                            name="select_all_section_id"
                                            checked={checkAllClassName}
                                            onChange={(e) => handleCheckboxSelect(e.target.name, e.target.checked)}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="select_all_section_id"
                                            value="Select All"
                                        />
                                    </div>
                                </div>

                                {Object.values(classNameData)?.map((item, index) => (
                                    <div key={index} className='flex justify-start gap-2.5'>
                                        <div>
                                            <Checkbox
                                                id={`${item?.title?.toLowerCase()}_id_a`}
                                                name={`${item?.title?.toLowerCase()}_id_a`}
                                                checked={selectedClassSectionIds?.includes(item?.id)}
                                                onChange={(e) => {
                                                    setSelectedClassSectionId(item?.id)
                                                } }
                                            />

                                        </div>
                                        <div
                                            className="flex justify-between flex-1"
                                        >
                                            <InputLabel
                                                htmlFor={`${item?.title?.toLowerCase()}_id_a`}
                                                value={item?.title}
                                            />
                                            {item?.is_mark_freezed == true &&
                                                <div
                                                    className="text-end"
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

export default FreeezeMarksSectionWise;
