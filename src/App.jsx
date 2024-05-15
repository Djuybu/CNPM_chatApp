import Chat from "./components/chat/chat.tsx";
import List from "./components/List/list.tsx";
import Detail from "./components/detail/detail.tsx";
import Login from "./components/login/login.tsx";
import Notification from "./components/noti/Notification.tsx";
import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./database/firebase";
import {useUserStore} from "./database/userStore.js";
const App = () => {

    const { currentUser, isLoading, fetchUserInfo } = useUserStore();

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            fetchUserInfo(user?.uid);
        });

        return () => {
            unSub();
        };
    }, [fetchUserInfo]);
    console.log(currentUser);
    if (isLoading) return <div className="loading">Loading...</div>;
  return (
      <div className='container'>

        { currentUser ? (
        <>
          <List/>
          <Chat/>
          <Detail/>
        </>
        ) : ( <Login /> )

        }
        <Notification/>
      </div>
  );
}
export default App