import http from 'k6/http';
import { sleep, check} from 'k6';
import { Rate } from "k6/metrics";

const failures = new Rate("failed_requests")

export const options = {

vus: 250,
duration: '30s',

thresholds: {
  failed_requests: ['rate<=0.01'],
  http_req_duration: ['p(95)<2000']

}
};

export default function () {

// Here I have tried to create a foor loop which will post automatically data into Wordpress Database

// const postUrl = 'http://localhost:8000/wp-json/wp/v2/posts/'
  
//   for(let i = 0; i < 100; i++) {

//     var idNumber = 0;

//     const payload = {
//         content: "Test",
//         id: idNumber++
//         status: "publish",
//         title: "Post data in Database"
//         
//     }

//     http.post(postUrl + "?_locale=user", payload).then(data => {
//         console.log(data)
//     })
// }

const result = http.get('http://localhost:8000/wp-json/wp/v2/pages/');
    check(result, {
        "http response status code is 200": r => r.status === 200
    });
    
    failures.add(result.status !== 200)
    sleep(1);
 
}

