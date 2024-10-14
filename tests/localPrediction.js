const clarifai = require("clarifai-nodejs");
const fs = require('fs');
const path = require('path');
const { Model } = clarifai;

const model = new Model({
    authConfig: {
        userId: "clarifai",
        appId: "main",
        pat: "1b2ea09d706a4be48ae4a0a2717f7ddf",
    },
    modelId: "food-item-recognition",
});

const imagePath = path.join(__dirname, 'meal.jpeg');

async function makePrediction() {
    try {
        const inputBytes = fs.readFileSync(imagePath);

        const modelPrediction = await model.predictByBytes({
            inputBytes,
            inputType: 'image',
        });

        console.log("Prediction response:", modelPrediction);

        const conceptsList = modelPrediction?.[0]?.data?.conceptsList;

        if (conceptsList && conceptsList.length > 0) {
            conceptsList.forEach((concept, index) => {
                console.log(`Concept ${index + 1}: ${concept.name}, Confidence: ${concept.value}`);
            });
        } else {
            console.log("No concepts found.");
        }

    } catch (error) {
        console.error("Error making prediction:", error.response || error.message || error);
    }
}

makePrediction();