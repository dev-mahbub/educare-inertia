import TextInput from '@/Components/TextInput';
import { Link, router, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';

const CertificateListTopbar = ({ certificateLength, setLoading }) => {
    const {
        data,
        setData
    } = useForm({
        search_value: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (data) {
            router.post(route('student_certificate.certificate_list'), data);
            setLoading(false);
        }
    }

    const handleReset = () => {
        router.get(route('student_certificate.certificate_list'));
        setLoading(false);
    }

    return (
        <form>
            <div className='flex flex-wrap gap-2.5 justify-between items-center mb-2.5'>
                <div className="educare-card-title pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Bonafide and Character Certificates
                    </h5>
                </div>
                <div className='flex flex-wrap gap-2.5 items-center'>
                    <div>
                        <span className='min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA'>Total : {certificateLength}</span>
                    </div>
                    <div className="educare-input-field-styles">
                        <TextInput
                            id="search_value"
                            value={
                                data.search_value
                            }
                            onChange={(e) =>
                                setData(
                                    "search_value",
                                    e.target.value
                                )
                            }
                            placeHolder="Search here"
                            className="block"
                        />
                    </div>

                    <div>
                        <Tooltip
                            title="Search"
                            placement="top"
                            arrow
                            as="button"
                        >
                            <Link
                                href="#"
                                className="educare-secondary-btn-md-fill"
                                onClick={handleSearch}
                            >
                                <i className="icon-search-interface-symbol"></i>
                            </Link>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip
                            title="Reset"
                            placement="top"
                            arrow
                            as="button"
                        >
                            <Link
                                href="#"
                                className="educare-gray-btn-md-fill"
                                onClick={handleReset}
                            >
                                <i className="icon-ArrowsClockwise"></i>
                            </Link>
                        </Tooltip>
                    </div>

                </div>
            </div>
        </form>
    );
};

export default CertificateListTopbar;
