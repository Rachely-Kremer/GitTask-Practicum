

//צריך כאן להביא את הMMODELS 
const User = require();




// פונקציית אסינכרון כדי לאחזר את כל המשתמשים
const getAllUser = async (req, res) => {
    try {
        // מצא את כל המשתמשים במסד הנתונים והמר לאובייקטי JavaScript רגילים
        const user = await User.find().lean();

        // בדוק אם קיימים משתמשים; אם לא, החזר מערך ריק
        if (!user || user.length === 0) {
            return res.status(200).json({ message: 'No user found', user: [] });
        }

        // החזר תגובת הצלחה עם רשימת המשתמשים
        res.status(200).json(user);
    } catch (error) {
        // החזר תגובת שגיאה אם אחזור משתמשים נכשל
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

// פונקציית אסינכרון כדי לאחזר משתמש לפי מזהה
const getUserById = async (req, res) => {
    // חלץ מזהה משתמש מפרמטרי הבקשה
    const { id } = req.params;

    /// מצא משתמש לפי מזהה והמר לאובייקט JavaScript רגיל
    const user = await User.findById(id).lean()

    // בדוק אם המשתמש קיים; אם לא, החזר תגובת שגיאה
    if (!user) {
        return res.status(400).json({ message: 'No user found' });
    }

    // החזר תגובת הצלחה עם פרטי המשתמש
    res.json(user);
}
// פונקציית אסינכרון ליצירת משתמש חדש
const createUser = async (req, res) => {
    // פירוק נתוני משתמש מגוף הבקשה
    const { firstName,email,phone} = req.body;

    try {
        // צור משתמש חדש באמצעות מודל המשתמש והנתונים שסופקו
        const user = await User.create({ firstName, email, phone });

        // החזר תגובת הצלחה עם פרטי המשתמש שנוצרו
        return res.status(201).json({ message: 'New user created', user });
    } catch (error) {
        // החזר תגובת שגיאה אם יצירת המשתמש נכשלת
        return res.status(400).json({ message: 'Invalid post', error });
    }
};

// פונקציית אסינכרון לעדכון משתמש
const updateUser = async (req, res) => {
    // פירוק נתוני משתמש מגוף הבקשה
    const { _id, firstName,email,phone } = req.body;

    // בדוק אם זיהוי המשתמש מסופק; אם לא, החזר תגובת שגיאה
    if (!_id) {
        return res.status(400).json({ message: 'user ID is required' });
    }

    try {
        // מצא ועדכן את המשתמש לפי מזהה עם הנתונים שסופקו
        const user = await User.findByIdAndUpdate(
            _id,
            { firstName,email,phone },
            { new: true, runValidators: true }
        );

        // בדוק אם המשתמש לא נמצא; אם כן, החזר תגובת שגיאה
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        // החזר תגובת הצלחה עם פרטי המשתמש המעודכנים
        res.json(`${user.name} updated`);
    } catch (error) {
        // החזר תגובת שגיאה אם עדכון המשתמש נכשל
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


const deleteUser = async (req, res) => {
    // Find and delete the User
    const { _id } = req.body;
    const user = await User.findByIdAndDelete({ _id: _id }).exec();
  
    // Send the response
    let reply;
    if (user) {
      reply = `user '${user.title}' ID ${user._id} deleted`;
    } else {
      reply = 'No such user found';
    }
  
    res.json(reply);
  };

// ייצא את הפונקציות המוגדרות לשימוש בקבצים אחרים
module.exports = { getAllUser, getUserById, createUser, updateUser, deleteUser }
