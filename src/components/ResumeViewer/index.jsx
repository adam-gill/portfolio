import axios from "axios";
import "./styless.css";
import { useState, useEffect, useRef } from "react";
import { AiOutlineDownload, AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function ResumeViewer() {
  const [metaData, setMetaData] = useState();
  const [loading, setLoading] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(null);
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const pdfUrl =
    "https://filegilla-public.s3.us-east-1.amazonaws.com/misc/resume.pdf";

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setPageWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Resume.pdf";
    link.click();
  };

  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        setLoading(true);
        const res = await axios.head(
          "https://filegilla-public.s3.us-east-1.amazonaws.com/misc/resume.pdf",
        );

        if (res) {
          setMetaData(res.headers["last-modified"]);
        }
      } catch (error) {
        console.log("Metadata fetch error: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetaData();
  }, []);

  return (
    <>
      <div className="container9">
        <div className="sub__container">
          <div className="title__container">
            <button className="btn__back" onClick={() => navigate("/")}>
              <AiOutlineHome
                className="icon__back"
                size={32}
                fill="#ffffff"
                strokeWidth={2}
                color="#ffffff"
              />
            </button>

            <a
              className="link99"
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h1 className="title">Resume</h1>
            </a>

            <button
              className="btn__download"
              onClick={handleDownload}
              title="Download"
            >
              <AiOutlineDownload className="icon" size={32} fill="#ffffff" />
            </button>
          </div>

          <div className="date">
            {loading
              ? "Loading..."
              : metaData
                ? `Last Modified: ${new Date(metaData)
                    .toLocaleString("en-US", {
                      timeZone: "America/New_York",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })
                    .replace(",", "")} EST`
                : "Last Modified: N/A"}
          </div>

          <div className="resume__container9" ref={containerRef}>
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="resume9 skeleton animate-pulse-colors"></div>
              }
              error={
                <div
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  Failed to load PDF.
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#4a9eff", marginLeft: "5px" }}
                  >
                    Download instead
                  </a>
                </div>
              }
            >
              {pageWidth &&
                Array.from(new Array(numPages), (_, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={pageWidth * scale}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                ))}
            </Document>
          </div>
        </div>
      </div>
    </>
  );
}
