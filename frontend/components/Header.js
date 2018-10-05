import React, { Component } from "react";
import Head from "next/head";
import stylesheet from '../src/styles/style.scss'

class Header extends Component {
    constructor() {
        super();
    }
    
    render() {
        const Fragment = React.Fragment;

        return (
            <Fragment>
                <Head>
                    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <meta charSet="utf-8" />
                    <title>Binary Sunset</title>
                </Head>
            </Fragment>
        );
    }
}

export default Header;
