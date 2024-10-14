/**
 * app oct 14 2024 1:35 pm pat 1b2ea09d706a4be48ae4a0a2717f7ddf 
 * https://clarifai.com/clarifai/main/models/food-item-recognition
 */

const clarifai = require("clarifai-nodejs");
const { Model, Input } = clarifai;

//  define the authentication config with your PAT - personal access token
const model = new Model({
    authConfig: {
        userId: "clarifai",
        appId: "main",
        pat: "1b2ea09d706a4be48ae4a0a2717f7ddf",
    },
    modelId: "food-item-recognition",
});

const prompt = "image of mango and blueberries";
// const imageUrl = "https://github.com/MorganBergen/clarity/blob/28-image-analysis-ai-feature/tests/meal.jpeg";
const imageUrl = "https://assets.clevelandclinic.org/transform/a581e088-c93e-4bb8-84bf-6f53e36bc96d/BlueberryBenefits-1162156441-770x533-1_jpg";
// const imageUrl = "https://samples.clarifai.com/metro-north.jpg";

const multiInput = Input.getMultimodalInput({
    imageUrl,
    rawText: prompt,
});

const inferenceParams = { temperature: 0.2, maxTokens: 100 };

async function makePrediction() {
    try {
        const modelPrediction = await model.predict({
            inputs: [multiInput],
            inferenceParams,
        });

        // Log the full prediction response
        console.log("Prediction response:", modelPrediction);

        // Log the entire data object
        console.log("Data object:", modelPrediction?.[0]?.data);

        // Log concepts explicitly
        const conceptsList = modelPrediction?.[0]?.data?.conceptsList;
        if (conceptsList && conceptsList.length > 0) {
            conceptsList.forEach((concept, index) => {
                console.log(`Concept ${index + 1}: ${concept.name}, Confidence: ${concept.value}`);
            });
        } else {
            console.log("No concepts found.");
        }
    } catch (error) {
        // Log full error details for better debugging
        console.error("Error making prediction:", error.response || error.message || error);
    }
}

makePrediction();