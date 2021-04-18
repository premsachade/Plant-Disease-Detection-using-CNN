# **Plant Disease Detection using Convolutional Neural Network (CNN)**

### Food security for billions of people on earth requires minimizing crop damage by timely detection of diseases.
### Developing methods for detection of plant diseases serves the dual purpose of increasing crop yield and reducing pesticide use without knowing about the proper disease.
### The traditional method of disease detection has been to use manual examination by either farmers or experts, which can be time consuming and costly, proving infeasible for millions of small and medium sized farms around the world.
### This repository contains the code and relevant analysis used to train several deep convolutional neural networks (CNN) to identify the health status of 14 crop species from an image of their leaf.

#

## **Description**

### The process for building the model which can detect the disease associated with the leaf image is as follows:

<br>

* ### Data Gathering  
    * The model is trained using this [dataset](https://drive.google.com/uc?id=1WxJq0PlQNEKVsdk6m_d0bswY2sraMiOM) of 55,020 images of diseased and healthy plant leaves collected under controlled conditions and made available by the [PlantVillage](https://github.com/spMohanty/PlantVillage-Dataset) project.

<br>

* ### Model Building
    * The model is built using **Fastai** Library and **PyTorch** Framework by Transfer Learning **ResNet-34** Architecture.

<br>

* ### Model Training
    * The model is trained on a total of 44016 images from 38 classes.
    * The model is trained by using variants of above layers mentioned in model building and by varying hyperparameters.

<br>

* ### Model Testing
    * The model is tested on a total of 11004 images from 38 classes.
    * The final model is able to achieve 99.65 % of test accuracy.

#

## **Dataset Description**

|Name           | No of Classes | Class Names
| ------------- |:-------------:|:-----------------:|
| Apple     |     04        | 'Apple___Apple_scab','Apple___Black_rot','Apple___Cedar_apple_rust' 'Apple___healthy' |
| Blueberry |     01        | 'Blueberry___healthy' |
| Cherry    |     02        | 'Cherry_(including_sour)_Powdery_mildew', 'Cherry_(including_sour)_healthy' |
| Corn      |     04        | 'Corn___Cercospora_leaf_spot', 'Corn___Common_rust','Corn___Northern_Leaf_Blight','Corn___healthy' |
| Grape     |     04        | 'Grape___Black_rot','Grape___Esca_(Black_Measles)','Leaf_blight_(Isariopsis_Leaf_Spot)','Grape___healthy' |
| Orange    |     01        | 'Orange___Haunglongbing_(Citrus_greening)' |
| Peach     |     02        | 'Peach___Bacterial_spot','Peach___healthy' |
| Pepper    |     02        | 'Pepper,_bell___Bacterial_spot','Pepper,_bell___healthy' |
| Potato    |     03        | 'Potato___Early_blight','Potato___Late_blight','Potato___healthy' |
| Raspberry |     01        | 'Raspberry___healthy' |
| Soyabean  |     01        | 'Soybean___healthy' |
| Squash    |     01        | 'Squash___Powdery_mildew' |
| Strawberry|     02        | 'Strawberry___Leaf_scorch','Strawberry___healthy' |
| Tomato    |     10        | Tomato: 'Bacterial_spot','Early_blight', 'Late_blight', 'Leaf_Mold', 'Septoria_leaf_spot', 'Spider_mites','Target_Spot', 'Yellow_Leaf_Curl_Virus', 'Mosaic_virus', 'Healthy' |

#

## **Technology Stack**
* Python
* HTML
* CSS
* JavaScript

#

## **Frameworks**
* PyTorch
* Starlette
* Bootstrap
* JQuery

#

## **Usage**

### Code For Model Building and Training  
* Refer to the **Jupyter Notebook** [here](https://colab.research.google.com/drive/1SnFndrrN0J_ISr163RxjU-z3Ds7ZzzMH?usp=sharing).

<br>

### Final Trained Model
* The final **ResNet-34** Model can be downloaded from [here](https://drive.google.com/uc?id=13RrrRqQF0WQKjvR_RM7jxfkY8dpt01QB).

<br>

### Local Setup
* It is recommended to set up the project inside a virtual environment to keep the dependencies separated.
    * [Python](https://realpython.com/python-virtual-environments-a-primer/#why-the-need-for-virtual-environments)
    * [Conda](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html)
* Activate virtual environment.
* Install dependencies by running
>`pip install -r requirements.txt`
* Start up the server by running
> `python app/server.py serve`
* Visit <http://localhost:8080/> to explore and test app.

<br>

### Docker
* Make sure that Docker is installed on Local Machine.
* Execute the following command to create Docker Image.

  ```bash
  $ git clone https://github.com/premsachade/Plant-Disease-Detection-using-CNN.git
  $ cd Plant-Disease-Detection-using-CNN
  $ docker build -t plant_disease_detector .
  $ docker run --rm -it -p 5000:5000 plant_disease_detector
  ```
* Visit http://localhost:5000/ to explore and test app.

#

## **Working**
* The website allows an option to select an image from local sorage which is required to diagnose the health status of plant.
* This image is processed in the backend using the trained model to classify the plant disease.
* The classification includes a class "background" exclusively to alert the user that the camera frame did not capture the infected area of the plant properly.
* The final outcome is sent back to "index.html" as a **JSON response** in the below format:

> Plant : (Name of Plant)

> Status/Disease : (Healthy/Name of Disease)

> Confidence : (The Percentage of Predicted Outcome)

#