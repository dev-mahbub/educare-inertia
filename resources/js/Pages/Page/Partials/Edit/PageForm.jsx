import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from '@/Components/SelectInput';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from '@/Components/TextInput';
import { Transition } from "@headlessui/react";
import { Link, useForm } from '@inertiajs/react';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

const PageList = ({
    statusArr,
    pageTypes,
    page
}) => {
    
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
        title: page?.title ?? "",
        status: page?.status ?? "",
        page_type: page?.page_type ?? "",
        body_text: page?.body_text ?? "",
        image: ""
    });

    // handle Change Page type
    const handleChangePageType = (e) => {
        const pageType = e.target.value;
        setData((prevData) => ({
            ...prevData,
            page_type: pageType
        }));
    };

    // handle page update
    const handlePageFormSave = (e) => {
        e.preventDefault();

        data['_method'] = 'put';
        post(route('page.update', page?.id), {
            preserveScroll: true,
        });
    }

    const editorRef = useRef(null);
    const handleEditorChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            body_text: e.target.getContent()
        }));
    }

    // handle page update
    return (
        <div className="educare-event-create-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
                <form>
                    <div className="grid grid-cols-12 gap-5 items-end">
                        
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="page_type"
                                            value="Page Type"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <SelectInput
                                    id="page_type"
                                    data_label="Page Type"
                                    data={pageTypes}
                                    value={
                                        data.page_type
                                    }
                                    onChange={(e) => {
                                        handleChangePageType(e);
                                    }
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.audience_type
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="status"
                                    value="Status"
                                />
                                <SelectInput
                                    id="status"
                                    data_label="Status"
                                    data={statusArr}
                                    value={
                                        data.status
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "status",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.status
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-12">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="title"
                                            value="Title"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <TextInput
                                    id="title"
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
                                <InputLabel
                                    htmlFor="body_text"
                                    value="Body Content"
                                />

                                <div className="educare-input-field-styles">
                                    <Editor
                                        apiKey='zro9ygko9tjpaphfwp2puagyldl8ezn6yctbz4oyx8l66bou'
                                        onInit={(evt, editor) => editorRef.current = editor}
                                        // initialValue="<p>This is the initial content of the editor.</p>"
                                        value={data?.body_text}
                                        init={{
                                            height: 500,
                                            menubar: true,
                                            plugins: [
                                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                            ],
                                            toolbar: 'undo redo | blocks | ' +
                                                'bold italic forecolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                        }}
                                        onChange={handleEditorChange}
                                    />
                                </div>

                                <InputError
                                    message={
                                        errors.body_text
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-input-field-styles">
                                { page?.image && (
                                    <div className='max-w-20 mb-4'>
                                        <img src={page?.image} alt="image" />
                                    </div>
                                )}
                                <InputLabel value="Upload Document" />
                                <div className="educare-input-type-file-styles">
                                    <input
                                        id="image"
                                        type="file"
                                        name="image"
                                        onChange={(e) =>
                                            setData(
                                                "image",
                                                e.target
                                                    .files[0]
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="educare-input-field-notes">
                                <h6>Note :</h6>
                                <ul>
                                    <li>
                                        1. File format-png,bmp,jpg Files allowed.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="educare-button-field-styles mt-2.5 text-end">
                <div className="educare-button-field-styles flex flex-wrap gap-4 justify-end  border-grayLight/20">
                    
                    <Link
                        className="educare-gray-btn-lg-fill"
                        href={route('page.list')}
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

                    <PrimaryButton
                        disabled={processing}
                        className="educare-primary-btn-lg-fill"
                        type="button"
                        onClick={handlePageFormSave}
                    >
                        Update
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default PageList;
