import React from "react";
import PropTypes from "prop-types";

const Task = props => {
	return (
		<li>
			{props.label}
			<div className="buttons">
				<button
					className="check-button"
					onClick={() => props.check(props.id)}>
					<i className="fas fa-check"></i>
				</button>

				<button
					className="ex-button"
					onClick={() => props.clear(props.id)}>
					<i className="fas fa-times"></i>
				</button>
			</div>
		</li>
	);
};

Task.propTypes = {
	label: PropTypes.string,
	id: PropTypes.string,
	done: PropTypes.bool,
	clear: PropTypes.func,
	check: PropTypes.func
};

export default Task;
