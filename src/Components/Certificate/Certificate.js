import { PDFDocument, rgb } from 'pdf-lib'
import Button from '../Button/Button'
import './Certificate.css'
export default function Certificate({ completedTask, totalTask }) {
    async function generateCertificate() {
        const url = 'https://atplc.in/template.pdf'
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());


        console.log(existingPdfBytes);
        // Load a PDFDocument from the existing PDF bytes
        // const pdfDoc = await PDFDocument.load(existingPdfBytes)

        // const poppins = await pdfDoc.embedFont(StandardFonts.Helvetica)

        // console.log(uri);
        // const pages = pdfDoc.getPages()
        // const firstPage = pages[0]
        // firstPage.drawText('This text was added with JavaScript!', {
        //     x: 5,
        //     y: 300,
        //     size: 32,
        //     font: poppins,
        //     color: rgb(0.61176, 0.22353, 0.29412)
        // })

        // const pdfBytes = await pdfDoc.save()
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
                <a href="/Assets/template.pdf">Certificate</a>
                {
                    (completedTask / totalTask * 100) <= 75
                        ?
                        <div className="certificate-download">
                            <Button icon='fi fi-rr-template' label='Download Certificate' onClick={generateCertificate} />
                        </div>
                        :
                        <div className="dummy-certificate-img">
                            <img src="/Assets/Images/demoCertificateBlured.png" alt="Demo_Certificate" />
                        </div>
                }
            </div>
        </section>
    )
}
