import React, { useContext, useState } from 'react';
import getCommerce from '../../utils/commerce';
import Layout from '../../components/Layout';
import { Store } from '../../components/Store';
import Router from 'next/router';
import { Alert } from '@material-ui/lab';
import {
    Select,
    MenuItem,
} from '@material-ui/core';
import { CART_RETRIEVE_SUCCESS } from '../../utils/constants';

export default function Home(props) {
    /* ================================== */
    const { state, dispatch } = useContext(Store);
    const { userInfo, cart } = state;

    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState();
    const { product } = props;
    const addToCartHandler = async () => {
        const commerce = getCommerce(props.commercePublicKey);
        const lineItem = cart.data.line_items.find(
            (x) => x.product_id === product.id
        );
        if (lineItem) {
            const cartData = await commerce.cart.update(lineItem.id, {
                quantity: quantity,                
            });
            dispatch({ type: CART_RETRIEVE_SUCCESS, payload: cartData.cart });
            Router.push('/cart');
        } else {
            const cartData = await commerce.cart.add(product.id, quantity);
            dispatch({ type: CART_RETRIEVE_SUCCESS, payload: cartData.cart });
            Router.push('/cart');
        }
    };

    return (
        <Layout title={product.name} commercePublicKey={props.commercePublicKey}>
            <div className="l-main bd-grid__product">
                <div className="home__product">
                    <div className="sneaker__product">
                        <div className="sneaker__figure__product"></div>

                        <div>
                            <img src={product.media.source} width="2000" height="1200" alt="" className="sneaker__img__product" />
                        </div>
                    </div>


                    <div className="info">

                        <div className="data">
                            <h1 className="data__title">{product.name}</h1>
                            <p className="data__description" dangerouslySetInnerHTML={{ __html: product.description }}></p>
                        </div>

                        <div className="actions">

                            <div className="size">
                                <h3 className="size__title">Tamanho</h3>
                                <div className="size__content">
                                    <Select className="size__tallas" id="size" fullWidth
                                        onChange={(e) => setSize(e.target.value)} value={size}>
                                        {product.variants.map(variant => (
                                            <div key={variant.id}>
                                                {variant.options.map(option => (
                                                    <MenuItem key={option.id} value={option.name}>
                                                      {option.name}
                                                    </MenuItem>
                                                ))}
                                            </div>
                                        ))}
                                    </Select>
                                </div>
                            </div>

                            <div className="cant">
                                <h3 className="cant__title">Quantidade</h3>
                                <div className="cant__content">
                                    <Select
                                        labelId="quantity-label"
                                        id="quantity"
                                        fullWidth
                                        onChange={(e) => setQuantity(e.target.value)}
                                        value={quantity}>
                                        {[...Array(product.quantity).keys()].map((x) => (
                                            <MenuItem key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </MenuItem>
                                        ))}

                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="preci">
                            <span className="preci__title">{product.price.formatted_with_symbol}</span>
                            <button onClick={addToCartHandler} className="preci__button">ADD TO CART</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );
}

export async function getServerSideProps({ params }) {
    const { id } = params;
    const commerce = getCommerce();
    const product = await commerce.products.retrieve(id, {
        type: 'permalink',
    });
    return {
        props: {
            product,
        },
    };
}