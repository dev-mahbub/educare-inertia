
import { createContext, useState } from "react";
export const myContext = createContext();
const ConfigurationContextApi = ({ children }) => {
    const [user, setuser] = useState("test Context Value");

    const [customErrors, setCustomErrors] = useState({});

    //stop one state
    const [selectedBoard, setSelectedBoard] = useState({});
    //step two state
    const [stepTwoFormData, setStepTwoFormData] = useState({});
    const [selectedClass, setSelectedClass] = useState([]);
    const [selectedClassNameIds, setSelectedClassNameIds] = useState([]);
    const [formMode, setFormMode] = useState("create");
    const [editableData, setEditableData] = useState({});
    const [selectedRuleType, setSelectedRuleType] = useState("");
    //state three
    const [stepThreeFormData, setStepThreeFormData] = useState({});
    const [stepFourFormData, setStepFourFormData] = useState({});
    const [ruleType, setRuleType] = useState('');
    //state four
    const [itemValues, setItemValues] = useState({
        display_name: "",
        select_subject: "",
        persentance: "",
    });

    // pass context value
    const contextValue = {
        user,
        setuser,
        customErrors,
        setCustomErrors,
        //step one
        selectedBoard,
        setSelectedBoard,
        //step two
        stepTwoFormData,
        setStepTwoFormData,
        selectedClass,
        setSelectedClass,
        selectedClassNameIds,
        setSelectedClassNameIds,
        formMode,
        setFormMode,
        editableData,
        setEditableData,
        selectedRuleType,
        setSelectedRuleType,
        //step three
        stepThreeFormData,
        setStepThreeFormData,
        //step four
        itemValues,
        setItemValues,
        ruleType,
        setRuleType,
        stepFourFormData,
        setStepFourFormData

    };
    return (
        <myContext.Provider value={contextValue}> {children} </myContext.Provider>
    );
};

export default ConfigurationContextApi;
