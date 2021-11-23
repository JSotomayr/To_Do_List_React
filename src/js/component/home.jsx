import React, { useEffect, useState } from "react";
import Task from "./task.jsx";

const URL = "https://assets.breatheco.de/apis/fake/todos/user/JSotomayr";

const Home = () => {
	const [list, setList] = useState([]);
	const [listComponent, setListComponent] = useState([]);
	const [failOnUpdating, setFailOnUpdating] = useState("");
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		fetch(URL)
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Fail");
			})
			.then(responseAsJSON => {
				setUpdate(false);
				setList(responseAsJSON);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		if (list.lenght != 0) {
			fetch(URL, {
				method: "PUT",
				body: JSON.stringify(list),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => {
					if (response.ok) {
						setUpdate(false);
					} else {
						throw new Error("Failed updating new task");
					}
				})
				.catch(error => {
					setFailOnUpdating(error.message);
				});
		}
	}, [update]);

	useEffect(() => {
		setListComponent(
			list.map((task, index) => {
				return (
					<Task
						label={task.label}
						done={task.done}
						key={index.toString()}
						id={index.toString()}
						clear={clearFunc}
						check={check}
					/>
				);
			})
		);
	}, [list]);

	const clearFunc = identifyer => {
		setList(list.filter((_, index) => index != identifyer));
		setUpdate(true);
	};

	const check = identifyer => {
		setList(list.filter((_, index) => index != identifyer));
	};

	return (
		<div className="main">
			<h1 className="header">What else is there to do?</h1>
			{!failOnUpdating && <h1>{failOnUpdating}</h1>}
			<div classNam="todolist">
				<form
					method="POST"
					onSubmit={event => {
						event.preventDefault();
						setUpdate(true);
						setList([
							...list,
							{
								label: document.querySelector("input").value,

								done: false
							}
						]);
						document.querySelector("input").value("");
					}}>
					<input type="text" placeholder="New task" />
				</form>
				<ul>{listComponent}</ul>
			</div>
		</div>
	);
};

export default Home;
