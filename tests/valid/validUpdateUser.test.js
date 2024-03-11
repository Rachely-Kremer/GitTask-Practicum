const User = require('../validation/validUser');

test('For entering a valid user should result a valid user object', () => {
    const result = (User.validUpdateUser({
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
    const result = User.validUpdateUser({
        name: "rachely",
        email: "rachlkr2580@ gmail.com",
        phone: "0534102996"
    });
    expect(result.error).toBeDefined();
    expect(result.error.details).toHaveLength(1);
    expect(result.error.details[0].message).toBe('"email" must be a valid email');
});

test('phone length must be at least 10 characters long', () => {
    const result = User.validUpdateUser({
        email: "sgyhb@gmail.com",
        phone: "04635"
    });
    expect(result.error).toBeDefined();
    expect(result.error.details).toHaveLength(1);
    expect(result.error.details[0].message).toBe('"phone" length must be at least 10 characters long');
});

test('string without a space should result in an error for invalid email format', () => {
    const result=User.validUpdateUser({
        name:"aaa",
        email:"rachlkr2580@ gmail.com",
        phone: "0548522655"
    });
    expect(result.error).toBeDefined();
    expect(result.error.details).toHaveLength(1);
    expect(result.error.details[0].toBe('"email" must be a valid email'))   
});
test('name type of number should result in an error for invalid string format', () => {
    const result=User.validUpdateUser({
        name:100,
        email:"rachlkr2580@gmail.com",
        phone: "0548522655"
    });
    expect(result.error).toBeDefined();
    expect(result.error.details).toHaveLength(1);
    expect(result.error.details[0].message).toBe('"name" must be a string');
});



