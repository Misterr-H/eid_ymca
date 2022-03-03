const options = {
    cors: {
        origin: '*'
    }
    //   origins:['http://localhost:3000']
};
var express = require('express');
var app = express();
const http= require('http');
const server=http.createServer(app);
const socketio = require('socket.io');
const io=socketio(server, options);
const cors = require('cors');
var axios = require('axios');
require('dotenv').config();
app.use(cors());
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
var aes256 = require('aes256')
var CryptoJS = require('crypto-js')
const mongoose = require('mongoose');
let userModel = require('./models/User');
let qrModel = require('./models/Qr')
//mongoose.set('useFindAndModify', false);
// DB Config
const db = require('./config/keys').mongoURI;
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

var PORT = process.env.PORT || 3005;


app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json());


function getRandomString(length, usr) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    qrModel.countDocuments({username: usr}, (err, count) => {
        if (err) console.log(err);
        if(count == 0) {
            let qrdb = new qrModel({
                username: usr,
                key: result
            });
            qrdb.save().then((doc, err) => {
                if(err) console.log(err);
                if(doc) console.log(doc);
            })
        }
        else if(count > 0) {
            qrModel.findOneAndUpdate({username: usr}, {key: result}, (err, doc) => {
                if(err) console.log(err);
                else console.log("updated   ", doc);
            });
        }
    })
    return result;
}

io.on('connection', socket => {
    console.log("Client Connected");
    // let qrdb = new qrModel({
    //     username                                               
    // })

    socket.on('username', usr => {
        console.log(usr)
        socket.emit('qrvalue', getRandomString(256, usr));
        var func = setInterval(() => {
            socket.emit('qrvalue', getRandomString(256, usr));
        }, 60000);
        socket.on('disconnect', () => {
            clearInterval(func);
        })
    })



})


app.get('/', (req, res) => {
    res.send("working");
})

async function login(username, password) {
    try {
        return new Promise(async (resolve, reject) => {
            // await axios.get("http://webapi.jcboseustymca.co.in/API/DbAccess/loginjson?username=" + username + "&password=" + password, {
            //     headers: {
            //         "Authorization": "Basic amNieW1jYTpqY2J5bWNhQCM5ODk2",
            //         "Content-type": "application/json"
            //     }
            // }).then(response => {
            //     if (response.data[0] === null) {
            //         console.log("Failed Login")
            //         resolve(false);

            //     }


            //     else {
            //         console.log("Success Login");
            //         resolve(true);

            //     }
            // });
            if(username==="20001003051" && password==="pass_ymca") {
                resolve(true);
            }
            else {
                resolve(false);
            }
        })

    }
    catch (err) {
        console.log(err);
    }
}

app.post('/login', async (req, res) => {
    await login(req.body.username, req.body.password).then(response => {
        userModel.countDocuments({ username: req.body.username }, (err, count) => {
            console.log(count);
            if (count > 0) {
                if(!response) {
                    res.send({
                        state: response
                    });
                }
                else {
                    userModel.findOne({ username: req.body.username }, (err, doc) => {
                        res.send({
                            state: response,
                            accessToken: doc.accessToken
                        });
                    })
                }
                

            }
            else if (response) {
                jwt.sign({ user: req.body.username }, secretKey, (err, token) => {
                    let savedb = new userModel({
                        username: req.body.username,
                        accessToken: token
                    });
                    savedb.save().then((err, doc) => {
                        if (err)
                            console.log(err);
                        if (doc)
                            console.log(doc);
                    })
                    res.send({
                        state: response,
                        accessToken: token
                    });
                })
            }
            else {
                res.send({
                    state: response
                })
            }
        })


    })

})

const data = {
    name: "Himanshu",
    fname: "Sudarshan Kumar",
    rn: "20001003051",
    course: "BTech CE",
    dob: "15/07/2002",
    valid: "June 2024"
}
var key = "himanshu"







app.get("/id", (req, res) => {
    //console.log(req.headers)
    userModel.findOne({ accessToken: req.headers['x-access-token'] }).then((doc, err) => {
        if (doc) {
            res.json({
                username: doc.username,
                state: true,
                img: "https://imgur.com/9psohJk.jpg",
                data: CryptoJS.AES.encrypt(JSON.stringify(data), key).toString(),
                plaindata: data
            })
        }
        else {
            res.json({
                state: false
            })
        }
        if (err)
            console.log(err);
    })
})


app.post("/verifyToken", (req, res) => {
    console.log(req.body);
    qrModel.findOne({username: req.body.username}).then((doc, err) => {
        console.log(doc.key)
        if(doc.key === req.body.key) {
            res.send(true);
            console.log("Student Authenticated");
        }
        else {
            res.send(false);
            console.log("Invalid Token");
        }
    })
})



server.listen(PORT,()=> console.log(`server started on ${PORT}`));

// app.listen(PORT, (err) => {
//     if (err)
//         console.log(err);
//     console.log("Express Server on Port:  ", PORT);
// });


// const port = process.env.PORT || 8000;
// io.listen(port);
// console.log('Socket Server on Port: ', port);
