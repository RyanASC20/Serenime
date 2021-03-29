import { useForm } from 'react-hook-form';
import Zoom from 'react-reveal/Zoom';

import { useHabitCategoriesRef} from '../../../hooks/firestoreHooks';
import Button from '../../Button';

interface P {
    setCreationMode?: any;
}

const AddGoalForm: React.FC<P> = ({ setCreationMode }) => {
    const { handleSubmit, register, reset, errors} = useForm();
    const habitCategoriesRef = useHabitCategoriesRef();

    const onSubmit = async(data) => {
        reset();
        habitCategoriesRef.set({
            [ data.habitsInput ]: data.habitsInput
        }, { merge: true });
    }
    
    return (
        <Zoom duration={300}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    name="habitsInput"
                    className="mb-2 inline-block transition duration-200 p-1.5 resize-none bg-gray-100 border-b-2 border-gray-300 focus:outline-none focus:border-highlight"
                    ref={register({
                        required: true,
                    })}
                    autoComplete="off"
                    placeholder="Add new goal: "
                ></input>
                <div className="flex justify-between w-3/4 mb-3">
                    <Button text="Add" textSize="md"></Button>
                    <Button text="Cancel" textSize="md" onClick={() => { setCreationMode(false) } } hoverColor="red-500"></Button>
                </div>
            </form>
       </Zoom>
    );
}

export default AddGoalForm;