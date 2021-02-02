/* next.js head */
import Head from 'next/head';
import React, { useContext, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { theme } from '../utils/styles';
import { siteName } from '../utils/config';
import { Badge } from '@material-ui/core';
import { useStyles } from '../utils/styles';
import { Store } from './Store';
import styles from '../styles/Home.module.css';
import {
  CART_RETRIEVE_REQUEST,
  CART_RETRIEVE_SUCCESS,
} from '../utils/constants';
import getCommerce from '../utils/commerce';
import {
  CircularProgress,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from '@material-ui/core';

export default function Layout({
  children,
  commercePublicKey,
  title = 'Hyped Flame',
}) {
  const classes = useStyles();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const proccessToCheckout = () => {
    Router.push('/checkout');
  };

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
      <Head>
        <meta charSet="utf-8" />
        <title>{`${title} - ${siteName}`}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar
          position="static"
          color="default"
          elevation={0}
          className={classes.appBar}
        >
         <header className={styles.header}>          
            <li className={styles.li}>
              <div className={styles.subnav}>
                <button className={styles.cartButton}>
                  <a href="/cart" className={styles.a}>
                    {cart.loading ? (
                      <CircularProgress />
                    ) : cart.data.total_items > 0 ? (
                      <Badge badgeContent={cart.data.total_items} color="primary">
                        <img src="/shopping-cart.png" width="30" height="30" />
                      </Badge>
                    ) : (
                          <img src="/shopping-cart.png" width="30" height="30" />
                        )}
                  </a>
                </button>
                <div className={styles.subnavcontentCart}>
                  {cart.loading ? (
                    <CircularProgress />
                  ) : cart.data.line_items.length === 0 ? (
                    <Typography variant="h6" component="h6">
                      Carrinho está vázio.
                    </Typography>

                  ) : (
                        <React.Fragment>
                        <div>
                            <h1>
                              Carrinho
                            </h1>
                            {cart.data.line_items.map((cartItem) => (
                              <div className={styles.gridCart}>
                                <CardMedia
                                  component="img"
                                  alt={cartItem.name}
                                  image={cartItem.media.source}
                                  className={classes.media}
                                />
                                <CardContent>
                                  <Typography
                                    gutterBottom
                                    variant="body2"
                                    color="textPrimary"
                                    component="p"
                                  >
                                    {cartItem.quantity}x {cartItem.name}
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    color="textPrimary"
                                    component="p"
                                  >
                                    {cartItem.price.formatted_with_symbol}
                                  </Typography>
                                </CardContent>
                              </div>
                            ))}
                            <h1>
                              Subtotal: <span>{cart.data.subtotal.formatted_with_symbol}</span>
                            </h1>
                            <div>
                              <button className={styles.limpar}>LIMPAR</button>
                              <button onClick={proccessToCheckout}>fechar pedido</button>
                            </div>

                          </div>
                        </React.Fragment>
                      )}
                </div>
              </div>
            </li>
          </header>
        </AppBar>
        {/* Hero unit */}
        <Container component="main" className={classes.main}>
          {children}
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="footer">
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
              {'© '}
              {siteName} 2021
              {'.'}
            </Typography>
          </Box>
        </Container>
        {/* End footer */}
      </ThemeProvider>
    </React.Fragment>
  );
}