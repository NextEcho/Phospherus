import { RouterProvider } from "react-router-dom";
import router from "@/router/index.tsx";

const App = () => {
    return (
        <RouterProvider
            router={router}
            fallbackElement={<p>Performing initial data load</p>}
        ></RouterProvider>
    );
};

export default App;
