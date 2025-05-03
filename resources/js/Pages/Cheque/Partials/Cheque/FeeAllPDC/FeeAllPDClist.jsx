import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loader from "@/Components/Loader";
import SelectInput from "@/Components/SelectInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from 'react';

const FeeAllPDClist = ({ students = '', cheques = [], cheque_all_status = [], classrooms = [] }) => {
    const [statusPopup, setStatusPopup] = useState(false);
    const [chequeData, setChequeData] = useState([]);
    const [filteredChequesData, setFilteredChequesData] = useState([]);
    const [updatedChequeStatus, setUpdatedChequeStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        classroom_id: "",
    });

    useEffect(() => {
        setFilteredChequesData(cheques);
        setLoading(false);
    }, [cheques]);

    // handle filter cheque start
    const filterChequesData = (e) => {
        e.preventDefault();

        const form_data = { classroom_id: e.target.value }

        setLoading(false);

        router.post(route("cheque.all_pdc"), form_data)
    };
    // handle filter cheque end


    const handleStatusPopupClick = (id) => {
        setStatusPopup(!statusPopup);
        setChequeData(...filteredChequesData.filter(item => item.id == id));
    };

    const receiveDataFromChild = (cheque_status) => {
        setUpdatedChequeStatus(cheque_status);
    }


    return (
        <>
            <div className="educare-card-title leading-none">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Cheque List
                </h5>
            </div>
            <div className='educare-admission-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-admission-filtar-bar">
                    <div className="educare-admission-filtar-bar-filter">
                        <form>
                            <div className="educare-admission-filtar-bar-count">
                                <span>Total: {filteredChequesData?.length}</span>
                            </div>

                            <div className="educare-admission-filtar-bar-filter-action educare-filter-action-btn ">
                                <div className="educare-select-field-styles">
                                    <InputLabel htmlFor="classroom_id" value="" />
                                    <SelectInput
                                        id="classroom_id"
                                        data_label="Class"
                                        data={classrooms}
                                        value={data.classroom_id}
                                        onChange={(e) => {
                                                setData("classroom_id", e.target.value)
                                                filterChequesData(e)
                                            }
                                        }
                                        type="text"
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.classroom_id}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div><div className="educare-admission-list-inner">
                <div className="educare-admission-list-inner-wrapper">
                    <div className="educare-admission-list pb-none">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sr.</th>
                                    <th>Student Name</th>
                                    <th>Class Name</th>
                                    <th>Bank Name</th>
                                    <th>Branch</th>
                                    <th>Cheque No</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    {/* <th>Status</th>
                                    <th>Action</th> */}
                                </tr>
                            </thead>
                            {loading ?
                                <Loader></Loader>
                            :
                                <tbody>
                                    {filteredChequesData?.length > 0 ? (
                                        filteredChequesData?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.student ? ` ${item?.student?.first_name} ${item?.student?.middle_name} ${item?.student?.last_name}` : "N/A"}</td>
                                                <td>{item?.student && item?.student?.classroom ? item?.student?.classroom?.title : "N/A"}</td>
                                                <td>{item?.bank?.name}</td>
                                                <td>{item?.branch}</td>
                                                <td>{item?.cheque_no}</td>
                                                <td>{parseFloat(item?.amount ?? 0)}</td>
                                                <td>{item?.cheque_date}</td>
                                                {/* <td>
                                                {updatedChequeStatus != "" ?
                                                    <span className={`badge ${updatedChequeStatus == 'Cleared' ? 'success' : 'danger'}`}>{updatedChequeStatus != null ? updatedChequeStatus : 'Due'}</span>
                                                :
                                                    <span className={`badge ${item?.cheque_status == 'Cleared' ? 'success' : 'danger'}`}>{item?.cheque_status != null ? item?.cheque_status : 'Due'}</span>
                                                }
                                            </td>
                                            <td>
                                                <button type='button'
                                                    className="educare-secondary-btn-sm-stroke"
                                                    onClick={() => {
                                                        handleStatusPopupClick(item.id);
                                                    }}
                                                >
                                                    Change Status
                                                </button>
                                            </td> */}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                className="text-center text-red-500"
                                                colSpan="10"
                                            >
                                                Data not found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            }
                        </table>
                    </div>
                </div>
            </div>


            {/* <SelectStatusPopup
                statusPopup={statusPopup}
                setStatusPopup={setStatusPopup}
                cheque_all_status={cheque_all_status}
                cheque={chequeData}
                sendDataToParent={receiveDataFromChild}
            /> */}


        </>
    );
};

export default FeeAllPDClist;
