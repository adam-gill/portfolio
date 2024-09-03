import axios from "axios";
import "./styless.css";
import { useState, useEffect, useRef } from "react";
import { AiOutlineDownload, AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function ResumeViewer() {
  const [metaData, setMetaData] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const pdfUrl =
    "https://resumeblob63.blob.core.windows.net/resumecontainer/resume_i.pdf";

  const handleDownload = () => {
    fetch(pdfUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Resume.pdf"; // Set the desired file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => console.error("Error fetching PDF:", error));
  };

  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        setLoading(true);
        const res = await axios.head(
          "https://resumeblob63.blob.core.windows.net/resumecontainer/resume_i.pdf"
        );

        if (res) {
          setMetaData(res.headers["last-modified"]);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log("Metadata fetch error: ", error);
      }
    };

    fetchMetaData();
  }, []);

  return (
    <>
      <button className="btn__back" onClick={() => navigate("/")}>
        <AiOutlineHome
          className="icon__back"
          size={32}
          fill="#ffffff"
          strokeWidth={2}
          color="#ffffff"
        />
      </button>

      <div className="container9">
        <div className="sub__container">
          <div className="title__container">
            <a className="link99" href={pdfUrl}>
              <h1 className="title">Resume</h1>
            </a>

            <button className="btn9" onClick={handleDownload}>
              <AiOutlineDownload className="icon" size={32} fill="#ffffff" />
            </button>
          </div>

          <div className="date">
            {loading ? "Loading..." : `Last Modified: ${metaData}`}
          </div>
          <div className="resume__container9">
            {loading ? (
              <div className="resume9 skeleton animate-pulse-colors"></div>
            ) : (
              <>
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  className="resume9"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
