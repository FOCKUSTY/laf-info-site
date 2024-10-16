import { NavLink } from "react-router-dom";
import routes from "../config/routes";
import style from "./header.module.css";
import { useEffect, useState } from "react";

/**
 * Шапка сайта
 */
const Header = () => {
  const [ww, setWindowWidth] = useState(window.innerWidth);
  const handleResize = () => setWindowWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (ww > 690) {
    return (
      <header className={style.main}>
        {routes[0].children?.map((r) => (
          <NavLink key={r.path} to={r.path} className={style.link}>
            {r.name}
          </NavLink>
        ))}
      </header>
    );
  } else {
    return <MobileHeader />;
  }
};

const MobileHeader = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className={style.main} data-open={isOpen}>
      <button onClick={() => setOpen(!isOpen)}>Меню</button>
      {isOpen &&
        routes[0].children?.map((r) => (
          <NavLink
            key={r.path}
            to={r.path}
            className={style.link}
            onClick={() => setOpen(false)}
          >
            {r.name}
          </NavLink>
        ))}
    </header>
  );
};
export default Header;
