import React, { useContext } from "react";
import logoImg from '../assets/img/logo.jpg';
import UserContext from '../../UserContext';

function Header() {
    const { strings } = useContext(UserContext);

    return (
        <>
            {/* <!-- Start header --> */}
            <header className="top-header">
                <nav className="navbar header-nav navbar-expand-lg">
                    <div className="container">
                        <a className="navbar-brand" href="/"><img src={logoImg} alt="logo"/></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-wd" aria-controls="navbar-wd" aria-expanded="false" aria-label="Toggle navigation">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbar-wd">
                            <ul className="navbar-nav">
                                <li><a className="nav-link active" href="#home">{strings.header.home}</a></li>
                                <li><a className="nav-link" href="#about">{strings.header.about}</a></li>
                                <li><a className="nav-link" href="#story">{strings.header.story}</a></li>
                                <li><a className="nav-link" href="#family">{strings.header.family}</a></li>
                                <li><a className="nav-link" href="#gallery">{strings.header.gallery}</a></li>
                                <li><a className="nav-link" href="#events">{strings.header.event}</a></li>
                                <li><a className="nav-link" href="#contact">{strings.header.contact}</a></li>
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
