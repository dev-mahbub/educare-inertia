import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function EditSurveyForm({
    surveyAudience,
    classNamesData,
    survey
}) {

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
      } = useForm({
        title: survey?.title ?? "",
        description: survey?.description ?? "",
        instructions_desc: survey?.instructions_desc ?? "",
        survey_audience: survey?.survey_audience ?? "",
        class_name_ids: [],
        is_published: survey?.is_published ?? false,
      });

      useEffect(() => {
        let class_name_ids = [];

        if (data?.survey_audience == 'Student') {
            class_name_ids = survey?.survey_classes?.map(item => item?.class_name_id);
        }

        setData((prevData) => ({
            ...prevData,
            class_name_ids: class_name_ids
        }));
      }, [data?.survey_audience, survey]);

      const handleClassCheckbox = (class_name_id, is_checked) => {
        // Update the checkbox data
        setData((prevData) => ({ ...prevData, [class_name_id]: is_checked }));

        // Update the class data array
        setData((prevFormData) => {
          const existingClass = prevFormData.class_name_ids.find((item) => item.class_name_id === class_name_id);
          if (existingClass) {
            // Update existing class data
            return {
              ...prevFormData,
              class_name_ids: prevFormData.class_name_ids.map((item) =>
                item.class_name_id === class_name_id ? { ...item, is_checked } : item
              ),
            };
          } else {
            // Add new class data
            return {
              ...prevFormData,
              class_name_ids: [...prevFormData.class_name_ids, { class_name_id, is_checked }],
            };
          }
        });
      };

    const handleUpdateData = (e) => {
        e.preventDefault();

        put(route("survey.update", survey?.id), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    return (
        <div className="educare-create-school-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <form onSubmit={handleUpdateData}>
                <div className="grid grid-cols-12 sm:gap-[20px] font-primary">
                    <div className="col-span-12">
                        <div className="educare-create-school-details">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className="educare-create-school-details-form-wrap-border">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-12">
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
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="description"
                                                                value="Description and Objective"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="description"
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
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="instructions_desc"
                                                                value="Instructions:"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="instructions_desc"
                                                        value={
                                                            data.instructions_desc
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "instructions_desc",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.instructions_desc
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="survey_audience"
                                                                value="Audience"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="survey_audience"
                                                        data_label="audience"
                                                        data={surveyAudience}
                                                        value={
                                                            data.survey_audience
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "survey_audience",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.survey_audience
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {data.survey_audience === "Student" && (
                                                <div className="col-span-12">
                                                    <div className="educare-input-field-styles-label-wrap mb-2">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor=""
                                                                value="Class"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <div className="grid gap-x-5 gap-y-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">


                                                        {classNamesData?.map((classItem, index) => (
                                                            <div className="educare-single-role-checkbox" key={index}>
                                                                <div className="educare-checkbox-field-styles">
                                                                    <Checkbox
                                                                        id={`class_name_id_${classItem.id}`}
                                                                        name={classItem.id}
                                                                        checked={data?.class_name_ids?.includes(classItem.id)}
                                                                        onChange={(e) =>
                                                                            handleClassCheckbox(e.target.name, e.target.checked)
                                                                        }
                                                                    />
                                                                </div>
                                                                <label htmlFor={`class_name_id_${classItem.id}`}>
                                                                    {classItem.title}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles-label-wrap mb-2">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor=""
                                                            value="Mode"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <div className="grid gap-x-5 gap-y-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                                                    <div className="educare-single-role-checkbox">
                                                        <div className="educare-checkbox-field-styles">
                                                            <Checkbox
                                                                id="is_published"
                                                                name="is_published"
                                                                checked={data.is_published}
                                                                onChange={(e) => setData((prevData) => ({ ...data, [e.target.name]: e.target.checked }))}
                                                            />
                                                        </div>
                                                        <label htmlFor="is_published">
                                                            Is Published
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* school details form start */}
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                    <Link href={route('survey.survey_list')} className="educare-gray-btn-lg-stroke">
                        Cancel
                    </Link>
                    <PrimaryButton className="educare-primary-btn-lg-fill">
                        Update
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}
