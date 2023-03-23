import Button from '../Button/Button'
import './Certificate.css'
export default function Certificate({ completedTask, totalTask }) {
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
                    (completedTask / totalTask * 100) >= 75
                        ?
                        <div className="certificate-download">
                            <a href={'/Assets/Images/demoCertificate.jpg'} download='ATPLC_Dummy_Certificate' target={'_blank'} rel="noreferrer">
                                <Button icon='fi fi-rr-template' label='Download Certificate' />
                            </a>
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
