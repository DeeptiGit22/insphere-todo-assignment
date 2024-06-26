import React, { useState } from "react";
import EditTodoModal from "./EditTodoModal";
import ViewTodoModal from "./ViewTodoModal";
import View from "../../../assets/icons8-eye-60.png";
import Edit from "../../../assets/icons8-edit-64.png";
import Delete from "../../../assets/icons8-delete-60.png";
import envelope from "../../../assets/envolope.gif";
import { useAppContext } from "../../authentication/hooks/useAppContext";
import { useTodoList } from "../hooks/useToDoListContext";

function TodoList() {
	const { loggedIn } = useAppContext();
	const { todoTasks, editToDoTask, deleteTask } = useTodoList();
	const [editTask, setEditTask] = useState(null);
	const [viewTask, setViewTask] = useState(null);
	const [editModal, setEditModal] = useState(false);
	const [viewModal, setViewModal] = useState(false);

	const toggleEditModal = () => {
		setEditModal(!editModal);
	};

	const toggleViewModal = () => {
		setViewModal(!viewModal);
	};

	// Function to handle edit action
	const handleEdit = (task) => {
		setEditTask(task);
		toggleEditModal(); // Open edit modal
	};

	// Function to handle view action
	const handleView = (task) => {
		setViewTask(task);
		toggleViewModal(); // Open view modal
	};

	// Function to handle delete action
	const handleDelete = (taskToDelete) => {
		deleteTask(taskToDelete);
	};

	return (
		<div className='container mt-2'>
			{todoTasks.length > 0 && (
				<h2 className='heading text-center'>To-Do List</h2>
			)}
			{todoTasks.length > 0 ? (
				<ul className='list-group mt-4'>
					{todoTasks.map((task, index) => (
						<li
							key={index}
							className='list-group-item list-group-item d-flex justify-content-between align-items-center'>
							<span className='text-capitalize fw-bold'>{task.title}</span>
							<div className='d-flex'>
								<img
									src={View}
									alt=''
									onClick={() => handleView(task)}
									className='icon icon-addOn'
									data-bs-toggle='tooltip'
									data-bs-placement='top'
									title='View Task'
								/>
								{loggedIn && (
									<div>
										<div className='d-flex'>
											<img
												src={Edit}
												alt=''
												onClick={() => handleEdit(task)}
												className='icon  icon-addOn'
												data-bs-toggle='tooltip'
												data-bs-placement='top'
												title='Edit Task'
											/>
											<img
												src={Delete}
												alt=''
												onClick={() => handleDelete(task)}
												className='icon  icon-addOn'
												data-bs-toggle='tooltip'
												data-bs-placement='top'
												title='Delete Task'
											/>
										</div>
									</div>
								)}
							</div>
						</li>
					))}
				</ul>
			) : (
				<div className='card-body text-center d-flex flex-column align-items-center'>
					<img src={envelope} alt='Ops Something went wrong' width={150} />
					<h2>You have no tasks</h2>
					<h3>Add New</h3>
				</div>
			)}

			{/* Render EditTodoModal if editTask is not null */}
			{editModal && (
				<div className={`modal ${editModal ? "active-modal" : ""}`}>
					<div onClick={toggleEditModal} className='overlay'></div>
					<div className='modal-content'>
						{editTask && (
							<EditTodoModal task={editTask} modal={toggleEditModal} />
						)}
					</div>
				</div>
			)}
			{viewModal && (
				<div className={`modal ${viewModal ? "active-modal" : ""}`}>
					<div onClick={toggleViewModal} className='overlay'></div>
					<div className='modal-content'>
						{viewTask && (
							<ViewTodoModal task={viewTask} modal={toggleViewModal} />
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default TodoList;
