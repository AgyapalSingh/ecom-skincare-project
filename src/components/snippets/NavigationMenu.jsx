import React, { useEffect, useState }  from "react";
import { GET_NAVIGATION } from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi";

const NavigationMenu = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNavigation = async () => {
    const query = { query: GET_NAVIGATION };
    try {
      const response = await shopifyApi.get("", query);
      const menuData = response.data.data.menu.items;
      console.log(menuData);
      // setMenus(response.data.menus); // Assuming the menus data is in 'menus'
    } catch (error) {
      setError("Failed to fetch navigation");
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchNavigation();
  }, []);

  // Render loading, error, or product list
  if (loading) {
    return <div>Loading menus...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <nav>
      <ul>
        {menus.map((menu) => (
          <li key={menu.id}>{menu.name}</li> // Assuming menu has 'id' and 'name'
        ))}
      </ul>
    </nav>
  );
};

export default NavigationMenu;
