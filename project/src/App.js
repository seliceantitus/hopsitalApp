import React from 'react';
import Navigation from './Navigation/Navigation';
import Content from './Content';
import Footer from './Footer';
import {IntlProvider} from "react-intl";
import messages from "./messages";

class App extends React.Component {
    componentDidMount() {
        if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'en');
    }

    render() {
        return (
            <IntlProvider locale={localStorage.getItem('lang')} messages={messages[localStorage.getItem('lang')]}>
                <div className={"flex-wrapper"}>
                    <Navigation/>
                    <Content/>
                    <Footer/>
                </div>
            </IntlProvider>
        );
    }
}

export default App;
