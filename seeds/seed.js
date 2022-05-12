const connection = require("../config/connection");
const { Users, Thoughts } = require("../models");

let seedData = {
    userData: [{
        userName: "DanielMg96",
        email: "daniel@outlook.com",
        thoughts: []
    }],

    thoughtsData: [{
        thoughtContents: "I like black coffe with cinnamon",
        thoughtAuthor: ""
    }]
}

connection.once("open", async ()=> {

    console.log("Deleting all items on the techSocialAPI Database");
    await Users.deleteMany({});
    await Thoughts.deleteMany({});

    seedData.thoughtsData.thoughtAuthor = seedData.userData[0].userName;
    seedData.userData.thoughts = seedData.thoughtsData[0];

    console.log("================= Seeding User Data =================");
    Users.collection.insertMany(seedData.userData);
    console.log("!!!!!!!!!!! User Data Seeded Successfully !!!!!!!!!!!");
    console.log("=============== Seeding Thoughts Data ===============");
    Thoughts.collection.insertMany(seedData.thoughtsData);
    console.log("!!!!!!!!!!! Thougt Data Seeded Successfully !!!!!!!!!!");
    process.exit(0);
})