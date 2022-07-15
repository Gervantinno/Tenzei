import React from "react";

export default React.memo(
  function Die(props) {
    const styles = {
      backgroundColor: props.isPressed ? "#26A330" : "#e9e9e9",
    };
    console.log("render die");
    return (
      <div
        className="die"
        style={styles}
        onClick={() => props.clickHandler(props.id)}
      >
        <span>{props.value}</span>
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (
      prevProps.isPressed === nextProps.isPressed &&
      prevProps.value === nextProps.value
    )
      return true;
    return false;
  }
);
