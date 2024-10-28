// controllers/exampleController.js
const mysqlService = require('./sqlService.js');
  function getSignup(newuser) {
      try {
          const { email, phone, password, firstname, lastname, username, accounttype, dateofbirth } = newuser

          if (!email || !phone || !password || !firstname || !lastname || !username || !accounttype || !dateofbirth) {
              return {
                  success: false,
                  message: 'All fields are required'
              }
          }

          if (accounttype !== 'personal' && accounttype !== 'business') {
              return {
                  success: false,
                  message: 'Invalid account type'
              }
          }

          const newUser = {
              email,
              phone,
              password,
              firstname,
              lastname,
              username,
              accounttype,
              dateofbirth,
              createdAt: new Date()
          }

          const userExists = getUserExist(newUser)
    
          if (!userExists.exists) {
              try {
                  const savedUser = mysqlService.createUser(newUser)
                  console.log('User registered successfully:', savedUser)
                  return {
                      success: true,
                      message: 'User registered successfully',
                      data: newUser
                  }
              } catch (error) {
                  console.error('Error in signup:', error)
                  throw error
              }
          } else {
              return {
                  success: false,
                  message: userExists.message
              }
          }
      } catch (error) {
          console.error('Error in signup:', error)
          throw error
      }
  }
    function getUserExist(user) {
        try {
                const { email, phone, username } = user;
                
                // Query database for existing user
                const existingUser = mysqlService.findUser({
                    $or: [
                        { email: email },
                        { phone: phone },
                        { username: username }
                    ]
                });
        
                if (existingUser) {
                    return {
                        exists: true,
                        message: 'User already exists'
                    };
                }
        
                return {
                    exists: false,
                    message: 'User does not exist'
                };
        
            } catch (error) {
                console.error('Error checking if user exists:', error);
                throw error;
            }
        
    }
    
function getUser(user) {
try {
            const { email, phone, username } = user;
            
            // Query database for user
            const foundUser = mysqlService.findUser({
                $or: [
                    { email: email },
                    { phone: phone },
                    { username: username }
                ]
            });
    
            if (!foundUser) {
                return {
                    success: false,
                    message: 'User not found'
                };
            }
    
            return {
                success: true,
                message: 'User found successfully',
                data: foundUser
            };
    
        } catch (error) {
            console.error('Error getting user:', error);
            throw error;
        }

    }
function sendOtp(user) {

    const usertosendotp = userservice.getUser(user);

    try {
        const { email, phone } = req.body

        if (!email && !phone) {
            return res.status(400).json({ error: 'Email or phone is required' })
        }

        // Generate OTP
    const code = Math.floor(1000000 + Math.random() * 9000000)
    const sendOtptoEmail = async (email, code) => {

        // Send OTP via email
         console.log(`Sending OTP ${code} to ${email}`)
         return true
     }

     const sendOtptoPhone = async (phone, code) => {

        // Send OTP via phone
         console.log(`Sending OTP ${code} to ${phone}`)
         return true
     }

     console.log(`Sending OTP ${code} to ${email}`)
     return true
 } catch (error) {
     console.error('Error sending OTP:', error)
     throw error
 }

}


function getRegisteredUser(email, phone) {

}

function getSignin(req, res) {
    res.render('signin');
}

function validatePassword(user) {
   
}

function forgetPassword(user) {

}

function resetPassword(user) {

}

function pickInterests(user) {

}

function pickUsername(user) {

    const getUser = () => {
        const username = randomize(user.firstname + user.lastname) + alphanumeric3
        return username
    }

}
function addOccupation(user) {

}

function customizeExperience(user) { 
   const notificationAndPrivacyOptions = {
       notifications: false,
       privacy: false
   }

}

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


function pickInterests(user) {

    const interests = [
        "football",
        "baseball", 
        "news",
        "american football",
        "handball",
        "cricket",
        "boxing"
    ]
    
    return interests
}
function pickIntention(user) {

    const intentions = [
        "To share my predictions on everyday real-life events",
        "To discover other people's predictions on the outcome of events",
        "To trade the outcome of events",
        "Peer-to-peer prediction exchange"
    ]

    return intentions}

function suggestFollow (user) {

}
    

function pickTheme(user) {
    const themes = [
        "black",
        "white"
    ]
    return themes
}

function composePrediction(user) {

}

module.exports = {
    getUserExist,
    getUser,
    getSignup,
    getSignin,
    forgetPassword,
    getRegisteredUser,
    sendOtp,
    resetPassword,
    validatePassword,
    pickUsername,
    addOccupation,
    customizeExperience,
    signInflow,
    uploadProfilePicture,
    addBio,
    addLocation,
    getLocation,
    pickInterests,
    pickIntention,
    suggestFollow,
    pickTheme,
    composePrediction
}