import { Comment } from '../models/Comment';
import employeeService from './employeeService';

const addComment = async (empId, empType, comment, author) => {
  const employee = await employeeService.getEmployeeById(empId, empType);

  if (employee.archived)
    throw new Error(
      `Employee ${employee.firstname} ${employee.lastname} is deleted.`
    );

  const employeeComment = new Comment({
    ...comment,
    date: new Date().toISOString().split('T')[0],
    author,
  });
  employee.comments.push(employeeComment);
  await employee.save();
  return employeeComment;
};

export default { addComment };
