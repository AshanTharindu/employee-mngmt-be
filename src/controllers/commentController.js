import commentService from '../services/commentService';

export const addComment = async (req, res) => {
  try {
    const {
      body,
      query: { empType },
      params: { empId },
      user
    } = req;
    const registeredEmployee = await commentService.addComment(
      empId,
      empType,
      body,
      user
    );
    res.status(201).send(registeredEmployee);
  } catch (err) {
    console.log(err);
    res.json({ msg: err.message });
  }
};
