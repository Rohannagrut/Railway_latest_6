import React from "react";
import "./RailwayForm.css";
import Layout from "../../components/Layout";

const RailwayForm = () => {
  function fuck() {
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js"></script>;
    let button = document.getElementById("button");
    let makepdf = document.getElementById("makepdf");
    let mywindow = window.open("", "PRINT", "height=400,width=600");

    mywindow.document.write(makepdf.innerHTML);

    mywindow.document.close();
    mywindow.focus();

    mywindow.print();
    mywindow.close();

    return true;
  }

  return (
    <Layout>
      <div>
        <div class="container">
          <button id="button" onClick={fuck}>
            Generate PDF
          </button>
          <div class="card" id="makepdf">
            <h2>Veermata Jijabai Technological Institute</h2>

            <h2>Class</h2>
            <h2>Season ticket No</h2>
            <h2>Montly/Quaterly/Half yearly</h2>
            <h2>From</h2>
            <h2>to</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RailwayForm;
