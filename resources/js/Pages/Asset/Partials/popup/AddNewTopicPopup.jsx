import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from 'react';

export default function AddNewTopicPopup({
    addNewTopic,
    setAddNewTopic,
    onlineTopics,
    formData,
    handleFilterLearningMaterial
 }) {

    const initialData = [
        {
            id: 1,
            title: 'html title',
        },
        {
            id: 2,
            title: 'Test title',
        },
        {
            id: 3,
            title: 'demo title',
        },
    ]

    const [topicData, setTopicData] = useState(initialData)
    const [formMode, setFormMode] = useState('create');
    const [editableData, setEditableData] = useState({});

    const {
        data,
        setData,
        delete: destroy,
        post,
        put,
        processing,
        reset,
        errors,
    } = useForm({
        title: '',
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            title: editableData.title ?? "",
        }));
    }, [editableData]);

    const addNewTopicData = (e) => {
        e.preventDefault();
    };

    const closeModal = () => {
        setAddNewTopic(false);
        setEditableData({});
        reset();
        setFormMode('create');
    };

    //handle edit topic data
    const handleEditTopicData = (item) => {
        setFormMode('edit');
        setEditableData(item);
        // setData((prevData) => ({
        //     ...prevData,
        //     title: item.title,
        // }));
    }

    //handle remove topic data
    const handleRemoveData = (index) => {
        let newData = [...topicData]
        newData.splice(index, 1)
        setTopicData(newData)
    }

    // handle save topic start
    const handleOnlineTopicSave = (e) => {
        e.preventDefault();

        data['class_name_id'] = formData?.class_name_id;
        data['subject_id'] = formData?.subject_id;

        post(route('asset.online_topic.save'), {
            onSuccess: () => {
                handleFilterLearningMaterial();
            },
            onError: () => {
                handleFilterLearningMaterial();
            }
        });
    }
    // handle save topic end

    // handle update topic start
    const handleOnlineTopicUpdate = (e) => {
        e.preventDefault();

        data['class_name_id'] = formData?.class_name_id;
        data['subject_id'] = formData?.subject_id;

        put(route('asset.online_topic.update', editableData?.id), {
            onSuccess: () => {
                handleFilterLearningMaterial();
            },
            onError: () => {
                handleFilterLearningMaterial();
            }
        });
    }
    // handle update topic end

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6`}>
                <Modal show={addNewTopic} onClose={closeModal} maxWidth='4xl'>
                    <form onSubmit={addNewTopicData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper">
                            <div className="educare-popup-form-header py-3">
                                <h5>Material topic</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        value="Title"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <TextInput
                                                value={
                                                    data.title
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                                placeholder='Topic maximum 100 characters'
                                                maxLength={100}
                                            />
                                            <InputError
                                                message={
                                                    errors.title
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="flex flex-wrap justify-end gap-2.5 pt-7">
                                            <PrimaryButton type='button' className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                                            {formMode == 'edit' && editableData?.id != null ?
                                                <PrimaryButton
                                                    type='button'
                                                    className="educare-primary-btn-md-fill"
                                                    onClick={handleOnlineTopicUpdate}
                                                >
                                                    Update
                                                </PrimaryButton>
                                            :
                                                <PrimaryButton
                                                    type='button'
                                                    className="educare-primary-btn-md-fill"
                                                    onClick={handleOnlineTopicSave}
                                                >
                                                    Save
                                                </PrimaryButton>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="educare-default-table xs:overflow-x-auto">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>S.No</th>
                                                        <th>Title</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='bg-border/40'>
                                                    {
                                                        onlineTopics.length > 0 ? (onlineTopics.map((item, index) => <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.title}</td>
                                                            <td>
                                                                <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Edit"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <button
                                                                                type='button'
                                                                                className="educare-warning-btn-sm-fill"
                                                                                onClick={() => handleEditTopicData(item)}
                                                                            >
                                                                                <i className="icon-editing"></i>
                                                                            </button>
                                                                        </Tooltip>
                                                                    </div>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Delete"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <button
                                                                                type='button'
                                                                                className="educare-danger-btn-sm-fill"
                                                                                onClick={() => handleRemoveData(index)}
                                                                            >
                                                                                <i className="icon-TrashSimple"></i>
                                                                            </button>
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>))
                                                            : (<tr>
                                                                <td
                                                                    colSpan={3}
                                                                    className='text-center'
                                                                >
                                                                    <span className="text-danger">
                                                                        Data not found
                                                                    </span>
                                                                </td>
                                                            </tr>)
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
