import Loader from "@/Components/Loader";
import TextInput from "@/Components/TextInput";
import { concatName } from "@/Hooks/GlobalFunction";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

const BiometricUpdateList = ({
    studentsBio,
    loading,
    setLoading,
    formData
}) => {

    // old code
    // const initialFormData = studentsBio?.map((item) => ({
    //     id: item.id || '',
    //     biometric_code: item.biometric_code || '',
    // }));

    // const [data, setData] = useState(initialFormData);

    // new code
    const [data, setData] = useState([]);

    const handleInputChange = (index, field, value) => {
        setData((prevData) => {
            const newData = [...prevData];
            newData[index] = { ...newData[index], [field]: value };
            return newData;
        });
    };

    // old code
    // do not remove
    const handleUpdateBio = (e) => {
        e.preventDefault();

        // router.post(route('student.update_biometric_update'), data, {
        //     onSuccess: () => {
        //         router.post(route('student.update_biometric'), formData)
        //     }
        // });
    };

    //new code
    const handleUpdateStudentBio = (e, id) => {
        e.preventDefault();

        const selectedData = data?.find(item => item?.id == id);

        const form_data = {
            id: selectedData?.id,
            biometric_code: selectedData?.biometric_code,
        }

        router.post(route('student.update_biometric_update'), form_data, {
            onSuccess: () => {
                setData([]);

                router.post(route('student.update_biometric'), formData);
            }
        });
    };

    useEffect(() => {
        setData(studentsBio);
        setLoading(false);
    }, [studentsBio]);


    return (
        <div className="educare-admission-list-inner">
            <form onSubmit={handleUpdateBio}>
                <div className="educare-admission-list-inner-wrapper">
                    <div className="educare-admission-list without-action-last-child pb-none">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sl. No</th>
                                    <th>Admission Number</th>
                                    <th>Name</th>
                                    <th>Father Name</th>
                                    <th>Biometric codes</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <Loader></Loader>
                            ) : (
                                <tbody>
                                    {data?.length > 0 ?
                                        data?.map((item2, index) => (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{item2?.admission_no}</td>
                                                <td>{concatName(item2?.first_name, item2?.middle_name, item2?.last_name)}</td>
                                                <td>{concatName(item2?.father_first_name, item2?.father_middle_name, item2?.father_last_name)}</td>
                                                <td>
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            id="biometric_code"
                                                            // defaultValue={item2?.biometric_code ?? ''}
                                                            value={item2?.biometric_code ?? ''}
                                                            onChange={(e) => handleInputChange(index, 'biometric_code', e.target.value)}
                                                            className="block"
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="educare-create-school-settings-list-success"
                                                        onClick={(e) => {
                                                            handleUpdateStudentBio(e, item2?.id)
                                                        }}
                                                    >
                                                        <i className="inline-block icon-check-1"></i>
                                                    </button>
                                                    {/* <button type="submit" className="educare-create-school-settings-list-success">
                                                        <i className="inline-block icon-check-1"></i>
                                                    </button> */}
                                                </td>
                                            </tr>
                                        )) :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="6">Data not found</td>
                                        </tr>
                                    }
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BiometricUpdateList;
