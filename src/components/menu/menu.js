import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import cn from "classnames";

import cheesecake from "../../assets/images/cheesecake.png";

import styles from "./menu.scss";

const MENU = [
  {
    label: "Bar",
    route: "/",
    isActive: props => props.location.pathname === "/",
  },
  {
    label: "Donut",
    route: "/donut-charts",
    isActive: props => props.location.pathname.includes("/donut-charts"),
  },
  {
    label: "Pie",
    route: "/pie-charts",
    isActive: props => props.location.pathname.includes("/pie-charts"),
  },
];

class Menu extends Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.logo} onClick={() => this.props.history.push("/")}>
          <img src={cheesecake} alt="cheesecake" />
          <h1>Syrnikjs</h1>
        </div>
        <nav className={styles.nav}>
          {MENU.map(({ label, route, isActive }, index) => (
            <NavLink
              key={`${label}-${index}`}
              to={route}
              className={cn({ [styles.active]: isActive(this.props) })}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
    );
  }
}

export const MainMenu = withRouter(Menu);
