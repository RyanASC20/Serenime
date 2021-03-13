import { useForm } from 'react-hook-form';

import { useHabitCategoriesRef} from '../../../hooks/firestoreHooks';

import Button from '../../Button';

interface P {
    setCreationMode?: any;
}

const AddHabitForm: React.FC<P> = ({ setCreationMode }) => {
    const { handleSubmit, register, reset, errors} = useForm();
    const habitCategoriesRef = useHabitCategoriesRef();

    const onSubmit = async(data) => {
        reset();
        habitCategoriesRef.set({
            [ data.habitsInput ]: data.habitsInput
        }, { merge: true });
    }
    
    return (
        <div>
            {/* <h1 className="text-lg text-highlight">Add a habit to track: </h1> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    name="habitsInput"
                    className="mb-2 inline-block transition duration-200 p-1.5 resize-none bg-gray-100 border-b-2 border-gray-300 focus:outline-none focus:border-highlight"
                    ref={register({
                        required: true,
                    })}
                    autoComplete="off"
                ></input>
                <div>
                    <Button text="Add" textSize="md"></Button>
                    {/* <Button text="Cancel" textSize="md" hoverColor="red-500" onClick={() => { setCreationMode(false) }}></Button> */}
                </div>
            </form>
       </div>
    );
}

export default AddHabitForm;