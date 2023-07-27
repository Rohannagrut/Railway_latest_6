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
import moment from "moment";

// import "../styles/InvoiceStyles.css";a
// import { useNavigate } from "react-router-dom";
// import RailwayForm from "./RailwayForm";
// import UserContext from "./useContext";
import "./InvoiceStyles.css";
import { userMenu } from "../../Data/data";

const Doctors = () => {
  const componentRef = useRef();
  const [doctors, setDoctors] = useState([]);
  const [Users, setUsers] = useState([]);
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
  // const handleAccountStatus = async (record, status) => {
  //   try {
  //     const res = await axios.post(
  //       "/api/v1/admin/changeAccountStatus",
  //       {
  //         doctorId: record._id,
  //         userId: record.userId,
  //         status: status,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     if (res.data.success) {
  //       setUsers(res.data.data);
  //       message.success(res.data.message);
  //       // window.location.reload();
  //     }
  //   } catch (error) {
  //     message.error("something went wrong");
  //   }
  // };
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
        setUsers(res.data.data);
        message.success(res.data.message);
        // window.location.reload();
      }
    } catch (error) {
      message.error("something went wrong");
    }
  };
  const handleAccountStatustoVerify = async (record, verificationstatus) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatustoVerify",
        {
          doctorId: record._id,
          userId: record.userId,
          verificationstatus: verificationstatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        setUsers(res.data.verification);
        console.log(Users);
        // window.location.reload();
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };
  // const handleAccountStatustoVerify = async (record, verificationstatus) => {
  //   try {
  //     const res = await axios.post(
  //       "/api/v1/admin/changeAccountStatustoVerify",
  //       {
  //         doctorId: record._id,
  //         userId: record.userId,
  //         verificationstatus: verificationstatus,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     if (res.data.success) {
  //       message.success(res.data.message);
  //       const isVerified = res.data.data.isVerified;
  //       console.log("isVerified:", isVerified);

  //       // Update the doctors list with the updated isVerified value
  //       const updatedDoctors = doctors.map((doctor) => {
  //         if (doctor._id === record._id) {
  //           return { ...doctor, isVerified };
  //         }
  //         return doctor;
  //       });
  //       setDoctors(updatedDoctors);

  //       // window.location.reload();
  //     }
  //   } catch (error) {
  //     message.error("Something Went Wrong");
  //   }
  // };

  const handleAddSeasonTicketNo = () => {};
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
      title: "Status",
      dataIndex: "status",
      render(text, record) {
        return {
          props: {
            style: {
              background: text === "pending" ? "red" : "green",
            },
          },
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "sex",
      dataIndex: "sex",
    },
    {
      title: "address",
      dataIndex: "address",
    },
    {
      title: "from",
      dataIndex: "from",
    },
    {
      title: "To",
      dataIndex: "to",
    },
    {
      title: "Season Ticket No",
      dataIndex: "seasonticketNo",
    },
    {
      title: "Date from and to ",
      dataIndex: "timings",
      render: (record) => {
        return (
          <div>
            <p>
              {moment(record[0]).format("DD-MM-YYYY")} to{" "}
              {moment(record[1]).format("DD-MM-YYYY")}
            </p>
          </div>
        );
      },
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
    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   render: (text, record) => (
    //     <div className="d-flex">
    //       {record.isVerified === false ? (
    //         <button
    //           className="btn btn-success"
    //           onClick={() => handleAccountStatustoVerify(record, "approved")}
    //         >
    //           Verify
    //         </button>
    //       ) : (
    //         <button className="btn btn-danger">Verified</button>
    //       )}
    //     </div>
    //   ),
    // },
    // ...
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {Users === false ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatustoVerify(record, "approved")}
            >
              Verify
            </button>
          ) : (
            <button className="btn btn-danger">Verified</button>
          )}
        </div>
      ),
    },
    // ...

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
    // {
    //   title: "Add Season Ticket",
    //   dataIndex: "actions",
    //   render: (text, record) => (
    //     <Input
    //       record={record}
    //       onSubmit={handleAddSeasonTicketNo} // This function will be implemented later
    //     />
    //   ),
    // },
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
                // border: "5px solid black",
              }}
            >
              <div style={{ "margin-top": "185px", "margin-left": "133px" }}>
                <p>
                  {selectedBill.firstName} {selectedBill.lastName}
                </p>
              </div>
              <div style={{ "margin-top": "-10px" }}>
                <span style={{ "margin-left": "60px" }}>
                  {selectedBill.age}
                </span>

                <span
                  style={{ "margin-left": "438.5px", "margin-top": "10px" }}
                >
                  {selectedBill.birth}
                </span>
              </div>

              <div style={{ "margin-top": "65px" }}>
                <span style={{ "margin-left": "40px" }}>
                  {selectedBill.class}
                </span>
                <span style={{ "margin-left": "65px" }}>
                  {selectedBill.period}
                </span>
                <span style={{ "margin-left": "76px", "margin-top": "-5px" }}>
                  {selectedBill.from}
                </span>
                <span style={{ "margin-left": "76px" }}>{selectedBill.to}</span>
              </div>

              <div style={{ "margin-top": "40px" }}>
                <span style={{ "margin-left": "301.6px" }}>
                  {selectedBill.previousno}
                </span>
                <span
                  style={{ "margin-left": "269.2px", "margin-top": "15px" }}
                >
                  {selectedBill.previousticket}
                </span>
              </div>

              <div style={{ "margin-top": "1px" }}>
                <span style={{ "margin-left": "55.8px" }}>
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
