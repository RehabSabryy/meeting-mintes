import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import DisplayPage from "../DisplayPage/DisplayPage";

export default function Layout() {
  const componentRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handlePagesComputed = (computedPages: string[]) => {
    console.log("Computed Pages:", computedPages);
    setPages(computedPages);
  };

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  const handlePrint = async () => {
    if (!componentRef.current) return;

    const pdf = new jsPDF("p", "mm", "a4");
    const a4Width = pdf.internal.pageSize.getWidth();
    const pageElements = componentRef.current.querySelectorAll(".a4-page");

    for (let i = 0; i < pageElements.length; i++) {
      const canvas = await html2canvas(pageElements[i] as HTMLElement, {
        scale: 3,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const imgHeight = (canvas.height * a4Width) / canvas.width;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, 0, a4Width, imgHeight, undefined, "FAST");
    }

    pdf.save("Meeting_Minutes_A4.pdf");
  };

  return (
    <div className={`page-wrapper`}>
      <div className="p-3 position-fixed " style={{right:"20px", zIndex:"1000"}}> 
       <button className="btn bg-color" onClick={handlePrint}>Export to PDF</button>
      </div>
      <div ref={componentRef} className={` ${isMobile ? "" : "a4-container"}`}>
        {pages.map((pageContent, index) => (
          <div key={index} className="a4-page" style={{ breakAfter: "page" }}>
            <Header />
            <div
              className="a4-content layout pt-5"
              dangerouslySetInnerHTML={{ __html: pageContent }}
            />
           <Footer pageNumber={index + 1} />
             </div>
        ))}
      </div>
      <div style={{ visibility: "hidden" }}>
        <DisplayPage onPagesComputed={handlePagesComputed} />
      </div>
    </div>
  );
}