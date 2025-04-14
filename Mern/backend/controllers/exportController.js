// controllers/exportController.js

const Appointment = require("../models/Appointment");
const { Parser } = require("json2csv");
const pdfmake = require("pdfmake");

// Export Appointments as CSV
exports.exportAppointmentsCSV = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email")
      .populate("doctor", "name specialization");

    const fields = [
      "patient.name",
      "doctor.name",
      "date",
      "time",
      "status",
    ];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(appointments);

    res.header("Content-Type", "text/csv");
    res.attachment("appointments.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export Appointments as PDF
exports.exportAppointmentsPDF = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email")
      .populate("doctor", "name specialization");

    const docDefinition = {
      content: [
        { text: "Appointment Report", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*"],
            body: [
              ["Patient", "Doctor", "Date", "Time", "Status"],
              ...appointments.map((appointment) => [
                appointment.patient?.name || "N/A",
                appointment.doctor?.name || "N/A",
                appointment.date,
                appointment.time,
                appointment.status,
              ]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };

    const printer = new pdfmake();
    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    res.header("Content-Type", "application/pdf");
    res.attachment("appointments.pdf");
    pdfDoc.pipe(res);
    pdfDoc.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};