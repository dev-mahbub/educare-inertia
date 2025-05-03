import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from 'react';
import AcademicContentLeft from './AcademicContentLeft';
import AcademicContentRight from './AcademicContentRight';

const AcademicContentForm = ({
    classNames,
    subjects,
    learningMaterialGroups,
    user,
    onlineTopics,
    resourceTypes,
    studentClassNames,
    classrooms,
    classSubjects,
    shareLearningMaterialGroups
}) => {

    //  const [formFields, setFormFields] = useState([
    //     {
    //         resourse_type: "link",
    //         title: "",
    //         link: "",
    //         youtube_link: "",
    //         worksheet: "",
    //         document: "",
    //         upload_picture: "",
    //         upload_audio: "",
    //         description: "",
    //     },
    // ]);
     const [formFields, setFormFields] = useState([]);

    const [selectedLearningMaterialGroupId, setSelectedLearningMaterialGroupId] = useState(null);
    const [selectedLearningMaterialGroup, setSelectedLearningMaterialGroup] = useState({});
    const [materialResourse, setMaterialResourse] = useState('');
    const [classroomData, setClassroomData] = useState([]);
    const [classSubjectData, setClassSubjectData] = useState([]);

    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        class_name_id: '',
        subject_id: '',
        title: '',
        online_topic_id: '',
        content: '',
        resources: formFields,

        academic_content_id_c: '',
        academic_content_id_d: '',
        academic_content_id_f: '',
        academic_content_id_g: '',

        //for checkbox
        share_multiple_grades_english: '',
        share_multiple_grades_math: '',
        share_multiple_grades_science: '',
        share_multiple_grades_english_literature: '',

         // receipt
         account_group_id: "",
         receipt_no: "",
         payment_date_at: "",
         description: "",
         // item
         items: formFields,
         total: 0,
         //show resourse
         selected_class: '',
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            resources: formFields
        }))
    }, [formFields]);

    useEffect(() => {
        const selectedGroup = learningMaterialGroups?.find(item => item?.id == selectedLearningMaterialGroupId);

        setSelectedLearningMaterialGroup(selectedGroup ?? {});
    }, [selectedLearningMaterialGroupId, learningMaterialGroups]);

    useEffect(() => {
        setClassroomData(classrooms);
    }, [classrooms]);

    useEffect(() => {
        setClassSubjectData(classSubjects);
    }, [classSubjects]);

    const AcademicContentData = (e) => {
        e.preventDefault();
    };

    //handle class data
    const [classOpen, setClassOpen] = useState(false);
    const handleClassData = () => {
        setClassOpen(!classOpen)
    }

    // handle select learning material group start
    const handleSelectLearningMaterialGroup = (id) => {
        setSelectedLearningMaterialGroupId(id);
    }
    // handle select learning material group end

    // handle filter learning material data start
    const handleFilterLearningMaterial = () => {
        const form_data = {
            class_name_id: data?.class_name_id,
            subject_id: data?.subject_id
        }

        router.post(route('asset.create'), form_data);
    }
    // handle filter learning material data end

    return (
        <>
            <div className="educare-academic-content-management-grid px-[20px] py-[20px]">
                <form onSubmit={AcademicContentData}>
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="col-span-5 maxLg:col-span-12">
                            <AcademicContentLeft
                                handleClassData={handleClassData}
                                data={data}
                                setData={setData}
                                errors={errors}
                                classNames={classNames}
                                subjects={subjects}
                                learningMaterialGroups={learningMaterialGroups}
                                handleSelectLearningMaterialGroup={handleSelectLearningMaterialGroup}
                                selectedLearningMaterialGroup={selectedLearningMaterialGroup}
                                user={user}
                                setSelectedLearningMaterialGroup={setSelectedLearningMaterialGroup}
                                setMaterialResourse={setMaterialResourse}
                                setSelectedLearningMaterialGroupId={setSelectedLearningMaterialGroupId}
                                handleFilterLearningMaterial={handleFilterLearningMaterial}
                                studentClassNames={studentClassNames}
                                classrooms={classroomData}
                                classSubjects={classSubjectData}
                                setClassroomData={setClassroomData}
                                setClassSubjectData={setClassSubjectData}
                            />
                        </div>
                        <div className="col-span-7 maxLg:col-span-12">
                            <AcademicContentRight
                                data={data}
                                setData={setData}
                                errors={errors}
                                formFields={formFields}
                                setFormFields={setFormFields}
                                selectedLearningMaterialGroup={selectedLearningMaterialGroup}
                                user={user}
                                onlineTopics={onlineTopics}
                                materialResourse={materialResourse}
                                setMaterialResourse={setMaterialResourse}
                                resourceTypes={resourceTypes}
                                handleFilterLearningMaterial={handleFilterLearningMaterial}
                                classrooms={classroomData}
                                classSubjects={classSubjectData}
                                setClassroomData={setClassroomData}
                                setClassSubjectData={setClassSubjectData}
                                studentClassNames={studentClassNames}
                                classNames={classNames}
                                shareLearningMaterialGroups={shareLearningMaterialGroups}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AcademicContentForm;
