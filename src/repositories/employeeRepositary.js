
/**
 * Gets all the registerd employees.
 * @returns 
 */
const getEmployees = async () => {
  try {
    const employees = dbConnection.collection('employees');
    const cursor = employees.find();
    const emplyeeList = await cursor.toArray();
    return emplyeeList;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.close();
  }
};

/**
 * Saves the employee register data.
 * @param {*} employee 
 * @returns 
 */
const registerEmployee = async (employee) => {
  const { client, dbConnection } = await getDatabaseConnection();
  try {
    const employees = dbConnection.collection('employees');
    const registeredEmployee = await employees.insertOne(employee);
    return registeredEmployee;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.close();
  }
};

export default { getEmployees, registerEmployee };
