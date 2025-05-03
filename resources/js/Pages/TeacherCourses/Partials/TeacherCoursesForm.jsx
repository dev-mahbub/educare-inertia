import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import YouTube from 'react-youtube';

const TeacherCoursesForm = ({
    classroomLearningMaterials
}) => {

    // YouTube options
    const opts = {
        height: '340',
        width: '100%',
        playerVars: {
            autoplay: 1,
            controls: 1,
        },
    };

    // Function to handle when the video is ready
    const _onReady = (event) => {
        event.target.pauseVideo();
    }

    // Lesson handler start
    const [lessonState, setLessonState] = useState({});
    const handleLessonStateBtnClick = (itemId) => {
        setLessonState(prevState => ({
            ...prevState,
            [itemId]: !prevState[itemId]
        }));
    }
    // Lesson handler end

    // Handle select lesson data start
    const [selectedLessonData, setSelectedLessonData] = useState(null);
    const handleSelectLesson = (lessonId) => {
        const selectedLesson = classroomLearningMaterials.map(learningMaterials => learningMaterials?.learning_materials.find(item => item.id === lessonId));
        setSelectedLessonData(selectedLesson);
    }
    // Handle select lesson data end

    // Function to handle file download
    const handleDocumentDownload = (fileUrl) => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = '';
        link.click();
    }
    
    // Function to handle file download
    const handleWorkSheetDownload = (fileUrl, fileName) => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName || '';
        link.click();
    }

    return (
        <div className="grid grid-cols-12">
            {/* Lesson tab */}
            <div className="col-span-12 lg:col-span-3">
                {classroomLearningMaterials.length > 0 ? (
                    classroomLearningMaterials.map(item => (
                        <div key={item.id} className="mb-4">
                            <button
                                className="flex items-center"
                                onClick={() => handleLessonStateBtnClick(item.id)}
                            >
                                <i className={`icon-down-arrow mr-2 bg-success text-white rounded-full p-[4px] text-[14px] ${lessonState[item.id] ? 'rotate-0' : 'rotate-180'} transition-transform`}></i>
                                {item.title}
                            </button>
                            {lessonState[item.id] && (
                                item?.learning_materials.length && (
                                    item.learning_materials.map(learningItem => <div key={learningItem.id}
                                        className="cursor-pointer"
                                        onClick={() => handleSelectLesson(learningItem.id)}
                                    >
                                        <ul>
                                            <li className="flex items-center ml-10 mt-2">
                                                <i className="icon-DotsNine mr-2"></i>
                                                {learningItem.title}
                                            </li>
                                        </ul>
                                    </div>)
                                )
                            )}
                        </div>
                    ))
                ) : ''}
            </div>
            {/* Lesson content */}
            <div className="col-span-12 lg:col-span-9">
                <div className="border-l border-border pl-5">
                    {selectedLessonData ? (
                        selectedLessonData.map(lessionData => <div key={lessionData.id}>
                            <h3 className="text-[20px] font-semibold">{lessionData.title}</h3>
                            <div className="mt-4">
                                {lessionData.learning_material_resources.map(materialResourse => <div key={materialResourse.id} className="mt-4">
                                    {
                                        materialResourse?.type === "Picture" && (
                                            <div>
                                                {
                                                    materialResourse?.file?.path && (
                                                        <div className="mt-10">
                                                            <img src={materialResourse?.file?.path ?? materialResourse?.file?.path} className="w-auto" alt="" />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                    {
                                        materialResourse?.type === "Link" && (
                                            <div className="mt-10">
                                                {
                                                    materialResourse?.link && (
                                                        <a href={materialResourse?.link} target="blank">
                                                            <span className="text-[22px] mr-1">
                                                                {materialResourse?.title}
                                                            </span>
                                                            <span className="text-info">
                                                                <i className="icon-ArrowSquareOut mr-[2px] text-[18px]"></i>
                                                                Open in a new tab
                                                            </span>
                                                        </a>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                    {
                                        materialResourse?.type === "Youtube" && (
                                            <div>
                                                {
                                                    materialResourse?.link && (
                                                        <div className="mt-10">
                                                            <div>
                                                                {
                                                                    materialResourse?.type === "Youtube" && (
                                                                        <h3 className="text-[20px] font-semibold my-2">{materialResourse?.title}</h3>
                                                                    )
                                                                }
                                                            </div>
                                                            {
                                                                materialResourse?.type === "Youtube" && (
                                                                    <YouTube videoId={materialResourse?.link.split('=').pop()} opts={opts} onReady={_onReady} />
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                    {
                                        materialResourse?.type === "Document" && (
                                            <div>
                                                {
                                                    materialResourse?.file?.path && (
                                                        <div className="mt-10">
                                                            <div>
                                                                {
                                                                    materialResourse?.type === "Document" && (
                                                                        <h3 className="text-[20px] font-semibold my-2">{materialResourse?.title}</h3>
                                                                    )
                                                                }
                                                            </div>
                                                            <div>
                                                                {
                                                                    materialResourse?.type === "Document" && (
                                                                        <p
                                                                            className="text-info cursor-pointer"
                                                                            onClick={() => handleDocumentDownload(materialResourse?.file?.path)}
                                                                        >
                                                                            Download {materialResourse?.file?.file_name}
                                                                        </p>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                    {
                                        materialResourse?.type === "WorkSheet" && (
                                            <div>
                                                {
                                                    materialResourse?.file?.path && (
                                                        <div className="mt-10">
                                                            <div>
                                                                {
                                                                    materialResourse?.type === "WorkSheet" && (
                                                                        <h3 className="text-[20px] font-semibold my-2">{materialResourse?.title}</h3>
                                                                    )
                                                                }
                                                            </div>
                                                            <div>
                                                                {
                                                                    materialResourse?.type === "WorkSheet" && (
                                                                        <p
                                                                            className="text-info cursor-pointer"
                                                                            onClick={() => handleWorkSheetDownload(materialResourse?.file?.path, materialResourse?.file?.file_name)}
                                                                        >
                                                                            Download {materialResourse?.file?.file_name}
                                                                        </p>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                    {
                                        materialResourse?.type === "Text" && (
                                            <div>
                                                {
                                                    materialResourse?.description && (
                                                        <div className="mt-10">
                                                            <h3 className="text-[20px] font-semibold my-2">{materialResourse?.description}</h3>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                    {
                                        materialResourse?.type === "Audio" && (
                                            <div>
                                                {
                                                    materialResourse?.file?.path && (
                                                        <div className="mt-10">
                                                            <h3 className="text-[20px] font-semibold my-2">{materialResourse?.title}</h3>
                                                            <div className="p-4 bg-gray-100 border rounded-lg">
                                                                <audio controls className="w-full h-12">
                                                                    <source src={materialResourse?.file?.path} type="audio/mpeg" />
                                                                    Your browser does not support the audio element.
                                                                </audio>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>)}
                            </div>
                            <div className="hidden flex-wrap justify-end gap-2.5 mt-5">
                                <PrimaryButton className="educare-primary-btn-md-fill">
                                    <i className='icon-CaretDoubleLeft mr-1'></i>
                                    Prev
                                </PrimaryButton>
                                <PrimaryButton className="educare-primary-btn-md-fill">
                                    Next
                                    <i className='icon-CaretDoubleRight ml-1'></i>
                                </PrimaryButton>
                            </div>
                        </div>)
                    ) : (
                        <div className="educare-input-field-notes my-2">
                            <ul>
                                <li> Select a chapter and its page </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherCoursesForm;
