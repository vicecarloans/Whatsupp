import { Button, Form, Input, Space } from "antd";
import React, { useEffect } from "react";
import { setCurrentUser } from "../redux/chat";
import { useAppDispatch } from "../redux/hooks";
import { useAddNewUserMutation } from "../redux/users";

export interface IUserForm {
    username: string;
    picture?: string;
}
const UserInputView = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [addNewUser, { isLoading, data }] = useAddNewUserMutation();
    const submitUser = (values: IUserForm) => {
        void addNewUser(values);
    };

    useEffect(() => {
        if (data) {
            dispatch(setCurrentUser({ currentUser: data }));
        }
    }, [data]);

    return (
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Form form={form} onFinish={submitUser}>
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Enter your username..." />
                </Form.Item>
                <Form.Item name="picture" label="Picture URL">
                    <Input placeholder="Enter url of your picture..." />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={isLoading}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Space>
    );
};

export default UserInputView;
