import { PDFDocument, degrees, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit';
import Button from '../Button/Button'
import { saveAs } from 'file-saver';
import './Certificate.css'
import { useEffect, useState } from 'react'





export default function Certificate({ completedTask, totalTask, courseName, courseId }) {

    const [certificateURI, setCertificateURI] = useState('');



    useEffect(() => {

        const generateCerifiacte = async () => {

            const courseDuration = JSON.parse(localStorage.getItem('courses')).filter(course => course.Courses_id === parseInt(courseId))[0].Courses__Course_Duration;
            const userId = JSON.parse(localStorage.getItem('user')).userId


            const templateUrl = '/Assets/Certificate/template.pdf'
            const blackOpsUrl = '/Assets/Certificate/blackOps.ttf'
            const blackAddUrl = '/Assets/Certificate/blackAdd.ttf'
            const robotoUrl = '/Assets/Certificate/Roboto.ttf'
            const signUrl = '/Assets/Certificate/sign.png'
            const qrUrl = `https://quickchart.io/qr?text=https%3A%2F%2Fatplc.in%2Fdashboard%2F${userId}%2F${courseId}&dark=4a4e5a&ecLevel=H&margin=0&size=70&centerImageUrl=https://www.atplc.in/Assets/Images/atplc_logo.png`;

            const existingPdfBytes = await fetch(templateUrl).then(res => res.arrayBuffer());
            const existingFontBytes = await fetch(blackOpsUrl).then(res => res.arrayBuffer());
            const existingFontBytes1 = await fetch(blackAddUrl).then(res => res.arrayBuffer());
            const existingFontBytes2 = await fetch(robotoUrl).then(res => res.arrayBuffer());
            const existingSignBytes = await fetch(signUrl).then(res => res.arrayBuffer());
            const existingQRBytes = await fetch(qrUrl).then(res => res.arrayBuffer());


            const pdfDoc = await PDFDocument.load(existingPdfBytes)

            pdfDoc.registerFontkit(fontkit)
            const blackOps = await pdfDoc.embedFont(existingFontBytes);
            const blackAdd = await pdfDoc.embedFont(existingFontBytes1);
            const roboto = await pdfDoc.embedFont(existingFontBytes2);
            const sign = await pdfDoc.embedPng(existingSignBytes)
            sign.width = 150;
            sign.height = 42;
            const QR = await pdfDoc.embedPng(existingQRBytes);


            const pages = pdfDoc.getPages();
            const pageWidth = pages[0].getWidth();


            let { fullName, college } = JSON.parse(localStorage.getItem('user'))

            const nameWidth = blackOps.widthOfTextAtSize(fullName, 50);
            pages[0].drawText(fullName, {
                x: (pageWidth / 2) - nameWidth / 2,
                y: 410,
                size: 50,
                font: blackOps,
                color: rgb(0, 0, 0)
            })

            if (college === undefined) {
                college = 'Update College name in Profile'
            }

            const collegeWidth = roboto.widthOfTextAtSize(college, 28);

            pages[0].drawText(college, {
                x: (pageWidth / 2) - collegeWidth / 2,
                y: 330,
                size: 28,
                font: roboto,
                color: rgb(0.61176, 0.22353, 0.29412)
            })
            pages[0].drawText(courseDuration + '', {
                x: 486,
                y: 305.5,
                size: 32,
                font: blackAdd,
                color: rgb(0.61176, 0.22353, 0.29412)
            })

            const courseWidth = roboto.widthOfTextAtSize(courseName, 28);
            pages[0].drawText(courseName, {
                x: (pageWidth / 2) - courseWidth / 2,
                y: 250,
                size: 28,
                font: roboto,
                color: rgb(0.61176, 0.22353, 0.29412)
            })


            if ((completedTask / totalTask * 100) >= 75) {

                pages[0].drawImage(sign, {
                    x: 120,
                    y: 60,
                    rotate: degrees(-2)
                })
                pages[0].drawImage(QR, {
                    x: 590,
                    y: 55,
                })

                const seprator = '/'
                const date = new Date().getDate() + seprator + (new Date().getMonth() + 1) + seprator + new Date().getFullYear();

                pages[0].drawText(date, {
                    x: 445,
                    y: 20,
                    size: 16,
                    font: blackAdd,
                    color: rgb(0, 0, 0)
                })
            }
            else {

                pages[0].drawText("Dummy Certificate", {
                    x: 80,
                    y: 40,
                    size: 82,
                    font: blackOps,
                    color: rgb(0, 0, 0),
                    opacity: 0.2,
                    rotate: degrees(33),
                })

                pages[0].drawText("Dummy Certificate", {
                    x: 80,
                    y: 480,
                    size: 82,
                    font: blackOps,
                    color: rgb(0, 0, 0),
                    opacity: 0.2,
                    rotate: degrees(-33),
                })
            }

            // const uri = await pdfDoc.saveAsBase64({ dataUri: true })


            const pdf = await pdfDoc.save();

            const bytes = new Uint8Array(pdf);
            const blob = new Blob([bytes], { type: "application/pdf" });
            const docUrl = URL.createObjectURL(blob);

            await setCertificateURI(docUrl);
        }

        generateCerifiacte();

    }, [courseId, courseName, completedTask, totalTask])


    async function downloadCertificate() {
        saveAs(certificateURI, 'ATPLC ' + courseName + ' Certificate.pdf', { autoBom: true })
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
                <div className="certificate-download">
                    <Button icon='fi fi-rr-template' label={(completedTask / totalTask * 100) >= 75 ? 'Download Certificate' : 'Download Dummy Certificate'} onClick={downloadCertificate} />
                </div>
            </div>
        </section>
    )
}
