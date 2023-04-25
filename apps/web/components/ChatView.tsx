import React, { useEffect, useRef, useState } from "react";

import { Button, Col, Input, Row, Space, Typography } from "antd";
import { useAppSelector } from "../redux/hooks";
import { selectChannel, selectCurrentUser } from "../redux/chat/selectors";
import styles from "./styles.module.scss";
import { useGetMessagesQuery, useSendMessageMutation } from "../redux/messages";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const ChatView = () => {
    const channel = useAppSelector(selectChannel);
    const currentUser = useAppSelector(selectCurrentUser);
    const [message, setMessage] = useState("");

    const { data, isLoading, error } = useGetMessagesQuery({
        channelId: channel?.id ?? "",
    });

    const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

    // Controll scroll experience
    const bottomRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
        });
    });
    const renderMessages = () => {
        return data?.map((message) => {
            return (
                <div key={message.id} className={styles.userMessage}>
                    <Paragraph>
                        {message.sender.username} : {message.content}
                    </Paragraph>
                </div>
            );
        });
    };

    return (
        <Space direction="vertical">
            <Title>{channel?.name}</Title>
            <div className={styles.chatbox}>
                {isLoading && !error ? (
                    <Paragraph>Fetching messages...</Paragraph>
                ) : (
                    renderMessages()
                )}
                <div ref={bottomRef} />
            </div>
            <Row>
                <Col span={20}>
                    <TextArea
                        rows={4}
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                </Col>
                <Col span={4}>
                    <Button
                        onClick={() => {
                            sendMessage({
                                senderId: currentUser?.id ?? "",
                                channelId: channel?.id ?? "",
                                content: message,
                            });
                            setMessage("");
                        }}
                        disabled={isSending}
                    >
                        Send
                    </Button>
                </Col>
            </Row>
        </Space>
    );
};

export default ChatView;
