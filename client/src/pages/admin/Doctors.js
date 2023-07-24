import React, {
  useState,
  useEffect,
  useRef,
  // createContext,
  // useContext,
} from "react";
import Layout from "./../../components/Layout";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Table, message } from "antd";
import { useDispatch } from "react-redux";
// import "../styles/InvoiceStyles.css";a
// import { useNavigate } from "react-router-dom";
// import RailwayForm from "./RailwayForm";
// import UserContext from "./useContext";
import "./InvoiceStyles.css";

const Doctors = () => {
  const componentRef = useRef();
  const [doctors, setDoctors] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [popupModal, setPopupModal] = useState(false);
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        {
          doctorId: record._id,
          userId: record.userId,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("something went wrong");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Documents",
      dataIndex: "links",
      render: (text, record) => (
        <div className="d-flex">
          <a href={`${record.link}`}> verify links</a>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-primary"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : record.status === "approved" ? (
            <button className="btn btn-success">Approved</button>
          ) : (
            <button className="btn btn-secondary" disabled>
              Cannot Approve
            </button>
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-danger"
              onClick={() => handleAccountStatus(record, "rejected")}
            >
              Reject
            </button>
          ) : record.status === "rejected" ? (
            <button className="btn btn-success">Rejected</button>
          ) : (
            <button className="btn btn-secondary" disabled>
              Cannot Reject
            </button>
          )}
        </div>
      ),
    },

    {
      title: "Print's",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedBill(record);
              setPopupModal(true);
            }}
          />
        </div>
      ),
    },
  ];
  console.log(selectedBill);
  return (
    <Layout>
      <div className="d-flex justify-content-between"></div>
      <h1 className="text-center m-3">All Applicants</h1>
      <Table columns={columns} dataSource={doctors} bordered />
      {popupModal && (
        <Modal
          width={1100}
          height={400}
          pagination={false}
          visible={popupModal}
          onCancel={() => {
            setPopupModal(false);
          }}
          footer={false}
        >
          {/* ============ invoice modal start ==============  */}
          <div ref={componentRef}>
            <div
              style={{
                "margin-left": "400px",
                "margin-top": "0px",
                border: "5px solid black",
              }}
            >
              <div style={{ "margin-top": "180px", "margin-left": "129px" }}>
                <p>
                  {selectedBill.firstName} {selectedBill.lastName}
                </p>
              </div>
              <div style={{ "margin-top": "3px" }}>
                <span style={{ "margin-left": "57px" }}>
                  {selectedBill.age}
                </span>
                <span
                  style={{ "margin-left": "438.5px", "margin-top": "57px" }}
                >
                  {selectedBill.birth}
                </span>
              </div>

              <div style={{ "margin-top": "55px" }}>
                <span style={{ "margin-left": "40px" }}>
                  {selectedBill.class}
                </span>
                <span style={{ "margin-left": "65px" }}>
                  {selectedBill.period}
                </span>
                <span style={{ "margin-left": "76px" }}>
                  {selectedBill.from}
                </span>
                <span style={{ "margin-left": "76px" }}>{selectedBill.to}</span>
              </div>

              <div style={{ "margin-top": "50px" }}>
                <span style={{ "margin-left": "301.6px" }}>
                  {selectedBill.previousno}
                </span>
                <span style={{ "margin-left": "272.2px" }}>
                  {selectedBill.previousticket}
                </span>
              </div>

              <div style={{ "margin-top": "18.9px" }}>
                <span style={{ "margin-left": "37.8px" }}>
                  {selectedBill.previousfrom}
                </span>{" "}
                <span style={{ "margin-left": "94.5px" }}>
                  {selectedBill.previousto}
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button type="primary" onClick={handlePrint}>
              Print
            </Button>
          </div>
          {/* ============ invoice modal ends ==============  */}
        </Modal>
      )}
    </Layout>
  );
};

export default Doctors;
