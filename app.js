// require("dotenv").config() // משמש להגדרת קונפיגורציה עבור משתני סביבה מתוך קובץ .env
// const express = require("express") // יבוא של ספריית ה-Express, ספריית פריימוורק ליצירת אפליקציות ווב ב-Node.js
// // const cors = require("cors") // יבוא של ספריית ה-CORS, המאפשרת שימוש בפוליסות CORS באפליקציה

// // const connectDB = require("./config/dbConn") // יבוא של פונקציה להתחברות למסד נתונים
// const mongoose=require("mongoose") // יבוא של ספריית Mongoose, המאפשרת פעולות עם מסד נתונים MongoDB


// const PORT = process.env.PORT || 2222 // הגדרת משתנה PORT לפי ערך מסוים או לפי ערך 7001 כברירת מחדל


// const app = express() // יצירת אפליקציה חדשה באמצעות ה-Express
// // connectDB() // התחברות למסד נתונים
// // app.use(cors(corsOptions)) // שימוש בפוליסות ה-CORS שהוגדרו
// //middlewares - יישום מידלוורים
// app.use(express.json()) // השימוש ב-JSON כפורמט להעברת נתונים בבקשות
// app.use(express.static("public")) // שימוש בתיקיית הקבצים הסטטית בשם "public" לקבצי סטטיקה
// app.get("/",(req,res)=>{ // הגדרת מסלול בשם הפסוקה הראשונה ב-URL
//     res.send(`home`) // מענה לבקשת GET עם מחרוזת טקסט
//     })
// //routes 
// app.use("/api/user", require("./routes/routeUsers"))
// mongoose.connect("mongodb://127.0.0.1:27017/mydatabase", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));
// mongoose.connection.once("open", () => {
//   console.log("Connected to MongoDB database");
//   app.listen(port, () => {
//     console.log("App is running!!");
//   });
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// // mongoose.connection.once('open', () => { // התחברות מוצלחת למסד הנתונים
// //     console.log('Connected to MongoDB') // הדפסת הודעה על התחברות מוצלחת למסד הנתונים
// //     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // })

// // mongoose.connection.on('error', err => { // שגיאה בהתחברות למסד הנתונים
// //     console.log(err) // הדפסת השגיאה
// // })


require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 2222;

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send(`home`);
});

app.use("/api/user", require("./routes/routeUsers"));

mongoose.connect("mongodb://127.0.0.1:27017/UsersPracticum", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB database");
    app.listen(PORT, () => {
        console.log("App is running!!");
    });
});
