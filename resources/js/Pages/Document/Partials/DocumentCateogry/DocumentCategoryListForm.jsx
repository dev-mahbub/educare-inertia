import Checkbox from '@/Components/Checkbox';
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from '@/Components/SelectInput';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import DocumentCategoryListHeader from "./DocumentCategoryListHeader";

export default function DocumentCategoryListForm({
    audienceTypes,
    documentCategories
}) {

    const [documentCategoriesData, setDocumentCategoriesData] = useState(documentCategories);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [formMode, setFormMode] = useState('create');

    const {
        data,
        setData,
        errors,
        post,
        put,
        reset,
        clearErrors,
        processing
    } = useForm({
        title: "",
        type: "",
        description: "",
        is_published: ""
    });

    useEffect(() => {
        setDocumentCategoriesData(documentCategories);
    }, [documentCategories]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            title: selectedCategory?.title ?? "",
            type: selectedCategory?.type ?? "",
            description: selectedCategory?.description ?? "",
            is_published: selectedCategory?.is_published ?? 0
        }));
    }, [selectedCategory]);

    // handle save document category start
    const handleSaveDocumentCategory = (e) => {
        e.preventDefault();

        post(route('document.document_category.save'), {
            onSuccess: () => {
                handleReset();
            }
        });
    };
    // handle save document category end

    // handle reset start
    const handleReset = () => {
        reset();
        clearErrors();
        setFormMode('create');
        setSelectedCategory({});
    }
    // handle reset end

    // handle edit document category start
    const handleEditDocumentCategory = (e, id) => {
        e.preventDefault();

        const selected_category = documentCategories?.find(item => item?.id == id);

        if (selected_category?.id != null) {
            setFormMode('edit');
            setSelectedCategory(selected_category);
        }
    }
    // handle edit document category end

    // handle update document category start
    const handleUpdateDocumentCategory = (e) => {
        e.preventDefault();

        put(route('document.document_category.update', selectedCategory?.id), {
            onSuccess: () => {
                handleReset();
            }
        });
    }
    // handle update document category end

    // handle delete document category start
    const handleDeleteDocumentCategory = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('document.document_category.delete', id));
            }
        });
    }
    // handle delete document category end

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-5 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-PlusCircle"></i>
                                        Add Document Category
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleSaveDocumentCategory}>
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                value="Document category"
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
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.title
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                value="Document For"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="Type"
                                                        data={audienceTypes}
                                                        value={
                                                            data.type
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "type",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.type
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        value="Description"
                                                    />
                                                    <TextareaInput
                                                        value={
                                                            data.description
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "description",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.description
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id="is_published"
                                                            name="is_published"
                                                            checked={
                                                                data.is_published
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_published",
                                                                    e.target.checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="is_published"
                                                            value="Is Publish"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                {formMode == 'create' &&
                                                    <div className="flex flex-wrap justify-end gap-2.5 mt-2">
                                                        <PrimaryButton
                                                            className="educare-gray-btn-lg-stroke"
                                                            type="button"
                                                            onClick={handleReset}
                                                        >
                                                            Reset
                                                        </PrimaryButton>
                                                        <PrimaryButton
                                                            className="educare-primary-btn-lg-fill"
                                                            type="button"
                                                            onClick={handleSaveDocumentCategory}
                                                        >
                                                            Save
                                                        </PrimaryButton>
                                                    </div>
                                                }

                                                {formMode == 'edit' &&
                                                    <div className="flex flex-wrap justify-end gap-2.5 mt-2">
                                                        <PrimaryButton
                                                            className="educare-gray-btn-lg-stroke"
                                                            type="button"
                                                            onClick={handleReset}
                                                        >
                                                            Cancel
                                                        </PrimaryButton>
                                                        <PrimaryButton
                                                            className="educare-primary-btn-lg-fill"
                                                            type="button"
                                                            onClick={handleUpdateDocumentCategory}
                                                        >
                                                            Update
                                                        </PrimaryButton>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-7 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Document categories
                                </h5>
                            </div>
                            <DocumentCategoryListHeader
                                audienceTypes={audienceTypes}
                                setDocumentCategoriesData={setDocumentCategoriesData}
                                documentCategoriesData={documentCategoriesData}
                                documentCategories={documentCategories}
                            />
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Document category</th>
                                            <th>Type</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {documentCategoriesData?.length > 0 ?
                                            documentCategoriesData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.title}</td>
                                                    <td>{item?.type}</td>
                                                    <td>
                                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                            <div>
                                                                <Tooltip
                                                                    title="Edit"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        className="educare-warning-btn-sm-fill"
                                                                        onClick={(e) => {
                                                                            handleEditDocumentCategory(e, item?.id)
                                                                        }}
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
                                                                        type="button"
                                                                        className="educare-danger-btn-sm-fill"
                                                                        as="button"
                                                                        onClick={() => {
                                                                            handleDeleteDocumentCategory(item?.id)
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
                                        :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="3">
                                                    Data not found
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
