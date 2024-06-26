import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import PageNavigator from "./PageNavigator";
import PageHeader from "./Common/PageHeader";
import { store } from "./Store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PageHeader />
        <PageNavigator />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
