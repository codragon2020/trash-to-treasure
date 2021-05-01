# cypress-demo

  ![Badge for GitHub repo top language](https://img.shields.io/github/languages/top/binayaluitel2/cypress-demo?style=flat&logo=appveyor) ![Badge for GitHub last commit](https://img.shields.io/github/last-commit/binayaluitel2/cypress-demo?style=flat&logo=appveyor)
    
  
  ## Description 
  
  *The what, why, and how:* 
  
  This is to demo of cypress, cucumber and mochawesome framework. 

  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  
  ## Installation
  
  *Steps required to install project and how to get the development environment running:*
  * 1) Clone the Repository
  * 2) cd inside cypress-demo folder
  * 3) Install all the dependencies using `npm install`
  
  ## Usage 
  
  *Instructions and examples for use:*
  
  ### To run locally: 
  * 1) Clone the Repository
  * 2) cd inside cypress-demo folder
  * 3) Run command `npm test`
  ### To run inside Docker Container: 
  *Prerequisite: Docker is installed* 
  * 1) Pull the cypress base image using command `docker pull cypress/base`
  * 2) creates container e.g `mycontainer` out of the image using command `docker run --name mycontainer -dit cypress/base:latest`
  * 3) log into container `mycontainer`using command `docker container exec -it mycontainer /bin/bash`
  * 4) Clone the repository inside container `git clone https://github.com/binayaluitel2/cypress-demo.git`
  * 5) Go inside cypress-demo directory `cd cypress-demo`
  * 6) Install chromium using `apt-get install chromium`
  * 7) Run the test cases using command `npx cypress run --browser chromium --headless`
  
  
  ## License
  
  MIT License
  
  ---
  
  ## Questions?
  
  ![Developer Profile Picture](https://www.cypress.io/static/33498b5f95008093f5f94467c61d20ab/c0bf4/cypress-logo.webp) 
  
  For any questions, please contact me with the information below:
 
  GitHub: [@binayaluitel2](https://api.github.com/users/binayaluitel2)
