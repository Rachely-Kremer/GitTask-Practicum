const { getAllUser, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { User } = require('../models/user');

// Mocking User model functions
jest.mock('../models/user', () => ({
    User: {
        find: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    }
}));

describe('User Controller Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllUser', () => {
        it('should return all users', async () => {
            const mockUsers = [{ name: 'User 1', email: 'user1@example.com', phone: '1234567890' }];
            User.find.mockResolvedValue(mockUsers);

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await getAllUser(null, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
        });

        it('should return empty array when no users found', async () => {
            User.find.mockResolvedValue([]);

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await getAllUser(null, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No user found', user: [] });
        });

        it('should handle internal server error', async () => {
            User.find.mockRejectedValue(new Error('Database error'));

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await getAllUser(null, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Internal Server Error', error: 'Database error' });
        });
    });

    // Similar tests for other functions (getUserById, createUser, updateUser, deleteUser)
});