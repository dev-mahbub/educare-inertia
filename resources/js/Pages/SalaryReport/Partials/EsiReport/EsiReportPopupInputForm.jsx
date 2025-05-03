import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

const EsiReportPopupInputForm = ({
    data,
    setData
}) => {

    const dummyData = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={dummyData}>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-4 mb-2.5'>
                <div className="educare-input-field-styles">
                    <div className="educare-input-field-styles-label-wrap">
                        <div className="educare-input-field-styles-label">
                            <InputLabel
                                htmlFor="employees_value"
                                value="EMPLOYEES %"
                            />
                            <sup>*</sup>
                        </div>
                    </div>
                    <TextInput
                        id="employees_value"
                        value={
                            data.employees_value
                        }
                        onChange={(e) =>
                            setData(
                                "employees_value",
                                isNaN(e.target.value) ? '' : e.target.value
                            )
                        }
                        className="block"
                    />
                </div>
                <div className="educare-input-field-styles">
                    <div className="educare-input-field-styles-label-wrap">
                        <div className="educare-input-field-styles-label">
                            <InputLabel
                                htmlFor="employers_value"
                                value="EMPLOYERS %"
                            />
                            <sup>*</sup>
                        </div>
                    </div>
                    <TextInput
                        id="employers_value"
                        value={
                            data.employers_value
                        }
                        onChange={(e) =>
                            setData(
                                "employers_value",
                                isNaN(e.target.value) ? '' : e.target.value
                            )
                        }
                        className="block"
                    />
                </div>
                <div className="educare-input-field-styles">
                    <InputLabel
                        htmlFor="income"
                        value="INCOME"
                    />
                    <TextInput
                        id="income"
                        value={
                            data.income
                        }
                        onChange={(e) =>
                            setData(
                                "income",
                                isNaN(e.target.value) ? '' : e.target.value
                            )
                        }
                        className="block"
                    />
                </div>
            </div>
        </form>
    );
};

export default EsiReportPopupInputForm;
