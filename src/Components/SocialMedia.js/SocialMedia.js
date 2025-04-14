import React from 'react'
import './SocialMedia.css'

function SocialMedia() {
    return (<>
        <div className="footer-icon-sidebar">
            <ul className="navbar-nav">
                <li className="nav-item inline-block">
                    <a href="https://github.com/" target="_blank" aria-label="Facebook" className="nav-link text-github"><i
                        className="fa fa-github"></i></a></li>
                <li className="nav-item inline-block"><a href="https://www.facebook.com/" target="_blank" aria-label="Insagram" className="nav-link"><i className="fa fa-facebook"
                ></i></a>
                </li>
                <li className="nav-item inline-block">
                    <a href="https://twitter.com/login" aria-label="Twitter"  target="_blank" className="nav-link text-github"><i
                        className="fa fa-twitter"></i></a></li>
                <li className="nav-item inline-block"><a href="https://www.instagram.com/" target="_blank" aria-label="Instagram" className="nav-link"><i className="fa fa-instagram"
                ></i></a>
                </li>
                <li className="nav-item inline-block"><a href="https://www.linkedin.com/" target="_blank" aria-label="LinkedIn" className="nav-link"><i className="fa fa-linkedin"
                ></i></a>
                </li>
            </ul>
        </div>


    </>
    )
}

export default SocialMedia
