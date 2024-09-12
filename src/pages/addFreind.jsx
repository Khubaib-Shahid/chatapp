import {
  MainContainer,
  Sidebar,
  Button,
  Avatar,
  ConversationList,
  MessageSeparator,
  Conversation,
} from "@chatscope/chat-ui-kit-react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosChatbubbles } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import {
  getDocs,
  db,
  collection,
  query,
  where,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  onSnapshot,
} from "../config/firebase";
import { useContext, useEffect, useState } from "react";
import { ActiveData } from "../config/context";
import DP from "../assets/default-profile.png";

function AddFreinds() {
  const [friends, setFriends] = useState([]);

  const [requestData, setRequestData] = useState([]);

  const user = useContext(ActiveData);

  const navigate = useNavigate();

  async function sentFriend(id) {
    await updateDoc(doc(db, "Requests", id), {
      requests : arrayUnion(user.uid),
    });
    await updateDoc(doc(db, "Requests", user.uid), {
      sent : arrayUnion(id)
    })
    getFr();
  }

  async function cancelReq(id) {
    await updateDoc(doc(db, "Requests", id), {
      requests: arrayRemove(user.uid),
    });
    await updateDoc(doc(db, "Requests", user.uid), {
      sent : arrayRemove(id)
    })
    getFr();
  }

  async function cancelFr(id) {
    await updateDoc(doc(db, "Requests", user.uid), {
      requests: arrayRemove(id),
    });
    await updateDoc(doc(db, "Requests", id), {
      sent : arrayRemove(user.uid)
    })
    getReq();
  }

  async function acceptReq(v) {
    await updateDoc(doc(db, "Users", user.uid), {
      requests: arrayRemove(v.uid),
      friends: arrayUnion(v.uid),
    });
    getReq();
    await updateDoc(doc(db, "Users", v.uid), {
      friends: arrayUnion(user.uid),
    });
  }

  async function getFr() {
    let arr = [];
    let q = query(collection(db, "Users"), where("uid", "!=", user.uid));
    let querySnap = await getDocs(q);
    querySnap.forEach(async (v) => {
      if (!user.friends.includes(v.data().uid)) {
        arr.push(v.data());
      }
    });
    setFriends(arr);  
    console.log(friends, "freinds");
  }

  async function getReq() {
    let arr = [];
    const docRef = doc(db, "Requests", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setRequestData({...docSnap.data()})
    }
  }

  useEffect(() => {
    getFr();
    getReq();
    console.log(requestData)
  }, []);

  return (
    <MainContainer
      responsive
      style={{
        height: "100svh",
      }}
    >
      <Sidebar
        position="left"
        style={{ maxWidth: "50px", alignItems: "center", paddingTop: "10px" }}
      >
        <Button>
          <GiHamburgerMenu size={20} />
        </Button>
        <Button style={{ marginTop: "10px" }}>
          <Avatar
            size="sm"
            src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
          ></Avatar>
        </Button>
        <Button onClick={() => navigate("/chat")} style={{ marginTop: "10px" }}>
          <IoIosChatbubbles size={23} />
        </Button>
        <Button
          onClick={() => navigate("/friends")}
          style={{ marginTop: "10px" }}
        >
          <FaUserFriends size={23} />
        </Button>
        <Button style={{ marginTop: "10px" }}>
          <FaGear size={23} />
        </Button>
      </Sidebar>
      <div className=" w-full flex flex-col">
        <div className="px-10 h-24 py-5 border-b-2 border-gray-300 w-full flex justify-around items-center ">
          <FaUserFriends style={{ color: "rgb(59 130 246 / 50%)" }} size={40} />
          <div className="w-5/6 relative">
            <CiSearch size={25} className="absolute top-2 left-2" />
            <input
              className="w-full rounded-md ps-10"
              placeholder="Search..."
              type="search"
            />
          </div>
          <Button>Search</Button>
        </div>
        <ConversationList>
          <div className="p-5">
            <h1 className="text-xl font-bold">Friend Request</h1>
            {requestData?.requests?.map((v) => (
              <div
                key={v.uid}
                className="border border-gray-400 w-11/12 h-20 flex justify-between items-center px-5 rounded-md my-3 mx-auto"
              >
                <div className="flex gap-3">
                  <img width={50} src={DP} />
                  <div>
                    <h2 className="text-lg">{v.username}</h2>
                    <p className="text-sm m-0">{v.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      acceptReq(v);
                    }}
                    className="bg-blue-500 active:opacity-70 hover:bg-blue-600 py-2 px-3 rounded-md text-white"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => {
                      cancelFr(v.uid);
                    }}
                    className="bg-red-400 active:opacity-70 hover:bg-red-500 py-2 px-3 rounded-md text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
          <MessageSeparator children="Others" />

          {friends.map((v, i) => {
            return (
              <div
                key={v.uid}
                className="border border-gray-400 w-11/12 h-20 flex justify-between items-center px-5 rounded-md my-3 mx-auto"
              >
                <div className="flex gap-3">
                  <img width={50} src={DP} />
                  <div>
                    <h2 className="text-lg">{v.username}</h2>
                    <p className="text-sm m-0">{v.email}</p>
                  </div>
                </div>
                <div>
                  {requestData.sent?.includes(v.uid) ? (
                  <div className="flex items-center gap-3">
                    <p>Pending...</p>
                    <button
                      onClick={() => {
                        cancelReq(v.uid);
                      }}
                      className="bg-red-400 active:opacity-70 hover:bg-red-500 py-2 px-3 rounded-md text-white"
                    >
                      Cancel
                    </button>
                  </div>)
                  :
                  (<button
                    onClick={() => {
                      sentFriend(v.uid);
                    }}
                    className="bg-blue-500 active:opacity-70 hover:bg-blue-600 py-2 px-3 rounded-md text-white"
                  >
                    Add Friend
                  </button>
                  )}
                </div>
              </div>
            );
          })}
        </ConversationList>
      </div>
    </MainContainer>
  );
}

export default AddFreinds;
