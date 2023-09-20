
import { Provider } from "react-redux";
import store from "./Reducers/Store/index"
import Main from "./Views/MainSite/Main";

function App() {
  return (
    <Provider store={store}>
    <div>
      <Main></Main>
    </div>
    </Provider>
  );
}

export default App;
