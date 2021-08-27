import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import { editTask } from '../services/TodoService'

export default function EditTaskModal({task, taskEdited}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
      editTask(data).then(response => {
        taskEdited(response);
        setShow(false);
    });
    };
  
    return (
      <>
        <Button variant="warning" onClick={handleShow}>
          Edit
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Task Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="form-group col-md-3">
                  <label for="taskId">Id</label>
                  <input type="text" className="form-control" defaultValue={task.id} {...register('value_name')} name="id" id="id" disabled />
                </div>

            </div>
            <div className="row">
                <div className="form-group col-md-6">
                    <label for="task">Task</label>
                    <input type="text" className="form-control" defaultValue={task.task} {...register('value_name')} name="task" id="task" placeholder="Create a Task" />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-md-6">
                    <label for="assignee">Assignee</label>
                    <input type="text" className="form-control" defaultValue={task.assignee} {...register('value_name')} name="assignee" id="assignee" placeholder="Assignee" />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-md-6">
                    <label for="status">Status:</label>
                    <select name="status" defaultValue={task.status} {...register('value_name')} className="form-control" id="status">
                        <option>To Be Done</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>
                </div>
            </div>
            <div className="btncenter">
              <input type="submit" className="btn btn-danger" />
            </div>
            </form>
          </Modal.Body>
          
        </Modal>
      </>
    );
}