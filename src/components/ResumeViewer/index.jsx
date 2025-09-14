import axios from "axios";
import "./styless.css";
import { useState, useEffect, useRef } from "react";
import { AiOutlineDownload, AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function ResumeViewer() {
  const [metaData, setMetaData] = useState();
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const pdfUrl =
    "https://filegilla-public.s3.us-east-1.amazonaws.com/misc/resume.pdf";

  useEffect(() => {
    // Simple mobile detection
    const checkMobile = () => {
      const userAgent = navigator.userAgent || window.opera;
      if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    checkMobile();
  }, []);

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
          "https://filegilla-public.s3.us-east-1.amazonaws.com/misc/resume.pdf"
        );

        console.log(res);
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

            {isMobile ? (
              <a
                className="btn9"
                href={pdfUrl}
                download="Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineDownload className="icon" size={32} fill="#ffffff" />
              </a>
            ) : (
              <button className="btn9" onClick={handleDownload}>
                <AiOutlineDownload className="icon" size={32} fill="#ffffff" />
              </button>
            )}

          </div>

          <div className="date">
            {loading
              ? "Loading..."
              : metaData
                ? `Last Modified: ${new Date(metaData).toLocaleString("en-US", {
                  timeZone: "America/New_York",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                }).replace(",", "")} EST`
                : "Last Modified: N/A"}
          </div>
          <div className="resume__container9">
            {loading ? (
              <div className="resume9 skeleton animate-pulse-colors"></div>
            ) : (
              isMobile ? (
                <object
                  data={`${pdfUrl}#scrollbar=1&toolbar=0&navpanes=0&pagemode=none&view=FitV`}
                  type="application/pdf"
                  style={{
                    backgroundColor: "white",
                    overflow: "scroll",
                    marginTop: "-125px"
                  }}
                >
                  <p>
                    {"Your browser doesn't support PDFs."}
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                      Download the PDF
                    </a>
                  </p>
                </object>
              ) : (
                <>
                  <iframe
                    src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    className="resume9"
                  />
                </>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
