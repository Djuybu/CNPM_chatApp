import Chat from "./components/chat/chat.tsx";
import List from "./components/List/list.tsx";
import Detail from "./components/detail/detail.tsx";
import Login from "./components/login/login.tsx";
const App = () => {
  const user = false

  return (
      <div className='container'>

        { user ? (
        <>
          <List/>
          <Chat/>
          <Detail/>
        </>
        ) : ( <Login /> )

        }
      </div>
  );
}
export default App