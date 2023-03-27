import React, { useState } from "react";
import { Card, Col, Row, Button, Modal, Input, Form } from "antd";
function AddBucket(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState([]);
  const [cardForm] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(props.inputField);

  const onFinish = (values) => {
    setCardDetails([...cardDetails, { title: values.title }]);
    cardForm.resetFields();
    handleCancel();
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Row className="bucketRow" gutter={16} style={{ padding: "15px" }}>
        {[{ title: "env" }, { title: "edsdas" }].map((val, i) => (
          <Col span={8} key={i}>
            <Card
              title={val.title}
              extra={
                <Button type="primary" onClick={showModal}>
                  Add New Card
                </Button>
              }
              bordered={false}
              key={i}
            ></Card>
          </Col>
        ))}
      </Row>
      <Modal
        title="Enter Card Details"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="card"
          form={cardForm}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="videoName"
            label="Video Name"
            rules={[
              {
                required: true,
                message: "Please enter video Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="videoLink"
            label="Video Link"
            rules={[
              {
                required: true,
                message: "Please enter video link!",
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
    </>
  );
}
export default AddBucket;
