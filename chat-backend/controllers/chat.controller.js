const Message = require("../models/message");

const getChat = async (req, res) => {
  try {
    const ownId = req.uid;
    // console.log(req.uid);
    const messageFrom = req.params.from;

    const last30messages = await Message.find({
      $or: [
        { from: ownId, to: messageFrom },
        { from: messageFrom, to: ownId },
      ],
    })
      .sort({ createdAt: "asc" })
      .limit(30);

    return res.json({
      ok: true,
      messages: last30messages,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ ok: false, msg: "Something went wrong" });
  }
};

module.exports = getChat;
