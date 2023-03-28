import "./NewBucketButton.css";
import AddBucket from "./AddBucket";
import React, { useState } from "react";
import { Button, Modal, Input, Form, Card } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { addBucket } from "../redux/BucketSlice";

function NewBucketButton() {
  const dispatch = useDispatch();
  const bucketList = useSelector((state) => state.buckets.value);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputField, setInputField] = useState([]);
  const [bucketForm] = Form.useForm();

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
    </>
  );
}

export default NewBucketButton;
