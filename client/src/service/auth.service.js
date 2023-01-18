import axiosInstance from '../config/axios-config';
const loginUser = async ({ emailId, password }) => {
  return axiosInstance.post('/login', {
    emailId,
    password,
  });
};

export { loginUser };
