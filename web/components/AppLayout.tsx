import React, { useMemo, useState } from "react";
import { Button, Layout, Menu, Skeleton, Typography } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AppProps } from "next/app";

import { useListChannelsQuery } from "../redux/channels";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { initiateChat } from "../redux/chat";
import { selectChannel } from "../redux/chat/selectors";

const { Header, Content, Footer, Sider } = Layout;

const { Title } = Typography;
const AppLayout = ({ Component, pageProps }: AppProps) => {
    const { data, error, isLoading } = useListChannelsQuery({});
    const selectedChannel = useAppSelector(selectChannel);

    const dispatch = useAppDispatch();
    const menuItems = useMemo(() => {
        return data?.map((channel) => ({
            key: channel.id,
            label: channel.name,
        }));
    }, [data]);

    const selectedMenuItem = useMemo(() => {
        return data?.find((channel) => channel.id === selectedChannel?.id);
    }, [selectedChannel]);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider>
                {isLoading ? (
                    <Skeleton.Avatar active={true} />
                ) : (
                    <Menu
                        theme="dark"
                        mode="inline"
                        items={menuItems}
                        selectedKeys={[selectedMenuItem?.id ?? ""]}
                        onClick={(e) => {
                            const channel = data?.find(
                                (channel) => channel.id === e.key
                            );
                            if (channel) {
                                dispatch(
                                    initiateChat({
                                        channel,
                                    })
                                );
                            }
                        }}
                    />
                )}
            </Sider>

            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{ padding: 0 }}
                ></Header>
                <Content style={{ padding: 20 }}>
                    <Component {...pageProps} />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
