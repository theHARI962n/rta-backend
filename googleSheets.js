const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  credentials: process.env.GOOGLE_CREDENTIALS
    ? JSON.parse(process.env.GOOGLE_CREDENTIALS)
    : undefined,

  keyFile: process.env.GOOGLE_CREDENTIALS
    ? undefined
    : "credentials.json",

  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

async function appendWaitlistRow(data) {
  const client = await auth.getClient();

  const sheets = google.sheets({
    version: "v4",
    auth: client,
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: "Sheet1!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          new Date().toLocaleString(),
          data.name,
          data.phone,
          data.city,
          data.course,
        ],
      ],
    },
  });
}

module.exports = {
  appendWaitlistRow,
};

// const { google } = require("googleapis");

// const auth = new google.auth.GoogleAuth({
//   keyFile: "credentials.json",
//   scopes: ["https://www.googleapis.com/auth/spreadsheets"],
// });

// async function appendWaitlistRow(data) {
//   const client = await auth.getClient();

//   const sheets = google.sheets({
//     version: "v4",
//     auth: client,
//   });

//   await sheets.spreadsheets.values.append({
//     spreadsheetId: process.env.SPREADSHEET_ID,
//     range: "Sheet1!A:E",
//     valueInputOption: "USER_ENTERED",
//     requestBody: {
//       values: [
//         [
//           new Date().toLocaleString(),
//           data.name,
//           data.phone,
//           data.city,
//           data.course,
//         ],
//       ],
//     },
//   });
// }

// module.exports = {
//   appendWaitlistRow,
// };