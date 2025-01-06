const { DataTypes } = require('sequelize');
const seq = require('../controller/dbConfig');
const bcrypt = require('bcrypt');


const User = seq.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthdate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    homeTown: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    job: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    grade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    selectbar: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    branch: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    averageScore: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    highSchBranch: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('user', 'author', 'admin'),
        defaultValue: 'user',
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'Users',
    timestamps: false
});

User.beforeCreate(async (user) => {
    if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

User.beforeUpdate(async (user) => {
    if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

module.exports = User;