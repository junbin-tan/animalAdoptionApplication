import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import React, { useState, useEffect } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton,
  EllipsisButton,
  TypingIndicator,
  MessageSeparator,
  MessageGroup,
} from "@chatscope/chat-ui-kit-react";

import firebase, { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  Timestamp,
  query,
  where,
  onSnapshot,
  or,
  orderBy,
  and,
  limit,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import avatarIcon from "../../images/ava-06.png";
import Api from "../../helpers/Api";
import Auth from "../../helpers/Auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEJaFITDVmOhdgnpvfjJqDXGu-Sf_KpWE",
  authDomain: "pawfect-98b3f.firebaseapp.com",
  projectId: "pawfect-98b3f",
  storageBucket: "pawfect-98b3f.appspot.com",
  messagingSenderId: "44417486090",
  appId: "1:44417486090:web:31a693d3dc1244fded3ef3",
  measurementId: "G-FN8VQTS5Q0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

const ChatPage = () => {
  // Set initial message input value to an empty string
  const [messageInputValue, setMessageInputValue] = useState("");

  const [recipients, setReceipients] = useState([]);

  useEffect(() => {
    Api.getChatReceipients()
      .then((response) => response.json())
      .then((data) => setReceipients(data));
  }, []);

  const conversations = [];

  recipients &&
    recipients.map((data) => {
      const recipient = {
        _id: data.memberId,
        name: data.name,
        email: data.email,
        avatarSrc: avatarIcon,
      };
      conversations.push(recipient);
    });

  //   console.log(conversations);

  const [currentConversation, setCurrentConversation] = useState(0);

  const sendMessage = async (message) => {
    console.log(message);
    const chatObj = {
      user1: Auth.getUser().email,
      user2: currentConversation.email,
      message: message,
      createdAt: Timestamp.fromDate(new Date()),
    };
    console.log(chatObj);
    const docForStoring = chatObj.user1 + chatObj.user2 + chatObj.createdAt;
    await setDoc(doc(db, "chats", docForStoring), chatObj);

    setMessageInputValue(""); // empty message once sent
  };

  //   const q = query(
  //     collection(db, "chats"),
  //     and(
  //       or(
  //         where("user2", "==", String(Auth.getUser().email)),
  //         where("user2", "==", String(currentConversation.email))
  //       ),
  //       or(
  //         where("user1", "==", String(Auth.getUser().email)),
  //         where("user1", "==", String(currentConversation.email))
  //       ),
  //     ),
  //     orderBy("createdAt", "asc")
  //   );

  // const q = query(
  //   collection(db, "chats"),
  //   and(
  //     or(
  //       where("user2", "==", String(Auth.getUser().email)),
  //       where("user2", "==", String(currentConversation.email))
  //     ),
  //     or(
  //       where("user1", "==", String(Auth.getUser().email)),
  //       where("user1", "==", String(currentConversation.email))
  //     )
  //   ),
  // );

  const q = query(
    collection(db, "chats"),
    orderBy("createdAt", "asc")
    // and(
    //   or(
    //     where("user2", "==", String(Auth.getUser().email)),
    //     where("user2", "==", String(currentConversation.email))
    //   ),
    //   or(
    //     where("user1", "==", String(Auth.getUser().email)),
    //     where("user1", "==", String(currentConversation.email))
    //   )
    // ),
  );

  const [chatsData, loading, error] = useCollection(q, "hooks");

  const [finalMessages, setFinalMessages] = useState([]);

  const conversationRecipient = currentConversation && currentConversation.email;

  useEffect(() => {
    const messages = [];
    chatsData &&
      chatsData.docs
        .filter((doc) => {
          const user1 = String(doc.data().user1);
          const user2 = String(doc.data().user2);
          return ((user2 == String(Auth.getUser().email) || user2 == String(currentConversation.email)) && (user1 == String(Auth.getUser().email) || user1 == String(currentConversation.email)));
        })
        .map((doc) => {
          const sender =
            String(doc.data().user1) == Auth.getUser().email
              ? Auth.getUser().email
              : currentConversation.email;
          const direction =
            String(doc.data().user1) == Auth.getUser().email
              ? "outgoing"
              : "incoming";
          const messageObj = {
            _id: doc.data().createdAt,
            message: doc.data().message,
            sentTime: "15 mins ago",
            sender: sender,
            direction: direction,
            position: "single",
          };
          messages.push(messageObj);
          // setFinalMessages((messages) => messages.concat(messageObj));
        });
    setFinalMessages(messages);
  }, [chatsData, conversationRecipient]);

  const finalFinalMessages = [];

  for (let i = 0; i < finalMessages.length; i++) {
    finalFinalMessages.push(
      <Message
        key={i}
        model={{
          message: finalMessages[i].message,
          sender: finalMessages[i].sender,
          direction: finalMessages[i].direction,
          position: finalMessages[i].position,
        }}
      />
    );
  }

  //   const finalFinalMessages = [];
  //   finalMessages &&
  //     finalMessages.map((data) => {
  //       finalFinalMessages.push(data);
  //     });

  // messages && messages.map((msg) => console.log(msg));

  //   useEffect(() => {
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       const chats = [];
  //       setFinalMessages((finalMessages) =>
  //         finalMessages.concat(querySnapshot.docs.map((doc) => doc.data()))
  //       );
  //       //   querySnapshot.forEach((doc) => {
  //       //     chats.push(doc.data());
  //       //     // console.log(doc.data());

  //       //   });
  //       // console.log("Current cities in CA: ", chats.join(", "));
  //     });
  //   }, []);

  //   const test = [];
  //   const msgObj = {
  //     message: "Hello my friend",
  //     sentTime: "15 mins ago",
  //     sender: "Zoe",
  //     direction: "incoming",
  //     position: "single",
  //   };

  //   // important to load messages
  //   test.push(
  //     <Message
  //       key={1}
  //       model={{
  //         message: `Message ${1}`,
  //         sender: "Zoe",
  //       }}
  //     />
  //   );

  return (
    <div
      style={{
        height: "600px",
        position: "relative",
      }}
    >
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}>
          <Search placeholder="Search..." />
          <ConversationList>
            {conversations &&
              conversations.map((c) => (
                <Conversation
                  key={c._id}
                  name={c.name}
                  onClick={() => setCurrentConversation(c)}
                >
                  <Avatar name={c.name} src={c.avatarSrc} />
                </Conversation>
              ))}
          </ConversationList>
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src={avatarIcon} name="Zoe" />
            <ConversationHeader.Content
              userName={currentConversation.name}
              info="Active 10 mins ago"
            />
            <ConversationHeader.Actions>
              <VoiceCallButton />
              <VideoCallButton />
              <EllipsisButton orientation="vertical" />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList>
            <MessageSeparator content="Saturday, 30 November 2019" />
            {finalFinalMessages}
            {/* {conversations &&
              conversations.map((data) => {
                <Message
                  model={{
                    message: "Hello my friend",
                    sentTime: "15 mins ago",
                    sender: "Eliot",
                    direction: "incoming",
                    position: "first",
                  }}
                  avatarSpacer={true}
                />;
              })} */}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
            onSend={(val) => sendMessage(val)}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatPage;
