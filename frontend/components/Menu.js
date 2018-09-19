import React, { Component } from "react";
import Link from "next/link";
import { Config } from "../config.js";

const linkStyle = {
    marginRight: 15
};

class Menu extends Component {
  constructor() {
      super();
  }

  getSlug(url) {
      const parts = url.split("/");
      return parts.length > 2 ? parts[parts.length - 2] : "";
  }

  render() {
    return(
      <div>
          <Link href="/">
              <a style={linkStyle}>Home</a>
          </Link>
      </div>
    )
  }


}

export default Menu;
