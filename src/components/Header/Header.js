import { BiBus } from 'react-icons/bi';
import hero from './hero-image.jpg';

export default function Header() {

    return(
        <header>
            <div className="header-container">
                <h1 className="header-logo">
                <BiBus className="header-icon header-red"/><span className="logo-text header-blue">Transit </span><span className="logo-text header-red">App</span>
                </h1>
            </div>
            <div id="hero-img">
            
                <img src={hero} alt="people at bus stop" />
                <div className="hero-container wrap">
                        <div id="page-title">
                            <h1 id="plan-trip-text">PlanTrip</h1>
                        </div>
                    </div>
            </div>
        </header>
    );
}