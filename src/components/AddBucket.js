import React, { useState } from "react";
import { Card, Col, Row, Button, Modal, Input, Form } from "antd";
import VideoCard from "./VideoCard";
import Buckets from "./Buckets";
function AddBucket() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState([]);
  const [cardForm] = Form.useForm();
  let bucketId = 0;
  const showModal = () => {
    // bucketId = id;
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    setCardDetails([
      ...cardDetails,
      { videoName: values.videoName, videoLink: values.videoLink },
    ]);
    // let newCardId = bucketId + 1;
    let currBucketIdx = Buckets.indexOf(
      Buckets.find((element) => {
        return element.id === bucketId;
      })
    );
    Buckets[currBucketIdx].cards.push({
      id: Buckets[currBucketIdx].cards.length + 1,
      videoName: values.videoName,
      videoLink: values.videoLink,
    });
    console.log("currBucket", Buckets[currBucketIdx]);
    cardForm.resetFields();
    handleCancel();
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function currBucketIdSetter(id) {
    bucketId = id;
  }

  return (
    <>
      <Row className="bucketRow" gutter={16} style={{ padding: "15px" }}>
        {Buckets.map((val, i) => (
          <Col span={10} key={val.id}>
            <Card
              title={val.title}
              extra={
                <Button
                  type="primary"
                  onClick={showModal}
                  onChange={currBucketIdSetter(val.id)}
                >
                  Add New Card
                </Button>
              }
              bordered={false}
              key={val.id}
            >
              <VideoCard cardDetails={val}></VideoCard>
            </Card>
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
          layout="vertical"
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
              Add Card
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default AddBucket;
