import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MyAssetDownload = () => {
    const { id } = useParams();
    
    const [profile, setProfile] = useState({});
    // const [loader, setLoader] = useState(false);

    useEffect(() => {
        fetch(`https://insight-store-server.vercel.app/assetDetails/${id}`)
            .then(res => res.json())
            .then(data => {
                setProfile(data);
            }) 
    }, [id]);

    // const downloadPDF = () => {
    //     const capture = document.getElementById('download_section');
    
    //     if (capture) {
    //         // setLoader(true); // Disable the button and show loader text

    //         // Temporarily override unsupported colors
    //         capture.style.backgroundColor = "#ffffff"; // Use a supported color like white

    //         html2canvas(capture, { scale: 6 }).then((canvas) => {
    //             const imgData = canvas.toDataURL('image/jpeg');
    //             const doc = new jsPDF('p', 'mm', 'a4');
    //             const componentWidth = doc.internal.pageSize.getWidth();
    //             const componentHeight = doc.internal.pageSize.getHeight();
    //             doc.addImage(imgData, 'JPEG', 0, 0, componentWidth, componentHeight);
    //             doc.save('Asset.pdf');
    //             // setLoader(false); // Re-enable the button after download
    //         }).catch(() => {
    //             // setLoader(false); // Re-enable the button if there's an error
    //         });
    //     } else {
    //         console.error('Element with id "download_section" not found.');
    //     }
    // };

    const downloadPDF = () => {
        const capture = document.getElementById('download_section');
    
        if (capture) {
         capture.style.backgroundColor = "#ffffff";
          html2canvas(capture, { scale: 6 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/jpeg');
            const doc = new jsPDF('p', 'mm', 'a4');
    
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, 'JPEG', 0, 0, componentWidth, componentHeight);
            doc.save('Asset.pdf');
          });
        } else {
          console.error('Element with id "download-preview" not found.');
        }
      };

    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-3 gap-5 mt-10">
                    <div className="card w-96">
                        <div id='download_section' className="card-body">
                            <h2 className="card-title">{profile.productName}</h2>
                            <p>Type: {profile.productType}</p>
                            <p>Approval Date: {profile.approvalDate}</p>
                            <p>Request Date: {profile.date}</p>
                            <p>Status: {profile.status}</p>
                            <p>Employee Name: {profile.employeeName}</p>
                            <p>Employee Email: {profile.employeeEmail}</p>
                            <p>Additional Info: {profile.additional_info}</p>
                        </div>
                        <div className="card-actions justify-end">
                            <button 
                                onClick={downloadPDF}  
                                className="btn btn-warning"
                            >
                                Download as PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAssetDownload;
