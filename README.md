# Clarity

Advanced ML for Nutritional Analysis and Healthcare Management

###  Table of Contents
---
1.  [Getting Started](#getting-started)
2.  [Introduction](#introduction)
3.  [Users](#users)
4.  [Features](#features)
5.  [Functionality](#functionality)
6.  [Tools and Technologies](#tools-and-technologies)
7.  [Architecture](#architecture)
8.  [Additional Resources](#additional-resources)
9.  [Project Phase Plan](#project-phase-plan)

----

##  Getting Started

<details><summary>Install Dependencies</summary>

<br>

1.  `cd ./clarity` -  navigate to the clarity root directory
2.  `npm init-y` -  initialize npm in the clarity root directory
3.  `cd ./clarity/client` -  navigate to the client directory
4.  `npm install --save-dev nodemon` - install nodemon as dev dependency
5.  `npm init-y` -  initialize npm in the client directory
6.  `npm install @mui/material @emotion/react @emotion/styled redux react-redux axios` -  install dependencies
7.  `npm install @mui/icons-material` -  install material ui icons
8.  `cd ./clarity/server` -  navigate to the server directory
9.  `npm init-y` -  initialize npm in the server directory
10.  `npm install express pocketbase` -  install dependencies
11. `npm install --save-dev nodemon` -  install nodemon as a development dependency

`./backend/pocketbase`

1.  `wget https://github.com/pocketbase/pocketbase/releases/download/v0.23.0-rc3/pocketbase_0.23.0-rc3_linux_amd64.zip`

2.  `unzip pocketbase_0.23.0-rc3_linux_amd64.zip`

3.  `chmod +x pocketbase`

4.  `./pocketbase serve`

</details>

<details><summary>Run the Application</summary>


1.  `cd ./clarity/server` - navigate to the server directory
2.  `npm run dev` - start the server
3.  open a new terminal window
4.  `cd ./clarity/backend/pocketbase` -  navigate to the pocketbase directory
5.  `./pocketbase serve` -  execute the `pocketbase` executable file to start the server
6.  open a new terminal window
7.  `cd ./clarity/client` -  navigate to the client directory
8.  `npm start` -  start the client
9.  `grok http http://localhost:3000` -  view the application in the browser 

</details>

<details><summary>Output from successfully running the Application</summary>

##****##  `npm run dev`  - terminal 1

```bash
> clarity-backend@1.0.0 dev
> nodemon server.js

[nodemon] 3.1.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node server.js`
server is running on port 5001
```

####  `./pocketbase serve` - terminal 2

```bash
2024/09/19 11:04:40 Server started at http://127.0.0.1:8090
├─ REST API: http://127.0.0.1:8090/api/
└─ Admin UI: http://127.0.0.1:8090/_/
```

####  `npm start` - terminal 3


```bash
Compiled successfully!

You can now view client in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.242:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

</details>



<details><summary><code>Package.json</code> and Dependency Overview</summary>

<br>

`package.json` provides metadata, dependencies, scripts, configuration, engines, versioning, and repository information for the project.  

metadata contains the `name`, `version`, `description`, `main`, `scripts`, `keywords`, `author`, `dependencies`, `devDependencies`, and `license` of the project

when cloning the project and running `npm install`, the dependencies are automatically installed and this ensures that the project has all the necessary libraries to run correctly.

the scripts define custom commands for the project, such as `start`, `build`, `test`, `dev`, by running `npm run <script>` in the terminal.

`npm start` runs the application in development mode, meaning that the application will run on `localhost:3000` and any changes made to the code will be reflected in the browser.

`npm test` runs the application in test mode, meaning it runs a test watcher in an interactive mode. 

`npm run build` builds the application for production mode, creating an optimized version of the application in the `build` folder.  essentially it bundles the app into static files for production

`npm run eject` removes this tool and copies build dependencies, configuration files and scripts into the app directory, this is an irreversible action and cannot be undone.

`npm` is a package manager for node.js, it allows you to install, update, and manage dependencies for your project.

`express` is a web application framework for node.js, its used to process the handling of http requests, api requests, and routing.

`pocketbase` provides real time databases, authentication, file storage, allowing you to store and manage user data, files, and other resources.

`nodemon` is a utility that monitors for any changes in the source code and automatically restarts the server, it helps with the development process by reducing the need to manually restart the server for every change.

[`npx`](https://docs.npmjs.com/cli/v8/commands/npx) is a package running tool that comes with npm, and allows you to run node.js packages without having to install them globally.

[`create-react-app`](https://create-react-app.dev/docs/getting-started) is a used to create a single page react application and sets up the project with default configurations, including tools like webpack babel, eslint, and jest.

[`react`](https://react.dev) is a library for building user interfaces, it provides a declarative way to create interactive user interfaces with components and props.

[`react-bootstrap`](https://react-bootstrap.github.io/docs/getting-started/introduction) is a library of reusable react components for building web applications, it provides a set of pre-built components such as buttons, forms, and navigation menus, which can be easily integrated into your application.

[`redux`](https://redux.js.org/usage/#code-quality) is a state management library, it helps manage the state of the application in a predictable way.  it centralizes the applications state and logic.

[`react-redux`](https://react-redux.js.org/using-react-redux/connect-mapstate) is the official binding library for react and redux, it allows for easy integration by connecting 
react components to the redux store, enabling them to read state and dispatch actions.

[`@mui/material`](https://mui.com/material-ui/getting-started/installation/) is a library of react components that implements google's material design, it helps with building a user interface with components such as buttons, text fields, and dialogs.

[`@emotion/react`](https://emotion.sh/docs/introduction) is library for writing css styles with javascript and provides flexible styling capabilities, its used as the default styling engine for material ui allowing for direct css usage.

[`@emotion/styled`](https://emotion.sh/docs/styled) is part of the emotion library that provides a styled components like api for creating styled react components


[`axios`](https://axios-http.com/docs/intro) is a library that helps with making http requests, it's used to communication with the backend apis, making it easier to send and receive data from the server.

[`cors`](https://fetch.spec.whatwg.org/#http-cors-protocol) is a middleware that allows for cross origin resource sharing, it enables the server to accept requests from different origins.

</details>

##  Introduction

<details><summary>Summary</summary>
<br>
Clarity is a web and mobile application that leverages image recognition and machine learning to analyze the nutritional content of food and comprehensive health management tool.  Designed to empower users with real time dietary insights and transform the way individuals manage their chronic conditions, nutrition, and overall health.

</details>

<details><summary>Features</summary>
<br>
Users captures or uploads images or scan barcodes of their food using Clarity.  The app then provides comprehensive nutritional analysis, dietary trends, and provide personalized recommendations based on the user's health goals or chronic conditions.  Clarity can also predicts or mitigates disease risk factors, and allocates data for health care providers.  

</details>

<details><summary>Problem Statement</summary>
<br>

[Most chronic disease are caused by risk factors such as poor nutrition and excessive alcohol use.](https://www.cdc.gov/chronic-disease/prevention/index.html#:~:text=Most%20chronic%20diseases%20are%20caused,feeling%20good%2C%20and%20living%20longer.)  By avoiding these risks and receiving good preventative care Clarity can help reduce the risk of chronic diseases.  The current healthcare system is intervention based and reactive.  Clarity aims to be proactive and preventative by providing users and healthcare providers with real-time data to make informed decisions about their health.

</details>

##  Users

<details><summary>Patients with Chronic Conditions</summary>
<br>

Clarity assist those needing dietary monitoring, such as diabetes, hypertension, heart disease, and obesity.  Clarity can help patients manage their conditions and provide their healthcare providers with data to make informed decisions.
</details>

<details><summary>Insured Individuals</summary>
<br>

Users seeking to reduce healthcare costs will find Clarity invaluable for incentive programs that help reduce insurance premiums based on health data.
</details>

<details><summary>Athletes</summary>
<br>

Optimize performance and recovery with nutritional insights and recommendations.
</details>

<details><summary>Personal Trainers</summary>
<br>

Track their clients' progress and provide personalized recommendations to achieve their health and fitness goals.
</details>

<details><summary>Health-conscious Individuals</summary>
<br>

Anyone looking to enhance their well-being to make more informed dietary choices, track trends, prevent disease, and improve overall health.

</details>

##  Features

<details><summary>Nutritional Analysis and Insights</summary>       
<br>

Insights into macronutrient and micronutrient in take.  Inform users about carcinogens, pesticides, heavy metals, mycotoxins, artificial additives, trans fats, acrylamide, and other harmful substances in their food.
</details>

<details><summary>Personalized Dietary Recommendations</summary>
<br>
Help users meet specific nutritional needs, such as managing cholesterol, blood sugar, blood pressure, or weight through personalized recommendations.  Provide users with meal plans, recipes, and grocery lists.
</details>

<details><summary>Health Monitoring and Trend Analysis</summary>
<br>
Track dietary trends, allow users to log biometric data (integrated with wearables or medical devices such as glucose monitors, blood pressure monitors)
</details>

<details><summary>Disease Risk Management</summary>
<br>
Use dietary data to predict potential health risks and offer preventive guidance to mitigate these risks.
</details>

<details><summary>Data Sharing with Healthcare Providers</summary>
<br>
Allow users to share their nutritional data with healthcare providers by exporting reports into formats such as PDF, CSV, through API integrations, or HL7 (Health Level Seven International), CDA (Clinical Document Architecture), or FHIR (Fast Healthcare Interoperability Resources) standards.
</details>

<details><summary>Reduce Healthcare Costs</summary>
<br>
Incentivize users to reduce healthcare costs by providing data to insurance companies for premium reductions.
</details>

<details><summary>Support Athletic Performance and Personal Training</summary>
<br>
Provide athletes and personal trainers with nutritional insights to optimize performance and recovery.
</details>

<details><summary>Enhance Overall Health and Well-being</summary>
<br>
Empower users to make informed dietary choices, track trends, prevent disease, and improve overall health.
</details>

<details><summary>Wearable Integration</summary>
<br>
Integrate with wearables and medical devices to monitor health data in real time.
</details>

##  Functionality

<details><summary>User profile and data input</summary>
<br>

Users provide their specific information, including age, gender, weight, medical history, medications, and other relevant health data.  The user can set specific health goals related to their dietary needs, such as managing diabetes, losing weight, or improving overall wellness.

After the User creates an account an introduction to the application is displayed that states the following

1.  Simply snap a photo of their meal
2.  Scan the barcode of the packaged food item
3.  Input the food item into the database manually

Initial Questionnaire

1.  What is your sex?
2.  What is your age?
3.  What is your height?
4.  Current Weight?
5.  Target Weight
6.  What's your activity level?
7.  What medications are you currently taking?
8.  What medical conditions do you currently have?
9.  Any family medical history of (high blood pressure, diabetes, cardiac problems, cholesterol problems, or cancer?)
10.  What is your dietary preference? (n/a, vegan, vegetarian, pescatarian, etc.)
11.  Any allergies or medications or foods?
12.  What are your fitness or nutrition goals? (weight loss, muscle gain, etc.)
13.  Have you ever been on a diet before? (yes, no)
14.  Do you current take any vitamins or supplements? (yes, no)
15.  How would you rate your diet? (excellent, good, fair, poor)
16.  Do you use alcohol? (yes, no)
17.  Do you use any tobacco products? (yes, no)
18.  Are you on any weight loss medications? (yes, no)
19.  Do you know what nutrients you have consumed? (I do know all the nutrients, I often check the nutrients list, Not really)
20.  Do you usually keep a record of what you eat? (Every meal, I do when I remember, Not at all)

</details>

<details><summary>Image Capture or Barcode Scanning</summary>
<br>
Users capture images of their meals using a mobile device.  The software should be user friendly and guide users on how to take clear and useful photos for analysis.  Or users can scan the barcode of the packaged food item.
</details>

<details><summary>Image analysis and nutritional data extraction</summary>
<br>

[AI powered analysis](https://openfoodfacts.github.io/openfoodfacts-server/) will consist of uploaded images to a desktop software where machine learning algorithms analyze the food items for nutritional content, portion sizes, and dietary composition.  The app allows users to scan the barcode of products, to view the product information, and to take and submit pictures and data for missing products. [ios app](https://github.com/openfoodfacts/openfoodfacts-ios)  


<details><summary>Nutritional Data Extraction in <code>JSON</code> format</summary>
<br>

```JSON
[
  {
    "timestamp": "yyyy-mm-ddThh:mn:ssZ",
    "transaction": [
        {
            "location": "",
            "vendor": "",
            "vendor-id": ""
        }
    ],

    "general": [
        {
            // Barcode of the product
            "code": "200-EAN-13",

            // URL of the product page
            "url": "https://xxx.com",
            
            // Date that the product was added (UNIX timestamp format)
            "created_t": "yyyy-mm-ddThh:mn:ssZ",

            // Date that the product was last modified (UNIX timestamp format)
            "last_modified_t": "yyyy-mm-ddThh:mn:ssZ",

            // Name of the product
            "product_name": "cherios",

            // Generic name of the product
            "generic_name": "cereal",

            // Field that designates quantity and unit size
            "quantity":  _100g
        }
    ],
    "tags" : [
        {
            "packaging": shape, material,
            "packaging_tags": "",
            "brands": "",
            "brand_tags": "", 
            "categories": "",
            "categories_fr": "",
            "origins": "origins of ingredients",
            "origintags": "",
            // Locations where manufactured or transformed
            "manufacturing_places": "",
            "manufacturing_places_atgs": "",
            "labels": "",
            "labels_tags": "",
            "emb_codes": "",
            "emb_code_tags": "",

            // Coordinates corresponding to the first packaging code indicated
            "first_packaging_code_geo": "",
            "cities": "",
            "cities_tags": "",
            "purchase_places": "",
            "stores": "",
            
            // List of countries where the product is sold
            "countries": "",
            "countries_tags": ""
        }
    ],
    "ingredients" : [
        {
            "ingreidents_text": "",
            "traces": "",
            "traces_tags": ""
        }
    ],
    "misc_data" : [
        {
            // Serving size in g
            "serving_side": ...,
            // Indicates if the nutrition facts are indicated on the food label
            "no_nutrients": ...,
            "additives": ...,
            "additives_tags": ...,
            "ingredients_from_palm_oil_n": ...,
            "ingreidents_from_palm_oil": ...,
            "ingreidents_from_palm_oil_tags": ...,
            "ingreidents_that_may_be_from_palm_oil_n": ...,
            "ingreidents_that_may_be_from_palm_oil_tags": ...,
            
            // Nutrition grade ('a' to 'e')
            // Reference: https://fr.openfoodfacts.org/nutriscore
            "nutrition_grade_fr": "a",

            "main_category": ...,
        }
    ],

    "nutrition_facts": [
        {
            "energy_100g": ...,
            "energy-kj_100g": ...,
            ...
        }
    ],

    "nutrition_facts" : [
        {
            "energy-kcal_100g": ...,
            "proteins_100g": ...,
            "casein_100g": ...,
            "serum-proteins_100g": ...,
            "nucleotides_100g": ...,
            "carbohydrates_100g": ...,
            "sugars_100g": ...,
            "sucrose_100g": ...,
            "glucose_100g": ...,
            "fructose_100g": ...,
            "lactose_100g": ...,
            "maltose_100g": ...,
            "maltodextrins_100g": ...,
            "starch_100g": ...,
            "polyols_100g": ...,
            "fat_100g": ...,
            "saturated-fat_100g": ...,
            "butyric-acid_100g": ...,
            "caproic-acid_100g": ...,
            "caprylic-acid_100g": ...,
            "lauric-acid_100g": ...,
            "myristic-acid_100g": ...,
            "palmitic-acid_100g": ...,
            "stearic-acid_100g": ...,
            "arachidic-acid_100g": ...,
            "behenic-acid_100g": ...,
            "lignoceric-acid_100g": ...,
            "cerotic-acid_100g": ...,
            "motanic-acid_100g": ...,
            "melissic-acid_100g": ...,
            "monounsaturated-fat_100g": ...,
            "polyunsaturated-fat_100g": ...,
            "omega_3-fat_100g": ...,
            "alpha-linolenic-acid_100g": ...,
            "eicosapentaenoic-acid_100g": ...,
            "docosahexaenoic-acid_100g": ...,
            "omega_6-fat_100g": ...,
            "linoleic-acid_100g": ...,
            "arachidonic-acid_100g": ...,
            "gamma-linolenic-acid_100g": ...,
            "dihomo-gamma-linolenic-acid_100g": ...,
            "omega_9-fat_100g": ...,
            "oleic-acid_100g": ...,
            "elaidic-acid_100g": ...,
            "gondoic-acid_100g": ...,
            "mead-acid_100g": ...,
            "erucic-acid_100g": ...,
            "nervonic-acid_100g": ...,
            "trans-fat_100g": ...,
            "cholesterol_100g": ...,
            "fiber_100g": ...,
            "sodium_100g": ...,
            // % vol of alcohol
            "alcohol_100g": ...,
            "vitamin-a_100g": ...,
            "vitamin-d_100g": ...,
            "vitamin-e_100g": ...,
            "vitamin-c_100g": ...,
            "vitamin-b1_100g": ...,
            "vitamin-b2_100g": ...,
            "vitamin-pp_100g": ...,
            "vitamin-b6_100g": ...,
            "vitamin-b9_100g": ...,
            "vitamin-b12_100g": ...,
            // Also known as vitamine b8
            "biotin_100g": ...,
            "pantothenic-acid_100g": ...,
            "silica_100g": ...,
            "bicarbonate_100g": ...,
            "chloride_100g": ...,
            "calcium_100g": ...,
            "phosphorus_100g": ...,
            "iron_100g": ...,
            "magnesium_100g": ...,
            "zinc_100g": ...,
            "copper_100g": ...,
            "manganeses_100g": ...,
            "fluoride_100g": ...,
            "selenium_100g": ...,
            "chromium_100g": ...,
            "molybdenum_100g": ...,
            "iodine_100g": ...,
            "caffeine_100gtaurine_100g": ...,
            // pH (no unit)
            "ph_100g": ..., 
            // % of fruits, vegetables, and nuts (excluding potatoes, yams, manioc)
            "fruits-vegetables-nuts_100g": ...,
        }
    ],

    // Nutri-Score
    // Nutrition score derived from the UK FSA score and adapted for the French market (formula defined by the team of Professor Hercberg)
    "nutrition-score-fr_100g" : "a",

    // Nutrition score defined by the UK Food Standards Administration (FSA)
    "nutrition-score-uk_100g": "a",

  }
] 
```
</details>
</details>

##  Tools and Technologies

<details><summary>Backend</summary>
<br>

Node.js - for server-side development

Express.js - framework for node.js for handling server requests, routing, and api endpoints
  
[Pocketbase](https://pocketbase.io) - for cloud storage, user authentication, hosting, and database
</details>

<details><summary>Frontend</summary>
<br>

React - for building the user interface

[Material UI](https://mui.com) - for design components

Redux - for state management

Axios - for making https requests

React Native Health - for integrating with HealthKit
</details>

<details><summary>Machine Learning</summary>
<br>

[Clarifai](https://www.clarifai.com)

[Roboflow Universe](https://universe.roboflow.com)

[Google Cloud Vision API](https://cloud.google.com/vision)

[IBM Watson Visual Recognition](https://www.ibm.com/products/watson-visual-recognition)
</details>

<details><summary>Barcode Scanning API</summary>
<br>

Open Food Facts API - for food identification and nutritional information via barcode scanning
</details>

<details><summary>Dataset for Custom Model</summary>
<br>

Food 101

UPMC Food 101
</details>

##  Architecture

<details><summary>Login Screen</summary>
<br>

Users can login or create an account to access the app.
</details>

<details><summary>Dashboard</summary>
<br>

Users can view their daily nutritional intake, health data, and personalized recommendations.
</details>

<details><summary>Analysis</summary>
<br>

Users can view detailed analysis of their meals, dietary trends, and health insights.
</details>

<details><summary>Settings</summary>
<br>

Users can update their profile, health goals, and preferences.
</details>

<details><summary>Reports</summary>
<br>

Users can export their data for healthcare providers or insurance companies.
</details>

Figma - [Link to Project](https://www.figma.com/proto/0lIIBK2ARIaFwXMi4KiJY0/mockup?node-id=70-287&t=EZ5trGXitWiy3gsk-1)

##  Additional Resources

<details><summary>Resources</summary>
<br>

[Open Food Facts API](https://openfoodfacts.github.io/openfoodfacts-server/api/)

[HealthKit](https://developer.apple.com/documentation/healthkit)

[Open Food Facts](https://world.openfoodfacts.org/data)

[USDA Food Data Central](https://fdc.nal.usda.gov)

[Nutritionix](https://www.nutritionix.com)

[USDA FoodData Central](https://fdc.nal.usda.gov)

[USDA Food Composition Databases](https://www.ars.usda.gov/northeast-area/beltsville-md-bhnrc/beltsville-human-nutrition-research-center/nutrient-data-laboratory/docs/usda-national-nutrient-database-for-standard-reference/)

[USDA National Nutrient Database for Standard Reference](https://www.ars.usda.gov/northeast-area/beltsville-md-bhnrc/beltsville-human-nutrition-research-center/nutrient-data-laboratory/docs/usda-national-nutrient-database-for-standard-reference/)

[uber api](https://developer.uber.com/docs/eats/introduction)

[food labeling](https://www.nal.usda.gov/legacy/aglaw/food-labeling)

[open food facts monitoring](https://github.com/openfoodfacts/openfoodfacts-monitoring)

[open food facts api documentation](https://openfoodfacts.github.io/openfoodfacts-server/api/)

</details>

<details><summary>Competitors</summary>
<br>

**Calorie Mama** Provides food recognition and nutritional analysis.

**MyFitnessPal** Offers comprehensive dietary tracking and personalized recommendations.

**Lose It!** Focuses on weight loss through calorie counting and food logging.
</details>

##  Project Phase Plan

**Phase 1:** Initial setup and user registration module

**Phase 2:** Image capture and basic nutritional analysis

**Phase 3:** Advanced nutritional analysis and personalized recommendations

**Phase 4:** Health monitoring and trend analysis

**Phase 5:** Disease risk management and data sharing

**Phase 6:** Wearable integration and final testing