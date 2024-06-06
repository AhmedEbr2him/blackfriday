// api URL here
import axios from "axios";

// first create our base URL
export default axios.create({
	baseURL: "https://dummyjson.com/",
});
