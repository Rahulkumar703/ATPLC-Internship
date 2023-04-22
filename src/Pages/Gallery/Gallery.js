import React, { useEffect, useRef, useState } from 'react'
import Loader from '../../Components/Loader/Loader';
import '../CommonPage.css'
import Error from '../Error/Error';
import './Gallery.css'

export default function Gallery() {
    const [images, setImages] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [scroll, setScroll] = useState(0);

    const imageRef = useRef();

    useEffect(() => {
        document.title = `ATPLC | Gallery`
        document.getElementsByTagName("META")[2].content = 'Memry '
        window.scrollTo(0, 0);

        const fetchImages = () => {
            let arr = [];
            for (let i = 0; i <= 50; ++i) {
                arr.push('https://picsum.photos/500/500')
            }
            setImages(arr);
            setIsLoading(false);
            setError('')
        }
        fetchImages();
    }, [])


    const expandImg = (e) => {
        imageRef.current.src = e.target.src;
        setIsExpanded(true);
        setScroll(window.pageYOffset);
        document.body.style = "height:100vh;overflow-Y:hidden"
    }
    const closeImg = () => {
        setIsExpanded(false)
        document.body.style = "height:auto;overflow-Y:auto"
        window.scrollTo(0, scroll)
    }



    return (
        <section className='page gallery-page'>
            <div className="page-heading">
                <h2>Gallery</h2>
            </div>
            <div className="page-body">

                <div className="gallery-grid">
                    {
                        isLoading ?
                            <Loader />
                            :
                            error !== ''
                                ?
                                <Error error={error} />
                                :
                                images.map((src, index) => {
                                    return <div
                                        key={index}
                                        className='tilt-container'
                                    >
                                        <img src={src} alt="gallery" onClick={expandImg} />
                                    </div>
                                })
                    }
                    {
                        <div className="expanded-image" style={!isExpanded ? { display: 'none' } : { display: 'block' }}>
                            <img ref={imageRef} src="" alt="expanded-gallery" />
                            <div className="cross" onClick={closeImg}>
                                <i className="fi fi-rr-cross-circle"></i>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </section>
    )
}
