import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import AppContext from './context';

import Home from './pages/Home';
import Favorites from './pages/Favorite';
import Orders from './pages/Orders';

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [cartOpened, setCartOpened] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
                    axios.get('https://64aefba0c85640541d4dfd07.mockapi.io/cart'),
                    axios.get('https://64aefe05c85640541d4dff3a.mockapi.io/favorites'),
                    axios.get('https://64a9418f8b9afaf4844a7634.mockapi.io/items'),
                ]);

                setIsLoading(false);
                setCartItems(cartResponse.data);
                setFavorites(favoritesResponse.data);
                setItems(itemsResponse.data);
            } catch (error) {
                alert('Առաջացել է տվյալների դիմումի սխալ');
                console.error(error);
            }
        }

        fetchData();
    }, []);

    useEffect(()=>{
        if(cartOpened){
            document.body.style.overflow ="hidden"
        } else {document.body.style.overflow ="auto"}
    },[cartOpened])

    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
            if (findItem) {
                setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
                await axios.delete(`https://64aefba0c85640541d4dfd07.mockapi.io/cart/${findItem.id}`);
            } else {
                setCartItems((prev) => [...prev, obj]);
                const { data } = await axios.post('https://64aefba0c85640541d4dfd07.mockapi.io/cart', obj);
                setCartItems((prev) =>
                    prev.map((item) => {
                        if (item.parentId === data.parentId) {
                            return {
                                ...item,
                                id: data.id,
                            };
                        }
                        return item;
                    }),
                );
            }
        } catch (error) {
            alert('Առաջացել է սխալ զամբյուղում ավեկացնելու համար');
            console.error(error);
        }
    };

    const onRemoveItem = (id) => {
        try {
            axios.delete(`https://64aefba0c85640541d4dfd07.mockapi.io/cart/${id}`);
            setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
        } catch (error) {
            alert('Առաջացել է սխալ զաբյուղից ջնջելու համար');
            console.error(error);
        }
    };

    const onAddToFavorite = async (obj) => {
        try {
            const favItem = favorites.find((favObj) => Number(favObj.parentId) === Number(obj.parentId));
            if (favItem) {
                await axios.delete(`https://64aefe05c85640541d4dff3a.mockapi.io/favorites/${favItem.id}`);
                setFavorites((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.parentId)));
            } else {
                const { data } = await axios.post(
                    'https://64aefe05c85640541d4dff3a.mockapi.io/favorites',
                    obj,
                );
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            alert('Չի լինում ավելացնել պահպանվածներում');
            console.error(error);
        }
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.parentId) === Number(id));
    };

    return (
        <AppContext.Provider
            value={{
                items,
                cartItems,
                favorites,
                isItemAdded,
                onAddToFavorite,
                onAddToCart,
                setCartOpened,
                setCartItems,
            }}>
            <div className="wrapper clear">
                <Drawer
                    items={cartItems}
                    onClose={() => setCartOpened(false)}
                    onRemove={onRemoveItem}
                    opened={cartOpened}
                />

                <Header onClickCart={() => setCartOpened(true)} />

              <Switch>
                <Route path="/" exact >
                    <Home
                        items={items}
                        cartItems={cartItems}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToFavorite={onAddToFavorite}
                        onAddToCart={onAddToCart}
                        isLoading={isLoading}
                        fa
                    />
                </Route>

                <Route path="/favorites">
                     <Favorites />
                </Route>

                <Route path="/orders" >
                    <Orders />
                </Route>
              </Switch>
            </div>
        </AppContext.Provider>
    );
}

export default App;