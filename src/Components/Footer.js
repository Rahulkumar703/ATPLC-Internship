import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    const date = new Date();
    return (
        <footer className='footer'>
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
                        <Link to="/">Home</Link>
                    </div>
                </div>
                <div className="section">
                    <div className="heading">Address</div>
                    <div className="content">
                        <p> Motihari College Of Engineering Motihari,Motihari</p>
                        <p>Bariyarpur, Near FCI </p>
                    </div>
                </div>
            </div>
            <div className="copyright">
                Copyright by ATPLC &copy; {date.getFullYear()}
            </div>
        </footer>
    )
}
