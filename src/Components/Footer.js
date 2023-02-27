import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    const date = new Date();
    return (
        <footer className='footer' id='about'>
            <div className="footer-main-section">
                <div className="section">
                    <div className="heading">Address</div>
                    <div className="content">
                        <p> Motihari College Of Engineering Motihari,Motihari</p>
                        <p>Bariyarpur, Near FCI </p>
                    </div>
                </div>
                <div className="section">
                    <div className="heading">Quick Links</div>
                    <div className="content">
                        <div className="quick-links">
                            <Link to="/">
                                <div className="icon">
                                    <span className="material-symbols-rounded">
                                        home
                                    </span>
                                </div>
                                <div className="text">Home</div>
                            </Link>
                            <Link to="/#about">
                                <div className="icon">
                                    <span className="material-symbols-rounded">
                                        help
                                    </span>
                                </div>
                                <div className="text">About</div>
                            </Link>
                            <Link to="/courses">
                                <div className="icon">
                                    <span className="material-symbols-rounded">
                                        book
                                    </span>
                                </div>
                                <div className="text">Courses</div>
                            </Link>
                            <Link to="/gallery">
                                <div className="icon">
                                    <span className="material-symbols-rounded">
                                        gallery_thumbnail
                                    </span>
                                </div>
                                <div className="text">Gallery</div>
                            </Link>
                            <Link to="/#feedback">
                                <div className="icon">
                                    <span className="material-symbols-rounded">
                                        forum
                                    </span>
                                </div>
                                <div className="text">Feedback</div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="heading">Social Links</div>
                    <div className="content">
                        <div className="social-links">
                            <a href="mailto:contact2atplc@gmail.com" target="_blank" rel="noreferrer">
                                <div className="icon">
                                    <img src="https://img.icons8.com/fluency/48/null/mail.png" alt="mail" />
                                </div>
                                <div className="text">contact2atplc@gmail.com</div>
                            </a>
                        </div>
                        <div className="social-links">
                            <a href="tel:+916205695667" target="_blank" rel="noreferrer">
                                <div className="icon">
                                    <img src="https://img.icons8.com/parakeet/48/null/phone.png" alt="phone" />
                                </div>
                                <div className="text">+91 6205695667</div>
                            </a>
                        </div>
                        <div className="social-links">
                            <a href="https://github.com/atplc" target="_blank" rel="noreferrer">
                                <div className="icon">
                                    <img src="https://img.icons8.com/material-outlined/24/null/github.png" alt='github' />
                                </div>
                                <div className="text">GitHub</div>
                            </a>
                        </div>
                        <div className="social-links">
                            <a href="https://in.linkedin.com/company/atplc" target="_blank" rel="noreferrer">
                                <div className="icon">
                                    <img src="https://img.icons8.com/color/48/null/linkedin.png" alt='linkedin' />
                                </div>
                                <div className="text">LinkedIn</div>
                            </a>
                        </div>
                        <div className="social-links">
                            <a href="https://play.google.com/store/apps/details?id=com.bcebhagalpur.atplc&gl=US&pli=1" target="_blank" rel="noreferrer">
                                <div className="icon">
                                    <img src="https://img.icons8.com/fluency/48/null/google-play.png" alt='playstore' />
                                </div>
                                <div className="text">Playstore</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright">
                Copyright by ATPLC &copy; {date.getFullYear()}
            </div>
        </footer>
    )
}
