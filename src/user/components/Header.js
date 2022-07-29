import React, { useContext, useState, useLayoutEffect, useEffect } from "react";
import logoImg from '../assets/img/logo.jpg';
import UserContext from '../../UserContext';

// helpers
const clamp = (value) => Math.max(0, value);

const isBetween = (value, floor, ceil) =>
    value >= floor && value <= ceil;

const useScrollspy = (ids, offset = 0) => {
    const [activeId, setActiveId] = useState("");
    
    useLayoutEffect(() => {
        const listener = () => {
            const scroll = window.pageYOffset;

            const position = ids
            .map((id) => {
                const element = document.getElementById(id);
    
                if (!element) return { id, top: -1, bottom: -1 };
    
                const rect = element.getBoundingClientRect();
                const top = clamp(rect.top + scroll - offset);
                const bottom = clamp(rect.bottom + scroll - offset);
    
                return { id, top, bottom };
            })
            .find(({ id, top, bottom }) => isBetween(scroll, top, bottom));

            setActiveId(position?.id || "");
        };
    
        listener();
    
        window.addEventListener("resize", listener);
        window.addEventListener("scroll", listener);
    
        return () => {
            window.removeEventListener("resize", listener);
            window.removeEventListener("scroll", listener);
        };
    }, [ids, offset]);
    
    return activeId;
};

const useScrollHandler = () => {
    const [scroll, setScroll] = useState(false);
  
    useEffect(() => {
      const onScroll = () => {
        const scrollCheck = window.scrollY > 10;
        setScroll(scrollCheck);
      };
  
      document.addEventListener("scroll", onScroll);
      return () => {
        document.removeEventListener("scroll", onScroll);
      };
    }, [scroll, setScroll]);
  
    return scroll;
};

function Header(){
    const { strings } = useContext(UserContext);
    const ids = ["about", "story", "family", "gallery", "events", "contact"];
    const activeId = useScrollspy(ids, document.getElementsByTagName('header').clientHeight); // 54 is navigation height
    const scroll = useScrollHandler();
    const [ show, setShow ] = useState(false);

    return (
        <>
            {/* <!-- Start header --> */}
            <header className={`top-header ${scroll ? "fixed-menu" : ""}`}>
                <nav className="navbar header-nav navbar-expand-lg">
                    <div className="container">
                        <a className="navbar-brand" href="/"><img src={logoImg} alt="logo"/></a>
                        <button className={`navbar-toggler ${show ? "" : "collapsed"}`} type="button" 
                            data-toggle="collapse" 
                            data-target="#navbar-wd" 
                            aria-controls="navbar-wd" 
                            aria-expanded={show ? "true" : "false"} 
                            aria-label="Toggle navigation"
                            onClick={() => setShow(show => !show)}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <div className={`collapse navbar-collapse justify-content-end ${show ? "show" : ""}`} id="navbar-wd">
                            <ul className="navbar-nav">
                                <li><a className={`nav-link ${"home" === activeId ? "active" : ""}`} href="#home">{strings.header.home}</a></li>
                                <li><a className={`nav-link ${"about" === activeId ? "active" : ""}`} href="#about">{strings.header.aboutUs}</a></li>
                                <li><a className={`nav-link ${"story" === activeId ? "active" : ""}`} href="#story">{strings.header.story}</a></li>
                                <li><a className={`nav-link ${"family" === activeId ? "active" : ""}`} href="#family">{strings.header.family}</a></li>
                                <li><a className={`nav-link ${"gallery" === activeId ? "active" : ""}`} href="#gallery">{strings.header.gallery}</a></li>
                                <li><a className={`nav-link ${"events" === activeId ? "active" : ""}`} href="#events">{strings.header.event}</a></li>
                                <li><a className={`nav-link ${"contact" === activeId ? "active" : ""}`} href="#contact">{strings.header.contact}</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            {/* <!-- End header --> */}
        </>
    );
}

export default Header;
