import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server

    return axios.create({
      //for local
      //baseURL: 'http://ingress-nginx.ingress-nginx.svc.cluster.local',
      //for prod
      baseURL: 'http://www.giats-tickets.ml/',
      headers: req.headers
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: '/'
    });
  }
};
