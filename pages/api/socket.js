// import { Server } from 'Socket.IO'
import { scrape } from './webscrapper'

// const SocketHandler = (req, res) => {
//   if (res.socket.server.io) {
//     console.log('Socket is already running')
//   } 
//   else {
//     console.log('Socket is initializing')
//     const io = new Server(res.socket.server)
//     res.socket.server.io = io
//   }

//     io.on('connection', socket => {
//       console.log('Client connected')
//       // socket.on('input-change', msg => {
//       //   socket.broadcast.emit('update-input', msg)
//       // })
//       socket.on('input-change', (url) => {
//         console.log('scrapping site', url);
//         socket.emit('scrapping-started', "started");
//         scrape(url).then((data) => {
//           socket.emit('scraped-site', data)
//         })
//       })
//     })
//   }
//   res.end()
// }

// export default SocketHandler



import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  const onConnection = (socket) => {
    console.log("Client connected");

    socket.on("input-change", async (url) => {
      const p = await scrape(url, socket);
    });
  };

  // Define actions inside
  io.on("connection", onConnection);

  console.log("Setting up socket");
  res.end();
}