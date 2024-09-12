import {
  ConversationHeader,
  Avatar,
  Button
} from "@chatscope/chat-ui-kit-react";
import { useContext, useEffect, useState } from "react";
import { ActiveData, User } from "../config/context";
import { getDoc, doc, db, auth, signOut } from "../config/firebase";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function HomeHeader() {
  let activeUser = useContext(ActiveData);
  let navigate = useNavigate();
 const context = useContext(User);

  function logOut() {
    signOut(auth).then(() => {
      console.log("logout")
      navigate("/login")
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  let [name, setName] = useState("")

  // async function getData() {
  //   const docRef = doc(db, "Users", activeUser.uid);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //     setName(docSnap.data().username)
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // }

  useEffect(() => {
    console.log(context)
    setName(activeUser.username)
  }, []);

  return (
    <ConversationHeader>
      <Avatar
        name="Emily"
        src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
      />
      <ConversationHeader.Content userName={name} />
      <ConversationHeader.Actions>
        <Button onClick={() => {logOut()}}><FiLogOut size={22} /></Button>
      </ConversationHeader.Actions>
    </ConversationHeader>
  );
}

export default HomeHeader;
