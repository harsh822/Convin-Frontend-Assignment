import plusIcon from "../assets/plus.png";
import "./NewBucketButton.css";
function NewBucketButton() {
  const handleClick = () => {
    alert("Clicked");
  };
  return (
    <div className="container" onClick={handleClick}>
      <img src={plusIcon} alt="plusIcon" className="plusIconSize" />
      <h3>Create New Bucket</h3>
    </div>
  );
}

export default NewBucketButton;
