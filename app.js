const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./model/models');
const { dbTest } = require('./controller/dbTest');
const db = require('./controller/dbSync');
const bcrypt = require('bcrypt');
const Router = express.Router();
const { login } = require('./controller/loginController');

// const session = require('express-session');

const PORT = 3000;

app.use(bodyParser.json());

app.use(cors());

app.use(express.static(path.join(__dirname, 'view')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

app.post('/api/auth/register', (req, res) => {

    console.log(req.body);
    let {
        birthdate,
        Username,
        fullName,
        email,
        phonenumber,
        radio,
        job,
        grade,
        averageScore,
        selectbar,
        branch,
        highSchBranch,
        password
    } = req.body;
    if (radio === 'no') { job = null };
    const userObj = { birthdate, Username, fullName, email, phonenumber, radio, job, grade, averageScore, selectbar, branch, highSchBranch, password };

    try {
        db.pushUser(userObj);
        return res.status(200).json({ message: "User created..." });
    } catch (err) {
        console.error(`Got some error : ${err}`);
        return res.status(500).json({ message: "Internal Server Error!" });
    }

    // const { username, password } = req.body;
    // if (!username || !password) {
    //     return res.status(400).json({ message: "Username and Password are required." });
    // }

    // // read database and store it to a variable
    // fs.readFile('./users.json', (err, data) => {
    //     if (err) {
    //         console.error(`Error in reading database: ${err}`);
    //         setTimeout(() => {
    //             return res.status(500).json({ message: "Error to connect to database" });
    //         }, 4000);
    //     }

    //     const users = JSON.parse(data);
    //     let user = users.find(u => u.username === username && u.password === password);
    //     console.log(user);

    //     if (!user) {
    //         return res.status(401).json({ message: "Incorrect username or password" });
    //     }

    //     return res.status(200).json({ message: `Login Successful! role : ${user.role}` });
    // });

});

app.post('/api/auth/login', async (req, res) => {

    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({
                success: false,
                error: {
                    message: "کاربری یافت نشد!",
                    code: 'NOT_FOUND'
                }
            });
        }
        console.log(user);
        console.log(req.body)

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: {
                    message: "رمزعبور نامعتبر است!",
                }
            });
        }

        if (isMatch) { res.status(200).json({ success: true, message: "ورود موفقیت‌آمیز!" }); }

    } catch (err) {
        console.error(`Got some error ${err}`);
        res.status(500).json({ success: false, error: { message: "خطا در برقراری ارتباط با سرور" } });
    }

});


// if (!email || !username || !password) {
//     return res.status(400).json({ message: "all fields are required." });
// }

// fs.readFile('./users.json', (err, data) => {
//     if (err) {
//         console.error(`Error to read Database : ${err}`);
//         return res.status(500).json({ message: "Internal Server Error" })
//     }

//     const users = JSON.parse(data);
//     const isExist = users.find(u => u.email === email);
//     if (isExist) {
//         return res.status(400).json({ message: "Email is existing!" });
//     }

//     const newUser = {
//         email: email,
//         username: username,
//         password: password,
//         role: "user"
//     }

//     users.push(newUser);

//     fs.writeFile('./users.json', JSON.stringify(users, null, 2), (err) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ message: "Internal Server Error" });
//         }

//         return res.status(200).json({ message: "User Registered!" });
//     })
// })

app.listen(PORT, () => {
    console.log("Server is running ...");
});