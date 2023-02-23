let express = require("express");
let app = express();

let http = require("http");
let server = http.Server(app);

let socketIO = require("socket.io");
let io = socketIO(server);
const ImgType = import("image-type");
const path = require("path"),
  cors = require("cors"),
  multer = require("multer"),
  bodyParser = require("body-parser"),
  fs = require("fs"),
  createError = require("http-errors");
// File upload settings
const PATH = "./uploads";
const CHAT = "./chatUploads";

// const mimeType =["image/jpeg", "image/jpg", "image/png"];
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.path);
    if (req.path == "/api/chatUploads") {
      cb(null, CHAT);
    } else {
      cb(null, PATH);
    }
  },
  filename: (req, file, cb) => {
    if (file.mimetype == "image/jpeg") {
      if (req.path == "/api/chatUploads") {
        cb(null, file.fieldname + "-" + file.originalname + ".jpeg");
      } else {
        cb(null, file.fieldname + "-" + file.originalname + ".jpeg");
      }
    } else if (file.mimetype == "application/pdf") {
      if (req.path == "/api/chatUploads") {
        cb(null, file.fieldname + "-" + file.originalname + ".pdf");
      } else {
        cb(null, file.fieldname + "-" + file.originalname + ".pdf");
      }
    }
  },
});
let upload = multer({
  storage: storage,
});
// Express settings
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.get("/api", function (req, res) {
  res.end("File catcher");
});

//CHAT GET File
// 'uploads/image-1675513373188.jpeg'
app.get("/api/chatUploads/:filename", function (req, res) {
  let result = req.params.filename.split(".");
  
  const Path = "chatUploads/image-" + req.params.filename;
  fs.readFile("chatUploads/image-" + req.params.filename, function (err, data) {
    if (err) {
      console.log(err.message);
      res.send({ err: "343" });
    } // Fail if the file can't be read.
    else {
      if (result[1] == "pdf") {
        res.end(data);
        // res.end(data);
      } else if (result[1] == "jpeg") {
        res.end(data);
      }
    }
  });
});

// CHAT POST File
app.post("/api/chatUploads", upload.single("image"), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false,
    });
  } else {
    console.log("File is available!");
    return res.send({
      success: true,
    });
  }
});

//GET File
// 'uploads/image-1675513373188.jpeg'
app.get("/api/uploads/:filename", function (req, res) {
  let result = req.params.filename.split(".");
  const Path = "uploads/image-" + req.params.filename;
  fs.readFile("uploads/image-" + req.params.filename, function (err, data) {
    if (err) {
      console.log(err.message);
      res.send({ err: "343" });
    } // Fail if the file can't be read.
    else {
      if (result[1] == "pdf") {
        res.end(data);
        // res.end(data);
      } else if (result[1] == "jpeg") {
        res.end(data);
      }
    }
  });
});

// POST File
app.post("/api/upload", upload.single("image"), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false,
    });
  } else {
    console.log("File is available!");
    return res.send({
      success: true,
    });
  }
});

// error handler
app.use(function (err, req, res, next) {
  console.error("MESSAGE FROM ERROR HANDLER " + err.message);

  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// ==============================================================================================
//SOCKET CONNECTING CODE FOR MESSAGING
const port = process.env.PORT || 4000;

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    socket.join(data.room);
    socket.broadcast.to(data.room).emit("user joined");
  });

  socket.on("message", (data) => {
    io.in(data.room).emit("new message", {
      user: data.user,
      message: data.message,
    });
  });
});

// Create PORT
// const PORT = process.env.PORT || 4000;

//   Find 404 and hand over to error handler

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
app.use((req, res, next) => {
  next(createError(404));
});
