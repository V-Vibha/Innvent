# Deploy Python Application on SAP Cloud Platform using Docker Container
This repository provides a guide on deploying a Python application using Docker. Docker allows you to package your application with its dependencies into a container, ensuring consistent behavior across different environments. This README file will walk you through the steps required to deploy your Python app using Docker.

# Prerequisites
Docker: You can download and install Docker from the official Docker website.

# Getting Started
To deploy your Python app using Docker, follow these steps:

1. To build the image, run
docker build -t python-api .

2. To run the image, run
docker run -p 3333:3333 python-api

Now, we can see the App is running & we can access the app via URL:
http://localhost:3333/ in any browser.

3. After successful testing, Let’s stop the instance.

To check container details on docker run :
docker container ls

To stop the instance run:
docker stop <CONTAINER ID>

# Push Docker Image to Docker Hub
1. Create an account on Docker Hub: https://hub.docker.com/

2. Let’s check the Docker Hub account, go to the terminal. Run:
docker login

As the docker is running on your Desktop, it will automatically authenticate using existing credentials.

3. Tag your docker image. Run:
docker tag python-api allwyn7/python-api-image
  
Note: Here, allwyn7 is my Docker Hub Username. You should use your username.

4. Let’s push our Docker image to Docker Hub. Run:
docker push allwyn/python-api-image
  
5. Go to https://hub.docker.com/ & Confirm your push.
  
# Push Docker Image to SAP Cloud Platform
Now the image is ready in the docker hub, let’s push this docker image to SAP Cloud Platform.

Here I assume that you have your SAP Cloud Platform account ready and Cloud Foundry Command Line Interface (CLI) installed on your desktop. 

https://account.hanatrial.ondemand.com/

1. Let’s login to your SAP Cloud Platform Cloud Foundry endpoint using CLI. Run:
cf login
 
From the console, you can validate the endpoint and other details.
  
2. Push the docker image to SAPcp Cloud Foundry.

cf push python-api-app --docker-image allwyn7/python-api-image --docker-username allwyn7
It will ask your docker password, enter your password to proceed.

cf push <App Name> –docker-image <Docker Image Repository:TagName> –docker- username <docker username>

<App Name> – python-api-app
<Docker Image Repository:TagName> – allwyn7/python-api-image
<docker username> – allwyn7
  
3. Now your image is deployed on SAPcp Cloud Foundry and running in a container. Get the URL fomr routes section.

Or login to your SAP Cloud Platform Cockpit and validate the same.

4. Open the application URL to validate that the application is up and running.
