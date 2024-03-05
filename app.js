require("dotenv").config() // משמש להגדרת קונפיגורציה עבור משתני סביבה מתוך קובץ .env
const express = require("express") // יבוא של ספריית ה-Express, ספריית פריימוורק ליצירת אפליקציות ווב ב-Node.js


const PORT = process.env.PORT || 2222 // הגדרת משתנה PORT לפי ערך מסוים או לפי ערך 7001 כברירת מחדל


const app = express() // יצירת אפליקציה חדשה באמצעות ה-Express

//middlewares - יישום מידלוורים
app.use(express.json()) // השימוש ב-JSON כפורמט להעברת נתונים בבקשות
app.use(express.static("public")) // שימוש בתיקיית הקבצים הסטטית בשם "public" לקבצי סטטיקה
app.get("/",(req,res)=>{ // הגדרת מסלול בשם הפסוקה הראשונה ב-URL
    res.send(`home`) // מענה לבקשת GET עם מחרוזת טקסט
    })
//routes 
 app.use("/api/Usere", require("./routes/routeUsers"));




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
