import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.css';


export default function Footer() {
    const date = new Date();
    return (
        <footer className='footer' id='footer'>
            <div className="footer-main-section">
                <div className="section">
                    <div className="heading">Address</div>
                    <div className="content">
                        <p>3/365,Aryan Bhawan</p>
                        <p>Lakho Binda Campus,Santunagar,</p>
                        <p>Madhubani (Bihar)-India</p>
                        <p>Pin-847211</p>
                    </div>
                </div>
                <div className="section">
                    <div className="heading">Quick Links</div>
                    <div className="content">
                        <div className="quick-links">
                            <Link to="/">
                                <div className="icon">
                                    <i className="fi fi-rr-home"></i>
                                </div>
                                <div className="text">Home</div>
                            </Link>
                        </div>
                        <div className="quick-links">
                            <Link to="/#about">
                                <div className="icon">
                                    <i className="fi fi-rr-info"></i>
                                </div>
                                <div className="text">About</div>
                            </Link>
                        </div>
                        <div className="quick-links">
                            <Link to="/courses">
                                <div className="icon">
                                    <i className="fi fi-rr-e-learning"></i>
                                </div>
                                <div className="text">Courses</div>
                            </Link>
                        </div>
                        <div className="quick-links">
                            <Link to="/gallery">
                                <div className="icon">
                                    <i className="fi fi-rr-layout-fluid"></i>
                                </div>
                                <div className="text">Gallery</div>
                            </Link>
                        </div>
                        <div className="quick-links">
                            <Link to="/#feedback">
                                <div className="icon">
                                    <i className="fi fi-rr-comment"></i>
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
                                    <i className="fi fi-rr-envelope"></i>
                                </div>
                                <div className="text">contact2atplc@gmail.com</div>
                            </a>
                        </div>
                        <div className="social-links">
                            <a href="tel:+916205695667" target="_blank" rel="noreferrer">
                                <div className="icon">
                                    <i className="fi fi-rr-phone-call"></i>
                                </div>
                                <div className="text">+91 6205695667</div>
                            </a>
                        </div>
                        <div className="social-links">
                            <a href="https://github.com/atplc" target="_blank" rel="noreferrer">
                                <div className="icon">
                                    <i className="fi fi-brands-github"></i>
                                </div>
                                <div className="text">GitHub</div>
                            </a>
                        </div>
                        <div className="social-links">
                            <a href="https://in.linkedin.com/company/atplc" target="_blank" rel="noreferrer">
                                <div className="icon">
                                    <i className="fi fi-brands-linkedin"></i>
                                </div>
                                <div className="text">LinkedIn</div>
                            </a>
                        </div>
                        <div className="social-links">
                            <a href="https://t.me/atplc" target="_blank" rel="noreferrer">
                                <div className="icon">
                                    <i className="fi fi-brands-telegram"></i>
                                </div>
                                <div className="text">Telegram</div>
                            </a>
                        </div>
                        <div className="social-links">
                            <a href="https://www.facebook.com/people/ATPLC/100063604494243/" target="_blank" rel="noreferrer">
                                <div className="icon">
                                    <i className="fi fi-brands-facebook"></i>
                                </div>
                                <div className="text">Facebook</div>
                            </a>
                        </div>
                        <div className="social-links">
                            <a href="https://www.youtube.com/channel/UCMb7k6Re-zCo1M4HjptvG6g" target="_blank" rel="noreferrer">
                                <div className="icon">
                                    <i className="fi fi-brands-youtube"></i>
                                </div>
                                <div className="text">Youtube</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-image">
                    <img src="/Assets/Illustrator/footer-character.png" alt="character" />
                </div>
            </div>
            <div className="copyright">
                <p>
                    Copyright &copy; {date.getFullYear()} ATPLC. All rights reserved.
                </p>
                <div className="credit">
                    <a href='https://github.com/Rahulkumar703' target='_blank' rel="noreferrer">
                        Frontend Developer <span>Devil</span>
                    </a>
                </div>
            </div>
        </footer>
    )
}
