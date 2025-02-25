
export default function Header() {
  return (
    <nav className="row borderr-bottom m-0 ">
      <div className="col-5 d-flex align-items-center p-0 header-height">
        <div className="bg-color box borderr-end"></div>
        <div className="h-75 w-100 d-flex justify-content-center align-logo">
        <img src="./logo.svg" alt="Logo" className="img-fluid h-75 ms-3" />
        </div>
      </div>

      <div className="col-7 border-color p-0 header-height borderr-start position-relative">
        <img src="./g9.svg" alt="Header Pattern" className="img-fluid header-img h-100" />
        <img src="./text.svg" alt="Header Pattern" className="img-fluid meeting-minutes " />
      </div>
    </nav>
  );
}
