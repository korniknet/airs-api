const User = require('../model/models');

module.exports.pushUser = async (userObject) => {
    try {
        const newUser = await User.create({
            Username: userObject.Username,
            birthdate: userObject.birthdate,
            fullName: userObject.fullName,
            email: userObject.email,
            phone: userObject.phonenumber,
            job: userObject.job,
            grade: userObject.grade,
            averageScore: userObject.averageScore,
            branch: userObject.selectBranch,
            highSchBranch: userObject.highSchBranch,
            password: userObject.password,
        });
        console.log(`New user created : ${newUser}`);
    } catch (err) {
        console.error(`Got Error during pushing data to Database : ${err}`);
    }
};

