// controllers/exampleController.js
const mysqlService = require('../config/sqlService.js');
const mysqlDB = require('../services/sqlDB.js');


async function getSignup(req) {
    try {
        const { email, phone, username, password, firstname, lastname, accounttype, dateofbirth } = req.body;

        if ((!email && !phone && !username) || !password || !firstname || !lastname || !accounttype || !dateofbirth) {
            return {
                success: false,
                message: 'All fields are required including either email, phone, or username'
            };
        }

        if (accounttype !== 'personal' && accounttype !== 'business') {
            return {
                success: false,
                message: 'Invalid account type'
            };
        }


        // const passwordValidation = await validatePassword(password);
        // if (!passwordValidation.isValid) {
        //     return {
        //         success: false,
        //         message: passwordValidation.message || 'Password validation failed'
        //     };
        // }

        const newUser = {
            email,
            phone,
            username,
            password,
            firstname,
            lastname,
            accounttype,
            dateofbirth,
            createdAt: new Date()
        };

        const userCheck = await getUser(newUser);

        if (userCheck.exists) {
            return {
                success: false,
                message: userCheck.message
            };
        }

        const savedUser = await mysqlDB.createUser(newUser);
        
        return {
            success: true,
            message: 'User registered successfully',
            data: savedUser
        };

    } catch (error) {
        console.error('Error in signup:', error);
        throw error;
    }
}

// Async function to check if a user already exists
async function getUser(newUser) {
    const { email, phone, username } = newUser;
    let whereClause = '';

    if (email) whereClause += `email = '${email}'`;
    if (phone) whereClause += whereClause ? ` OR phone = '${phone}'` : `phone = '${phone}'`;
    if (username) whereClause += whereClause ? ` OR username = '${username}'` : `username = '${username}'`;

    const userExists = await mysqlService.getAllRecordsWhere('users', '*', whereClause);

    if (userExists && userExists.length > 0) {
        let message = 'User already exists with';
        if (userExists[0].email === email) message += ' email';
        if (userExists[0].phone === phone) message += ' phone';
        if (userExists[0].username === username) message += ' username';
        return { exists: true, message };
    }
    return { exists: false };
}
                    
          

    async function sendOtp(req) {
    try {
    const { email, phone } = req.body;

    if (!email && !phone) {
        return {
            success: false,
            message: 'Email or phone is required'
        };
    }

    const user = { email, phone };
    const userToSendOtp = await mysqlDB.getUser(user);

    if (!userToSendOtp) {
        return {
            success: false,
            message: 'User not found'
        };
    }

    // Generate OTP
    const code = Math.floor(1000000 + Math.random() * 900000);
    console.log(code);
    const sendOtpToEmail = async (email, code) => {
        console.log(`Sending OTP ${code} to ${email}`);
        return true;
    };

    const sendOtpToPhone = async (phone, code) => {
        console.log(`Sending OTP ${code} to ${phone}`);
        return true;
    };

    if (email) {
        await sendOtpToEmail(email, code);
    }

    if (phone) {
        await sendOtpToPhone(phone, code);
    }

    return {
        success: true,
        message: 'OTP sent successfully'
    };

    } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
    }
}



