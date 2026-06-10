const express = require("express");
const router = express.Router();

const {
  appendWaitlistRow,
} = require("../googleSheets");

router.post("/", async (req, res) => {
  try {
    const { name, phone, city, course } = req.body;

    await appendWaitlistRow({
      name,
      phone,
      city,
      course,
    });

    return res.json({
      success: true,
      message: "Added to waitlist successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to save waitlist entry",
    });
  }
});

module.exports = router;

// const express = require("express");

// const router = express.Router();

// router.post("/", async (req, res) => {
//   const { name, phone, city, course } = req.body;

//   console.log({
//     name,
//     phone,
//     city,
//     course,
//   });

//   return res.status(200).json({
//     success: true,
//     message: "Waitlist entry received",
//   });
// });

// module.exports = router;