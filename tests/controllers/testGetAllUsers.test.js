// ייבוא דגם המשתמש
const User = require('../models/user');
// ייבוא של פונקציית השקולות כל המשתמשים מבקשת השרת
const getAllUser = require('../controllers/userControllers').getAllUser;

// המוק האובייקט של userService
const userService = require('../service/userService');

// מוק את הפונקציה getAllUsers על אובייקט הuserService
userService.getAllUsers = jest.fn();

describe('getAllUser function', () => {
  beforeEach(() => {
    // ניקוי כל המימושים המוקסים הקודמים
    jest.clearAllMocks();
  });

  // מבחן עבור כאשר נמצאים משתמשים
  it('should return all users', async () => {
    // ניקוי כל המימושים המוקסים הקודמים
    const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
    // מזוודת המשתמשים המזויפים עם ערכי השדות הנתונים
    userService.getAllUsers.mockResolvedValue(mockUsers);

    // אובייקט מזויף של תגובה
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // ביצוע של getAllUser עם המשתמשים המוקסים
    await getAllUser(null, mockResponse);

    // אמור להתקבל קריאה ל status עם הקוד 200
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    // אמור להתקבל קריאה ל json עם המשתמשים המוקסים
    expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
  });

  // מבחן עבור כאשר אין משתמשים
  it('should return empty array when no users found', async () => {
    // הגדרת החזרת ערך ריק כאשר לא נמצאו משתמשים
    userService.getAllUsers.mockResolvedValue([]);

    // אובייקט מזויף של תגובה
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // ביצוע של getAllUser כאשר אין משתמשים
    await getAllUser(null, mockResponse);

    // אמור להתקבל קריאה ל status עם הקוד 200
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    // אמור להתקבל קריאה ל json עם הודעת 'No user found' ומערך ריק
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No user found', users: [] });
  });

  // מבחן עבור כאשר מתרחשת שגיאה פנימית בשרת
  it('should handle internal server error', async () => {
    // הגדרת החזרת שגיאת פנימית של השרת
    const errorMessage = 'Internal server error';
    userService.getAllUsers.mockRejectedValue(new Error(errorMessage));

    // אובייקט מזויף של תגובה
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // ביצוע של getAllUser כאשר מתרחשת שגיאה פנימית בשרת
    await getAllUser(null, mockResponse);

    // אמור להתקבל קריאה ל status עם הקוד 500
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    // אמור להתקבל קריאה ל json עם הודעת 'Internal Server Error' והודעת השגיאה המתקבלת
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Internal Server Error', error: errorMessage });
  });
});
