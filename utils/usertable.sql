
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE ,
    phone VARCHAR(20) UNIQUE ,
    password VARCHAR(255) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    username VARCHAR(100) UNIQUE,
    accounttype ENUM('personal', 'business') NOT NULL,
    dateofbirth DATE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    firsttimeSignin BOOLEAN DEFAULT TRUE,
    bio TEXT,
    location VARCHAR(255),
    profilePicture VARCHAR(255),
    theme ENUM('black', 'white') DEFAULT 'white',
    notifications BOOLEAN DEFAULT FALSE,
    privacy BOOLEAN DEFAULT FALSE
);

CREATE TABLE user_interests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    interest VARCHAR(100) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    UNIQUE KEY unique_user_interest (userId, interest)
);

CREATE TABLE user_intentions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    intention VARCHAR(255) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    UNIQUE KEY unique_user_intention (userId, intention)
);

CREATE TABLE user_occupations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    occupation VARCHAR(255) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE otps (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    code VARCHAR(7) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiresAt DATETIME NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE user_followers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    followerId INT NOT NULL,
    followingId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (followerId) REFERENCES users(id),
    FOREIGN KEY (followingId) REFERENCES users(id),
    UNIQUE KEY unique_follower (followerId, followingId)
);
