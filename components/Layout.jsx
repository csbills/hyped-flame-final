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
        <React.Fragment>
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
                                <li className="nav__item"><a href="/" className="nav__link">Home</a></li>
                                <li className="nav__item"><a href="#featured" className="nav__link">Ofertas</a></li>
                                <li className="nav__item"><a href="#women" className="nav__link">Feminino</a></li>
                                <li className="nav__item"><a href="#new" className="nav__link">Nova Coleção</a></li>
                                <li className="nav__item"><a href="/shop" className="nav__link">Shop</a></li>
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
                                                <img width="25" height="25" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAACeklEQVRYR72X4XXVMAyFv0wAGxQmACYoTAAdgQkKE7z3JqBswAaUCWAD2g06QpkgHAU7x3EkS/YD/C+xY93ceyXLE8qYgFmb6Hg3uod8NzSsgPn9fwc09BeBj4YZAp5NcD3Da+BlinUH/AA+Aw+B+LslG0D5QfzjUP4B+OQElDUCrGuMMHSTmIkEEkACTB3aTy+AOgz4Dvha7H4PHAGRSoZIJ88vijVXwG0Zo1SiRrpjyMkS8cVF2uQbIAA1H9zO8DZNyDfPa0BWWelhSP7+ZwryS0wNPBpqPE2mfpLmX01wF6ltO1PnjxQZSyOb7BQAJdsukyU+znBjsLkpwlOHf8Qbh7T+lLxiGnuC4wyHtOCUnhe/yvgbki2AcoAWoAT6OMEhBV4BeampSSbe+J484qard4Q0AIjZ30zwULKl1aGSCe+HmvMBO+yk33goU11I01OjRsDvASm7rAxNcJr/FDoZOw85tcVa3/SiJ9nyBwpz6/tGxliBzwdkMdTSqE77nJVWOch7NRkqJfPqR4eBNuWgLh/aWbYWtAwokC095m8DUoKZGkcPSIettodqQKXGPQz1SJbLirZ/KMs6gkWWnp9lTo+0gKhN3/CdVec2+6wPqRA2T/WIyUuqKu+pXUAo7YHwKR3RyiqwNfhNyoqpxXS5bbDaDI8lT7LcV+U+yWSoUWFD12sPqHYmbhhSDLt2hiJZcbhGVHHXDB8d0VbVRVBcs1qHdNnL13tGbqVubxwBCrwHvuwkq1qI+gqzrleq+jIXud4oANWrlFap5dt8A82XPfPwDJhYI0uuUXLI7u5qC6AzGnVTmUGgqxWCkv/7ZZZkw5FHmckBfwMaZecl3p76CAAAAABJRU5ErkJggg==" />
                                            </Badge>
                                        ) : (
                                                    <img width="25" height="25" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAACeklEQVRYR72X4XXVMAyFv0wAGxQmACYoTAAdgQkKE7z3JqBswAaUCWAD2g06QpkgHAU7x3EkS/YD/C+xY93ceyXLE8qYgFmb6Hg3uod8NzSsgPn9fwc09BeBj4YZAp5NcD3Da+BlinUH/AA+Aw+B+LslG0D5QfzjUP4B+OQElDUCrGuMMHSTmIkEEkACTB3aTy+AOgz4Dvha7H4PHAGRSoZIJ88vijVXwG0Zo1SiRrpjyMkS8cVF2uQbIAA1H9zO8DZNyDfPa0BWWelhSP7+ZwryS0wNPBpqPE2mfpLmX01wF6ltO1PnjxQZSyOb7BQAJdsukyU+znBjsLkpwlOHf8Qbh7T+lLxiGnuC4wyHtOCUnhe/yvgbki2AcoAWoAT6OMEhBV4BeampSSbe+J484qard4Q0AIjZ30zwULKl1aGSCe+HmvMBO+yk33goU11I01OjRsDvASm7rAxNcJr/FDoZOw85tcVa3/SiJ9nyBwpz6/tGxliBzwdkMdTSqE77nJVWOch7NRkqJfPqR4eBNuWgLh/aWbYWtAwokC095m8DUoKZGkcPSIettodqQKXGPQz1SJbLirZ/KMs6gkWWnp9lTo+0gKhN3/CdVec2+6wPqRA2T/WIyUuqKu+pXUAo7YHwKR3RyiqwNfhNyoqpxXS5bbDaDI8lT7LcV+U+yWSoUWFD12sPqHYmbhhSDLt2hiJZcbhGVHHXDB8d0VbVRVBcs1qHdNnL13tGbqVubxwBCrwHvuwkq1qI+gqzrleq+jIXud4oANWrlFap5dt8A82XPfPwDJhYI0uuUXLI7u5qC6AzGnVTmUGgqxWCkv/7ZZZkw5FHmckBfwMaZecl3p76CAAAAABJRU5ErkJggg==" />
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
                                                        <div className="gridCart" key={cartItem.id}>
                                                            <CardMedia
                                                                component="img"
                                                                alt={cartItem.name}
                                                                image={cartItem.media.source}
                                                            />

                                                            <CardContent>
                                                                {cartItem.variants.map((variant, i) =>
                                                                    <p key={i}>
                                                                        {variant.name}: {variant.option}
                                                                    </p>
                                                                )}
                                                                <h6>{cartItem.quantity}x {cartItem.name}<br></br>
                                                                    {cartItem.price.formatted_with_symbol}</h6>
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
                            <p className="footer__description">Nova Coleção 2021.</p>
                        </div>

                        <div className="footer__box">
                            <h3 className="footer__title">Explore</h3>
                            <ul>
                                <li><a href="#home" className="footer__link">Home</a></li>
                                <li><a href="#featured" className="footer__link">Ofertas</a></li>
                                <li><a href="#women" className="footer__link">Feminino</a></li>
                                <li><a href="#new" className="footer__link">Nova Coleção</a></li>
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
        </React.Fragment>
    )
}