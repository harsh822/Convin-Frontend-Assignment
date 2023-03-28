import React, { useState } from "react";
import { Card, Col, Row, Button, Modal, Input, Form } from "antd";
import VideoCard from "./VideoCard";
import { useSelector, useDispatch } from "react-redux";
import { addCard } from "../redux/BucketSlice";
function AddBucket() {
  const dispatch = useDispatch();
  const bucketList = useSelector((state) => state.buckets.value);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState([]);
  const [bucketId, setBucketId] = useState(1);
  const [cardForm] = Form.useForm();
  const showModal = (bucketID) => {
    setBucketId(bucketID);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    console.log(
      "CARDSSSS",
      bucketList.filter((bucket) => bucket.id === bucketId),
      bucketId
    );
    dispatch(
      addCard({
        id: bucketId,
        card: {
          id:
            bucketList.filter((bucket) => bucket.id === bucketId)[0].cards
              .length + 1,
          videoName: values.videoName,
          videoLink: values.videoLink,
        },
      })
    );

    setCardDetails([
      ...cardDetails,
      { videoName: values.videoName, videoLink: values.videoLink },
    ]);
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
        {bucketList.map((bucket, i) => (
          <Col span={10} key={bucket.id}>
            <Card
              title={bucket.title}
              extra={
                <Button type="primary" onClick={() => showModal(bucket.id)}>
                  Add New Card
                </Button>
              }
              bordered={false}
              key={bucket.id}
            >
              <VideoCard bucketIdx={i}></VideoCard>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title="Enter Card Details"
        open={isModalOpen}
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
