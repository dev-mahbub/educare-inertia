import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

const EPFCalculatorInputForm = ({
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
                                htmlFor="pf"
                                value="PF %"
                            />
                            <sup>*</sup>
                        </div>
                    </div>
                    <TextInput
                        id="pf"
                        type="number"
                        value={
                            data.pf
                        }
                        onChange={(e) =>
                            setData(
                                "pf",
                                e.target.value
                            )
                        }
                        className="block"
                    />
                </div>
            </div>
        </form>
    );
};

export default EPFCalculatorInputForm;
