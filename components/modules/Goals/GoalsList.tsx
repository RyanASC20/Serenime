import { Dispatch, SetStateAction} from 'react';
import Fade from 'react-reveal/Fade';

interface GoalsListProps {
    setSelectedCategory: Dispatch<SetStateAction<string>>;
    selectedCategory: string;
    categories: string[];
}

const GoalsList: React.FC<GoalsListProps> = ({ setSelectedCategory, selectedCategory, categories }) => {
    return (
        <Fade bottom cascade duration={500}>
            <div className="mt-4 p-5 bg-white rounded-lg ">
                {Object.values(categories).map(
                    (category, idx) => {
                        return (
                            <div
                                key={idx}
                                onClick={() => {
                                    setSelectedCategory(
                                        category
                                    );
                                }}
                                className={`flex justify-between cursor-pointer p-1.5 ${selectedCategory ===
                                    category
                                    ? "border-l-4 border-highlight bg-base"
                                    : ""
                                    } hover:bg-base`}
                            >
                                {category}
                            </div>
                        );
                    }
                )}
            </div>
        </Fade>
    )
}

export default GoalsList;