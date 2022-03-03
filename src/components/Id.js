import React, { useState, useEffect } from 'react'
import authService from '../services/authService';
import Header from './Header'
import { SocketContext } from '../services/socket'
import QRCode from "react-qr-code";

export default function Id(props) {

    const socket = React.useContext(SocketContext);

    const [qrvalue, setQrvalue] = useState("");
    const [clicked, setClicked] = useState(false);


    useEffect(() => {
        socket.emit('username', props.username);



    }, [socket])


    useEffect(() => {
        socket.on('qrvalue', data => {
            console.log(data);
            setQrvalue(data);
        })

    }, [socket])
    console.log(props)
    const data = JSON.stringify(props.data)


    return (
        <>
            <Header />
            <div className="flex flex-wrap flex-col mt-5">
                <img className="rounded-full h-32 w-32 mx-auto mb-4 hover:bg-opacity-50 cursor-pointer" src={props.img} alt="image here" onClick={() => {
                    if (clicked)
                        setClicked(false);
                    else
                        setClicked(true);
                }} />
                <h1 className="mx-auto">{props.username}</h1>
                {clicked ? (
                    <div className='mx-auto mt-5 flex flex-wrap flex-col h-68 p-2'>
                        <h1 className='m-2'>Name: {props.plaindata.name}</h1>
                        <h1 className='m-2'>Father Name: {props.plaindata.fname}</h1>
                        <h1 className='m-2'>Roll No.: {props.plaindata.rn}</h1>
                        <h1 className='m-2'>Course: {props.plaindata.course}</h1>
                        <h1 className='m-2'>Date of Birth: {props.plaindata.dob}</h1>
                        <h1 className='m-2'>Valid Upto: {props.plaindata.valid}</h1>

                    </div>
                ) : (
                    <div>
                        <QRCode className="mx-auto mt-5" value={props.data} />
                    </div>

                )}

                <button className="bg-gray-900 text-white p-2 rounded-lg mt-10" onClick={() => {
                    authService.logout();
                }}>Log out</button>
            </div>
        </>
    )
}
