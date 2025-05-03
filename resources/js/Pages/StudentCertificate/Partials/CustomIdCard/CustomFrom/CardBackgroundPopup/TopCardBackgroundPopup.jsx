import Modal from '@/Components/Modal';
import { Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import CardBackgroundOne from '../../../../../../../images/bg-id-card/fullbg1.png';
import CardBackgroundTwo from '../../../../../../../images/bg-id-card/fullbg2.png';
import CardBackgroundThree from '../../../../../../../images/bg-id-card/fullbg3.png';
import CardBackgroundFour from '../../../../../../../images/bg-id-card/fullbg4.png';
import CardBackgroundFive from '../../../../../../../images/bg-id-card/fullbg5.png';
import CardBackgroundSix from '../../../../../../../images/bg-id-card/fullbg6.png';
import CardBackgroundSeven from '../../../../../../../images/bg-id-card/fullbg7.png';
import CardBackgroundEight from '../../../../../../../images/bg-id-card/fullbg8.png';
import { Tooltip } from '@mui/material';

export default function TopCardBackgroundPopup({ className = '', cardBgPopup, setCardBgPopup }) {

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({});

    const HandleCardBgPopupData = (e) => {
        e.preventDefault();
        // destroy(route('profile.destroy'), {
        //     preserveScroll: true,
        //     onSuccess: () => closeModal(),
        //     onError: () => passwordInput.current.focus(),
        //     onFinish: () => reset(),
        // });
    };

    const closeModal = () => {
        setCardBgPopup(false);
        reset();
    };

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={cardBgPopup} onClose={closeModal}>
                    <form onSubmit={HandleCardBgPopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Select Background</h5>
                            </div>
                            <div className='card-bg-wrapper'>
                                <div className="card-bg">
                                    <div className="card-bg-img">
                                        <img src={CardBackgroundOne} alt="" />
                                        <div className='card-bg-btn'>
                                            <Tooltip
                                                title="Save"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <button
                                                    className="card-bg-style"
                                                >
                                                    <i className="icon-check-1"></i>
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className="card-bg-img">
                                        <img src={CardBackgroundTwo} alt="" />
                                        <div className='card-bg-btn'>
                                            <Tooltip
                                                title="Save"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <button
                                                    className="card-bg-style"
                                                >
                                                    <i className="icon-check-1"></i>
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className="card-bg-img">
                                        <img src={CardBackgroundThree} alt="" />
                                        <div className='card-bg-btn'>
                                            <Tooltip
                                                title="Save"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <button
                                                    className="card-bg-style"
                                                >
                                                    <i className="icon-check-1"></i>
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className="card-bg-img">
                                        <img src={CardBackgroundFour} alt="" />
                                        <div className='card-bg-btn'>
                                            <Tooltip
                                                title="Save"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <button
                                                    className="card-bg-style"
                                                >
                                                    <i className="icon-check-1"></i>
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className="card-bg-img">
                                        <img src={CardBackgroundFive} alt="" />
                                        <div className='card-bg-btn'>
                                            <Tooltip
                                                title="Save"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <button
                                                    className="card-bg-style"
                                                >
                                                    <i className="icon-check-1"></i>
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className="card-bg-img">
                                        <img src={CardBackgroundSix} alt="" />
                                        <div className='card-bg-btn'>
                                            <Tooltip
                                                title="Save"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <button
                                                    className="card-bg-style"
                                                >
                                                    <i className="icon-check-1"></i>
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className="card-bg-img">
                                        <img src={CardBackgroundSeven} alt="" />
                                        <div className='card-bg-btn'>
                                            <Tooltip
                                                title="Save"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <button
                                                    className="card-bg-style"
                                                >
                                                    <i className="icon-check-1"></i>
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className="card-bg-img">
                                        <img src={CardBackgroundEight} alt="" />
                                        <div className='card-bg-btn'>
                                            <Tooltip
                                                title="Save"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <button
                                                    className="card-bg-style"
                                                >
                                                    <i className="icon-check-1"></i>
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
