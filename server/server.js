const app = require("express")();
const server = require("http").createServer(app);
const PORT = process.env.PORT || 5000;
const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  // id is getting from frontend & we want to make it static so that it wont change everytime
  // because socket id change everytime someone joined the connections.
  // This id is person sending the message.
  const id = socket.handshake.query.id;

  socket.join(id);
  socket.on("send-message", ({ recipients, text }) => {
    //when A is sending message to B then reciver is B but when B is sending message
    //then reciver is A so we are swaping A & B  recipients to the person who is sending the message
    //we are removing the sender id so that only other get message but not us

    // 1 2 3 are present in convo.
    // When 1 send message to group then
    // for 1 recipents are  2 & 3 & sender is 1
    // for 2 recipents are  1 & 3 & sender is 2
    // for 3 recipents are  1 & 2 & sender is 3
    // So for every user we are updating sender & recipents
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      // here we are sending message to front to a particular room that is our recipent room.
      // for each reciver we are emiting message.
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});

server.listen(process.env.PORT || PORT, () =>
  console.log(`Chat App server running at port: ${PORT}`)
);
