import "./NewBucketButton.css";
import AddBucket from "./AddBucket";
import React, { useState } from "react";
import { Button, Modal, Input, Form, Card, Drawer } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { addBucket } from "../redux/BucketSlice";

function NewBucketButton() {
  const dispatch = useDispatch();
  const bucketList = useSelector((state) => state.buckets.value);
  const historyList = useSelector((state) => state.history.value);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputField, setInputField] = useState([]);
  const [open, setOpen] = useState(false);
  const [bucketForm] = Form.useForm();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    dispatch(
      addBucket({
        id:
          bucketList.length == 0 ? 1 : bucketList[bucketList.length - 1].id + 1,
        title: values.title,
        cards: [],
      })
    );

    setInputField([...inputField, { title: values.title }]);
    bucketForm.resetFields();
    handleCancel();
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="header">
        <Button type="primary" size="large" onClick={showModal}>
          Create New Bucket
          <PlusCircleOutlined />
        </Button>
        <Button type="primary" onClick={showDrawer}>
          Open History
        </Button>
      </div>
      <Modal title="Enter Bucket title" open={isModalOpen} footer={null}>
        <Form
          name="bucket"
          form={bucketForm}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Please enter Title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Add Bucket
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <AddBucket></AddBucket>

      {/* History Drawer  */}
      <Drawer
        title="History"
        placement="right"
        onClose={onClose}
        open={open}
        size={"large"}
      >
        <table>
          <tr>
            <th>Name</th>
            <th style={{ width: "30" }}>Url</th>
            <th>Time</th>
          </tr>
          {historyList.map((history, index) => {
            console.log("history", index, history);
            return (
              <tr key={index}>
                <td>{history.videoName}</td>
                <td>{history.videoLink}</td>
                <td>{history.currentTime}</td>
              </tr>
            );
          })}
        </table>
      </Drawer>
    </>
  );
}

export default NewBucketButton;
