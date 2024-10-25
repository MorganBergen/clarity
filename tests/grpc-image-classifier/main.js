const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key ba1a79a08c8b429fac27697167885767");

stub.PostModelOutputs(
    {
        // This is the model ID of a publicly available General model. 
        //  You may use any other public or custom model ID.
        model_id: "food-item-recognition",
        inputs: [{data: {image: {url: "https://samples.clarifai.com/dog2.jpeg"}}}]
    },
    metadata,
    (err, response) => {
        if (err) {
            console.log("Error: " + err);
            return;
        }

        if (response.status.code !== 10000) {
            console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
            return;
        }

        console.log("Predicted concepts, with confidence values:")
        
        for (const c of response.outputs[0].data.concepts) {
            console.log(c.name + ": " + c.value);
        }
    }
);

