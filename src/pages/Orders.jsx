import React from 'react';
import axios from 'axios';

import Index from '../components/Card';
import AppContext from '../context';

function Orders() {
    const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('https://64b14a9a062767bc4825fb89.mockapi.io/orders');
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (error) {
                alert('Առաջացել է սխալ պատվերները գրանցելուց');
                console.error(error);
            }
        })();
    }, []);

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Իմ պատվերները</h1>
            </div>

            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                    <Index key={index} loading={isLoading} {...item} />
                ))}
            </div>
        </div>
    );
}

export default Orders;