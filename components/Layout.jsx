import React, { useContext, useEffect } from 'react';
import { Store } from './Store';
import getCommerce from '../utils/commerce';
import { siteName } from '../utils/config';
import { Badge, CircularProgress, CardMedia, CardContent } from '@material-ui/core';
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
                    <nav className="nav bd-grid">
                        <div className="nav__toggle" id="nav-toggle">
                            <i className='bx bxs-grid'></i>
                        </div>

                        <a href="/" className="nav__logo">HYPED FLAME</a>

                        <div className="nav__menu" id="nav-menu">
                            <ul className="nav__list">
                                <li className="nav__item"><a href="/" className="nav__link active">Home</a></li>
                                <li className="nav__item"><a href="#featured" className="nav__link">Ofertas</a></li>
                                <li className="nav__item"><a href="#women" className="nav__link">Mulheres</a></li>
                                <li className="nav__item"><a href="#new" className="nav__link">Nova Coleção</a></li>
                                <li className="nav__item"><a href="#" className="nav__link">Shop</a></li>
                            </ul>
                        </div>

                        <div className="nav__shop">
                            <div className="subnav">
                                <button className="cartButton">
                                    <a href="/cart">
                                        {cart.loading ? (
                                            <CircularProgress />
                                        ) : cart.data.total_items > 0 ? (
                                            <Badge badgeContent={cart.data.total_items} color="primary">
                                                <img src="img/shopping-cart.png" width="25" height="25" />
                                            </Badge>
                                        ) : (
                                                    <img src="img/shopping-cart.png" width="25" height="25" />
                                                )}
                                    </a>
                                </button>

                                <div className="subnavcontentCart">
                                    {cart.loading ? (
                                        <CircularProgress />
                                    ) : cart.data.line_items.length === 0 ? (
                                        <h1>
                                            Carrinho está vázio.
                                        </h1>
                                    ) : (
                                                <div>
                                                    <h1>Carrinho</h1>
                                                    {cart.data.line_items.map((cartItem) => (
                                                        <div className="gridCart">
                                                            <CardMedia
                                                                component="img"
                                                                alt={cartItem.name}
                                                                image={cartItem.media.source}
                                                            />

                                                            <CardContent>
                                                                {cartItem.quantity}x {cartItem.name}<br></br>
                                                                {cartItem.price.formatted_with_symbol}
                                                            </CardContent>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>

                <main>
                    {children}
                </main>

                <footer className="footer section">
                    <div className="footer__container bd-grid">
                        <div className="footer__box">
                            <h3 className="footer__title">Hyped Flame</h3>
                            <p className="footer__description">New collection of shoes 2021.</p>
                        </div>

                        <div className="footer__box">
                            <h3 className="footer__title">Explore</h3>
                            <ul>
                                <li><a href="#home" className="footer__link">Home</a></li>
                                <li><a href="#featured" className="footer__link">Featured</a></li>
                                <li><a href="#women" className="footer__link">Women</a></li>
                                <li><a href="#new" className="footer__link">New</a></li>
                            </ul>
                        </div>

                        <div className="footer__box">
                            <h3 className="footer__title">SUPPORT</h3>
                            <ul>
                                <li><a href="#" className="footer__link">Product Help</a></li>
                                <li><a href="#" className="footer__link">Customer Care</a></li>
                                <li><a href="#" className="footer__link">Authorized service</a></li>
                            </ul>
                        </div>

                        <div className="footer__box">
                            <a href="https://www.facebook.com/Hyped-Flame-101375485289140" target="_blank" rel="noopener noreferrer"
                                className="footer__social"><i className='bx bxl-facebook'></i></a>
                            <a href="https://www.instagram.com/hyped_flame/?hl=pt-br" target="_blank" rel="noopener noreferrer"
                                className="footer__social"><i className='bx bxl-instagram'></i></a>
                            <a href="#" className="footer__social"><i className='bx bxl-twitter'></i></a>
                            <a href="#" className="footer__social"><i className='bx bxl-google'></i></a>
                        </div>
                    </div>

                    <p className="footer__copy">&#169; 2021 Hyped Flame. All rights reserved</p>
                </footer>
            </body>
        </>
    )
}