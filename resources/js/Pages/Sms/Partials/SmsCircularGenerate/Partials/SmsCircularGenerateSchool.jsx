import PrimaryButton from '@/Components/PrimaryButton';
import 'react-toastify/dist/ReactToastify.css';

const SmsCircularGenerateSchool = ({
    generatedData
}) => {

    // handle download sms circular start
    const handleDownloadSmsCircular = (e) => {
        e.preventDefault();

        const params = {
            circular_id: generatedData?.id
        }

        const url = route('sms_pdf.download_circular', params);

        window.open(url);
    }
    // handle download sms circular end

    return (
        <>
            <div className='flex justify-between gap-5 flex-wrap'>
                <h3 className='text-headingLight text-[20px] font-semibold'>{generatedData?.title}</h3>
                <PrimaryButton
                    className="educare-success-btn-md-fill"
                    type="button"
                    onClick={handleDownloadSmsCircular}
                >
                    Download Circular
                </PrimaryButton>
            </div>
        </>
    );
};

export default SmsCircularGenerateSchool;
