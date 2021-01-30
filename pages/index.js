import Layout from '../components/Layout';
import getCommerce from '../utils/commerce';

export default function Home(props) {
  const { products } = props;
  return (
    <Layout title="Home" commercePublicKey={props.commercePublicKey}>
      {products.length === 0 && (
        /*<Alert severity="success">No product found</Alert>*/
        <div></div>
      )}

      <main className="l-main">
        <section className="home" id="home">
          <div className="home__container bd-grid">
            <div className="home__sneaker">
              <div className="home__shape"></div>
              <img src="img/imghome.png" alt="" className="home__img" />
            </div>

            <div className="home__date">
              <span className="home__new">New In</span>
              <h1 className="home__title">YEEZY BOOST SPLY - 350</h1>
              <p className="home__description">Explore the new collections of sneakers</p>
              <a href="#" className="button">Explore Now</a>
            </div>
          </div>
        </section>

        <section className="featured section" id="featured">
          <h2 className="section-title">FEATURED</h2>

          <div className="featured__container bd-grid">
            <article className="sneaker">
              <div className="sneaker__sale">Sale</div>
              <img src="img/featured1.png" alt="" className="sneaker__img" />
              <span className="sneaker__name">Nike Jordan</span>
              <span className="sneaker__price">R$299,00</span>
              <a href="" className="button-light">Add to Cart <i className='bx bx-right-arrow-alt button-icon'></i></a>
            </article>

            <article className="sneaker">
              <div className="sneaker__sale">Sale</div>
              <img src="img/featured2.png" alt="" className="sneaker__img" />
              <span className="sneaker__name">Nike Free RN</span>
              <span className="sneaker__price">R$299,00</span>
              <a href="" className="button-light">Add to Cart <i className='bx bx-right-arrow-alt button-icon'></i></a>
            </article>

            <article className="sneaker">
              <div className="sneaker__sale">Sale</div>
              <img src="img/featured3.png" alt="" className="sneaker__img" />
              <span className="sneaker__name">Nike Free RN</span>
              <span className="sneaker__price">R$299,00</span>
              <a href="" className="button-light">Add to Cart <i className='bx bx-right-arrow-alt button-icon'></i></a>
            </article>
          </div>
        </section>

        <section className="collection section">
          <div className="collection__container bd-grid">
            <div className="collection__card">
              <div className="collection__data">
                <h3 className="collection__name">Nike</h3>
                <p className="collection__description">New Collection 2021</p>
                <a href="#" className="button-light">Buy now <i className='bx bx-right-arrow-alt button-icon'></i></a>
              </div>

              <img src="img/collection1.png" alt="" className="collection__img" />

            </div>

            <div className="collection__card">
              <div className="collection__data">
                <h3 className="collection__name">Adidas</h3>
                <p className="collection__description">New Collection 2021</p>
                <a href="#" className="button-light">Buy now <i className='bx bx-right-arrow-alt button-icon'></i></a>
              </div>

              <img src="img/collection2.png" alt="" className="collection__img" />
            </div>
          </div>
        </section>

        <section className="women section" id="women">
          <h2 className="section-title">WOMEN SNEAKERS</h2>

          <div className="women__container bd-grid">
            <article className="sneaker">
              <img src="img/women1.png" alt="" className="sneaker__img" />
              <span className="sneaker__name">Nike Free TR</span>
              <span className="sneaker__price">R$199,00</span>
              <a href="" className="button-light">Add to Cart <i className='bx bx-right-arrow-alt button-icon'></i></a>
            </article>

            <article className="sneaker">
              <img src="img/women2.png" alt="" className="sneaker__img" />
              <span className="sneaker__name">Nike GS Pink</span>
              <span className="sneaker__price">R$199,00</span>
              <a href="" className="button-light">Add to Cart <i className='bx bx-right-arrow-alt button-icon'></i></a>
            </article>

            <article className="sneaker">
              <img src="img/women3.png" alt="" className="sneaker__img" />
              <span className="sneaker__name">Nike Get 5</span>
              <span className="sneaker__price">R$199,00</span>
              <a href="" className="button-light">Add to Cart <i className='bx bx-right-arrow-alt button-icon'></i></a>
            </article>

            <article className="sneaker">
              <img src="img/women4.png" alt="" className="sneaker__img" />
              <span className="sneaker__name">Nike Get 5</span>
              <span className="sneaker__price">R$199,00</span>
              <a href="" className="button-light">Add to Cart <i className='bx bx-right-arrow-alt button-icon'></i></a>
            </article>
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

        <section className="new section" id="new">
          <h2 className="section-title">NEW COLLECTION</h2>

          <div className="new__container bd-grid">
            <div className="new__mens">
              <img src="img/new1.png" alt="" className="new__mens-img" />
              <h3 className="new__title">Mens Shoes</h3>
              <span className="new__price">From R$119,99</span>
              <a href="#" className="button-light">View Collection <i
                className='bx bx-right-arrow-alt button-icon'></i></a>
            </div>

            <div className="new__sneaker">
              <div className="new__sneaker-card">
                <img src="img/new2.png" alt="" className="new__sneaker-img" />
                <div className="new__sneaker-overlay">
                  <a href="#" className="button">Add to Cart</a>
                </div>
              </div>

              <div className="new__sneaker-card">
                <img src="img/new3.png" alt="" className="new__sneaker-img" />
                <div className="new__sneaker-overlay">
                  <a href="#" className="button">Add to Cart</a>
                </div>
              </div>

              <div className="new__sneaker-card">
                <img src="img/new4.png" alt="" className="new__sneaker-img" />
                <div className="new__sneaker-overlay">
                  <a href="#" className="button">Add to Cart</a>
                </div>
              </div>

              <div className="new__sneaker-card">
                <img src="img/new5.png" alt="" className="new__sneaker-img" />
                <div className="new__sneaker-overlay">
                  <a href="#" className="button">Add to Cart</a>
                </div>
              </div>
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
      </main>
    </Layout>
  )
}

export async function getStaticProps() {
  const commerce = getCommerce();
  const {data: products } = await commerce.products.list();

  return {
          props: {
          products,
    },
  };
}
