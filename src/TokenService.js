const getToken = () => {
      return window.localStorage.getItem('id_token');
}
const saveToken = (token) => {
      window.localStorage.setItem('id_token' , token);
}
const destoryToken = () => {
      window.localStorage.removeItem('id_token');
}

export default { getToken , saveToken , destoryToken }