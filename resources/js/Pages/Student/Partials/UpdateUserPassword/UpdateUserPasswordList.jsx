import PrimaryButton from "@/Components/PrimaryButton";
import RadioInputLabel from "@/Components/RadioInputLabel";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function UpdateUserPasswordList({ exitUser, credentStudents }) {

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors
    } = useForm({
        id: exitUser?.id,
        username: exitUser?.username,
        password: exitUser?.password,
    });

    useEffect(() => {
        setData(exitUser);
    }, [exitUser]);

    const handleAdmissionSourceData = (e) => {
        e.preventDefault();
        post(route("student.save_user_password"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    const concatName = (first_name = "Name", middle_name = null, last_name = null) => {
        const nameParts = [first_name, middle_name, last_name].filter(Boolean);
        return nameParts.join(' ');
    };

    console.log(exitUser)

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-7 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-PaperPlaneTilt"></i>
                                    Current login credentials
                                </h5>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sl. No</th>
                                            <th>Student</th>
                                            <th>Class</th>
                                            <th>User Name</th>
                                            <th>Password</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {credentStudents?.length > 0 ?
                                            credentStudents?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{concatName(item?.first_name, item?.middle_name, item?.last_name)}</td>
                                                    <td>{item?.class_name}</td>
                                                    {exitUser?.username == 'admission_no' &&
                                                        <td>{item?.admission_no}</td>
                                                    }
                                                    {exitUser?.username == 'father_mobile' &&
                                                        <td>{item?.father_phone}</td>
                                                    }
                                                    {exitUser?.password == 'admission_no' &&
                                                        <td>{item?.admission_no}</td>
                                                    }
                                                    {exitUser?.password == 'birth_date' &&
                                                        <td>{item?.birth_date_at}</td>
                                                    }
                                                    {exitUser?.password == 'student_name' &&
                                                        <td>{concatName(item?.first_name, item?.middle_name, item?.last_name)}</td>
                                                    }
                                                    {exitUser?.password == 'parent_name' &&
                                                        <td>{concatName(item?.father_first_name, item?.father_middle_name, item?.father_last_name)}</td>
                                                    }
                                                    {exitUser?.password == 'father_mobile' &&
                                                        <td>{item?.father_phone}</td>
                                                    }
                                                </tr>
                                            )) :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="7">Data not found</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 xl:col-span-5 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-PaperPlaneTilt"></i>
                                        Change username and password of student's parent
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleAdmissionSourceData}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12">
                                                <div className="col-span-6">
                                                    <div className="educare-common-card-title">
                                                        <h5>
                                                            <i className="icon-BookBookmark"></i>
                                                            Check Username
                                                        </h5>
                                                    </div>
                                                    <div className="educare-radio-field-styles flex gap-3 mt-2">
                                                        <RadioInputLabel
                                                            name="username"
                                                            value="admission_no"
                                                            label="Admission Number"
                                                            checked={data?.username === "admission_no"}
                                                            onChange={(e) => setData("username", "admission_no")}
                                                        />
                                                    </div>
                                                    <div className="educare-radio-field-styles flex gap-3 mt-2">
                                                        <RadioInputLabel
                                                            name="username"
                                                            value="father_mobile"
                                                            label="Father Mobile"
                                                            checked={data?.username === "father_mobile"}
                                                            onChange={(e) => setData("username", "father_mobile")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 mt-6">
                                                    <div className="educare-common-card-title">
                                                        <h5>
                                                            <i className="icon-BookBookmark"></i>
                                                            Check Password
                                                        </h5>
                                                    </div>
                                                    <div className="educare-radio-field-styles flex gap-3 mt-2">
                                                        <RadioInputLabel
                                                            name="password"
                                                            value="student_name"
                                                            label="Student Name"
                                                            checked={data?.password === "student_name"}
                                                            onChange={(e) => setData("password", "student_name")}
                                                        />
                                                    </div>
                                                    <div className="educare-radio-field-styles flex gap-3 mt-2">
                                                        <RadioInputLabel
                                                            name="password"
                                                            value="parent_name"
                                                            label="Parent Name"
                                                            checked={data?.password === "parent_name"}
                                                            onChange={(e) => setData("password", "parent_name")}
                                                        />
                                                    </div>
                                                    <div className="educare-radio-field-styles flex gap-3 mt-2">
                                                        <RadioInputLabel
                                                            name="password"
                                                            value="admission_no"
                                                            label="Admission Number"
                                                            checked={data?.password === "admission_no"}
                                                            onChange={(e) => setData("password", "admission_no")}
                                                        />
                                                    </div>
                                                    <div className="educare-radio-field-styles flex gap-3 mt-2">
                                                        <RadioInputLabel
                                                            name="password"
                                                            value="birth_date"
                                                            label="DOB"
                                                            checked={data?.password === "birth_date"}
                                                            onChange={(e) => setData("password", "birth_date")}
                                                        />
                                                    </div>
                                                    <div className="educare-radio-field-styles flex gap-3 mt-2">
                                                        <RadioInputLabel
                                                            name="password"
                                                            value="father_mobile"
                                                            label="Father Mobile"
                                                            checked={data?.password === "father_mobile"}
                                                            onChange={(e) => setData("password", "father_mobile")}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-6">
                                                <div className="flex flex-wrap gap-2.5 mt-2">
                                                    <PrimaryButton
                                                        className="educare-primary-btn-lg-fill"
                                                        type="submit"
                                                        disabled={processing}
                                                    >
                                                        Save
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6">
                        <h5>Note:</h5>
                        <div>
                            <ol>
                                <li>1. You can update username, password or both</li>
                                <li>2. Username & Password will remain unchanged if checked value not exists</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
