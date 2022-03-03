import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import authService from '../services/authService';


export default function Content() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className=" flex flex-wrap flex-col" style={{ height: "100vh" }}>
            <div className="flex flex-wrap flex-row mt-20 lg:mx-auto ml-5">
                <h1 className="text-black">
                    Username:
                </h1>
                <input onChange={(event) => {
                    setUsername(event.target.value);
                }} className="lg:ml-5 focus:ring-2 outline-none rounded-lg focus:ring-blue-500" type="text" name="username" placeholder="Enter Username" required />

            </div>
            <div className="flex flex-wrap flex-row mt-20 lg:mx-auto ml-5">
                <h1 className="text-black">
                    Password:
                </h1>
                <input onChange={(event) => {
                    setPassword(event.target.value);
                }} className="lg:ml-5 focus:ring-2 outline-none rounded-lg focus:ring-blue-500" type="password" name="password" placeholder="Enter Password" required id="password" />
                

            </div>
            


            <div id="error" className="mx-auto flex flex-wrap flex-row"></div>
            <button onClick={() => {
                if (username === "" || password === "") {
                    ReactDOM.render(<h1 className="text-sm mt-5 text-red-600">Username or Password can't be empty.</h1>, document.getElementById("error"))
                }
                else {
                    // axios.post("http://localhost:3005/login", {
                    //     username: username,
                    //     password: password
                    // }).then(response => {
                    //     if (response.data) {
                    //         ReactDOM.render("", document.getElementById("error"));
                    //         alert("Logged In");
                    //     }
                    //     else {
                    //         let element = <h1 className="text-red-600 text-sm mx-auto mt-5">Username or Password Incorrect.</h1>;
                    //         ReactDOM.render(element, document.getElementById("error"));
                    //     }
                    // })
                    authService.login(username, password).then((res) => {
                            if (res.state) {
                            ReactDOM.render("", document.getElementById("error"));
                            window.location.reload();
                        }
                        else {
                            let element = <h1 className="text-red-600 text-sm mx-auto mt-5">Username or Password Incorrect.</h1>;
                            ReactDOM.render(element, document.getElementById("error"));
                        }
                    });
                        
                }
            }} className="border-none outline-none hover:bg-gradient-to-r hover:from-blue-400 hover:to-red-400 bg-gradient-to-r from-blue-500 to-red-500 rounded-full w-auto lg:w-40 p-3 text-black mx-5 lg:mx-auto mt-10">
                Log In
            </button>
        </div>
    )
}

