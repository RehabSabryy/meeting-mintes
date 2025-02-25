export default function Footer({ pageNumber }: { pageNumber: number }) {
  return (
    <footer className="row m-0 borderr-top d-flex align-items-center" style={{ height: "80px" }}>
      <div className="d-flex align-items-center justify-content-between ps-5 pe-0 w-100 h-100">
        <div className="py-0 ps-3">
          <img src="./calls.svg" alt="Call Icon" className="img-fluid img-width" />
        </div>
        <div className="py-0">
          <img src="./email.svg" alt="Email Icon" className="img-fluid img-width" style={{ width: "450px" }} />
        </div>
        <div className="py-0">
          <img src="./location.svg" alt="Location Icon" className="img-fluid img-width" />
        </div>
        <div className="d-flex h-100">
        <img src="./footer.svg" className="bg-dark h-100 footer-img" />
        <div className="bg-color end position-relative">
            <span className="page-number">0{pageNumber}</span>
          </div>
      </div>
      </div>
    </footer>
  );
}
