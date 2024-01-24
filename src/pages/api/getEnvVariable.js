export default (req, res) => {
    const myEnvVariable = process.env.MY_ENV_VARIABLE;
    res.status(200).json({ myEnvVariable });
  };
  