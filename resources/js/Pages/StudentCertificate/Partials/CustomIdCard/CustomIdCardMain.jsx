import CustomIdCardField from "./CustomIdCardField";
import CustomIdCardFrom from "./CustomIdCardFrom";

export default function CustomIdCardMain({
    selectedColumns,
    setSelectedColumns,
    data,
    setData,
    errors,
    audienceTypeArray,
    orientationTypeArray,
    idCardCertificates,
    fieldsData,
    setFieldsData,
    reset,
    setIdCardCertificateData,
    setIsNew,
    fields,
    initialHeaderData,
    initialBodyData,
    initialFooterdata,
    initialBackpageData,
}) {

    const handleAdmissionSourceData = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="xl:col-span-3 col-span-12">
                        <CustomIdCardFrom
                            handleAdmissionSourceData={handleAdmissionSourceData}
                            data={data}
                            setData={setData}
                            errors={errors}
                            audienceTypeArray={audienceTypeArray}
                            orientationTypeArray={orientationTypeArray}
                            idCardCertificates={idCardCertificates}
                            setFieldsData={setFieldsData}
                            setSelectedColumns={setSelectedColumns}
                            reset={reset}
                            setIdCardCertificateData={setIdCardCertificateData}
                            setIsNew={setIsNew}
                            fields={fields}
                            initialHeaderData={initialHeaderData}
                            initialBodyData={initialBodyData}
                            initialFooterdata={initialFooterdata}
                            initialBackpageData={initialBackpageData}
                        />
                    </div>
                    <div className="xl:col-span-9 col-span-12">
                        <CustomIdCardField
                            data={data}
                            setData={setData}
                            errors={errors}
                            fieldsData={fieldsData}
                            setFieldsData={setFieldsData}
                            selectedColumns={selectedColumns}
                            setSelectedColumns={setSelectedColumns}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
