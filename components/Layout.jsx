import React, { useContext, useEffect } from 'react';
import { Store } from './Store';
import getCommerce from '../utils/commerce';
import { siteName } from '../utils/config';
import {
    CART_RETRIEVE_REQUEST,
    CART_RETRIEVE_SUCCESS,
} from '../utils/constants';

export default function Layout({
    children,
    commercePublicKey,
    title = 'Hyped Flame',
}) {
    const { state, dispatch } = useContext(Store);
    const { cart } = state;

    useEffect(() => {
        const fetchCart = async () => {
            const commerce = getCommerce(commercePublicKey);
            dispatch({ type: CART_RETRIEVE_REQUEST });
            const cartData = await commerce.cart.retrieve();
            dispatch({ type: CART_RETRIEVE_SUCCESS, payload: cartData });
        };
        fetchCart();
    }, []);

    return (
        <>
            <head>
                <title>{`${title} - ${siteName}`}</title>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
                <header className="l-header" id="header">
                    <nav className="nav bg-grid">
                        <div className="nav__toggle" id="nav-toggle">
                            <i class='bx bxs-grid'></i>
                        </div>

                        <a href="/" className="nav__logo">Hyped Flame</a>

                        <div className="nav__menu" id="nav-menu">
                            <ul className="nav__list">
                                <li className="nav__item"><a href="./index.html" className="nav__link active">Home</a></li>
                                <li className="nav__item"><a href="#featured" className="nav__link">Featured</a></li>
                                <li className="nav__item"><a href="#women" className="nav__link">Women</a></li>
                                <li className="nav__item"><a href="#new" className="nav__link">New</a></li>
                                <li className="nav__item"><a href="./shop.html" className="nav__link">Shop</a></li>
                            </ul>
                        </div>

                        <div className="nav__shop">
                            <i className='bx bx-shopping-bag'></i>
                        </div>
                    </nav>
                </header>

                <main>
                    {children}
                </main>

                <footer class="footer section">
                    <div class="footer__container bd-grid">
                        <div class="footer__box">
                            <h3 class="footer__title">Hyped Flame</h3>
                            <p class="footer__description">New collection of shoes 2021.</p>
                        </div>

                        <div class="footer__box">
                            <h3 class="footer__title">Explore</h3>
                            <ul>
                                <li><a href="#home" class="footer__link">Home</a></li>
                                <li><a href="#featured" class="footer__link">Featured</a></li>
                                <li><a href="#women" class="footer__link">Women</a></li>
                                <li><a href="#new" class="footer__link">New</a></li>
                            </ul>
                        </div>

                        <div class="footer__box">
                            <h3 class="footer__title">SUPPORT</h3>
                            <ul>
                                <li><a href="#" class="footer__link">Product Help</a></li>
                                <li><a href="#" class="footer__link">Customer Care</a></li>
                                <li><a href="#" class="footer__link">Authorized service</a></li>
                            </ul>
                        </div>

                        <div class="footer__box">
                            <a href="https://www.facebook.com/Hyped-Flame-101375485289140" target="_blank" rel="noopener noreferrer"
                                class="footer__social"><i class='bx bxl-facebook'></i></a>
                            <a href="https://www.instagram.com/hyped_flame/?hl=pt-br" target="_blank" rel="noopener noreferrer"
                                class="footer__social"><i class='bx bxl-instagram'></i></a>
                            <a href="#" class="footer__social"><i class='bx bxl-twitter'></i></a>
                            <a href="#" class="footer__social"><i class='bx bxl-google'></i></a>
                        </div>
                    </div>

                    <p class="footer__copy">&#169; 2021 Hyped Flame. All rights reserved</p>
                </footer>
            </body>
        </>
    )
}