## Summary
A Full Stack Website project for selling/buying tickets using microservices, MERN stack, Redis and automated CI/CD Github Actions. The app is deployed on DigitalOcean using kubernetes.

![alt text](https://github.com/Giats2498/giats-tickets/blob/master/Map.PNG)

## Table of Contents
- [Run on DigitalOcean](#run-on-digitalocean)
- [Run Local](#run-local)
- [Services](#services)
- [Datasets](#datasets)
- [Dependencies](#dependencies)
- [Events](#events)
- [Testing](#testing)


## Run on DigitalOcean
1. Get a Domain name.
2. Install DigitalOcean cli
3. Create Kubernetes.
4. Create LoadBalancer.
5. Add Keys to Github (DOCKER_USERNAME, DOCKER_PASSWORD, DIGITALOCEAN_ACCESS_TOKEN).
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.43.0/deploy/static/provider/do/deploy.yaml
git push
```

## Run Local
1. Install Docker and Kubernetes.
2. Install Node.js.
3. Install skaffold.
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.30.0/deploy/static/mandatory.yaml
cd ./
kubectl apply -f cloud-generic.yaml
skaffold dev
```

## Services

- **Auth:** Everything related to user **signup/signin/signout**.
- **Tickets:** Ticket **creation/editing**. Knows wether a ticket can be updated.
- **Orders:** Order **creation/editing**.
- **Expiration:** Watches for orders to be created cancels them after 15 minutes.
- **Payments:** Handles credit card payments. Cancels orders if payments fails, completes if payment succeeds.


## Datasets

**Auth**                
| Name     | Type   |
|----------|--------|
| email    | string |
| password | string |


**Tickets**
| Name    | Type         |
|---------|--------------|
| title   | string       |
| price   | number       |
| userId  | Ref to User  |
| orderId | Ref to Order |


**Order**
| Name      | Type                                                |
|-----------|-----------------------------------------------------|
| userId    | Ref to User                                         |
| status    | Created \| Cancelled \| AwaitingPayment \| Completed |
| tickedId  | Ref to Ticket                                       |
| expiresAt | Date   

**Payments**
| Name           | Type                           |
|----------------|--------------------------------|
| orderId        | Ref to Order                   |
| status         | Created \| Failed \| Completed |
| amount         | number                         |
| stripeId       | string                         |
| stripeRefundId | string                         |

## Events
- **UserCreated:** Used to create an user.
- **UserUpdated:** Used to update user's data.
- **OrderCreated:** Used to create an order for a ticket.
- **OrderCancelled:** Used to cancell an order.
- **OrderExpired:** Used to cancell an order when 60 seconds have elapsed from the order.
- **TicketCreated:** Used to create ticket.
- **TicketUpdated:** Used to update ticket's data.
- **PaymentsCreated:** Used to create a payment for a ticket.

## Testing

To Test a service you need to:
```
cd ./auth
npm run test
```

| devDependencies       | Description                                                                                                               |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------|
| jest                  | Delightful JavaScript Testing.                                                                                            |
| ts-jest               | A TypeScript preprocessor with source map support for Jest that lets you use Jest to test projects written in TypeScript. |
| supertest             | HTTP assertions made easy via superagent.                                                                                 |
| mongodb-memory-server | Main default package which downloads mongod binary to ./node_modules/.cache directory on package install.                 |

## Dependencies

| Dependencies               | Description                                                                                                                                                                                                              |
|----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| @giats-tickets/common      | This package contains common code of project giats-tickets like erros, events and middlewares.                                                                                                                           |
| cookie-session             | Simple cookie-based session middleware.                                                                                                                                                                                  |                                                                                                                                                         |
| express                    | Fast, unopinionated, minimalist web framework for node.                                                                                                                                                                  |                                                                                                                                                                      |
| jsonwebtoken               | An implementation of JSON Web Tokens.                                                                                                                                                                                    |                                                                                                                                                                |
| mongoose                   | Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.                                                                                                                              |                                                                                                                                                                    |
| mongoose-update-if-current | This plugin brings optimistic concurrency control to Mongoose documents by incrementing document version numbers on each save, and preventing previous versions of a document from being saved over the current version. |
| express-async-errors       | A dead simple ES6 async/await support hack for ExpressJS.                                                                                                                                                                |
| express-validator          | An express.js middleware for validator.                                                                                                                                                                                  |
| ts-node-dev                | It restarts target node process when any of required files changes (as standard node-dev) but shares Typescript compilation process between restarts.                                                                    |
| typescript                 | TypeScript is a language for application-scale JavaScript. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications.                                                      |
| axios                      | Promise based HTTP client for the browser and node.js.                                                                                                                                                                   |
| bootstrap                  | Sleek, intuitive, and powerful front-end framework for faster and easier web development.                                                                                                                                |
| next                       | The React Framework for Production.                                                                                                                                                                                      |
| react                      | React is a JavaScript library for creating user interfaces.                                                                                                                                                              |
| react-dom                  | This package serves as the entry point to the DOM and server renderers for React.                                                                                                                                        |
| react-stripe-checkout      | Stripe's Checkout makes it almost too easy to take people's money. This should make it even easier if you're building a react application.                                                                               |
| bull                       | The fastest, most reliable, Redis-based queue for Node. Carefully written for rock solid stability and atomicity.                                                                                                        |
| node-nats-streaming        | NATS Streaming Server is an extremely performant, lightweight reliable streaming platform powered by NATS.                                                                                                               |

