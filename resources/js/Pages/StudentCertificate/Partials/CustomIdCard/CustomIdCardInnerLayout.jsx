import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
import PrimaryButton from '@/Components/PrimaryButton';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import CustomFromMain from './CustomFrom/CustomFromMain';
import CustomIdCardMain from './CustomIdCardMain';

const CustomIdCardInnerLayout = ({
    classrooms,
    audienceTypeArray,
    orientationTypeArray,
    idCardCertificates,
    idCardCertificate,
    fields,
    students,
    fontSizeArray,
    staffs
}) => {
    const [activeNext, setActiveNext] = useState(false);

    const [selectedColumns, setSelectedColumns] = useState([]);

    const [initialHeaderData, setInitialHeaderData] = useState({
        background_color: "",
        school_title: {
            label: "School Title",
            title: "",
            color: "",
            font_size:"",
            font_weight_bold: false,
            font_style_italic: false,
            text_decoration_underline: false,
            text_decoration_linethrough: false,
            text_align: ""
        },
        title_2: {
            label: "Title2",
            title: "",
            color: "",
            font_size:"",
            font_weight_bold: false,
            font_style_italic: false,
            text_decoration_underline: false,
            text_decoration_linethrough: false,
            text_align: ""
        },
        title_3: {
            label: "Title3",
            title: "",
            color: "",
            font_size:"",
            font_weight_bold: false,
            font_style_italic: false,
            text_decoration_underline: false,
            text_decoration_linethrough: false,
            text_align: ""
        }
    });

    const [headerData, setHeaderData] = useState(initialHeaderData);

    const [initialBodyData, setInitialBodyData] = useState({
        background_color: "",
        body_label: {
            label: "Body label",
            color: "",
            font_size: "",
            font_weight_bold: false,
            font_style_italic: false,
            text_decoration_underline: false,
            text_decoration_linethrough: false,
            text_align: ""
        },
        body_value: {
            label: "Body Value",
            color: "",
            font_size: "",
            font_weight_bold: false,
            font_style_italic: false,
            text_decoration_underline: false,
            text_decoration_linethrough: false,
            text_align: ""
        },
    });

    const [bodyData, setBodyData] = useState(initialBodyData);

    const [initialFooterdata, setInitialFooterData] = useState({
        background_color: "",
        title_1: {
            label: "Title",
            title: "",
            color: "",
            font_size: "",
            font_weight_bold: false,
            font_style_italic: false,
            text_decoration_underline: false,
            text_decoration_linethrough: false,
            text_align: ""
        },
        title_2: {
            label: "Title2",
            title: "",
            color: "",
            font_size: "",
            font_weight_bold: false,
            font_style_italic: false,
            text_decoration_underline: false,
            text_decoration_linethrough: false,
            text_align: ""
        }
    });

    const [footerData, setFooterData] = useState(initialFooterdata);

    const [initialBackpageData, setInitialBackpageData] = useState({
        background_color: "",
        title_1: {
            label: "Title",
            title: "",
            color: "",
            font_size: "",
            font_weight_bold: false,
            font_style_italic: false,
            text_decoration_underline: false,
            text_decoration_linethrough: false,
            text_align: ""
        },
        title_2: {
            label: "Title2",
            title: "",
            color: "",
            font_size: "",
            font_weight_bold: false,
            font_style_italic: false,
            text_decoration_underline: false,
            text_decoration_linethrough: false,
            text_align: ""
        },
        body_label: {
            label: "Body label",
            color: "",
            font_size: "",
            font_weight_bold: false,
            font_style_italic: false,
            text_decoration_underline: false,
            text_decoration_linethrough: false,
            text_align: ""
        },
        body_value: {
            label: "Body Value",
            color: "",
            font_size: "",
            font_weight_bold: false,
            font_style_italic: false,
            text_decoration_underline: false,
            text_decoration_linethrough: false,
            text_align: ""
        },
        title_3: {
            label: "Title3",
            title: "",
            color: "",
            font_size: "",
            font_weight_bold: false,
            font_style_italic: false,
            text_decoration_underline: false,
            text_decoration_linethrough: false,
            text_align: ""
        },
        title_4: {
            label: "Title4",
            title: "",
            color: "",
            font_size: "",
            font_weight_bold: false,
            font_style_italic: false,
            text_decoration_underline: false,
            text_decoration_linethrough: false,
            text_align: ""
        }
    });

    const [backpageData, setBackpageData] = useState(initialBackpageData);

    const [fieldsData, setFieldsData] = useState([]);
    const [idCardCertificateData, setIdCardCertificateData] = useState({});
    const [isNew, setIsNew] = useState(true);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        template_id: "",
        is_with_backpage: false,
        orientation: "",
        audience_type: "",
        template_name: "",
        columns: [],
        header: headerData,
        body: bodyData,
        footer: footerData,
        back_page: backpageData,
        background_image: "",
        background_color: "",
        header_background_image: "",
        body_background_image: "",
        footer_background_image: "",
        footer_signature_image: "",
        backpage_background_image: "",
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            template_id: idCardCertificateData?.id ?? "",
            is_with_backpage: idCardCertificateData?.is_with_backpage ?? false,
            orientation: idCardCertificateData?.orientation ?? "",
            audience_type: idCardCertificateData?.audience_type ?? "",
            template_name: idCardCertificateData?.template_name ?? "",
            background_color: idCardCertificateData?.background_color ?? "",
            columns: idCardCertificateData?.columns ?? [],
            header: idCardCertificateData?.header ?? initialHeaderData,
            body: idCardCertificateData?.body ?? initialBodyData,
            footer: idCardCertificateData?.footer ?? initialFooterdata,
            back_page: idCardCertificateData?.back_page ?? initialBackpageData,
        }));

        setSelectedColumns(idCardCertificateData?.columns ?? []);

        setHeaderData(idCardCertificateData?.header ?? initialHeaderData);
        setBodyData(idCardCertificateData?.body ?? initialBodyData);
        setFooterData(idCardCertificateData?.footer ?? initialFooterdata);
        setBackpageData(idCardCertificateData?.back_page ?? initialBackpageData);
    }, [idCardCertificateData]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            columns: selectedColumns
        }));
    }, [selectedColumns]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            header: headerData
        }));
    }, [headerData]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            body: bodyData
        }));
    }, [bodyData]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            footer: footerData
        }));
    }, [footerData]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            back_page: backpageData
        }));
    }, [backpageData]);

    useEffect(() => {
        if(idCardCertificate?.id != null) {
            setIdCardCertificateData(idCardCertificate);
        }
        else {
            setIdCardCertificateData({});
        }
    }, [idCardCertificate]);

    useEffect(() => {
        const filteredData = fields[data?.audience_type?.toLowerCase()] ?? [];

        let initialData = {};

        for (const key in filteredData) {
            let is_selected = false;

            if (idCardCertificateData?.columns && Object.keys(idCardCertificateData.columns).length > 0) {
                for (const item of Object.values(idCardCertificateData.columns)) {
                    if (item?.field_name === filteredData[key]) {
                        is_selected = item?.is_selected ?? false;
                        break;
                    }
                }
            }

            initialData[key] = {
                key_name: key,
                field_name: filteredData[key],
                label_name: filteredData[key],
                is_selected: is_selected,
            }
        }

        setFieldsData(initialData);

        if (data?.audience_type != idCardCertificateData?.audience_type) {
            setSelectedColumns([]);
        }else {
            setSelectedColumns(idCardCertificateData?.columns ?? []);
        }
    }, [fields, data?.audience_type, idCardCertificateData]);

    // handle next page start
    const handleNextPage = () => {
        if (data?.orientation != "" && data?.audience_type != "" && data?.template_name != "" && Object.keys(selectedColumns)?.length > 0) {
            if (isNew == true) {
                post(route('student_certificate.custom_id_card.save'), {
                    onSuccess: () => {
                        setActiveNext(true);
                        setIsNew(false);

                        const form_data = {
                            template_id: isNew == false ? data?.template_id : null
                        }

                        router.post(route('student_certificate.custom_id_card'), form_data)
                    },
                    onError: () => {
                        toast.error("Select audience and idcard values..", {
                            position: 'top-right',
                            autoClose: 1500,
                        });
                    },
                });
            }
            else {
                setActiveNext(true);
            }
        }
        else {
            toast.error("Select audience and idcard values..", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
    };
    // handle next page end


    // handle previous page start
    const handlePreviousPage = () => {
        setActiveNext(false);
    };
    // handle previous page end


    // handle upload background image start
    const handleUploadBackgroundImage = (e, fileName) => {
        e.preventDefault();

        const form_data = {
            file_name: fileName,
            image: data[fileName],
            template_id: idCardCertificateData?.id ?? ""
        }

        if ((data[fileName] ?? "") != "") {
            router.post(route('student_certificate.custom_id_card.upload_background_image.save'), form_data, {
                onSuccess: () => {
                    setData((prevData) => ({
                        ...prevData,
                        background_image: "",
                    }));
                },
                onError: (errors) => {
                    for (const key in errors) {
                        if (key == 'image') {
                            toast.error(errors[key], {
                                position: 'top-right',
                                autoClose: 1500,
                            });
                        }
                        else {
                            toast.error("Something goes wrong.", {
                                position: 'top-right',
                                autoClose: 1500,
                            });
                        }

                        break;
                    }
                },
            });
        }
        else {
            toast.error("Select Image", {
                position: 'top-right',
                autoClose: 1500,
            });
        }

    }
    // handle upload background image end

    // handle upload background image start
    const handleDeleteBackgroundImage = (e, fileName) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('student_certificate.custom_id_card.delete_background_image', { id: idCardCertificateData?.id, name: fileName }), {
                    onSuccess: () => {
                        setData((prevData) => ({
                            ...prevData,
                            [fileName]: "",
                        }));

                        const form_data = {
                            template_id: data?.template_id
                        }

                        router.post(route('student_certificate.custom_id_card'), form_data)
                    }
                });
            }
        });
    }
    // handle upload background image end

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentHeaderMenus title="STUDENTS" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    {
                        activeNext == false ? (
                            <div className="flex justify-end items-start pb-2.5">
                                <PrimaryButton
                                    className="educare-primary-btn-md-fill"
                                    onClick={handleNextPage}
                                >
                                    Next
                                </PrimaryButton>
                            </div>
                        ) : (
                            <div className="flex justify-start items-start pb-2.5">
                                <PrimaryButton
                                    className="educare-primary-btn-md-fill"
                                    onClick={handlePreviousPage}
                                    type="button"
                                >
                                    Back
                                </PrimaryButton>
                            </div>
                        )
                }

                    {activeNext === false ?
                        <CustomIdCardMain
                            selectedColumns={selectedColumns}
                            setSelectedColumns={setSelectedColumns}
                            data={data}
                            setData={setData}
                            errors={errors}
                            audienceTypeArray={audienceTypeArray}
                            orientationTypeArray={orientationTypeArray}
                            idCardCertificates={idCardCertificates}
                            fieldsData={fieldsData}
                            setFieldsData={setFieldsData}
                            reset={reset}
                            setIdCardCertificateData={setIdCardCertificateData}
                            setIsNew={setIsNew}
                            fields={fields}
                            initialHeaderData={initialHeaderData}
                            initialBodyData={initialBodyData}
                            initialFooterdata={initialFooterdata}
                            initialBackpageData={initialBackpageData}
                        />
                    :
                        <CustomFromMain
                            classrooms={classrooms}
                            headerData={headerData}
                            setHeaderData={setHeaderData}
                            bodyData={bodyData}
                            setBodyData={setBodyData}
                            footerData={footerData}
                            setFooterData={setFooterData}
                            backpageData={backpageData}
                            setBackpageData={setBackpageData}
                            data={data}
                            setData={setData}
                            idCardCertificateData={idCardCertificateData}
                            students={students}
                            handleUploadBackgroundImage={handleUploadBackgroundImage}
                            fontSizeArray={fontSizeArray}
                            staffs={staffs}
                            handleDeleteBackgroundImage={handleDeleteBackgroundImage}
                        />
                    }
                </div>
            </div>
        </div>
    );
};

export default CustomIdCardInnerLayout;
