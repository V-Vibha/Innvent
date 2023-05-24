# Running a Flask App as an API
# Prerequisites
Before you begin, make sure you have the following installed on your system:

Python: You can download and install Python from the official Python website.

Flask: Install Flask using the following command:
pip install flask

# Getting Started
0-1681955587526.xlsx is the dataset that we have used to train out ml model in the app.

app.py- The python application.

Dockerfile- Used to deploy the app on cf. (Explained later in the readme file)

requirements.txt- Has all the versions of the dependencies we have used for our application. (Here used just for reference and not required for deployment)

# About the files

## 0-1681955587526.xlsx:

This is an excel sheet that consists of 4296 instances out of which we have 1100 critical instances. The columns represent the different attributes related to the instances(Eg: State, Status, Company Code etc.)

### Assumptions
For now, we are considering only string data for our use case and dropping the other attributes ('Status','SubStatus','State','Compliance Issues','Scenario Instance Id','Document Number','Cycle Time','Late Payment','Invoiced Manually','Critical Vendor','Invoice Value','Early Payment')

## app.py
This is the python application that has the machine learning algorithm implementation and also is an api that will output the attributes in the decreasing order of their influence on the critical instances.

### Line 1-8: Importing the libraries
### Line 10-15: Initialising Flask, Api, reading the dataset into a variable, setting attData.
### Line 17-38: Implementation of the mutual info logic
### Line 39-47: Formatting output data
### Line 53: Specifying the port number

## Dockerfile

### Line 1: Specifying python version
### Line 2-3: Adding python app and excel sheet
### Line 4-8: Package install commands
### Line 9: Exposing port number
### Line 10: Command to run on the CLI

# Deploy Python Application on SAP Cloud Platform using Docker Container
This repository provides a guide on deploying a Python application using Docker. Docker allows you to package your application with its dependencies into a container, ensuring consistent behavior across different environments. This README file will walk you through the steps required to deploy your Python app using Docker.

# Prerequisites
Docker: You can download and install Docker from the official Docker website.

Create a folder and copy both the files app.py and Dockerfile there. Open the Windows PowerShell and change the current working directory to your newly created directory.
requirements.txt file contains all the dependencies that were present when we built the app.(Just for reference)

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

# Additional Resources
We followed the following link to deploy our python app:
  https://blogs.sap.com/2021/01/02/deploy-python-application-on-sap-cloud-platform-using-docker-container/#:~:text=Follow%20this%206%20steps%20approach%20to%20run%20a,to%20SAP%20Cloud%20Platform%20helloworld.py%20%28Python%20Source%20Code%29
  
# How do we run Hana ML on the database
https://blogs.sap.com/2022/11/23/hands-on-tutorial-leverage-automl-in-sap-hana-cloud-with-the-predictive-analysis-library/#:~:text=Yes%2C%20the%20Automated%20Predictive%20Library%20%28APL%29%20is%20a,the%20process%20before%20creating%20a%20machine%20learning%20model.
  
As of now in our application we have used mutual information algorithm from scikit learn library. But it is not present on hana ml. As an alternate to this algorithm we can use decision trees.