async function getSignin(req) {
    try {
        const { email, phone, username, password } = req.body;

        if (!email && !phone && !username) {
            return {
                success: false,
                message: 'All fields are required including either email, phone, or username'
            };
        }
        if (!password) {
            return {
                success: false,
                message: 'Password is required'
            };
        }

        const user = { email, phone, username, password };
        const userToSignin = await mysqlDB.getUser(user);
        if (!userToSignin) {
            return {
                success: false,
                message: 'User not found'
            };
        }
        const isPasswordValid = await mysqlDB.comparePassword(password, userToSignin.password);
        if (!isPasswordValid) {
            return {
                success: false,
                message: 'Invalid password'
            };
        }
        return {
            success: true,
            message: 'User signed in successfully',
            data: userToSignin
        };
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
}


async function validatePassword(user) {
    try {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const isPasswordValid = passwordRegex.test(user.password);
        if (!isPasswordValid) {
            return {
                success: false,
                message: 'Password must contain minimum 8 characters with at least 1 uppercase, 1 lowercase, 1 number and 1 special character'
            };
        }
        return {
            success: true,
            message: 'Valid password'
        };
    } catch (error) {
        console.error('Error validating password:', error);
        throw error;
    }
}
  function forgetPassword(user) {      try {
          const { email, phone } = user;
          if (!email && !phone) {
              return {
                  success: false,
                  message: 'Email or phone is required'
              };
          }

          const generateOtp = () => {
              const otp = Math.floor(100000 + Math.random() * 900000);
              return otp;
          };

          const resetPassword = () => {
              const newPassword = Math.random().toString(36).slice(-8);
              return newPassword;
          };

          const otp = generateOtp();
          const tempPassword = resetPassword();

          return {
              success: true,
              message: 'OTP sent successfully',
              data: { otp, tempPassword }
          };

      } catch (error) {
          console.error('Error in forget password:', error);
          throw error;
      }
  }

// function pickInterests(user, intrests) {


//     const getUser = () => {
//         const interests = [
//             "football",
//             "basketball",
//             "tennis",
//             "cricket",
//             "hockey",
//             "badminton",
//             "table tennis",
//             "volleyball",
//         ]


// }

// }

function pickUsername(user) {
    try {
        const { email, phone } = req.body;
        let userQuery;
        
        if (email) {
            userQuery = { email };
        } else if (phone) {
            userQuery = { phone };
        } else {
            throw new Error('Either email or phone is required');
        }

        const existingUser = findUser(userQuery);
        if (!existingUser) {
            throw new Error('User not found');
        }
        
        const username = randomize(existingUser.firstname + existingUser.lastname) + generateAlphanumeric(3);
        // existingUser.username = username;
        // updateUser(existingUser);
        
        return {
            success: true,
            username: username
        };
    } catch (error) {
        console.error('Error in picking username:', error);
        throw error;
    }
}
function addOccupation(user) {
    try {
        const { email, phone, occupation } = req.body
        
        let userQuery
        if (email) {
            userQuery = { email }
        } else if (phone) {
            userQuery = { phone }
        } else {
            throw new Error('Either email or phone is required')
        }

        const existingUser =  getUserFromDatabase(userQuery)
        
        if (!existingUser) {
            throw new Error('User not found')
        }

        existingUser.occupation = occupation
         updateUserInDatabase(existingUser)

        return existingUser
    } catch (error) {
        throw error
    }
}

// function customizeExperience(userexperience) { 


//     const userexperience = {
//         firstname: 'John',
//         lastname: 'Doe',
//         email: 'john.doe@example.com',
//         phone: '1234567890',
//         password: 'password123',
//         occupation: 'Software Engineer',
//         interests: ['football', 'basketball', 'tennis'],
//         notifications: true,
//         privacy: true,
//         firsttimeSignin: true,
//         username: 'johndoe',
//         profilePicture: 'profile_picture.jpg',
//         bio: 'Hello, I am John Doe.',
//         location: 'New York, USA',
//         accountType: 'free',
//         accountType: 'premium'
//     }
//    const notificationAndPrivacyOptions = {
//        notifications: false,
//        privacy: false
//    }

// }

function signInflow(user) {
    
    if (user.firsttimeSignin) {
        return getUsername(user)
    }
    

    return getUsername(user)
    

    getUsername/Phone/AccountType/Email/Password
}

function uploadProfilePicture(user) {

}

function addBio(user) {

}


function addLocation(user) {

}

function getLocation (user) {

}

function pickIntention(user) {

    const intentions = [
        "To share my predictions on everyday real-life events",
        "To discover other people's predictions on the outcome of events",
        "To trade the outcome of events",
        "Peer-to-peer prediction exchange"
    ]

    return intentions

}


    async function suggestFollow(req) {
      try {
         const { email, phone } = req.body;
          return await mysqlDB.fetchPeopletoFollow({ email, phone });
      } catch (error) {
          throw error;
      }
    }

    function pickTheme(user) {
    const themes = [
        "black",
        "white"
    ]
    return themes
}


  async function composePrediction(req) {
     
    try {
        const { email, phone } = req.body;
        let userQuery;

        if (email) {
            userQuery = { email };
        } else if (phone) {
            userQuery = { phone };
        } else {
            throw new Error('Either email or phone is required');
        }

        const prediction = req.body;
        return await mysqlDB.createPredictions(prediction);

    } catch (error) {
        throw error;
    }
}
function generateAuthToken(user) {

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return token;


    }


module.exports = {
    getSignup,
    getUser,
    getSignin,
    forgetPassword,
    sendOtp,
    validatePassword,
    pickUsername,
    addOccupation,
    signInflow,
    uploadProfilePicture,
    addBio,
    addLocation,
    getLocation,
    pickIntention,
    suggestFollow,
    pickTheme,
    composePrediction,
    generateAuthToken
};