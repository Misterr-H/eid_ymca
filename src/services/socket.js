import io from "socket.io-client";
import { socket_url } from "../keys/Api";
import React from "react";

export const socket = io.connect(socket_url);
export const SocketContext = React.createContext();