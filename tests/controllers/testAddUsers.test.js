// Importing the createUser function
const createUser = require('../controllers/userControllers').createUser;

// Creating a mock function for createUser
jest.mock('../controllers/userControllers', () => ({
  createUser: jest.fn()
}));

// Importing the userService object
const userService = require('../service/userService');

describe('createUser function', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should successfully create a new user', async () => {
      const mockUserData = { name: 'John Doe', email: 'john@example.com', phone: '1234567890' };
      createUser.mockResolvedValue(mockUserData);
  
      const mockRequest = { body: mockUserData };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createUser(mockRequest, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'New user created', user: mockUserData });
    });
  
    it('should handle invalid user data', async () => {
      const mockUserData = { name: 'John Doe', email: 'invalid_email', phone: '1234567890' };
      createUser.mockRejectedValue(new Error('Invalid user data'));
  
      const mockRequest = { body: mockUserData };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createUser(mockRequest, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid post', error: 'Invalid user data' });
    });
  
    it('should handle internal server error', async () => {
      const mockUserData = { name: 'John Doe', email: 'john@example.com', phone: '1234567890' };
      const errorMessage = 'Internal server error';
      createUser.mockRejectedValue(new Error(errorMessage));
  
      const mockRequest = { body: mockUserData };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createUser(mockRequest, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid post', error: errorMessage });
    });
});
