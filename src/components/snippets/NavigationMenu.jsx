import React, { useEffect, useState } from "react";
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
    } catch (error) {
      setError("Failed to fetch navigation");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNavigation();
  }, []);

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
          <li key={menu.id}>{menu.name}</li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationMenu;
