import type { NextPage } from "next";
import ChatView from "../components/ChatView";
import UserInputView from "../components/UserInputView";
import { selectChannel, selectCurrentUser } from "../redux/chat/selectors";
import { useAppSelector } from "../redux/hooks";

const Home: NextPage = () => {
    const currentUser = useAppSelector(selectCurrentUser);
    const channel = useAppSelector(selectChannel);
    if (!currentUser) {
        return <UserInputView />;
    }

    if (!channel) {
        return (
            <div>
                Hello {currentUser.username}. Please select to join a channel in
                the left bar
            </div>
        );
    }

    return <ChatView />;
};

export default Home;
