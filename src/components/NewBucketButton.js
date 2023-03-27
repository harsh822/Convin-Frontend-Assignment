import "./NewBucketButton.css";
import AddBucket from "./AddBucket";
import React, { useState } from "react";
import { Button, Modal, Input, Form, Card } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
function NewBucketButton() {
  const Buckets = [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputField, setInputField] = useState([]);
  const [bucket, setBuckets] = useState([]);
  const [bucketForm] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    setInputField([...inputField, { title: values.title }]);
    // let input = JSON.parse(localStorage.getItem("inputFields")) || [];
    // console.log("Input", input, typeof input);
    // input.push({ title: values.title });
    // localStorage.setItem("inputFields", JSON.stringify(input));
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
      <Modal
        title="Enter Bucket title"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
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
      <AddBucket inputField={inputField}></AddBucket>
    </>
  );
}

export default NewBucketButton;
