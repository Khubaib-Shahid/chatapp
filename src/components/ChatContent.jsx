import {
  ChatContainer,
  ConversationHeader,
  Message,
  MessageList,
  MessageSeparator,
  Avatar,
  MessageInput,
  TypingIndicator,
  Sidebar,
  MainContainer,
  Search,
  ConversationList,
  Conversation,
  VoiceCallButton,
  VideoCallButton,
  Button
} from "@chatscope/chat-ui-kit-react";
import HomeHeader from "./HomeHeader";
import { useState, useEffect, useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosChatbubbles } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ActiveData } from "../config/context";
import DP from "../assets/default-profile.png"

function HomeContainer() {

  const navigate = useNavigate()

  const user = useContext(ActiveData);

  const [mess, setMess] = useState([
    {
      direction: "incoming",
      message: "Hello my friend",
      position: "single",
      sender: "Zoe",
      sentTime: "15 mins ago",
    },
  ]);

  let arr = [
    {
      name: "lilly",
      profilePic:
        "https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg",
      status: "available",
      lastMessage: "ok bye",
      lastSender: "lilly",
      active: false
    },
    {
      name: "patrick",
      profilePic:
        "https://chatscope.io/storybook/react/assets/patrik-yC7svbAR.svg",
      status: "unavailable",
      lastMessage: "hello i'm patrick",
      lastSender: "patrick",
      active: false
    },
  ];

  let [chatters, setChatters] = useState(arr);

  function selectedFun(v, i) {
    let mod = [...arr]
    mod.splice(i, 1, {
      name: v.name,
      profilePic: v.profilePic,
      status: v.status,
      lastMessage: v.lastMessage,
      lastSender: v.lastSender,
      active: true
    })
    setChatters(mod)
  }

  

  useEffect(() => {
  }, [])

  return (
    <MainContainer
      responsive
      style={{
        height: "100svh",
      }}
    >
      <Sidebar position="left" style={{maxWidth : "50px", alignItems : "center", paddingTop : "10px" }}>
        <Button><GiHamburgerMenu size={20} /></Button>
        <Button style={{marginTop : "10px"}}><Avatar size="sm"  src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"></Avatar></Button>
        <Button onClick={() => navigate("/chat")} style={{marginTop : "10px"}}><IoIosChatbubbles size={23} /></Button>
        <Button onClick={() => navigate("/friends")} style={{marginTop : "10px"}}><FaUserFriends size={23} /></Button>
        <Button style={{marginTop : "10px"}}><FaGear size={23} /></Button>
      </Sidebar>
      <Sidebar position="left">
        <HomeHeader></HomeHeader>
        <Search placeholder="Search..." />
        <ConversationList>
          {user.friends.map((v, i) => (
            <Conversation
            onClick={() => {selectedFun(v, i)}}
            // active={v.active}
            key={v.uid}
              info={"hello"}
              lastSenderName={v.username}
              name={v.username}
            >
              <Avatar name={v.username} src={DP} status={"available"} />
            </Conversation>
          ))}
        </ConversationList>
      </Sidebar>
      <ChatContainer>
        <ConversationHeader>
          <ConversationHeader.Back />
          <Avatar
            name="Zoe"
            src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
          />
          <ConversationHeader.Content
            info="Active 10 mins ago"
            userName="Zoe"
          />
          <ConversationHeader.Actions>
            <VoiceCallButton style={{fontSize: "1.2em", padding : "3px 10px"}} border />
            <VideoCallButton style={{fontSize: "1.2em", padding : "3px 10px"}} border />
          </ConversationHeader.Actions>
        </ConversationHeader>
        <MessageList
          typingIndicator={<TypingIndicator content="Zoe is typing" />}
        >
          {mess.map((v, i) => <Message
          key={i}
            model={{
              direction: v.direction,
              message: v.message,
              position: v.position,
              sender: v.sender,
              sentTime: v.sentTime,
            }}
          >
          </Message>)}
        </MessageList>
        <MessageInput
          onSend={(e) => {
            setMess([...mess, {
              direction: 'outgoing',
          message: e,
          position: 'single',
          sender: 'Emily',
          sentTime: "just now",
            }])
          }}
          placeholder="Type message here"
        />
      </ChatContainer>
    </MainContainer>
  );
}

export default HomeContainer;
