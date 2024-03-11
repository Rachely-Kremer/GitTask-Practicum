// const { getAllUser, getUserById, createUser, updateUser, deleteUser } = require('./controllers/userControllers');
// const { User } = require('./models/user');
const User = require('../validation/validUser')



test('For entering a valid user should result a valid user object', () => {
    expect(User.validCreateUser({
        name: "rachely",
        email: "rachlkr2580@gmail.com",
        phone: "0534102996"
    })).toEqual({
        value: {
            name: "rachely",
            email: "rachlkr2580@gmail.com",
            phone: "0534102996"
        }
    });
});

test('string without a @ without space should result in an error for invalid email format', () => {
    const result = User.validCreateUser({
        name: "rachely",
        email: "rachlkr2580@ gmail.com",
        phone: "0534102996"
    });
    expect(result.error).toBeDefined();
    expect(result.error.details).toHaveLength(1);
    expect(result.error.details[0].message).toBe('"email" must be a valid email');
});

test('name with one letter should result in an error for invalid length format', () => {
    const result = User.validCreateUser({
        name: "r",
        email: "rachel123456@gmail.com",
        phone: "0555555555"
    });
    expect(result.error).toBeDefined();
    expect(result.error.details).toHaveLength(1);
    expect(result.error.details[0].message).toBe('"name" length must be at least 2 characters long');
});

test('phone type of string should result in an error for invalid number format', () => {
    const result = User.validCreateUser({
        name: "rachely",
        email: "rachel123456@gmail.com",
        phone: "jhgf"
    });
    expect(result.error).toBeDefined();
    expect(result.error.details).toHaveLength(1);
    expect(result.error.details[0].message).toBe( "\"phone\" with value \"jhgf\" fails to match the required pattern: /^[0-9]+$/"
    );
});


test('name type of number should result in an error for invalid string format', () => {
    const result = User.validCreateUser({
        name: 100,
        email: "rachel123456@gmail.com",
        phone: "0534102999"
    });
    expect(result.error).toBeDefined();
    expect(result.error.details).toHaveLength(1);
    expect(result.error.details[0].message).toBe('"name" must be a string');
});

test('missing requierd file should result in an error for invalid requierd format', () => {
    const result=User.validCreateUser({
        name: 100,
        email: "rachel123456@gmail.com"
    });
    expect(result.error).toBeDefined();
    expect(result.error.details).toHaveLength(1);
    expect(result.error.details[0].message).toBe('"phone" is required');
});

// // Mocking User model functions
// jest.mock('./models/user', () => ({
//     User: {
//         find: jest.fn(),
//         findById: jest.fn(),
//         create: jest.fn(),
//         findByIdAndUpdate: jest.fn(),
//         findByIdAndDelete: jest.fn(),
//     }
// }));

// describe('User Controller Tests', () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });

//     describe('getAllUser', () => {
//         it('should return all users', async () => {
//             const mockUsers = [{ name: 'User 1', email: 'user1@example.com', phone: '1234567890' }];
//             User.find.(mockUsers);

//             const mockResponse = {
//                 status: jest.fn().mockReturnThis(),
//                 json: jest.fn(),
//             };
//             await getAllUser(null, mockResponse);

//             expect(mockResponse.status).toHaveBeenCalledWith(200);
//             expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
//         });

// it('should return empty array when no users found', async () => {
//     User.find.mockResolvedValue(new Error('Database error'));

//     const mockResponse = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//     };
//     await getAllUser(null, mockResponse);

//     expect(mockResponse.status).toHaveBeenCalledWith(200);
//     expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No user found', user: [] });
// });

// it('should handle internal server error', async () => {
//     User.find.mockRejectedValue(new Error('Database error'));

//     const mockResponse = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//     };
//     await getAllUser(null, mockResponse);

//     expect(mockResponse.status).toHaveBeenCalledWith(500);
//     expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Internal Server Error', error: 'Database error' });
// });
// });

// Similar tests for other functions (getUserById, createUser, updateUser, deleteUser)
// });