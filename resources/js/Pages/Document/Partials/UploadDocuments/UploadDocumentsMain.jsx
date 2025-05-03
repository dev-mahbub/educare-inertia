import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadDocumentsleftForm from "./UploadDocumentsleftForm";
import UploadDocumentsRightListForm from "./UploadDocumentsRightListForm";

const UploadDocumentsMain = ({
    userTypes,
    teachers,
    classrooms,
    students,
    statusArray,
    // studentDocumentCategories,
    // teacherDocumentCategories,
    documentCategories,
    drivers
}) => {

    const [withDocumentMode, setWithDocumentMode] = useState(true);
    const [withDocumentData, setWithDocumentData] = useState([
        {
            // document_category: "",
            document_category_id: "",
            file: null
        }
    ]);
    const [withoutDocumentData, setWithoutDocumentData] = useState([
        {
            // document_category: "",
            document_category_id: "",
            document_no: "",
            issued_by: null,
            generated_for: "",
            notes: "",
            issued_date: "",
        }
    ]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [withDocumentErrors, setWithDocumentErrors] = useState({});
    const [withoutDocumentErrors, setWithoutDocumentErrors] = useState({});

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm ({
        with_document: withDocumentMode ?? true,
        audience_type: "",
        documents: [],
        //school
        select_type: "",
        //teacher
        teacher_id: "",
        //driver
        driver_id: "",
        //student
        classroom_id: "",
        student_status: "",
        student_id: "",
        is_with_document: true
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            with_document: withDocumentMode,
            documents: withDocumentMode ? withDocumentData : withoutDocumentData
        }));
    }, [withDocumentMode, withDocumentData, withoutDocumentData]);

    // handle save document start
    const handleSaveDocument = (e) => {
        e.preventDefault();

        if (data?.audience_type == "") {
            toast.error("Please select audience first", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else if (data?.audience_type == 'Student' && data?.student_id == "") {
            toast.error("Please select a student", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else if (data?.audience_type == 'Teacher' && data?.teacher_id == "") {
            toast.error("Please select a teacher", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else if (data?.audience_type == 'Driver' && data?.driver_id == "") {
            toast.error("Please select a driver", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            post(route('document.save'), {
                onSuccess: () => {
                    reset();
                    setWithDocumentMode(true);
                    setWithDocumentData([
                        {
                            // document_category: "",
                            document_category_id: "",
                            file: null
                        }
                    ]);
                    setWithoutDocumentData([
                        {
                            // document_category: "",
                            document_category_id: "",
                            document_no: "",
                            issued_by: null,
                            generated_for: "",
                            notes: "",
                            issued_date: "",
                        }
                    ]);
                    setFilteredCategories([]);
                    setWithDocumentErrors({});
                    setWithoutDocumentErrors({});
                },
                onError: (errors) => {
                    if(withDocumentMode == true) {
                        setWithDocumentErrors(errors);
                    } else if (withDocumentMode == false) {
                        setWithoutDocumentErrors(errors);
                    }
                }
            });
        }
    }
    // handle save document end

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="4xl:col-span-3 col-span-12">
                        <UploadDocumentsleftForm
                            userTypes={userTypes}
                            teachers={teachers}
                            classrooms={classrooms}
                            students={students}
                            statusArray={statusArray}
                            setFilteredCategories={setFilteredCategories}
                            // studentDocumentCategories={studentDocumentCategories}
                            // teacherDocumentCategories={teacherDocumentCategories}
                            documentCategories={documentCategories}
                            data={data}
                            setData={setData}
                            errors={errors}
                            drivers={drivers}
                        />
                    </div>
                    <div className="4xl:col-span-9 col-span-12">
                        <UploadDocumentsRightListForm
                            withDocumentMode={withDocumentMode}
                            setWithDocumentMode={setWithDocumentMode}
                            filteredCategories={filteredCategories}
                            withDocumentData={withDocumentData}
                            setWithDocumentData={setWithDocumentData}
                            withoutDocumentData={withoutDocumentData}
                            setWithoutDocumentData={setWithoutDocumentData}
                            teachers={teachers}
                            errors={errors}
                            handleSaveDocument={handleSaveDocument}
                            withDocumentErrors={withDocumentErrors}
                            withoutDocumentErrors={withoutDocumentErrors}
                            setData={setData}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UploadDocumentsMain;
