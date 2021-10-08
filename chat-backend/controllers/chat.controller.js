const Message = require("../models/message");

const getChat = async (req, res) => {
  const ownId = req.id;
  const messageFrom = req.params.from;

  const last30messages = await Message.find({
    $or: [
      { from: ownId, to: messageFrom },
      { from: messageFrom, to: ownId },
    ],
  })
    .sort({ createdAt: "desc" })
    .limit(30);

  return res.json({
    ok: true,
    messages: last30messages,
  });
};

module.exports = getChat;
