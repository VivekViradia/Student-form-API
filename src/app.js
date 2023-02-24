const express = require("express");
const app = express();
require("./db/conn");
const Student = require("./models/students");

const port = process.env.PORT || 8000;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.use(express.json());
// app.post("/student", (req, res) => {
//   console.log(req.body);
//   const user = new Student(req.body);
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((e) => {
//       res.status(404).send(e);
//     });
// //   res.send("Hello from the other Side");
// });

// Post Method to send data to database
app.post("/student", async (req, res) => {
  try {
    const user = new Student(req.body);
    const createuser = await user.save();
    res.status(201).send(createuser);
  } catch (e) {
    res.status(404).send(e);
  }
});

// Get data of whole table
app.get("/student", async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.send(studentsData);
  } catch (e) {
    res.send(e);
  }
});

// Get data by ID
app.get("/student/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(req.params.id);
    const StudentDataId = await Student.findById(_id);
    if (!StudentDataId) {
      return res.status(404).send("OOPS page Not Found");
    } else {
      res.send(StudentDataId);
    }
  } catch (e) {
    res.send(e);
  }
});

// Update(patch) data by ID (STATIC)
// app.patch("/student/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     console.log(req.params.id);
//     const StudentDataId = await Student.findByIdAndUpdate(
//       _id,
//       { phone: 9996663331 },
//       { new: true }
//     );
//     if (!StudentDataId) {
//       return res.status(404).send("OOPS page Not Found");
//     } else {
//       res.send(StudentDataId);
//     }
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });
 

// Update(patch) data by ID (STATIC)
app.patch("/student/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(req.params.id);
    const StudentDataId = await Student.findByIdAndUpdate(
      _id,
     req.body,
      { new: true }
    );
    if (!StudentDataId) {
      return res.status(404).send("OOPS page Not Found");
    } else {
      res.send(StudentDataId);
    }
  } catch (e) {
    res.status(404).send(e);
  }
});
 
// Update(put) data by id
app.put("/student/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const StudentDataId = await Student.findByIdAndUpdate(
      _id,
      {
        name: "KPL",
        email: "kpl@pkl.com",
        phone: 1212121212,
        address: "kplkplkplkplkplkpl",
      },
      { new: true }
    );
    if (!StudentDataId) {
      return res.status(404).send("OOPS Page Not Found");
    } else {
      res.send(StudentDataId);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete data by ID
app.delete("/student/:id", async (req, res) => {
  try {
    const DeleteData = await Student.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return;
    }
    res.send(DeleteData);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(port, "127.0.0.1", () => {
  console.log(`Student Server is port no. ${port}`);
});
