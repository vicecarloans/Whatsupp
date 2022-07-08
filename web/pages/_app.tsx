import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import store from "../redux/store";
import { Provider } from "react-redux";
import AppLayout from "../components/AppLayout";

function MyApp(props: AppProps) {
    return (
        <Provider store={store}>
            <AppLayout {...props} />
        </Provider>
    );
}

export default MyApp;
