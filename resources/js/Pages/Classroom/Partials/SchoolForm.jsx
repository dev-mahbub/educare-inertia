import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function SchoolForm({ timezones, countries, states, className = '' }) {
    
    const titleInput = useRef();
    const countryInput = useRef();
    const stateInput = useRef();
    const cityInput = useRef();
    const zipInput = useRef();
    const timezoneInput = useRef();
    const phoneInput = useRef();
    const phone2Input = useRef();
    const mailInput = useRef();
    const schoolCodeInput = useRef();
    const schoolNumberInput = useRef();
    const udiseCodeInput = useRef();
    const displayNameBoardInput = useRef();
    const establishedAtInput = useRef();
    const mediumInput = useRef();
    const boardInput = useRef();
    const androidAppUrlInput = useRef();
    const googleBusinessUrlInput = useRef();
    const streetAddressInput = useRef();

    
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        title: '',
        affiliation_no: '',
        description: '',
        parent_id: '',
        board_id: '',
        country_id: '',
        state_id: '',
        timezone_id: '',
        city: '',
        zip: '',
        phone: '',
        phone_2: '',
        mail: '',
        school_number: '',
        udise_code: '',
        display_name_board: '',
        established_at: '',
        medium: '',
        android_app_url: '',
        google_business_url: '',
        street_address: '',
    });

    const schoolData = (e) => {
        e.preventDefault();

        post(route('school.save'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.city) {
                    reset('city', 'zip');
                    cityInput.current.focus();
                }

                if (errors.current_password) {
                    reset('title');
                    titleInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Create School</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Add new school information.
                </p>
            </header>

            <form onSubmit={schoolData} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="title" value="School Name*" />

                    <TextInput
                        id="title"
                        ref={titleInput}
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.title} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="country_id" value="Country" />

                    <SelectInput
                        id="country_id"
                        data_label="Country"
                        data={[]}
                        ref={countryInput}
                        value={data.country}
                        onChange={(e) => setData('country_id', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.country_id} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="state_id" value="State" />

                    <SelectInput
                        id="state_id"
                        data_label="State"
                        data={[]}
                        ref={stateInput}
                        value={data.state}
                        onChange={(e) => setData('state_id', e.target.value)}
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.state_id} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="timezone_id" value="Timezone" />

                    <SelectInput
                        id="timezone_id"
                        data_label="Timezone"
                        data={[]}
                        ref={timezoneInput}
                        value={data.timezone}
                        onChange={(e) => setData('timezone_id', e.target.value)}
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.timezone_id} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="city" value="City" />

                    <TextInput
                        id="city"
                        ref={cityInput}
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.city} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="zip" value="Zip" />

                    <TextInput
                        id="zip"
                        ref={zipInput}
                        value={data.zip}
                        onChange={(e) => setData('zip', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.zip} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Phone 1" />

                    <TextInput
                        id="phone"
                        ref={phoneInput}
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.phone} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="phone_2" value="Phone 2" />

                    <TextInput
                        id="phone_2"
                        ref={phone2Input}
                        value={data.phone_2}
                        onChange={(e) => setData('phone_2', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.phone_2} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="mail" value="Mail" />

                    <TextInput
                        id="mail"
                        ref={mailInput}
                        value={data.mail}
                        onChange={(e) => setData('mail', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.mail} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="affiliation_no" value="Affiliation No.*" />

                    <TextInput
                        id="affiliation_no"
                        ref={schoolCodeInput}
                        value={data.affiliation_no}
                        onChange={(e) => setData('affiliation_no', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.affiliation_no} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="school_number" value="School Number*" />

                    <TextInput
                        id="school_number"
                        ref={phone2Input}
                        value={data.phone2}
                        onChange={(e) => setData('school_number', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.school_number} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="udise_code" value="UDISE Code" />

                    <TextInput
                        id="udise_code"
                        ref={udiseCodeInput}
                        value={data.udiseCode}
                        onChange={(e) => setData('udise_code', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.udise_code} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="display_name_board" value="Board Display Name" />

                    <TextInput
                        id="display_name_board"
                        ref={displayNameBoardInput}
                        value={data.displayNameBoard}
                        onChange={(e) => setData('display_name_board', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.display_name_board} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="established_at" value="Established on" />

                    <TextInput
                        id="established_at"
                        ref={establishedAtInput}
                        value={data.establishedAt}
                        onChange={(e) => setData('established_at', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.established_at} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="medium" value="Medium of Education" />

                    <TextInput
                        id="medium"
                        ref={phone2Input}
                        value={data.phone2}
                        onChange={(e) => setData('medium', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.medium} className="mt-2" />
                </div>


                <div>
                    <InputLabel htmlFor="board_id" value="Board" />
                    <SelectInput
                        id="board_id"
                        data_label="board"
                        data={[]}
                        ref={boardInput}
                        value={data.board_id}
                        onChange={(e) => setData('board_id', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.board_id} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="android_app_url" value="Android App Url" />
                    <TextInput
                        id="android_app_url"
                        ref={androidAppUrlInput}
                        value={data.android_app_url}
                        onChange={(e) => setData('android_app_url', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.android_app_url} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="google_business_url" value="Google Business Url" />
                    <TextInput
                        id="google_business_url"
                        ref={googleBusinessUrlInput}
                        value={data.google_business_url}
                        onChange={(e) => setData('google_business_url', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.google_business_url} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="street_address" value="Address" />
                    <TextareaInput
                        id="street_address"
                        ref={streetAddressInput}
                        value={data.street_address}
                        onChange={(e) => setData('street_address', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.street_address} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Save</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}












