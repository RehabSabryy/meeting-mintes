import { useRef, useEffect, useMemo } from "react";

export default function DisplayPage({ onPagesComputed }: any) {
  const formRef = useRef<HTMLDivElement>(null);
  const formData = useMemo(() => {
    return JSON.parse(localStorage.getItem("formData") || "{}") || {};
  }, []);

  useEffect(() => {
    if (formRef.current) {
      const contentHeight = formRef.current.scrollHeight;
      const a4HeightPx = 700; // A4 height in pixels at 96dpi (297mm)

      console.log("Content Height:", contentHeight);
      console.log("A4 Height:", a4HeightPx);

      if (contentHeight > a4HeightPx) {
        console.log("Content exceeds A4 height. Splitting into pages...");
        const pages = splitContentIntoPages(formRef.current, a4HeightPx);
        console.log("Pages:", pages);
        onPagesComputed(pages);
      } else {
        console.log("Content fits within one A4 page.");
        onPagesComputed([formRef.current.innerHTML]);
      }
    }
  }, [formData]);

  const splitContentIntoPages = (container: HTMLDivElement, a4Height: number): string[] => {
    const pages: string[] = [];
    let currentPageContent: string = "";
    let currentHeight = 0;
  
    // Extract the table HTML
    const tableElement = container.querySelector("table");
    const tableHTML = tableElement ? tableElement.outerHTML : "";
    const tableHeight = tableElement ? tableElement.offsetHeight : 0;
  
    // Add the table to the first page
    currentPageContent += tableHTML;
    currentHeight += tableHeight;
  
    // Helper function to get the height of an element
    const getElementHeight = (element: HTMLElement): number => {
      return element.offsetHeight;
    };
  
    // Group content into logical blocks (sections)
    const sections = Array.from(container.querySelectorAll("h4.section-header")).map((header) => {
      const section: { title: string; content: string; height: number } = {
        title: header.outerHTML,
        content: "",
        height: 0,
      };
  
      let nextElement = header.nextElementSibling;
      while (nextElement && !nextElement.matches("h4.section-header")) {
        section.content += nextElement.outerHTML;
        section.height += getElementHeight(nextElement as HTMLElement);
        nextElement = nextElement.nextElementSibling;
      }
  
      // Add the header height to the section height
      section.height += getElementHeight(header as HTMLElement);
  
      return section;
    });
  
    // Process each section
    sections.forEach((section) => {
      const sectionHeight = section.height;
  
      // Check if the section fits on the current page
      if (currentHeight + sectionHeight > a4Height) {
        // If the section doesn't fit, start a new page
        if (currentPageContent) {
          pages.push(currentPageContent);
        }
        currentPageContent = tableHTML; // Start the new page with the table
        currentHeight = tableHeight;
      }
  
      // Add the section to the current page
      currentPageContent += section.title + section.content;
      currentHeight += sectionHeight;
    });
  
    // Add the remaining content to the last page
    if (currentPageContent) {
      pages.push(currentPageContent);
    }
  
    return pages;
  };

  return (
    <div>
      <div>
        <div ref={formRef} className="a4-content" style={{ paddingTop: "48px"}}>
          <table className="table border-color borderr-top" style={{marginBottom: "48px"}}>
            <tbody >
              <tr className="borderr-top">
                <th className="borderr-end text-end table-weight header-width">Title</th>
                <td>
                  Meeting with {formData.client} ({formData.project} - {formData.projectType})
                </td>
              </tr>
              <tr>
                <th className="borderr-end text-end table-weight header-width">Date & Time</th>
                <td>{new Date(formData.dateTime).toLocaleString()}</td>
              </tr>
              <tr>
                <th className="borderr-end text-end table-weight header-width">Location</th>
                <td>{formData.location}</td>
              </tr>
              <tr>
                <th className="borderr-end text-end table-weight header-width">Attendees</th>
                <td>{formData.attendees ? formData.attendees : "N/A"}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <h4 className="section-header">Agenda:</h4>
            {/* <div className="ps-4" dangerouslySetInnerHTML={{ __html: formData.agendas || "<p>No agenda provided.</p>" }} /> */}
            {formData.agendas && formData.agendas.length > 0 ? (
              <ul className="content-start circular-bullet content-space ">
                {formData.agendas.map((item: string, index: number) => (
                  <li key={index} className="mb-3">{item}</li>
                ))}
              </ul>
            ) : (
              <p className="m-0 content-space content-start">No action items recorded.</p>
            )}
            <h4 className="section-header">Discussion Summary:</h4>
            {formData.discussions && formData.discussions.length > 0 ? (
              <ul className="content-start circular-bullet content-space ">
                {formData.discussions.map((item: { title: string; description: string }, index: number) => (
                  <li key={index}  className="mb-3"><strong>{item.title}{" "}:{" "}</strong> {item.description}</li>
                ))}
              </ul>
            ) : (
              <p className="content-start content-space ">No discussions recorded.</p>
            )}
            <h4 className="section-header">Conclusion:</h4>
            {/* <div className="ps-4 content-space " dangerouslySetInnerHTML={{ __html: formData.conclusions || "<p>No conclusion provided.</p>" }} /> */}
            {formData.conclusions && formData.conclusions.length > 0 ? (
              <ul className="content-start circular-bullet content-space ">
                {formData.conclusions.map((item: string, index: number) => (
                  <li key={index} className="mb-3">{item}</li>
                ))}
              </ul>
            ) : (
              <p className="m-0 content-space  content-start">No conclusion recorded.</p>
            )}
           </div>

            <h4 className="section-header">Action Items / Next Steps:</h4>
            {formData.actionItems && formData.actionItems.length > 0 ? (
              <ul className="content-start circular-bullet content-space ">
                {formData.actionItems.map((item: string, index: number) => (
                  <li key={index} className=" mb-3">{item}</li>
                ))}
              </ul>
            ) : (
              <p className="m-0 content-space  content-start">No action items recorded.</p>
            )}
        </div>
      </div>
    </div>
  );
}