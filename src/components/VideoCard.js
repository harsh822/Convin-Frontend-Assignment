import React, { useState } from "react";
import "./VideoCard.css";
import { Card, Col, Row, Button, Modal, Input, Form } from "antd";
import $ from "jquery";
const { Meta } = Card;
function VideoCard(props) {
  const [videoDetails, setVideoDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("cardDetails", props);
  function youtube_parser(url) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    console.log("MAtch", url);
    var match = url.match(regExp);
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
  function stopPlaying() {
    console.log("STOPPP Playing");
    $("#ytplayer").attr("src", "");
  }
  return (
    <>
      <Row className="bucketRow" gutter={16} style={{ padding: "15px" }}>
        {props.cardDetails.map((val, i) => (
          <Col span={12} key={i} style={{ paddingBottom: "15px" }}>
            <Card
              hoverable
              style={{ width: 240 }}
              onClick={() => {
                setVideoDetails({
                  videoLink:
                    "https://www.youtube.com/embed/" +
                    val.videoLink.split("=")[1].split("&")[0],
                  videoName: val.videoName,
                });
                showModal();
              }}
              cover={
                <img
                  height={130}
                  width={100}
                  alt="example"
                  src={`https://img.youtube.com/vi/${youtube_parser(
                    val.videoLink
                  )}/0.jpg`}
                />
              }
            >
              <Meta title={val.videoName} />
            </Card>
          </Col>
        ))}
      </Row>
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
    </>
  );
}
export default VideoCard;
