import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const Routes = () => {
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setSelectedRoute, selectedRoute, selectedDirection } = useContext(AppContext);

  console.log(`Routes.js-- route: ${selectedRoute} direction: ${selectedDirection}`);

  useEffect(() => {
    async function getRoutes() {
      try {
        const response = await axios.get(
          "https://svc.metrotransit.org/nextripv2/routes"
        );
        const routeList = await response.data;
        if (response) {
          setRoutes(routeList);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getRoutes();
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
    setSelectedRoute(e.target.value)
  }

  return (
    <div>
    {isLoading ? (
        <h2>Loading...</h2>
    ) 
    : (
      routes.length > 0 && (
        <>
          <select name="route-select" class="form-select" id="route-select" onChange={handleChange}>
            <option value="">Select route</option>
            {routes.map((route) => (
              <option key={route.route_id} value={route.route_id}>
                {route.route_label}
              </option>
            ))}
          </select>
        </>
      )
    )}
    </div>
  );
};

export default Routes;