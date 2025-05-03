import React from 'react';
import { useState } from 'react';

const Dummy = () => {
    const [formFields, setFormFields] = useState([
        { name: '', age: '' },
      ])
    
      const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
      }
   
      const submit = (e) => {
        e.preventDefault();
        console.log(formFields)
      }
    
      const addFields = () => {
        let object = {
          name: '',
          age: ''
        }
    
        setFormFields([...formFields, object])
      }
    
      const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
      }

    return (
        <div className="App">
            <form onSubmit={submit}>
                {formFields.map((form, index) => {
                return (
                    <div key={index}>
                    <input
                        name='name'
                        placeholder='Name'
                        onChange={event => handleFormChange(event, index)}
                        value={form.name}
                    />
                    <input
                        name='age'
                        placeholder='Age'
                        onChange={event => handleFormChange(event, index)}
                        value={form.age}
                    />
                    <button onClick={() => removeFields(index)}>Remove</button>
                    </div>
                )
                })}
            </form>
            <button onClick={addFields}>Add More..</button>
            <br />
            <button onClick={submit}>Submit</button>
        </div>
    );
};

export default Dummy;




// export default function CreateAssessmentForm({ school, className = "" }) {
//   const [formFields, setFormFields] = useState([
//       { assessment_subtitle_input_id: '', assessment_subtitle_select_id: '' },
//     ])
//   const assessmentSubtitleInput = useRef();
//   const assessmentSubtitleSelectInput = useRef();
  

//   const {
//       data,
//       setData,
//       errors,
//       post,
//       reset,
//       processing,
//       recentlySuccessful,
//   } = useForm({
//       assessment_subtitle_input_id: "",
//       assessment_subtitle_select_id: "",
//   });

//   const createAssessmentData = (e) => {
//       e.preventDefault();

//       post(route("school.save"), {
//           preserveScroll: true,
//           onSuccess: () => reset(),
//           onError: (errors) => {
//               // if (errors.city) {
//               //     reset("city", "zip");
//               //     cityInput.current.focus();
//               // }
//           },
//       });
//   };
// console.log(data, 'hi')
// // console.log(formFields, 'hello')
//   const handleFormChange = (event, index, field) => {
//       const updatedFields = [...formFields];
//       updatedFields[index][field] = event.target.value;
//       setFormFields(updatedFields);

//       setData(prevData => ({
//           ...prevData,
//           [field]: event.target.value,
//       }));
//   }
  
//   const addFields = () => {
//       setFormFields([...formFields, {assessment_subtitle_input_id: '', assessment_subtitle_select_id: ''}]);
//   }
  
//   const removeFields = (index) => {
//       let updatedFormFields = [...formFields];
//       updatedFormFields.splice(index, 2);
//       setFormFields(updatedFormFields);
//   }
//   return (
//       <>
//       <div className="educare-create-school-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
//           <form onSubmit={createAssessmentData}>
//               <div className="grid grid-cols-12 sm:gap-[20px] font-primary">
//                   <div className="col-span-12">
//                       <div className="educare-create-school-details">
//                           <div className="educare-create-school-details-form-wrap">
//                               <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
//                                   <div className="educare-school-form-action-title">
//                                       <h5>
//                                           <img src={infoIcon} alt="" />
//                                           Create Assessment
//                                       </h5>
//                                   </div>
//                                   <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
//                                       <div className="grid grid-cols-12 gap-5">
                                          
                                          
//                                           <div className="col-span-12">
//                                               <div className="educare-repeatable-input-field-styles">
//                                                   <h6 className="text-[15px] text-headingLight mb-1 font-medium">
//                                                       Sub Title
//                                                   </h6>
//                                                   <div className="flex flex-col gap-4">
//                                                       {formFields.map((form, index) => (
//                                                               <div
//                                                                   key={index}
//                                                                   className="educare-repeatable-input-field-style-single"
//                                                               >
//                                                                   <div className="educare-input-field-styles">
//                                                                       <TextInput
//                                                                           id="assessment_subtitle_input_id" 
//                                                                           name="assessment_subtitle_input_id"
//                                                                           ref={assessmentSubtitleInput}
//                                                                           onChange={(event) => handleFormChange(event, index, "assessment_subtitle_input_id")}
//                                                                           value={form.assessment_subtitle_input_id}
//                                                                           className="block"
//                                                                       />
//                                                                       <InputError
//                                                                           message={
//                                                                               errors.assessment_subtitle_input_id
//                                                                           }
//                                                                           className="mt-2"
//                                                                       />
//                                                                   </div>
//                                                                   <div className="educare-select-field-styles">
//                                                                       <SelectInput
//                                                                           id="assessment_subtitle_select_id" 
//                                                                           name="assessment_subtitle_select_id"
//                                                                           data_label="Subject"
//                                                                           data={[]}
//                                                                           ref={assessmentSubtitleSelectInput}
//                                                                           onChange={(event) => handleFormChange(event, index, "assessment_subtitle_select_id")}
//                                                                           value={form.assessment_subtitle_select_id}
//                                                                           className="block"
//                                                                       />
//                                                                       <InputError
//                                                                           message={
//                                                                               errors.assessment_subtitle_select_id
//                                                                           }
//                                                                           className="mt-2"
//                                                                       />
//                                                                   </div>
//                                                                   <div className="educare-repeatable-input-field-style-single-btn">
//                                                                       {index >
//                                                                       0 ? (
//                                                                           <button
//                                                                               type="button"
//                                                                               onClick={() =>
//                                                                                   removeFields(
//                                                                                       index
//                                                                                   )
//                                                                               }
//                                                                           >
//                                                                               <i className="icon-minus"></i>
//                                                                           </button>
//                                                                       ) : null}
//                                                                       <button
//                                                                           className={`${
//                                                                               index >
//                                                                               0
//                                                                                   ? "hidden"
//                                                                                   : "inline-block"
//                                                                           }`}
//                                                                           type="button"
//                                                                           onClick={
//                                                                               addFields
//                                                                           }
//                                                                       >
//                                                                           <i className="icon-plus"></i>
//                                                                       </button>
//                                                                   </div>
//                                                               </div>
//                                                           )
//                                                       )}
//                                                   </div>
//                                               </div>
//                                           </div>
//                                       </div>
//                                   </div>
//                               </div>
//                           </div>
//                           {/* school details form start */}
//                       </div>
//                   </div>
//               </div>
//           </form>
//       </div>
//       </>
//   );
// }
