import Layout from '../components/Layout';
import getCommerce from '../utils/commerce';

export default function Home(props) {
  return (
    <Layout title="Home" commercePublicKey={props.commercePublicKey}>
      <div className="l-main">
        <section className="home" id="home">
          <div className="home__container bd-grid">
            <div className="home__sneaker">
              <div className="home__shape"></div>
              <img src="img/imghome.png" alt="" className="home__img" />
            </div>

            <div className="home__date">
              <span className="home__new">ADIDAS</span>
              <h1 className="home__title">YEEZY BOOST SPLY - 350 V2</h1>
              <p className="home__description">Explore a nova coleção do Yeezy Boost 350 V2.</p>
              <a href="#new" className="button">Explore Agora</a>
            </div>
          </div>
        </section>

        {/* SEÇÃO DE OFERTAS (PRODUTOS VINDO DA API)*/}
        <section className="featured section" id="featured">
          <h2 className="section-title">OFERTAS</h2>
          <div className="featured__container bd-grid">
            {props.productsoferta.map((product) => (
              <article className="sneaker" key={product.id}>
                <div className="sneaker__sale">oferta</div>
                <img src={product.media.source} alt={product.name} className="sneaker__img" />
                <span className="sneaker__name">{product.name}</span>
                <span className="sneaker__price">{product.price.formatted_with_symbol}</span>
                <a href={`/products/${product.permalink}`} className="button-light">Detalhes <i className='bx bx-right-arrow-alt button-icon'></i></a>
              </article>
            ))}
          </div>
        </section>

        <section className="collection section">
          <h2 className="section-title">MARCAS</h2>
          <div className="collection__container bd-grid">

            <div className="collection__card">
              <div className="collection__data">
                <h3 className="collection__name">Nike</h3>
                <p className="collection__description">Nova Coleção 2021</p>
                <a href="#" className="button-light">Confira já <i className='bx bx-right-arrow-alt button-icon'></i></a>
              </div>
              <img src="img/collection1.png" alt="" className="collection__img" />
            </div>

            <div className="collection__card">
              <div className="collection__data">
                <h3 className="collection__name">Adidas</h3>
                <p className="collection__description">Nova Coleção 2021</p>
                <a href="#" className="button-light">Confira já <i className='bx bx-right-arrow-alt button-icon'></i></a>
              </div>
              <img src="img/collection2.png" alt="" className="collection__img" />
            </div>
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

        <section className="offer section">
          <div className="offer__container bd-grid">
            <div className="offer__data">
              <h3 className="offer__title">50% OFF</h3>
              <p className="offer__description">In Adidas Supertars sneakers</p>
              <a href="#" className="button">Shop now</a>
            </div>
            <img src="img/offert.png" alt="" className="offer__img" />
          </div>
        </section>

        {/* SEÇÃO DE COLEÇÕES (PRODUTOS VINDO DA API)*/}
        <section className="new section" id="new">
          <h2 className="section-title">LANÇAMENTOS</h2>

          <div className="new__container bd-grid">
            <div className="new__mens">
              <img src="img/new1.png" alt="" className="new__mens-img" />
              <h3 className="new__title">Tênis Masculino</h3>
              <span className="new__price">A partir de R$119,99</span>
              <a href="#" className="button-light">Confira já <i
                className='bx bx-right-arrow-alt button-icon'></i></a>
            </div>

            <div className="new__sneaker">
              {props.productsnovacolecao.map((product) => (
                <div className="new__sneaker-card" key={product.id}>
                  <img src={product.media.source} alt="" className="new__sneaker-img" />
                  <div className="new__sneaker-overlay">
                    <a href={`/products/${product.permalink}`} className="button">Add to Cart</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="newsletter section">
          <div className="newsletter__container bd-grid">
            <div>
              <h3 className="newsletter__title">Subscribe And Get <br></br> 10% OFF</h3>
              <p className="newsletter description">Get 10% discount for all products</p>
            </div>

            <form action="" className="newsletter__subscribe">
              <input type="text" className="newsletter__input" placeholder="@email.com" />
              <a href="#" className="button">Subscribe</a>
            </form>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const commerce = getCommerce();

  const { data: productsoferta } = await commerce.products.list({
    category_slug: "oferta"
  });

  const { data: productsnovacolecao } = await commerce.products.list({
    category_slug: "nova-colecao"
  });

  const { data: productsfeminino } = await commerce.products.list({
    category_slug: "feminino"
  });

  return {
    props: {
      productsoferta,
      productsnovacolecao,
      productsfeminino,
    },
  };
}
