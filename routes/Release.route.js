const express = require('express');
const { FindAllTesteur,AddRelease,DeleteRelease,FindAllRelease,FindSinglRelease,UpdateRelease, AddReleaseApk,getfile } = require('../controllers/Release.controller');
const router = express.Router()
const multer = require("multer");
const path = require("path");

// to save file in package /uploads/images
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./uploads/images");
//     },
//     filename: (req, file, cb) => {
//         const newFileName = (+new Date()).toString() + path.extname(file.originalname);
//         cb(null, newFileName);
//     }
// })
//const upload = multer({ storage });
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype !== "application/vnd.android.package-archive") {
        cb(new Error("Invalid file type. Only APK files are allowed."));
        return;
      }
      cb(null, true);
    },
  });


/* add user */
//router.post('/release', upload.single("image"), AddRelease)
router.post('/release', upload.single('apkFile'), AddReleaseApk)
router.get('/download/:id', getfile)
/* find all users */
router.get('/release', FindAllRelease)
router.get('/releaseTesteur', FindAllTesteur)

/* find single user */
router.get('/release/:id', FindSinglRelease)

/* add user */
router.put('/release/:id', UpdateRelease)

/* add user */
router.delete('/release/:id', DeleteRelease)

module.exports = router;