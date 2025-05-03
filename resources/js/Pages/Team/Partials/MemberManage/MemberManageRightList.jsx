import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import { Tooltip } from '@mui/material';

const MemberManageRightList = ({ checkedDataForRightList, setCheckedDataForRightList, data, setData, errors }) => {

    const handleRemoveRows = (id) => {
        const remainingData = checkedDataForRightList.filter((item) => item.id !== id);
        setCheckedDataForRightList(remainingData);
    }

    return (
        <>
            <div className="educare-classroom-table-wrapper">
                <div className="educare-card-title">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Selected members for team
                    </h5>
                </div>
                <div className="educare-default-table xs:overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                checkedDataForRightList.length > 0 ? (
                                    checkedDataForRightList.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{item.name}</td>
                                            <td>
                                                <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                    <div>
                                                        <Tooltip
                                                            title="Cancel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                onClick={() => handleRemoveRows(item.id)}
                                                                className="educare-danger-btn-sm-fill"
                                                            >
                                                                X
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">Data not found</td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>

            {/* Existing form*/}
            <div className='flex flex-wrap justify-between gap-2 mt-5'>
                <div className="educare-header-filtar-bar-count mr-auto">
                    <span>Total: 10</span>
                </div>
                <div className='flex flex-wrap justify-between gap-2 mb-2'>
                    <div className="educare-input-field-styles">
                        <SelectInput
                            data_label="Team"
                            data={[]}
                            value={
                                data.select_team
                            }
                            onChange={(e) =>
                                setData(
                                    "select_team",
                                    e.target.value
                                )
                            }
                            className="block"
                        />
                        <InputError
                            message={
                                errors.select_team
                            }
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <PrimaryButton
                            // disabled={processing}
                            className="educare-primary-btn-md-stroke whitespace-nowrap"
                        >
                            Move top Sel. members in team
                        </PrimaryButton>
                    </div>
                </div>
            </div>
            {/* Existing List*/}
            <div className="educare-classroom-table-wrapper">
                <div className="educare-card-title">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Existing team members
                    </h5>
                </div>
                <div className="educare-default-table xs:overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>Sr.No.</th>
                                <th>Name</th>
                                <th>Class</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={4}>no data found</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
};

export default MemberManageRightList;
