import axios from 'axios';
import {API_URL} from '../Constants';

const File = {
  uploadFiles: (file) => {
    return new Promise((resolve, reject) => {
      var formdata = new FormData();
      formdata.append('file', {
        type: 'image/png',
        uri: file.uri,
        name: file.fileName,
      });

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${API_URL}/upload/uploads`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            resolve(result.files[0].Location);
          }
        })
        .catch((error) => console.log('error', error));
    });
  },
};
export default File;
