import axios from 'axios';
import config from './Config';

export const directoryEndPoint = axios.create({
    baseURL: config.reactAppDirectoryApiUrl
})


const apiEndPoint = axios.create({
    //baseURL: config.reactAppBackendUrl + '/api'
});


// function logRequest(request) {
//     console.log('Request: ', request.url, request);
//     return request;
// }


//apiEndPoint.interceptors.request.use(logRequest);
//directoryEndPoint.interceptors.request.use(logRequest);


export const setAxiosEndPoints = (endPoints) => {
    apiEndPoint.defaults.baseURL = endPoints.api;
    config.reactAppStaticUrl = endPoints.prStatic;
    config.reactAppStaticUploadsUrl = endPoints.uploads;
}

export default apiEndPoint;


