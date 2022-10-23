import { EMPLOYEE_TYPES } from "../constants/constants"
import { Comment } from "../models/Comment";
import { Employee } from "../models/Employee";
import { RegisteredEmployee } from "../models/RegisteredEmployee";

/**
 * Add comment to the employee.
 * Author is taken from the request data.
 * @param {*} empId 
 * @param {*} empType 
 * @param {*} comment 
 * @param {*} author 
 * @returns saved comment
 */
const addComment = async (empId, empType, comment, author) => {
    let employee;
    if(empType === EMPLOYEE_TYPES.REGISTERED) {
        employee = await RegisteredEmployee.findById(empId)
    } else {
        employee = await Employee.findById(empId);
    }

    if (employee.archived)
    throw new Error(
      `Employee ${employee.firstname} ${employee.lastname} is deleted.`
    );
    
    const employeeComment = new Comment({...comment, date: new Date().toISOString().split('T')[0], author})
    employee.comments.push(employeeComment);
    await employee.save();
    return employeeComment;
}

export default {addComment}