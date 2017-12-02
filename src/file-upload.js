import * as axios from 'axios';


function upload(formData) {
    const url = `https://lhmr0.000webhostapp.com/upload.php`;
    return axios.post(url, formData)
        // get data
        .then(x => x.data)
        // add url field
        .then(x => x.map(img => Object.assign({},
            img, { url: `https://lhmr0.000webhostapp.com/uploads/${img.id}` })));
}

export { upload }