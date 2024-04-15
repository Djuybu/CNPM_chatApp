import { useEffect, useRef } from "react";
import io, { ManagerOptions, SocketOptions } from "socket.io-client"

export const useSocket = (
    url: string,
    opts?: Partial<ManagerOptions & SocketOptions> | undefined

) => {
    const { current: socket} = useRef(io(url, opts));

    useEffect(() => {
        return () => {
            if(socket) socket.close();
        }
    }, [socket])

    return socket;
}