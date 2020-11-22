import store from '@store';
import About from '@view/About';
import Counter from '@view/Counter';
import Home from '@view/Home';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import Container from './ui/Container';

const theme: Theme['theme'] = {
  colors: {
    blueJeans: { light: '#5D9CEC', dark: '#4A89DC' },
    aqua: { light: '#4FC1E9', dark: '#3BAFDA' },
    mint: { light: '#48CFAD', dark: '#37BC9B' },
    grass: { light: '#A0D468', dark: '#8CC152' },
    sunflower: { light: '#FFCE54', dark: '#F6BB42' },
    bittersweet: { light: '#FC6E51', dark: '#E9573F' },
    grapefruit: { light: '#ED5565', dark: '#DA4453' },
    lavender: { light: '#AC92EC', dark: '#967ADC' },
    pinkRose: { light: '#EC87C0', dark: '#D770AD' },
    lightGray: { light: '#F5F7FA', dark: '#E6E9ED' },
    mediumGray: { light: '#CCD1D9', dark: '#AAB2BD' },
    darkGray: { light: '#656D78', dark: '#434A54' },
  },
};

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />

        <Container>
          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>

            <Route exact path="/about">
              <About />
            </Route>

            <Route exact path="/counter">
              <Counter />
            </Route>

            <Route path="*">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </Container>

        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
