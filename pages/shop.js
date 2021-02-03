import React, { useContext, useEffect } from 'react';
import { Store } from '../components/Store';
import getCommerce from '../utils/commerce';
import {
    CART_RETRIEVE_REQUEST,
    CART_RETRIEVE_SUCCESS,
} from '../utils/constants';
import Layout from '../components/Layout';

export default function Shop(props) {
    const { products } = props;
    return (
        <Layout title="Shop" commercePublicKey={props.commercePublicKey}>
            <div className="l-main">
                {/* TODOS PRODUTOS VINDO DA API*/}
                <section className="featured section" id="featured">
                    <h2 className="section-title">MASCULINO</h2>
                    <div className="featured__container bd-grid">
                        {products.map((product) => (
                            <article className="sneaker" key={product.id}>
                                <img src={product.media.source} alt="" className="sneaker__img" />
                                <span className="sneaker__name">{product.name}</span>
                                <span className="sneaker__price">{product.price.formatted_with_symbol}</span>
                                <a href={`/products/${product.permalink}`} className="button-light">Detalhes <i className='bx bx-right-arrow-alt button-icon'></i></a>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="women section" id="women">
                    <h2 className="section-title">FEMININO</h2>

                    <div className="featured__container bd-grid">
                        {props.productsfeminino.map((product) => (
                            <article className="sneaker" key={product.id}>
                                <img src={product.media.source} alt={product.name} className="sneaker__img" />
                                <span className="sneaker__name">{product.name}</span>
                                <span className="sneaker__price">{product.price.formatted_with_symbol}</span>
                                <a href={`/products/${product.permalink}`} className="button-light">Detalhes <i className='bx bx-right-arrow-alt button-icon'></i></a>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const commerce = getCommerce();
    const { data: products } = await commerce.products.list();
    const { data: productsfeminino } = await commerce.products.list({
        category_slug: "feminino"
      });

    return {
        props: {
            products,
            productsfeminino,
        },
    };
}

