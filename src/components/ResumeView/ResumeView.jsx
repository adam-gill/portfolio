import React from "react";
import "./style.css";

const ResumeView = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <h1 className="fcc">{"Hey, you've found my resume!"}</h1>
          {/* <iframe src="https://adamgill.io/resume.pdf#toolbar=0" width={850} height={1100} style={{ border: "none" }}></iframe> */}
          <object
            data="https://adamgill.io/resume.pdf#toolbar=0"
            className="pdf"
            
          >
          </object>{" "}
        </div>
      </div>
    </>
  );
};

export default ResumeView;
