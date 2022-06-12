import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { convertToRaw, EditorState, convertToHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToMarkdown from "draftjs-to-markdown";
import { Interweave } from "interweave";

function Chat({ socket, username, roomID, connection }) {
  const [messageList, setMessageList] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const sendMessage = async () => {
    let message = draftToMarkdown(
      convertToRaw(editorState.getCurrentContent())
    );
    if (message === "") return;
    const messageData = {
      username,
      roomID,
      message,
      time: new Date().getHours() + ":" + new Date().getMinutes(),
    };
    await socket.emit("send_message", messageData);
    setMessageList((prevList) => [...prevList, messageData]);
  };
  const onEditorStateChange = (editorState) => {
    return setEditorState(editorState);
  };
  useEffect(() => {
    socket.on("recieve_message", (messageData) => {
      // console.log({ messageData });
      setMessageList((prevList) => [...prevList, messageData]);
    });
  }, [socket]);
  return (
    <div className="container App chatWindow">
      <div
        id="header"
        className="border border-primary rounded-top d-flex flex-row align-items-center"
      >
        <button
          onClick={() => connection(false)}
          className="btn btn-danger"
          style={{ position: "absolute" }}
        >
          Go Back
        </button>
        <div className="mx-auto fs-5 fw-bold text-white">Live Chat</div>
      </div>
      <div id="body" className="messageContainer">
        {messageList.map((messageData, index) => {
          return (
            <div
              style={{
                display: "flex",
                "flex-direction": "row",
                justifyContent:
                  messageData.username === username ? "flex-end" : "flex-start",
              }}
            >
              <div key={index} className="messageBox rounded">
                <div className="fw-bold text-start">{messageData.username}</div>
                <div className="text-end">
                  {/* <Interweave content={messageData.message} /> */}
                  {messageData.message}
                </div>
                <div className="text-muted text-end">{messageData.time}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div id="footer">
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName="wrapperClassName"
          toolbarStyle={{
            backgroundColor: "#282c34",
          }}
          editorStyle={{
            backgroundColor: "black",
            border: "1.5px solid white",
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            marginTop: -5,
            color: "white",
          }}
          mention={{
            separator: " ",
            trigger: "@",
            suggestions: [
              { text: "APPLE", value: "apple" },
              { text: "BANANA", value: "banana" },
              { text: "CHERRY", value: "cherry" },
              { text: "DURIAN", value: "durian" },
              { text: "EGGFRUIT", value: "eggfruit" },
              { text: "FIG", value: "fig" },
              { text: "GRAPEFRUIT", value: "grapefruit" },
              { text: "HONEYDEW", value: "honeydew" },
            ],
          }}
          toolbar={{
            options: [
              "inline",
              "link",
              "list",
              "blockType",
              "embedded",
              "emoji",
              "image",
            ],
            inline: {
              options: ["bold", "italic", "strikethrough"],
              // bold: { icon: bold, className: undefined },
            },
            blockType: {
              inDropdown: false,
              options: ["Blockquote", "Code"],
            },
            list: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: ["ordered", "unordered"],
              // unordered: { icon: unordered, className: undefined },
              // ordered: { icon: ordered, className: undefined },
              // indent: { icon: indent, className: undefined },
              // outdent: { icon: outdent, className: undefined },
            },
            link: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              popupClassName: undefined,
              dropdownClassName: undefined,
              showOpenOptionOnHover: true,
              defaultTargetOption: "_self",
              options: ["link"],
              // link: { icon: link, className: undefined },
              // unlink: { icon: unlink, className: undefined },
              linkCallback: undefined,
            },
            emoji: {
              // icon: emoji,
              className: undefined,
              component: undefined,
              popupClassName: undefined,
              emojis: [
                "😀",
                "😁",
                "😂",
                "😃",
                "😉",
                "😋",
                "😎",
                "😍",
                "😗",
                "🤗",
                "🤔",
                "😣",
                "😫",
                "😴",
                "😌",
                "🤓",
                "😛",
                "😜",
                "😠",
                "😇",
                "😷",
                "😈",
                "👻",
                "😺",
                "😸",
                "😹",
                "😻",
                "😼",
                "😽",
                "🙀",
                "🙈",
                "🙉",
                "🙊",
                "👼",
                "👮",
                "🕵",
                "💂",
                "👳",
                "🎅",
                "👸",
                "👰",
                "👲",
                "🙍",
                "🙇",
                "🚶",
                "🏃",
                "💃",
                "⛷",
                "🏂",
                "🏌",
                "🏄",
                "🚣",
                "🏊",
                "⛹",
                "🏋",
                "🚴",
                "👫",
                "💪",
                "👈",
                "👉",
                "👉",
                "👆",
                "🖕",
                "👇",
                "🖖",
                "🤘",
                "🖐",
                "👌",
                "👍",
                "👎",
                "✊",
                "👊",
                "👏",
                "🙌",
                "🙏",
                "🐵",
                "🐶",
                "🐇",
                "🐥",
                "🐸",
                "🐌",
                "🐛",
                "🐜",
                "🐝",
                "🍉",
                "🍄",
                "🍔",
                "🍤",
                "🍨",
                "🍪",
                "🎂",
                "🍰",
                "🍾",
                "🍷",
                "🍸",
                "🍺",
                "🌍",
                "🚑",
                "⏰",
                "🌙",
                "🌝",
                "🌞",
                "⭐",
                "🌟",
                "🌠",
                "🌨",
                "🌩",
                "⛄",
                "🔥",
                "🎄",
                "🎈",
                "🎉",
                "🎊",
                "🎁",
                "🎗",
                "🏀",
                "🏈",
                "🎲",
                "🔇",
                "🔈",
                "📣",
                "🔔",
                "🎵",
                "🎷",
                "💰",
                "🖊",
                "📅",
                "✅",
                "❎",
                "💯",
              ],
            },
            embedded: {
              // icon: embedded,
              className: undefined,
              component: undefined,
              popupClassName: undefined,
              embedCallback: undefined,
              defaultSize: {
                height: "auto",
                width: "auto",
              },
            },
            image: {
              // icon: image,
              className: undefined,
              component: undefined,
              popupClassName: undefined,
              urlEnabled: true,
              uploadEnabled: true,
              alignmentEnabled: true,
              uploadCallback: undefined,
              previewImage: false,
              inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
              alt: { present: false, mandatory: false },
              defaultSize: {
                height: "auto",
                width: "auto",
              },
            },
            remove: {
              // icon: eraser,
              className: undefined,
              component: undefined,
            },
            history: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: ["undo", "redo"],
              // undo: { icon: undo, className: undefined },
              // redo: { icon: redo, className: undefined },
            },
          }}
        />
        <button onClick={sendMessage} className="sendButton">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
