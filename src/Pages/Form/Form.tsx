import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";

interface Discussion {
  title: string;
  description: string;
}

export default function Form() {
  const [client, setClient] = useState("");
  const [project, setProject] = useState("");
  const [projectType, setProjectType] = useState("");
  const [dateTime, setDateTime] = useState<Date | null>(new Date());
  const [location, setLocation] = useState("");
  const [attendees, setAttendees] = useState("");

  // State for lists
  const [agendas, setAgendas] = useState<string[]>([]);
  const [newAgenda, setNewAgenda] = useState("");

  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    description: "",
  });

  const [actionItems, setActionItems] = useState<string[]>([]);
  const [newActionItem, setNewActionItem] = useState("");

  const [conclusions, setConclusions] = useState<string[]>([]);
  const [newConclusion, setNewConclusion] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      client,
      project,
      projectType,
      dateTime,
      location,
      attendees,
      agendas: newAgenda ? [...agendas, newAgenda] : agendas, 
      discussions:
        newDiscussion.title && newDiscussion.description
          ? [...discussions, newDiscussion]
          : discussions, 
      actionItems: newActionItem
        ? [...actionItems, newActionItem]
        : actionItems,
      conclusions: newConclusion
        ? [...conclusions, newConclusion]
        : conclusions, 
    };

    // Save to Local Storage
    localStorage.setItem("formData", JSON.stringify(formData));
    navigate("/meeting-minutes");
  };

  // Function to edit an agenda item
  const editAgenda = (index: number, newValue: string) => {
    const updatedAgendas = [...agendas];
    updatedAgendas[index] = newValue;
    setAgendas(updatedAgendas);
  };

  // Function to edit a discussion item
  const editDiscussion = (
    index: number,
    newTitle: string,
    newDescription: string
  ) => {
    const updatedDiscussions = [...discussions];
    updatedDiscussions[index] = {
      title: newTitle,
      description: newDescription,
    };
    setDiscussions(updatedDiscussions);
  };

  // Function to edit an action item
  const editActionItem = (index: number, newValue: string) => {
    const updatedActionItems = [...actionItems];
    updatedActionItems[index] = newValue;
    setActionItems(updatedActionItems);
  };

  // Function to edit a conclusion item
  const editConclusion = (index: number, newValue: string) => {
    const updatedConclusions = [...conclusions];
    updatedConclusions[index] = newValue;
    setConclusions(updatedConclusions);
  };

  return (
    <>
      <Header />
      <div className="borderr-start borderr-end form-layout">
        <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5">
          <form onSubmit={handleSubmit} className="p-4 w-75">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Client Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="Enter Client Name"
                  maxLength={70}
                />
                <p className="text-muted form-help mt-1">
                  Maximum characters 0/70
                </p>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Attendees</label>
                <input
                  type="text"
                  className="form-control"
                  value={attendees}
                  onChange={(e) => setAttendees(e.target.value)}
                  placeholder="Enter Attendees Name"
                  maxLength={70}
                />
                <p className="text-muted form-help mt-1">
                  Maximum characters 0/70
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Project Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  placeholder="Enter Project Name"
                  maxLength={70}
                />
                <p className="text-muted form-help mt-1">
                  Maximum characters 0/70
                </p>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Project Type</label>
                <input
                  type="text"
                  className="form-control"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  placeholder="Enter Project Type"
                  maxLength={70}
                />
                <p className="text-muted form-help mt-1">
                  Maximum characters 0/70
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Date</label>
                <div>
                  <DatePicker
                    selected={dateTime}
                    onChange={(date) => setDateTime(date)}
                    dateFormat="dd/MM/yyyy h:mm aa"
                    showTimeSelect
                    timeIntervals={15}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  maxLength={70}
                />
                <p className="text-muted form-help mt-1">
                  Maximum characters 0/70
                </p>
              </div>
            </div>

            {/* Agenda Section */}
            <div className="mb-3">
              <label className="form-label">Agenda</label>
              <textarea
                className="form-control"
                rows={2}
                placeholder="Enter agenda item"
                value={newAgenda}
                onChange={(e) => setNewAgenda(e.target.value)}
              />
              <button
                type="button"
                className="btn bg-color text-white mt-2"
                onClick={() => {
                  if (newAgenda) {
                    setAgendas([...agendas, newAgenda]);
                    setNewAgenda("");
                  }
                }}
              >
                +
              </button>
              <ul className="mt-2">
                {agendas.map((agenda, index) => (
                  <li key={index}>
                    <input
                      type="text"
                      value={agenda}
                      onChange={(e) => editAgenda(index, e.target.value)}
                      className="form-control"
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Discussion Summary Section */}
            <div className="mb-3">
              <h5 className="mb-3">Discussion Summary</h5>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter Title"
                value={newDiscussion.title}
                onChange={(e) =>
                  setNewDiscussion({ ...newDiscussion, title: e.target.value })
                }
              />
              <textarea
                className="form-control mb-2"
                rows={2}
                placeholder="Enter Description"
                value={newDiscussion.description}
                onChange={(e) =>
                  setNewDiscussion({
                    ...newDiscussion,
                    description: e.target.value,
                  })
                }
              />
              <button
                type="button"
                className="btn bg-color text-white"
                onClick={() => {
                  if (newDiscussion.title && newDiscussion.description) {
                    setDiscussions([...discussions, newDiscussion]);
                    setNewDiscussion({ title: "", description: "" });
                  }
                }}
              >
                +
              </button>
              <ul className="mt-2">
                {discussions.map((disc, index) => (
                  <li key={index}>
                    <input
                      type="text"
                      value={disc.title}
                      onChange={(e) =>
                        editDiscussion(index, e.target.value, disc.description)
                      }
                      className="form-control mb-2"
                    />
                    <textarea
                      value={disc.description}
                      onChange={(e) =>
                        editDiscussion(index, disc.title, e.target.value)
                      }
                      className="form-control"
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Items Section */}
            <div className="mb-3">
              <label className="form-label">Action Items/ Next Steps</label>
              <textarea
                className="form-control"
                rows={2}
                placeholder="Enter Action Item"
                value={newActionItem}
                onChange={(e) => setNewActionItem(e.target.value)}
              />
              <button
                type="button"
                className="btn bg-color text-white mt-2"
                onClick={() => {
                  if (newActionItem) {
                    setActionItems([...actionItems, newActionItem]);
                    setNewActionItem("");
                  }
                }}
              >
                +
              </button>
              <ul className="mt-2">
                {actionItems.map((item, index) => (
                  <li key={index}>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => editActionItem(index, e.target.value)}
                      className="form-control"
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Conclusion Section */}
            <div className="mb-3">
              <label className="form-label">Conclusion</label>
              <textarea
                className="form-control"
                rows={2}
                placeholder="Enter Conclusion"
                value={newConclusion}
                onChange={(e) => setNewConclusion(e.target.value)}
              />
              <button
                type="button"
                className="btn bg-color text-white mt-2"
                onClick={() => {
                  if (newConclusion) {
                    setConclusions([...conclusions, newConclusion]);
                    setNewConclusion("");
                  }
                }}
              >
                +
              </button>
              <ul className="mt-2">
                {conclusions.map((conclusion, index) => (
                  <li key={index}>
                    <input
                      type="text"
                      value={conclusion}
                      onChange={(e) => editConclusion(index, e.target.value)}
                      className="form-control"
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn bg-color px-5">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer pageNumber={1} />
    </>
  );
}
