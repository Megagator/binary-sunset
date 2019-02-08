import React from "react";
import Menu from "../components/Menu.js";
import { Config } from "../config.js";
import Layout from "./Layout.js";

const PageWrapper = Comp => (
  class extends React.Component {
    static async getInitialProps(args) {
      // const headerMenuRes = await fetch(
      //   `${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`
      // );
      // const headerMenu = await headerMenuRes.json();
      return {
        // headerMenu,
        ...(Comp.getInitialProps ? await Comp.getInitialProps(args) : null),
      };
    }

    render() {
      return (
        <Layout>
          <main className="page-wrapper">
            <Comp {...this.props} />
          </main>
        </Layout>
      )
    }
  }
)

export default PageWrapper;
