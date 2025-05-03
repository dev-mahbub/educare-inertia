import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from "react";

export default function SelectClassPopup({
    className = '',
    classPopup,
    setClassPopup,
    class_names = [],
    sendDataToParent,
    classNameIds
}) {

    const [selectedClassNameIds, setSelectedClassNameIds] = useState([]);
    const [selectAllClassChecked, setSelectAllClassChecked] = useState(false);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        select_all_class: "",
        selected_class_name_ids: selectedClassNameIds
    });



    useEffect(() => {
        setSelectedClassNameIds(classNameIds);
    }, [classNameIds]);


    useEffect(() => {
        if (selectedClassNameIds?.length <= 0) {
            setSelectAllClassChecked(false)
        }
        else {
            setSelectAllClassChecked(selectedClassNameIds?.length === class_names?.length)
        }
    }, [class_names, selectedClassNameIds]);


    useEffect(() => {
        setData('selected_class_name_ids', selectedClassNameIds);
    }, [selectedClassNameIds]);


    const handleCheckboxSelect = (name, value) => {
        if (name === "select_all_class") {
            if (value === true) {
                setSelectedClassNameIds(class_names.map((item) => item.id))
            }
            else {
                setSelectedClassNameIds([])
            }

            setSelectAllClassChecked(value);
        }
    };

    // add checkbox value to array
    const setSelectedClassNameId = (value, id) => {
        if ([...selectedClassNameIds]?.includes(id)) {
            setSelectedClassNameIds([...selectedClassNameIds].filter((item) => item !== id));
        }
        else {
            setSelectedClassNameIds([
                ...selectedClassNameIds,
                id,
            ]);

        }
        const updateSelectedClassNameIds = [...selectedClassNameIds];

        setData('selected_class_name_ids', updateSelectedClassNameIds);
    };

    const classPopupData = (e) => {
        e.preventDefault();
        // destroy(route('profile.destroy'), {
        //     preserveScroll: true,
        //     onSuccess: () => closeModal(),
        //     onError: () => passwordInput.current.focus(),
        //     onFinish: () => reset(),
        // });
    };

    const closeModal = () => {
        setClassPopup(false);
        reset();
    };


    const handleChange = (event) => {
        sendDataToParent(selectedClassNameIds);
        closeModal();
    };


    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={classPopup} onClose={closeModal}>
                    <form onSubmit={classPopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Select Class</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-[26px] body-bg maxSm:py-4 px-[30px] flex flex-col gap-3">
                                <div className="educare-admission-list table-width-full pb-none">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className='whitespace-nowrap'>
                                                    <div className='flex gap-1.5'>
                                                        <div className="educare-create-school-settings-list-checka width-full">
                                                            <Checkbox
                                                                id="select_all_class"
                                                                name="select_all_class"
                                                                checked={
                                                                    selectAllClassChecked
                                                                }
                                                                onChange={(e) =>
                                                                    handleCheckboxSelect(e.target.name,e.target.checked)
                                                                }
                                                            />
                                                        </div>
                                                        <div>
                                                            <InputLabel
                                                                htmlFor="select_all_class"
                                                                value="Select All"
                                                                className='cursor-pointer'
                                                            />
                                                        </div>
                                                    </div>
                                                </th>
                                                <th className='whitespace-nowrap'>Class</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {class_names?.length > 0 ? (
                                                class_names?.map(
                                                    (item, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="educare-create-school-settings-list-checka width-full">
                                                                    <Checkbox
                                                                        id="monday_id"
                                                                        name="monday_id"
                                                                        checked={selectedClassNameIds?.includes(item.id)}
                                                                        onChange={(e) =>
                                                                            setSelectedClassNameId(e.target.name, item.id)
                                                                        }
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td>{item.title}</td>
                                                        </tr>
                                                    )
                                                )
                                            ) : (
                                                <tr>
                                                    <td className = "text-center text-red-500"
                                                        colSpan = "7">
                                                        Data not
                                                        found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                            <PrimaryButton
                                className="educare-primary-btn-md-fill"
                                onClick={handleChange}
                            >
                                Add</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
