export const getEmployees = async (req, res, next) => {
  try {
    res.json([
      { name: 'ashan', role: 'admin' },
      { name: 'ashan', role: 'manager' },
    ]);
  } catch (err) {
    console.log(err);
    req.err(err);
  }
};
