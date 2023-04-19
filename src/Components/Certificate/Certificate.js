import { PDFDocument, degrees, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit';
import Button from '../Button/Button'
import { saveAs } from 'file-saver';
import './Certificate.css'
import { useEffect, useRef, useState } from 'react'





export default function Certificate({ completedTask, totalTask, courseName, courseId }) {

    const iframeRef = useRef();
    const [certificateURI, setCertificateURI] = useState('');



    useEffect(() => {

        const generateCerifiacte = async () => {

            const courseDuration = JSON.parse(localStorage.getItem('courses')).filter(course => course.Courses_id === parseInt(courseId))[0].Courses__Course_Duration;
            const userId = JSON.parse(localStorage.getItem('user')).userId


            const templateUrl = '/Assets/Certificate/template.pdf'
            const BoldUrl = '/Assets/Certificate/Poppins-Bold.ttf'
            const semiBoldUrl = '/Assets/Certificate/Poppins-SemiBold.ttf'
            const signUrl = '/Assets/Certificate/sign.png'
            const qrUrl = `https://quickchart.io/qr?text=https%3A%2F%2Fatplc.in%2F${userId}%2F${courseId}&dark=4a4e5a&ecLevel=H&margin=0&size=70&centerImageUrl=https://www.atplc.in/Assets/Images/atplc_logo.png`;

            const existingPdfBytes = await fetch(templateUrl).then(res => res.arrayBuffer());
            const existingFontBytes = await fetch(BoldUrl).then(res => res.arrayBuffer());
            const existingFontBytes1 = await fetch(semiBoldUrl).then(res => res.arrayBuffer());
            const existingSignBytes = await fetch(signUrl).then(res => res.arrayBuffer());
            const existingQRBytes = await fetch(qrUrl).then(res => res.arrayBuffer());


            const pdfDoc = await PDFDocument.load(existingPdfBytes)

            pdfDoc.registerFontkit(fontkit)
            const poppinsBold = await pdfDoc.embedFont(existingFontBytes);
            const poppinsSemiBold = await pdfDoc.embedFont(existingFontBytes1);
            const sign = await pdfDoc.embedPng(existingSignBytes)
            sign.width = 200;
            sign.height = 59;
            const QR = await pdfDoc.embedPng(existingQRBytes);


            const pages = pdfDoc.getPages();
            const pageWidth = pages[0].getWidth();


            let { fullName, college } = JSON.parse(localStorage.getItem('user'))

            const nameWidth = poppinsBold.widthOfTextAtSize(fullName, 32);
            pages[0].drawText(fullName, {
                x: (pageWidth / 2) - nameWidth / 2,
                y: 390,
                size: 32,
                font: poppinsBold,
                color: rgb(0.61176, 0.22353, 0.29412)
            })

            if (college === undefined) {
                college = 'Update College name in Profile'
            }

            const collegeWidth = poppinsSemiBold.widthOfTextAtSize(college, 28);

            pages[0].drawText(college, {
                x: (pageWidth / 2) - collegeWidth / 2,
                y: 315,
                size: 28,
                font: poppinsSemiBold,
                color: rgb(0.61176, 0.22353, 0.29412)
            })
            pages[0].drawText(courseDuration + '', {
                x: 518,
                y: 284,
                size: 20,
                font: poppinsSemiBold,
                color: rgb(0.61176, 0.22353, 0.29412)
            })

            const courseWidth = poppinsSemiBold.widthOfTextAtSize(courseName, 28);
            pages[0].drawText(courseName, {
                x: (pageWidth / 2) - courseWidth / 2,
                y: 245,
                size: 28,
                font: poppinsSemiBold,
                color: rgb(0.61176, 0.22353, 0.29412)
            })


            if ((completedTask / totalTask * 100) >= 75) {

                pages[0].drawImage(sign, {
                    x: 60,
                    y: 100,
                    rotate: degrees(3)
                })
                pages[0].drawImage(QR, {
                    x: 620,
                    y: 90,
                    size: 28,
                    font: poppinsSemiBold,
                    color: rgb(0.61176, 0.22353, 0.29412)
                })

                const seprator = '/'
                const date = new Date().getDate() + seprator + (new Date().getMonth() + 1) + seprator + new Date().getFullYear();

                pages[0].drawText(date, {
                    x: 412,
                    y: 42,
                    size: 12,
                    font: poppinsSemiBold,
                    color: rgb(0.29020, 0.30588, 0.35294)
                })
            }
            else {

                pages[0].drawText("Dummy Certificate", {
                    x: 80,
                    y: 40,
                    size: 82,
                    font: poppinsBold,
                    color: rgb(0, 0, 0),
                    opacity: 0.2,
                    rotate: degrees(33),
                })

                pages[0].drawText("Dummy Certificate", {
                    x: 80,
                    y: 480,
                    size: 82,
                    font: poppinsBold,
                    color: rgb(0, 0, 0),
                    opacity: 0.2,
                    rotate: degrees(-33),
                })
            }

            const uri = await pdfDoc.saveAsBase64({ dataUri: true })
            await setCertificateURI(uri);
            iframeRef.current.src = uri;
            iframeRef.current.style.display = "block"
        }

        generateCerifiacte();


    }, [courseId, courseName, completedTask, totalTask])


    async function downloadCertificate() {
        saveAs(certificateURI, 'ATPLC Certificate.pdf', { autoBom: true })
    }

    return (

        <section className="certificate-section">
            <div className="section-heading">
                <h4>Cerificate</h4>
            </div>
            <div className="section-body">
                <div className="certificate-criteria">
                    <p>You must submit at least <span>75%</span> of tasks to be eligible for the training certificate.</p>
                    <p>Once you meet the criteria, a download button for your training certificate will appear.</p>
                </div>
                <div className="current-percentage">
                    <p>Current Percentage = <span className={`${(completedTask / totalTask * 100) >= 75 ? 'success' : 'danger'}`}>{(completedTask / totalTask * 100).toFixed(2)}%</span></p>
                </div>
                <embed ref={iframeRef} src="" width="100%" height="520px" style={{ display: "none" }} />
                {
                    (completedTask / totalTask * 100) >= 75
                        ?
                        <div className="certificate-download">
                            <Button icon='fi fi-rr-template' label='Download Certificate' onClick={downloadCertificate} />
                        </div>
                        :
                        null
                }
            </div>
        </section>
    )
}
