import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const Routes = () => {
  const [routes, setRoutes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
  const { setSelectedRoute } = useContext(AppContext);

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
      } 
    //   finally {
    //     setIsLoading(false);
    //   }
    }
    getRoutes();
  }, []);

  const handleChange = (e) => {
    setSelectedRoute(e.target.value)
  }

  return (
    <div>
    {routes.length > 0 && (
        <>
          <select name="route-select" className="form-select" id="route-select" onChange={handleChange}>
            <option value="">Select route</option>
            {routes.map((route) => (
              <option key={route.route_id} value={route.route_id}>
                {route.route_label}
              </option>
            ))}
          </select>
        </>
      )
    }
    </div>
  );
};

export default Routes;