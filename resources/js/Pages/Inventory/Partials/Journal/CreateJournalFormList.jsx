import InputError from '@/Components/InputError';
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateJournalFormList = ({
    ledgers,
    modeOptions,
    nextVoucherNo
}) => {

    const [journalEntries, setJournalEntries] = useState([
        { id: 1, mode: "By", ledger_id: "", debit_amount: "", credit_amount: "" }
    ]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        journal_entries: journalEntries,
        journal_date: new Date(),
        debit_amount: 0,
        credit_amount: 0,
        total_amount: 0,
        description: ""
    });

    // Mode options
    // const modeOptions = [
    //     { id: "By", title: "By" },
    //     { id: "To", title: "To" },
    // ];

    // Method options
    // const methodOptions = [
    //     { id: "Discount", title: "Discount" },
    //     { id: "Tax Amount", title: "Tax Amount" },
    //     { id: "Cash", title: "Cash" },
    // ];

    // calculate total start
    const calculateTotals = () => {
        const totalDebit = journalEntries.reduce((sum, entry) => sum + (parseFloat(entry.debit_amount) || 0), 0);
        const totalCredit = journalEntries.reduce((sum, entry) => sum + (parseFloat(entry.credit_amount) || 0), 0);
        return { totalDebit, totalCredit };
    };
    // calculate total end

    // handle add row start
    const addNewRow = () => {
        // Check if any row is missing a ledger_id
        const isLedgerMissing = journalEntries.some(entry => !entry.ledger_id);

        if (isLedgerMissing) {
            toast.error("Please select a ledger!", {
                position: 'top-right',
                autoClose: 1500,
            });
            // console.error("Please select a ledger for all rows before adding a new row!");
            return;
        }

        const { totalDebit, totalCredit } = calculateTotals();

        // Prevent adding a new row if debit and credit are equal
        if (Math.abs(totalDebit - totalCredit) < 0.01) {
            console.error("Debit and Credit must not be balanced to add a new row!");
            return;
        }

        const largestAmount = Math.max(totalDebit, totalCredit);
        const smallestAmount = Math.min(totalDebit, totalCredit);
        const remainingAmount = largestAmount - smallestAmount;

        const newId = journalEntries.length > 0
            ? Math.max(...journalEntries.map(entry => entry.id)) + 1
            : 1;

        // Determine the mode for the new row based on current totals
        const newRowMode = totalDebit > totalCredit ? "To" : "By";

        setJournalEntries([
            ...journalEntries,
            {
                id: newId,
                mode: newRowMode,
                ledger_id: "", // Empty by default
                debit_amount: newRowMode === "By" ? remainingAmount.toString() : "",
                credit_amount: newRowMode === "To" ? remainingAmount.toString() : ""
            }
        ]);
    };
    // handle add row end

    // handle remove row start
    const removeRow = (idToRemove) => {
        // Prevent removing the last row
        if (journalEntries.length > 1) {
            setJournalEntries(journalEntries.filter(entry => entry.id !== idToRemove));
        }
    };
    // handle remove row end

    // handle update entry start
    const updateEntry = (id, field, value) => {
        const updatedEntries = journalEntries.map(entry =>
            entry.id === id ? { ...entry, [field]: value } : entry
        );

        // If mode changes, reset opposite amount
        if (field === 'mode') {
            updatedEntries.forEach(entry => {
                if (entry.id === id) {
                    entry.debit_amount = value === 'By' ? entry.debit_amount : '';
                    entry.credit_amount = value === 'To' ? entry.credit_amount : '';
                }
            });
        }

        setJournalEntries(updatedEntries);
    };
    // handle update entry end

    // handle submit start
    const handleSubmit = (e) => {
        e.preventDefault();
        const { totalDebit, totalCredit } = calculateTotals();

        // Check if any row is missing a ledger_id
        const isLedgerMissing = journalEntries.some(entry => !entry.ledger_id);

        if (Math.abs(totalDebit - totalCredit) > 0.01) {
            alert("Debit and Credit must be balanced!");

            return;
        } else if (isLedgerMissing) {
            toast.error("Please select a ledger!", {
                position: 'top-right',
                autoClose: 1500,
            });

            return;
        } else {
            data['journal_entries'] = journalEntries?.map(item => ({
                mode: item?.mode,
                ledger_id: item?.ledger_id,
                debit_amount: item?.debit_amount,
                credit_amount: item?.credit_amount
            }));
            data['debit_amount'] = totalDebit;
            data['credit_amount'] = totalCredit;
            data['total_amount'] = totalCredit;

            post(route('journal.save'), {
                onSuccess: () => {
                    handleReset();
                }
            });
        }
    };
    // handle submit end

    // handle reset start
    const handleReset = () => {
        reset();
        setData('journal_date', new Date());
        setJournalEntries([
            { id: 1, mode: "By", ledger_id: "", debit_amount: "", credit_amount: "" }
        ]);
    }
    // handle reset end

    return (
        <form onSubmit={handleSubmit}>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-card-title flex justify-between items-center flex-wrap gap-2.5">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Journal
                        </h5>
                        <div className="flex gap-2.5 flex-wrap items-center">
                            <div>
                                <span
                                    className='min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA'
                                >
                                    Journal No : {nextVoucherNo}
                                </span>
                            </div>
                            <div className="educare-input-field-styles">
                                <DatePicker
                                    selected={
                                        data?.journal_date && new Date(data?.journal_date)
                                    }
                                    onChange={(date) =>
                                        setData("journal_date", date)
                                    }
                                    showYearDropdown
                                    showMonthDropdown
                                    useShortMonthInDropdown
                                    showPopperArrow={false}
                                    peekNextMonth
                                    dropdownMode="select"
                                    isClearable
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText=""
                                    className="w-full"
                                />
                            </div>
                            <PrimaryButton
                                type="button"
                                onClick={addNewRow}
                                className="educare-primary-btn-md-fill"
                            >
                                <i className='icon-PlusCircle'></i> Add Row
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Particular</th>
                                        <th>Debit</th>
                                        <th>Credit</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {journalEntries.map((entry, index) => (
                                        <tr key={entry.id}>
                                            <td>
                                                <div className='flex gap-2.5'>
                                                    <div className="educare-input-field-styles max-w-[100px] w-full">
                                                        <SelectInput
                                                            data_label="Mode"
                                                            data={modeOptions}
                                                            value={entry.mode}
                                                            onChange={(e) =>
                                                                updateEntry(
                                                                    entry.id,
                                                                    'mode',
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                    </div>
                                                    <div className="educare-input-field-styles w-full">
                                                        <SelectInput
                                                            data_label="Ledger"
                                                            data={ledgers}
                                                            value={entry.ledger_id}
                                                            onChange={(e) =>
                                                                updateEntry(
                                                                    entry.id,
                                                                    'ledger_id',
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {entry.mode === 'By' && (
                                                    <div className='max-w-[180px] w-full m-auto'>
                                                        <div className="educare-input-field-styles">
                                                            <TextInput
                                                                value={entry.debit_amount}
                                                                onChange={(e) =>
                                                                    updateEntry(
                                                                        entry.id,
                                                                        'debit_amount',
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="block"
                                                                type="number"
                                                                min="0"
                                                                step="0.01"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                {entry.mode === 'To' && (
                                                    <div className='max-w-[180px] w-full m-auto'>
                                                        <div className="educare-input-field-styles">
                                                            <TextInput
                                                                value={entry.credit_amount}
                                                                onChange={(e) =>
                                                                    updateEntry(
                                                                        entry.id,
                                                                        'credit_amount',
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="block"
                                                                type="number"
                                                                min="0"
                                                                step="0.01"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <div className='educare-list-action-btn'>
                                                    <Tooltip
                                                        title="Remove"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            type='button'
                                                            onClick={() => removeRow(entry.id)}
                                                            className="educare-danger-btn-sm-fill"
                                                        >
                                                            X
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td>Total:</td>
                                        <td>{calculateTotals().totalDebit.toFixed(2)}</td>
                                        <td>{calculateTotals().totalCredit.toFixed(2)}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {
                (calculateTotals().totalDebit === calculateTotals().totalCredit) && (calculateTotals().totalDebit > 0 && calculateTotals().totalCredit > 0) ? <div className="mt-4">
                    <div className="educare-common-card">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                            <div className="educare-common-card-wrap-border">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="description"
                                                        value="Narration"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <TextareaInput
                                                id="description"
                                                value={
                                                    data.description
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.description
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                            <PrimaryButton
                                                className="educare-gray-btn-lg-stroke"
                                                type="button"
                                                onClick={() => {
                                                    handleReset()
                                                }}
                                            >
                                                Reset
                                            </PrimaryButton>
                                            <PrimaryButton
                                                className="educare-primary-btn-lg-fill"
                                                type="submit"
                                            >
                                                Save
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : ''
            }
        </form>
    );
};

export default CreateJournalFormList;
