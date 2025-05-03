import { useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import Checkbox from '@/Components/Checkbox';

export default function CheckSiblingPopupForm({
    siblingData,
    editSiblingPopupOpen,
    setSiblingEditPopupOpen,
    onSelectStudents,
}) {

    const [intSibling, setIntSibling] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);

    useEffect(() => {
        setIntSibling(siblingData);
        setSelectedData(siblingData?.map((item) => ({ id: item.id || '', is_checked: false })));
        setSelectAllChecked(false);
    }, [siblingData]);

    const handleSelectAllCheckboxChange = (checked) => {
        setSelectAllChecked(checked);
        setSelectedData((prevData) => prevData.map((item) => ({ ...item, is_checked: checked })));
    };

    const handleCheckboxSelect = (id, index, checked) => {
        setSelectedData((prevData) => {
            const newData = [...prevData];
            newData[index] = { ...newData[index], id, is_checked: checked };
            return newData;
        });
        const allChecked = selectedData.every((item) => item.is_checked);
        setSelectAllChecked(allChecked);
    };

    const concatName = (first_name, middle_name, last_name) => {
        const nameParts = [first_name, middle_name, last_name].filter(Boolean);
        return nameParts.join(' ');
    };

    const closeModal = () => {
        setSiblingEditPopupOpen(false);
    };

    const handleSelectedSingling = () => {
        const selectedStudents = selectedData.filter((student) => student.is_checked);
        onSelectStudents(selectedStudents);
        setSiblingEditPopupOpen(false);
    };

    return (
        <div className='educare-admission-follow-up-area space-y-6'>
            <Modal show={editSiblingPopupOpen} onClose={closeModal}>
                <form className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Sibling</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-admission-list-area">
                                <div className="educare-admission-list-inner">
                                    <div className="educare-admission-list-inner-wrapper">
                                        <div className="educare-admission-list">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Check</th>
                                                        <th>Id</th>
                                                        <th>Adm No.</th>
                                                        <th>Roll No.</th>
                                                        <th>Class</th>
                                                        <th>Student Name</th>
                                                        <th>Father Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {siblingData?.length ?
                                                        siblingData?.map((student, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div className="educare-create-school-settings-list-checka width-full">
                                                                        <Checkbox
                                                                            id={`is_checked_${index}`}
                                                                            name={`is_checked_${index}`}
                                                                            checked={selectedData[index]?.is_checked || false}
                                                                            onChange={(e) => handleCheckboxSelect(student?.id, index, e.target.checked)}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td>{student.id}</td>
                                                                <td>{student?.admission_no}</td>
                                                                <td>{student?.roll_no}</td>
                                                                <td>{student?.classTitle}</td>
                                                                <td>{concatName(student?.first_name, student?.middle_name, student?.last_name)}</td>
                                                                <td>{concatName(student?.father_first_name, student?.father_middle_name, student?.father_last_name)}</td>
                                                            </tr>
                                                        ))
                                                        :
                                                        <tr>
                                                            <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                                        </tr>
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Start Field  */}
                            <div className='flex gap-1.5'>
                                <div className="educare-create-school-settings-list-checka width-full">
                                    <Checkbox
                                        id="select_all_student_id"
                                        name="select_all_student_id"
                                        checked={selectAllChecked}
                                        onChange={(e) => handleSelectAllCheckboxChange(e.target.checked)}
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="select_all_fee_type"
                                        value="Click to save to all Siblings."
                                        className='cursor-pointer'
                                    />
                                </div>
                            </div>
                            {/* Start Field  */}
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-end gap-2.5 mt-6">
                        <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                        <PrimaryButton className="educare-primary-btn-md-fill" onClick={handleSelectedSingling}>Update</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
