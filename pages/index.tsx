import Head from 'next/head';

import Card from '../components/Landing/Card';
import Navbar from '../components/Landing/Navbar'
import Jumbotron from '../components/Landing/Jumbotron';
import Footer from '../components/Footer';

const Index: React.FC = () => {

    return (
        <>
            <Head>
                <title>Serenime | Stress Tracker, Breathing Exercises, Goal Tracker, Planner</title>
            </Head>
            <div>
                <section className="relative h-screen flex flex-col justify-center items-center">
                    <Navbar />
                    <img
                        className="w-screen h-screen"
                        src={require('../public/static/imgs/landing-bg.jpg')}
                    />
                    <Jumbotron />
                </section>
                <section className="flex flex-col items-center my-10">
                    <Card>
                        <div className="md:w-1/2">
                            <h1 className="my-6 text-4xl text-highlight-secondary">Mood Tracker</h1>
                            <p>Track how you feel using Serenime's mood tracker. With a simple glance at the calendar, you can see how you've been this month wihtout having to spend time reading through notes!</p>
                            <p>With the tracker, you can easily enter what you did each did and how each entry made you feel!</p>
                        </div>
                        <img src={require("../public/static/imgs/moodtracker.jpg")} className="max-w-sm"></img>
                    </Card>
                    <Card reverse>
                        <div className="md:w-1/2">
                            <h1 className="mb-6 text-4xl text-highlight-secondary">Breathing Exercises</h1>
                            <p>It's important to take some time out of your day to just relax, and one of the best ways to do that is to focus on your breath.</p>
                            <p>Serenime offers various breathing exercises that you can choose from based on how you want to feel! Just follow along with the timer!</p>
                        </div>
                        <img src={require("../public/static/imgs/breathing.jpg")} className="max-w-sm"></img>
                    </Card>
                    <Card>
                        <div className="md:w-1/2">
                            <h1 className="my-6 text-4xl text-highlight-secondary">Goal Tracker</h1>
                            <p>Easily log you goals with Serenime's goal tracker. All you have to do is add a goal to your list, and enter if you completed your goal or not!</p>
                            <p>View your goals on a calendar to conveniently see any trends and to track your progress.</p>
                        </div>
                        <img src={require("../public/static/imgs/goals.jpg")} className="max-w-sm"></img>
                    </Card>
                    <Card reverse>
                        <div className="md:w-1/2">
                            <h1 className="mb-6 text-4xl text-highlight-secondary">Planner</h1>
                            <p>Organize the events in you day. Add each event to your morning or nightly routine and what time you like to complete it by.</p>
                            <p>The planner will automatically color code and sort each event based on its deadline, so you don't have to worry about becoming overwhelmed or doing tasks at the last minute!</p>
                        </div>
                        <img src={require("../public/static/imgs/routines.jpg")} className="max-w-sm"></img>
                    </Card>
                </section>
                <Footer />
            </div>
        </>
    )
}

export default Index;