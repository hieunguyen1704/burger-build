import Axios from 'axios';
const instance =  Axios.create({
    baseURL: "https://react-burger-builder-c8c6d.firebaseio.com/"
});
export default instance;