import React, { useState } from "react";
import "./VideoCard.css";
import Buckets from "./Buckets";
import { Card, Col, Row, Button, Modal, Input, Form, Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, SendOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { deleteBucketCard, updateBucketCard } from "../redux/BucketSlice";
import $ from "jquery";
const { Meta } = Card;
function VideoCard(props) {
  const dispatch = useDispatch();
  const bucketList = useSelector((state) => state.buckets.value);

  console.log("BucketList", bucketList);

  const [videoDetails, setVideoDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateIsModalOpen] = useState(false);
  const [updateBucketId, setUpdateBucketId] = useState();
  const [updateCardId, setUpdateCardId] = useState();
  const [cardForm] = Form.useForm();

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];

  function urlToThumbnailConvertor(url) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    console.log("MAtch", url);
    var match = url && url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  const showModal = () => {
    setIsModalOpen(true);
    $("#ytplayer").attr("src", videoDetails.videoLink);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    stopPlaying();
  };
  const handleOk = () => {
    setIsModalOpen(false);
    stopPlaying();
  };
  const showUpdateModal = () => {
    setUpdateIsModalOpen(true);
  };
  const handleUpdateCancel = () => {
    setUpdateIsModalOpen(false);
  };
  function stopPlaying() {
    console.log("STOPPP Playing");
    $("#ytplayer").attr("src", "");
  }
  function updateCard(cardId, bucketId) {
    console.log("cardId", cardId, "bucketId", bucketId);
    setUpdateBucketId(bucketId);
    setUpdateCardId(cardId);
    showUpdateModal();
  }
  const onUpdateFinish = (values) => {
    console.log("VALUES", values);
    dispatch(updateBucketCard({ updateCardId, updateBucketId, values }));
    cardForm.resetFields();
    handleUpdateCancel();
    console.log("Success:", values);
  };

  const onUpdateFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Row className="bucketRow" gutter={16} style={{ padding: "15px" }}>
        {bucketList[props.bucketIdx].cards.map((val, i) => (
          <Col span={12} key={val.id} style={{ paddingBottom: "15px" }}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  height={130}
                  width={100}
                  alt="example"
                  src={`https://img.youtube.com/vi/${urlToThumbnailConvertor(
                    val.videoLink
                  )}/0.jpg`}
                  onClick={() => {
                    setVideoDetails({
                      id: val.id,
                      videoLink:
                        "https://www.youtube.com/embed/" +
                        val.videoLink.split("=")[1].split("&")[0],
                      videoName: val.videoName,
                    });
                    showModal();
                  }}
                />
              }
            >
              <div className="cardBottom">
                <Meta title={val.videoName} />
                <div>
                  <EditOutlined
                    style={{ color: "green" }}
                    onClick={() =>
                      updateCard(val.id, bucketList[props.bucketIdx].id)
                    }
                  />{" "}
                  &nbsp;
                  <DeleteOutlined
                    style={{ color: "red" }}
                    onClick={() => {
                      dispatch(
                        deleteBucketCard({
                          bucketId: bucketList[props.bucketIdx].id,
                          cardId: val.id,
                        })
                      );
                    }}
                  />
                  &nbsp;
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement="bottomLeft"
                    arrow
                  >
                    <SendOutlined style={{ color: "blue" }} />
                  </Dropdown>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Playing Video  */}
      <Modal
        title={videoDetails.videoName}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        id="videoModal"
      >
        <div className="iframeDiv">
          <iframe
            width="470"
            height="315"
            src={videoDetails.videoLink}
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            id="ytplayer"
          ></iframe>
        </div>
      </Modal>

      {/* Modal for update card details  */}
      <Modal
        title="Update Card Details"
        open={isUpdateModalOpen}
        onCancel={handleUpdateCancel}
        footer={null}
      >
        <Form
          name="card"
          form={cardForm}
          onFinish={onUpdateFinish}
          onFinishFailed={onUpdateFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item name="videoName" label="Video Name">
            <Input />
          </Form.Item>
          <Form.Item name="videoLink" label="Video Link">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Update Card
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default VideoCard;
