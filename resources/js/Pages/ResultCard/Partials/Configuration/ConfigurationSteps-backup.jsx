import SecondaryButton from "@/Components/SecondaryButton";
import { router, useForm } from "@inertiajs/react";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { useContext, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { myContext } from "./ConfigurationContextApi";
import ConfigurationStepOne from "./ConfigurationStepOne/ConfigurationStepOne";
import ConfigurationStepTwo from "./ConfigurationStepTwo/ConfigurationStepTwo";

export default function ConfigurationSteps({
    dummyData,
    classNames,
    exams,
    subjects,
    resultCardConfigurationLists,
    resultCardConfigurationClassNameIds,
    boards,
    ruleTypes
}) {
    //use context api
    const {
        stepTwoFormData,
        stepThreeFormData,
        setStepFourFormData,
        stepFourFormData,
        selectedBoard,
        selectedClassNameIds,
        setCustomErrors,
        formMode,
        setFormMode,
        setEditableData,
        editableData,
        selectedRuleType
    } = useContext(myContext)

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({});

    //stepper function start
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const isStepOptional = (step) => {
        return step === 3 || (step == 1 && editableData?.id != null);
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        if (activeStep < 5) {
            // Limit to 3 steps
            if (activeStep == 1) {
                let classNameExists = false;
                let editableClassNameExists = false;

                const editableConfigurationClassNameIds = editableData?.class_names?.map(item => item?.id);

                for (const id of selectedClassNameIds) {
                    if (resultCardConfigurationClassNameIds?.includes(id)) {
                        classNameExists = true;
                        break;
                    }
                }

                for (const id of selectedClassNameIds) {
                    if (!editableConfigurationClassNameIds?.includes(id) && resultCardConfigurationClassNameIds?.includes(id)) {
                        editableClassNameExists = true;
                        break;
                    }
                }

                if ((classNameExists && formMode == 'create') || (editableClassNameExists && formMode == 'edit')) {
                    toast.error("Selected class already exist in rules.", {
                        position: 'top-right',
                        autoClose: 1500,
                    });

                    return;
                }
                else {
                    if(formMode == 'edit') {
                        router.put(route('result_card.configuration.update', editableData?.id), stepTwoFormData, {
                            // onSuccess: () => setActiveStep((prevActiveStep) => prevActiveStep + 1),
                            onSuccess: () => handleStepTwoSuccess(),
                            onError: (errors) => {
                                setCustomErrors(errors);

                                for (const key in errors) {
                                    if (key == 'class_name_ids') {
                                        toast.error("Please select atleast one class.", {
                                            position: 'top-right',
                                            autoClose: 1500,
                                        });

                                        break;
                                    }
                                }
                            }
                        });
                    }
                    else {
                        router.post(route('result_card.configuration.save'), stepTwoFormData, {
                            // onSuccess: () => setActiveStep((prevActiveStep) => prevActiveStep + 1),
                            onSuccess: () => handleStepTwoSuccess(),
                            onError: (errors) => {
                                setCustomErrors(errors);

                                for (const key in errors) {
                                    if (key == 'class_name_ids') {
                                        toast.error("Please select atleast one class.", {
                                            position: 'top-right',
                                            autoClose: 1500,
                                        });

                                        break;
                                    }
                                }
                            }
                        });
                    }

                }
                // router.post(route('result_card.step_two.save'), stepTwoFormData, {
                //     onSuccess: () => setActiveStep((prevActiveStep) => prevActiveStep + 1),
                // });
            } else if (activeStep == 2) {
                router.post(route('result_card.step_three.save'), stepThreeFormData, {
                    onSuccess: () => setActiveStep((prevActiveStep) => prevActiveStep + 1),
                });
            } else if (activeStep === 3) {
                router.post(route('result_card.step_four.save'), stepFourFormData, {
                    onSuccess: () => setActiveStep((prevActiveStep) => prevActiveStep + 1),
                });
            }
            else {
                if (activeStep === 0 && selectedBoard?.id == null) {
                    toast.error("Please select board.", {
                        position: 'top-right',
                        autoClose: 1500,
                    });

                    return;
                }

                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        }

        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    //stepper function end



    // handle step two success start
    const handleStepTwoSuccess = () => {
        // do not remove this code. this is for next step
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
        router.post(route('result_card.configuration'));
    }
    // handle step two success end


    return (
        <div className="educare-create-school-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <div className="educare-stepper-area">
                <Box sx={{ width: "100%" }}>
                    <div className="educare-exam-stepper-label mb-5">
                        <Stepper activeStep={activeStep}>
                            <Step>
                                <StepLabel>Select Board</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Select Class</StepLabel>
                            </Step>
                            {/* do not remove this code */}

                            {/* <Step>
                                <StepLabel>Select Exam</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Select Subject</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Summary</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Done</StepLabel>
                            </Step> */}
                        </Stepper>
                    </div>

                    {activeStep === 0 && (
                        <div>
                            <ConfigurationStepOne
                                boards={boards}
                            />
                        </div>
                    )}

                    {activeStep === 1 && (
                        <div className="">
                            <ConfigurationStepTwo
                                classNames={classNames}
                                exams={exams}
                                resultCardConfigurationLists={resultCardConfigurationLists}
                                ruleTypes={ruleTypes}
                            />
                        </div>
                    )}
                    {/* do not remove this code */}

                    {/* {activeStep === 2 && (
                        <div className="shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] py-[26px] maxXs:p-[15px] rounded-lg">
                            <ConfigurationStepThree
                                exams={exams}
                                ruleTypes={ruleTypes}
                            />
                        </div>
                    )}

                    {activeStep === 3 && (
                        <div className="shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] py-[26px] maxXs:p-[15px] rounded-lg">
                            <ConfigurationStepFour
                            dummyData={dummyData}
                            subjects = {subjects}
                            />
                        </div>
                    )}

                    {activeStep === 4 && (
                        <div className="shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] py-[26px] maxXs:p-[15px] rounded-lg">
                            <ConfigurationStepFive />
                        </div>
                    )}

                    {activeStep === 5 && (
                        <div className="shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] py-[26px] maxXs:p-[15px] rounded-lg">
                            <ConfigurationStepSix />
                        </div>
                    )} */}

                    <div className="educare-exam-stepper-btn mt-5 bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] maxXs:p-[15px] rounded-lg">
                        {activeStep > 0 &&
                            <SecondaryButton
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Previous
                            </SecondaryButton>
                        }
                        <Box sx={{ flex: "1 1 auto" }} />
                        {/* do not remove this code */}
                        {/* {isStepOptional(activeStep) && (
                            <SecondaryButton
                                className="mr-4"
                                onClick={handleSkip}
                                sx={{ mr: 1 }}
                            >
                                Skip
                            </SecondaryButton>
                        )} */}

                        {activeStep === 5 ? (
                            <button type="button"
                                className="inline-flex h-10 items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150"
                                onClick={handleReset}
                            >
                                Finish
                            </button>
                        ) : (
                            <button type="button"
                                className="inline-flex h-10 items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150"
                                onClick={handleNext}
                            >
                                {/* {activeStep === 5 ? "Finish" : "Next"} */}
                                {activeStep === 5 ? "Finish" : "Save And Continue"}
                            </button>
                        )}
                    </div>
                </Box>
            </div>
        </div>
    );
}
