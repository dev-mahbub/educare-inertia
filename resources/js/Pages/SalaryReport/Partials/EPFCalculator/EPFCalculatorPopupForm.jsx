import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EPFCalculatorInputForm from './EPFCalculatorInputForm';

export default function EPFCalculatorPopupForm({
    className = '',
    listPopup,
    setListPopup,
    earningTypes,
    data,
    setData,
    setEarningTypeTitles
}) {

    const [earningTypeIds, setEarningTypeIds] = useState([]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            earning_type_ids: earningTypeIds
        }));
    }, [earningTypeIds]);

    const closeModal = () => {
        setListPopup(false);
    };

    // handle select earning type start
    const handleSelectEarningType = (id) => {
        if(earningTypeIds?.includes(id)) {
            setEarningTypeIds(earningTypeIds?.filter(item => item != id));
        } else {
            setEarningTypeIds([...earningTypeIds, id]);
        }
    }
    // handle select earning type end


    // handle generate start
    const handleGenerate = (e) => {
        e.preventDefault();

        if(data?.pf == '' || data?.earning_type_ids?.length == 0) {
            toast.error("Please select earning and mention pf % for generate epf report!", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            closeModal();

            router.post(route('salary_report.epf'), data, {
                onFinish: () => {
                    setEarningTypeTitles(earningTypes?.filter(item => earningTypeIds?.includes(item?.id))?.flatMap(item => item?.title));
                }
            });
        }
    }
    // handle generate end

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={listPopup} onClose={closeModal}>
                    <div className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper mb-5 ">
                            <div className="educare-popup-form-header py-3 mb-2.5">
                                <h5>All Earning</h5>
                            </div>
                            {earningTypes?.length > 0 &&
                                earningTypes.map((item, index) => (
                                    <div className='mb-2.5' key={index}>
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id={`earning_type_${item?.id}`}
                                                    name={`earning_type_${item?.id}`}
                                                    checked={
                                                        earningTypeIds?.includes(item?.id)
                                                    }
                                                    onChange={() => {
                                                        handleSelectEarningType(item?.id)
                                                    }}
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor={`earning_type_${item?.id}`}
                                                    value={item?.title}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <EPFCalculatorInputForm
                            data={data}
                            setData={setData}
                        />
                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton
                                className="educare-primary-btn-md-fill"
                                type="button"
                                onClick={handleGenerate}
                            >
                                Generate
                            </PrimaryButton>

                            <PrimaryButton
                                type="button"
                                className="educare-gray-btn-md-stroke"
                                onClick={closeModal}
                            >
                                Cancel
                            </PrimaryButton>
                        </div>
                    </div>
                </Modal>
            </section>
        </>
    );
}
