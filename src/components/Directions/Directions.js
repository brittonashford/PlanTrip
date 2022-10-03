import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const Directions = () => {

    const [directions, setDirections] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    const { selectedRoute, setSelectedDirection } = useContext(AppContext);

    useEffect(
        () => {
            async function getDirections(selectedRoute) {
                try{
                    const response = await axios.get(
                        `https://svc.metrotransit.org/nextripv2/directions/${selectedRoute}`
                        );
                    const directionList = await response.data;
    
                    if (response) {
                        setDirections(directionList);
                    }
                } catch (error) {
                    console.log("An error occurred.", error);
                } 
                // finally {
                //     setIsLoading(false);
                // }        
            }
    
            if(selectedRoute){
                getDirections(selectedRoute);
            };
        },[selectedRoute]);

    const handleChange = (e) => {
        setSelectedDirection(e.target.value);
    }

    return (
        <div>
        {directions.length > 0 && (
            <select name="direction" className="form-select" id="direction-select" onChange={handleChange}>
                <option value="">Select direction</option>
                {directions.map((direction) => (
                    <option key={direction.direction_id} value={direction.direction_id}>
                        {direction.direction_name}
                    </option>
                ))}
            </select>
        )}
        </div>
    )
}

export default Directions;