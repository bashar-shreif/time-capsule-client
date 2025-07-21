import "./style.css";
import Capsule from "../../components/shared/Capsule";

const Home = () => {
    return (
        <div className="home-page">

            <div className="capsules-wall">
                <Capsule
                    user="John Doe"
                    date="Created: 6/14/25 • Revealed: 7/10/25"
                    greeting="To my future self,"
                    message="I hope by the time you're reading this, you've found peace with the things you couldn't control and pride in the things.."
                />
                <Capsule
                    user="Sara Miran"
                    date="Created: 6/9/25 • Revealed: 7/10/25"
                    greeting="To the woman I'm becoming,"
                    message="I hope you're smiling right now — not just for people, but for real. The kind of smile that reaches your heart and says, 'I made it through.'..."
                />
                <Capsule
                    user="Sara Miran"
                    date="Created: 6/9/25 • Revealed: 7/10/25"
                    greeting="To the woman I'm becoming,"
                    message="I hope you're smiling right now — not just for people, but for real. The kind of smile that reaches your heart and says, 'I made it through.'..."
                />
                <Capsule
                    user="Sara Miran"
                    date="Created: 6/9/25 • Revealed: 7/10/25"
                    greeting="To the woman I'm becoming,"
                    message="I hope you're smiling right now — not just for people, but for real. The kind of smile that reaches your heart and says, 'I made it through.'..."
                />
            </div>
        </div>
    );
};

export default Home;