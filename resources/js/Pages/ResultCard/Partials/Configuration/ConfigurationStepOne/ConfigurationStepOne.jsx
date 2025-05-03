import RadioInput from '@/Components/RadioInput';
import { useForm } from '@inertiajs/react';
import { useContext, useEffect } from 'react';
import { myContext } from '../ConfigurationContextApi';



const ConfigurationStepOne = ({
    boards
}) => {
    //use context api
    const {selectedBoard, setSelectedBoard} = useContext(myContext)

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        board_id: boards[0]?.id ?? "",
    });

    useEffect(() => {
        setSelectedBoard(boards[0] ?? {});
    }, [boards]);


    const boardSelectData = (e) => {
        e.preventDefault();
    };

    return (
        <div className="shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] py-[30px] maxXs:p-[15px] rounded-lg">
            <form onSubmit={boardSelectData}>
                <div className="select-board-wrap">
                    <div>
                        <div className="grid grid-cols-12 gap-5">
                        {boards?.length > 0 &&
                                boards?.map((item, index) => (
                                    <div className="col-span-12 md:col-span-6" key={index}>
                                        <div className="select-board">
                                            <div className="select-board-img">
                                                <img src={item?.image ?? ""} alt="brand img" />
                                            </div>
                                            <RadioInput
                                                name="board_id"
                                                value={item?.title}
                                                checked={data.board_id == item?.id}
                                                onChange={() => {
                                                    setSelectedBoard(item);
                                                    setData("board_id", item?.id)
                                                }
                                                }
                                            />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ConfigurationStepOne;
