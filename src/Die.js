import React from "react";

export default function Die(props) {
	const styles = {
		backgroundColor: props.isPressed ? "#26A330" : "#e9e9e9",
	};

	return (
		<div
			className="die"
			style={styles}
			onClick={() => props.clickHandler(props.id)}
		>
			<span>{props.value}</span>
		</div>
	);
}
