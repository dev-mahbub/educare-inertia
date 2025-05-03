import { Tooltip } from '@mui/material';

const SmsCircularGenerateleftSide = ({
    setGeneratedData,
    smsCirculars
}) => {

    const handleGenerateButton = (selectedItem) => {
        setGeneratedData(selectedItem)
    }

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            School Circular
                        </h5>
                    </div>
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Circular</th>
                                        <th>Audience</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        smsCirculars?.length > 0 ? (
                                            smsCirculars.map((item, index) => <tr key={index}>
                                                <td>{item?.title}</td>
                                                <td>{item?.audience_type}</td>
                                                <td>
                                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                        <div>
                                                            <Tooltip
                                                                title="Preview Circular"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <a
                                                                    target="_blank"
                                                                    href={route('sms_pdf.preview_circular', {circular_id: item?.id})}
                                                                    className="educare-tertiary-btn-sm-fill"
                                                                >
                                                                    <i className="icon-eye"></i>
                                                                </a>
                                                            </Tooltip>
                                                        </div>
                                                        <div>
                                                            <Tooltip
                                                                title="Generate Circular"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    className="educare-warning-btn-sm-fill"
                                                                    onClick={()=> handleGenerateButton(item)}
                                                                >
                                                                    <i className="icon-ArrowFatLinesRight"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>)
                                        ) : ('')
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SmsCircularGenerateleftSide;
