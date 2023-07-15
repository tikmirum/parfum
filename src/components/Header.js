import React from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../hooks/useCart';

function Header(props) {
    const { totalPrice } = useCart();

    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/">
                <div className="d-flex align-center">
                    <img width={90} height={90} src="img/logo.png" alt="Logotype" />
                    <div>
                        <h3 className="text-uppercase">React Perfumes</h3>
                        <p className="opacity-5">Հայաստանի լավագույն օծանելիքները խանութ</p>
                        <h6>Տարբեր ֆիռմաներից</h6>
                    </div>
                </div>
            </Link>
            <ul className="d-flex justify-center align-center">
                <li onClick={props.onClickCart} className="mr-30 cu-p d-flex align-center" >
                    <img width={38} height={38} src="img/cart.jpg" alt="Զամբյուղ" />
                    <span>{totalPrice} AMD.</span>
                </li>
                <li className="mr-20 cu-p">
                    <Link to="/favorites">
                        <img width={28} height={22} src="img/heart.jpg" alt="Պահպանված" />
                    </Link>
                </li>
                <li>
                    <Link to="/orders">
                        <img width={24} height={22} src="img/user.jpg" alt="Օգտվող" />
                    </Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;