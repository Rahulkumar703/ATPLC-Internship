import { PDFDocument, degrees, rgb, StandardFonts, fontkit } from 'pdf-lib'
import Button from '../Button/Button'
import './Certificate.css'
import { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'





export default function Certificate({ completedTask, totalTask, courseName, courseId }) {

    const [certificateURI, setCertificateURI] = useState('');
    const [loading, setLoading] = useState(true);



    useEffect(() => {

        const generateCerifiacte = async () => {

            const courseDuration = JSON.parse(localStorage.getItem('courses')).filter(course => course.Courses_id === parseInt(courseId))[0].Courses__Course_Duration;
            const userId = JSON.parse(localStorage.getItem('user')).userId

            const templateUrl = '/Assets/Certificate/template.pdf'
            const signUrl = '/Assets/Certificate/sign.png'
            const qrUrl = `https://quickchart.io/qr?text=https%3A%2F%2Fatplc.in%2Fdashboard%2F${userId}%2F${courseId}&dark=4a4e5a&ecLevel=H&margin=0&size=70&centerImageUrl=https://www.atplc.in/Assets/Images/atplc_logo.png`;

            let pdfDoc;

            try {
                const existingPdfBytes = await fetch(templateUrl, {
                    method: "GET",
                    headers: {
                        "Accept": "application/octet-stream",
                    }
                }).then(res => {
                    return res.arrayBuffer();
                });
                const existingSignBytes = await fetch(signUrl).then(res => res.arrayBuffer());
                const existingQRBytes = await fetch(qrUrl).then(res => res.arrayBuffer());


                pdfDoc = await PDFDocument.load(existingPdfBytes)

                pdfDoc.registerFontkit(fontkit)


                const romanFont = await pdfDoc.embedStandardFont(StandardFonts.TimesRomanBold);

                const sign = await pdfDoc.embedPng(existingSignBytes)
                sign.width = 150;
                sign.height = 42;
                const QR = await pdfDoc.embedPng(existingQRBytes);


                const pages = pdfDoc.getPages();
                const pageWidth = pages[0].getWidth();


                let { fullName, college } = JSON.parse(localStorage.getItem('user'));

                const nameWidth = romanFont.widthOfTextAtSize(fullName, 50);
                pages[0].drawText(fullName, {
                    x: (pageWidth / 2) - nameWidth / 2,
                    y: 410,
                    size: 50,
                    font: romanFont,
                    color: rgb(0, 0, 0)
                })

                if (college === undefined) {
                    college = 'Update College name in Profile'
                }

                const collegeWidth = romanFont.widthOfTextAtSize(college, 28);

                pages[0].drawText(college, {
                    x: (pageWidth / 2) - collegeWidth / 2,
                    y: 330,
                    size: 28,
                    font: romanFont,
                    color: rgb(0.61176, 0.22353, 0.29412)
                })
                pages[0].drawText(courseDuration + '', {
                    x: 486,
                    y: 305.5,
                    size: 20,
                    // font: blackAdd,
                    font: romanFont,
                    color: rgb(0.61176, 0.22353, 0.29412)
                })

                const courseWidth = romanFont.widthOfTextAtSize(courseName, 28);
                pages[0].drawText(courseName, {
                    x: (pageWidth / 2) - courseWidth / 2,
                    y: 250,
                    size: 28,
                    font: romanFont,
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

                    const seprator = '-'
                    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    const dateObj = new Date();
                    const date = dateObj.getDate() + seprator + month[dateObj.getMonth()] + seprator + dateObj.getFullYear();
                    pages[0].drawText(date, {
                        x: 445,
                        y: 19,
                        size: 10,
                        font: romanFont,
                        color: rgb(0, 0, 0)
                    })
                }
                else {

                    pages[0].drawText("Dummy Certificate", {
                        x: 160,
                        y: 100,
                        size: 82,
                        font: romanFont,
                        color: rgb(0, 0, 0),
                        opacity: 0.2,
                        rotate: degrees(30),
                    })

                    pages[0].drawText("Dummy Certificate", {
                        x: 120,
                        y: 440,
                        size: 82,
                        font: romanFont,
                        color: rgb(0, 0, 0),
                        opacity: 0.2,
                        rotate: degrees(-33),
                    })
                }
            } catch (error) {
                console.log(error);
            }



            const pdf = await pdfDoc.save();

            const bytes = new Uint8Array(pdf);
            const blob = new Blob([bytes], { type: "application/pdf" });
            const docUrl = URL.createObjectURL(blob);

            await setCertificateURI(docUrl);
            setLoading(false);


        }

        generateCerifiacte();
    }, [completedTask, courseId, courseName, totalTask])


    async function downloadCertificate() {
        const a = document.createElement('a')
        a.href = certificateURI;
        // a.download = "ATPLC " + courseName + " Certificate.pdf";
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
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
                {
                    <div className="certificate-download">
                        <Button icon='fi fi-rr-template' label={(completedTask / totalTask * 100) >= 75 ? 'Download Certificate' : 'Download Dummy Certificate'} onClick={downloadCertificate} isLoading={loading} />
                    </div>
                }
            </div>
        </section>
    )
}
