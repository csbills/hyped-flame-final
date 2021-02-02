import React, { useContext, useState } from 'react';
import getCommerce from '../../utils/commerce';
import Layout from '../../components/Layout';
import { Store } from '../../components/Store';
import Router from 'next/router';
import { CART_RETRIEVE_SUCCESS } from '../../utils/constants';

export default function Home(props) { 

    /* ================================== */
    const { state, dispatch } = useContext(Store);
    const { userInfo, cart } = state;

    const [quantity, setQuantity] = useState(1);
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
                            <img src={product.media.source} width="922" height="486" alt="" className="sneaker__img__product shows" color="#000" />
                        </div>
                    </div>


                    <div className="info">

                        <div className="data">                           
                            <h1 className="data__title">{product.name}</h1>
                            <p className="data__description" dangerouslySetInnerHTML={{ __html: product.description }}></p>
                        </div>

                        <div className="actions">

                            <div className="size">
                                <h3 className="size__title">Tamanhos</h3>
                                <div className="size__content">
                                    <span className="size__tallas active">37</span>
                                    <span className="size__tallas">38</span>
                                    <span className="size__tallas">40</span>
                                    <span className="size__tallas">41</span>                                   
                                </div>
                            </div>

                            <div className="cant">
                                <h3 className="cant__title">Quantidade</h3>
                                <div className="cant__content">
                                    <span>-</span>
                                    <input type="number" id="quantity" name="tentacles" min="1" max="10"/>
                                    <span>+</span>                                    
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
        </Layout>
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