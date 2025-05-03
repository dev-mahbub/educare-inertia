import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreatePeriodFirstHalfPopup({
    className = '',
    listPopup,
    setListPopup,
    convertToLocaleTime,
    schoolPeriods,
    formData
}) {

    const [schoolPeriodIds, setSchoolPeriodIds] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_all: false,
        school_period_ids: schoolPeriodIds,
        classroom_id: formData?.classroom_id,
        school_shift_id: formData?.school_shift_id,
        type: "First Half"
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: formData?.classroom_id,
            school_shift_id: formData?.school_shift_id
        }));
    }, [formData]);

    // handle select school period start
    const handleSelectSchoolPeriod = (name, value) => {
        let updatedIds = [];

        if(name == 'select_all') {
            if(value) {
                updatedIds = schoolPeriods?.map(item => item?.id);
            } else {
                updatedIds = [];
            }
        } else {
            if(schoolPeriodIds?.includes(value)) {
                updatedIds = schoolPeriodIds?.filter(id => id != value);
            } else {
                updatedIds = [...schoolPeriodIds, value];
            }
        }

        setData((prevData) => ({
            ...prevData,
            select_all: updatedIds?.length > 0 && updatedIds?.length == schoolPeriods?.length,
            school_period_ids: updatedIds
        }));

        setSchoolPeriodIds(updatedIds);
    }
    // handle select school period end

    // handle save class period start
    const handleSaveClassPeriod = (e) => {
        e.preventDefault();

        if(!data?.classroom_id) {
            toast.error("Please select class.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else if(!data?.school_shift_id) {
            toast.error("Please select shift.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else if(data?.school_period_ids?.length == 0) {
            toast.error("Please select at least one period.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            post(route('classroom_period.save'), {
                onSuccess: () => {
                    closeModal();
                },
                onFinish: () => {
                    const form_data = {
                        classroom_id: formData?.classroom_id,
                        school_shift_id: formData?.school_shift_id
                    }

                    router.post(route('classroom_period.create'), form_data);
                }
            });
        }
    }
    // handle save class period end

    const closeModal = () => {
        setListPopup(false);
        setSchoolPeriodIds([]);
        setData((prevData) => ({
            ...prevData,
            select_all: false,
            school_period_ids: []
        }));
    };

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={listPopup} onClose={closeModal}>
                    <div className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper mb-5 ">
                            <div className="educare-popup-form-header py-3">
                                <h5>Add Periods Shift-First half</h5>
                            </div>
                            <div className="educare-popup-form pt-5 maxSm:py-4 flex flex-col gap-3">
                                <div>
                                    <p>Period <span className='text-danger'>*</span></p>
                                </div>
                                <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="select_all"
                                                                name="select_all"
                                                                checked={data.select_all || false}
                                                                onChange={(e) =>
                                                                    handleSelectSchoolPeriod(e.target.name, e.target.checked)
                                                                }
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor="select_all"
                                                                value="All"
                                                            />
                                                        </div>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {schoolPeriods?.length > 0 &&
                                                schoolPeriods.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                <div className="educare-create-school-settings-list-check width-full">
                                                                    <Checkbox
                                                                        name={"online_class_" + item.id}
                                                                        checked={schoolPeriodIds.includes(item.id)}
                                                                        onChange={(e) =>
                                                                            handleSelectSchoolPeriod(e.target.name, item.id)
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="educare-create-school-settings-list-title width-full">
                                                                    <InputLabel
                                                                        htmlFor={"online_class_" + item.id}
                                                                        value={`${convertToLocaleTime(item.start_time_at)} - ${convertToLocaleTime(item.end_time_at)}`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                            <PrimaryButton
                                className="educare-primary-btn-md-fill"
                                type='submit'
                                onClick={handleSaveClassPeriod}
                            >
                                Save Periods
                            </PrimaryButton>
                        </div>
                    </div>
                </Modal>
            </section>
        </>
    );
}
