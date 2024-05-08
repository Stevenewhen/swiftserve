import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as itemsAPI from '../../utilities/items-api';
import * as ordersAPI from '../../utilities/orders-api';
import NavBar from '../../components/NavBar/NavBar';
import MenuList from '../../components/MenuList/MenuList';
import CategoryListForOrder from '../../components/CategoryListForOrder/CategoryListForOrder';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import "./NewOrderPage.css";

export default function NewOrderPage({ user, setUser }) {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCat, setActiveCat] = useState('');
  const [cart, setCart] = useState(null);
  const categoriesRef = useRef([]);
  const navigate = useNavigate();

  // Load menu items
  useEffect(() => {
    async function getItems() {
      const items = await itemsAPI.getAll();
      categoriesRef.current = [...new Set(items.map(item => item.category.name))];
      setMenuItems(items);
      setActiveCat(categoriesRef.current[0]);
    }
    getItems();
  }, []); // Empty array ensures this runs only once on mount

  // Load cart
  useEffect(() => {
    async function getCart() {
      try {
        const cart = await ordersAPI.getCart();
        setCart(cart);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        // Handle error state as needed
      }
    }
    getCart();
  }, []); // This also should only run once on mount

  const handleAddToOrder = async (itemId) => {
    const updatedCart = await ordersAPI.addItemToCart(itemId);
    setCart(updatedCart);
  };

  const handleChangeQty = async (itemId, newQty) => {
    const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
    setCart(updatedCart);
  };

  const handleCheckout = async () => {
    await ordersAPI.checkout();
    navigate('/triage');
  };

  return (
    <main className="NewOrderPage">
      <aside>
        <NavBar user={user} setUser={setUser} />
        <CategoryListForOrder
          categories={categoriesRef.current}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
        />
        <div className="MenuAndOrderContainer">
          <MenuList
            menuItems={menuItems.filter(item => item.category && item.category.name === activeCat)}
            handleAddToOrder={handleAddToOrder}
          />
          <OrderDetail
            order={cart}
            handleChangeQty={handleChangeQty}
            handleCheckout={handleCheckout}
            className="OrderDetail"
          />
        </div>
      </aside>
    </main>
  );
}
