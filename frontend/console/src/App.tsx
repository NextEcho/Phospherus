import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
    return (
        <RouterProvider
            router={router}
            fallbackElement={<p>Performing initial data load</p>}
        ></RouterProvider>
    );
}

export default App;
