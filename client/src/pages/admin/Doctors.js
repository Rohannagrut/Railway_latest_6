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

    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   render: (text, record) => (
    //     <div className="d-flex">
    //       {record.status === "pending" ? (
    //         <button
    //           className="btn btn-primary"
    //           // onClick={}
    //           onClick={() => handleAccountStatus(record, "Approved")}
    //         >
    //           Approve
    //         </button>
    //       ) : (
    //         <button className="btn btn-success">Approved</button>
    //       )}
    //     </div>
    //   ),
    // },
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

    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   render: (text, record) => (
    //     <div className="d-flex">
    //       {record.status === "pending" ? (
    //         <button
    //           className="btn btn-danger"
    //           onClick={() => handleAccountStatus(record, "rejected")}
    //         >
    //           Reject
    //         </button>
    //       ) : (
    //         <button className="btn btn-success">Rejected</button>
    //       )}
    //     </div>
    //   ),
    // },
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
          width={400}
          pagination={false}
          title="Railway Form"
          visible={popupModal}
          onCancel={() => {
            setPopupModal(false);
          }}
          footer={false}
        >
          {/* ============ invoice modal start ==============  */}
          <div ref={componentRef}>
            <center id="top">
              <div />
              <div className="info">
                <h2>
                  {selectedBill.firstName} {selectedBill.lastName}
                </h2>
                <p>{selectedBill.age}</p>
              </div>
            </center>
            <div id="mid">
              <div className="mt-2">
                <p>
                  From <b>{selectedBill.from}</b>
                  To<b>{selectedBill.to}</b>
                </p>
                <hr style={{ margin: "5px" }} />
              </div>
            </div>
            {/*End Invoice Mid*/}
            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item">
                        <h2></h2>
                      </td>
                      <td className="Hours">
                        <h2></h2>
                      </td>
                      <td className="Rate">
                        <h2></h2>
                      </td>
                      <td className="Rate">
                        <h2></h2>
                      </td>
                    </tr>
                    {/* {selectedBill.cartItems.map((item) => (
                      <>
                        <tr className="service">
                          <td className="tableitem">
                            <p className="itemtext">{item.name}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.quantity}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.price}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">
                              {item.quantity * item.price}
                            </p>
                          </td>
                        </tr>
                      </>
                    ))} */}

                    {/* <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>tax</h2>
                      </td>
                      <td className="payment">
                        <h2>${selectedBill.tax}</h2>
                      </td>
                    </tr> */}
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2></h2>
                      </td>
                      <td className="payment">
                        <h2>{/* <b>${selectedBill.totalAmount}</b> */}</h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/*End Table*/}
              {/* <div id="legalcopy">
                <p className="legal">
                  <strong>Thank you for your order!</strong> 10% GST application
                  on total amount.Please note that this is non refundable amount
                  for any assistance please write email
                  <b> help@mydomain.com</b>
                </p>
              </div> */}
            </div>
            {/*End InvoiceBot*/}
          </div>
          {/*End Invoice*/}
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
