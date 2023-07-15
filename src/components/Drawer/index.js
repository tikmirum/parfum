import React from 'react';
import axios from 'axios';

import Info from '../info';
import { useCart } from '../../hooks/useCart';

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
    const { cartItems, setCartItems, totalPrice } = useCart();
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://64b14a9a062767bc4825fb89.mockapi.io/orders', {
                items: cartItems,
            });
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://64aefba0c85640541d4dfd07.mockapi.io/cart/' + item.id);
                await delay(1000);
            }
        } catch (error) {
            alert('Առաջացել է սխալ պատվերը հաստատելու');
        }
        setIsLoading(false);
    };

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30">
                    Զամբյուղ <img onClick={onClose} width={20} height={20} className="cu-p" src="img/removeBtn.jpg" alt="Close" />
                </h2>

                {items.length > 0 ? (
                    <div className="d-flex flex-column flex">
                        <div className="items flex">
                            {items.map((obj) => (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    <div
                                        style={{ backgroundImage: `url(${obj.imageUrl})` }}
                                        className="cartItemImg"></div>

                                    <div className="mr-20 flex">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{obj.price} AMD.</b>
                                    </div>
                                    <img width={20} height={20}
                                        onClick={() => onRemove(obj.id)}
                                        className="removeBtn"
                                        src="img/removeBtn.jpg"
                                        alt="Remove"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                    <span>Արդյունք:</span>
                                    <div></div>
                                    <b>{totalPrice} AMD. </b>
                                </li>
                                <li>
                                    <span>Հարկ 1%:</span>
                                    <div></div>
                                    <b>{(totalPrice / 100) * 1} AMD. </b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                                Հաստատել պատվերը <img width={20} height={20} src="img/arrow.png" alt="Arrow" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <Info
                        title={isOrderComplete ? 'Պատվերը գրանցված է' : 'Զամբյուղը դատարկ է'}
                        description={
                            isOrderComplete
                                ? `Ձեր պատվերը #${orderId} շուտով կփոխանցվի հանգույց`
                                : 'Ավելացրեք գոնե մեկ հատ ապրանք,որպեսզի կատարեք գնում'
                        }
                        image={isOrderComplete ? 'img/complete-order.jpg' : 'img/empty.jpg'}
                    />
                )}
            </div>
        </div>
    );
}

export default Drawer;