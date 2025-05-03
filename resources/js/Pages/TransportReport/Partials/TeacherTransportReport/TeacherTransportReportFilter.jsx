import SelectInput from '@/Components/SelectInput';
import { router, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';

const TeacherTransportReportFilter = ({
    routeData = [],
    setLoading,
}) => {

    const {
        data,
        setData
    } = useForm({
        transport_route_id: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.post(route('transport_report.teacher_transport_report'), data);
        setLoading(false)
    }

    const handleReset = (e) => {
        e.preventDefault();
        router.get(route('transport_report.teacher_transport_report'));
        setLoading(false)
    }

    return (
        <form>
            <div className='flex flex-wrap gap-2.5 justify-between mb-2.5'>
                <div className="educare-card-title">
                    <h5>
                        <i className="icon-PoliceCar"></i>
                        Teacher Transport Report
                    </h5>
                </div>
                <div className='flex flex-wrap gap-2.5'>
                    <div className="educare-input-field-styles">
                        <SelectInput
                            id="transport_route_id"
                            data_label="Route"
                            data={routeData}
                            value={
                                data.transport_route_id
                            }
                            onChange={(e) =>
                                setData(
                                    "transport_route_id",
                                    e.target.value
                                )
                            }
                            className="block"
                        />
                    </div>
                    <div className="educare-filter-action-btn flex flex-wrap gap-2">
                        <div>
                            <Tooltip
                                title="Search"
                                placement="top"
                                arrow
                            >
                                <button type='button'
                                    className="educare-secondary-btn-md-fill"
                                    onClick={(e) => handleSearch(e)}
                                >
                                    <i className="icon-search-interface-symbol"></i>
                                </button>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip
                                title="Excel Sheet"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <button type='button'
                                    className="educare-success-btn-md-fill"
                                >
                                    <i className="icon-FileX"></i>
                                </button>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip
                                title="Reset"
                                placement="top"
                                arrow
                            >
                                <button type='button'
                                    className="educare-gray-btn-md-fill"
                                    onClick={(e) => handleReset(e)}
                                >
                                    <i className="icon-ArrowsClockwise"></i>
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default TeacherTransportReportFilter;
