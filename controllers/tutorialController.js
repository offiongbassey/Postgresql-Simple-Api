const db = require("../models");
const asyncHandler = require("express-async-handler");
const { randomBytes } = require("pg/lib/crypto/utils");
const Tutorial = db.tutorials;
const Property = db.property;

const Op = db.Sequelize.Op;

exports.create = asyncHandler(async(req, res) => {
    const {title, description, published} = req.body;
    const reference = Math.floor(1818178178 + Math.random() * 90000000);
    if(!title){
        res.status(400);
        throw new Error("Title is required");
    }
    if(!description){
        res.status(400);
        throw new Error("Description is required");
    }
    if(!published){
        res.status(400);
        throw new Error("Published is required");
    }

    const tutorial = await Tutorial.create({
        title,
        description,
        published
    });
    if(tutorial){
        await Property.create({
            reference,
            userId: tutorial.id
        });
     return    res.status(201).json(tutorial);
    }else{
        res.status(500);
        throw new Error("An error Occured, please try again later");
    }
});
exports.getTutorials = asyncHandler(async(req, res) => {
    const tutorials = await Tutorial.findAll();
    if(!tutorials){
        res.status(404);
        throw new Error("Tutorials not available");
    }
    return res.status(200).json(tutorials);
});

exports.getTutorial = asyncHandler(async(req, res) => {
    const {id} = req.params;
    if(!id){
        res.status(400);
        throw new Error("Please provide an ID");
    }
    const tutorial = await Tutorial.findByPk(id);
    if(!tutorial){
        res.status(404);
        throw new Error("Tutorial not found");
    }
    return res.status(200).json(tutorial);
});

exports.updateTutorial = asyncHandler(async(req, res) => {
    const {id} = req.params;
    const {title, description, published} = req.body;
    if(!id){
        res.status(400);
        throw new Error("Please provide an ID");
    }
    if(!title){
        res.status(400);
        throw new Error("Please provide a title");
    }
    if(!description){
        res.status(400);
        throw new Error("Please provide a description");
    }
    if(!published){
        res.status(400);
        throw new Error("Please provide published details");
    }
    const tutorial = await Tutorial.findByPk(id);
    if(!tutorial){
        res.status(404);
        throw new Error("Sorry, Tutorial not found");
    }
    tutorial.title = title;
    tutorial.description = description;
    tutorial.published = published;

    const updatedTutorial = tutorial.save();
    if(updatedTutorial){
      return  res.status(200).json({message: "Tutorial Updated successfully"});
    }else{
        res.status(500);
        throw new Error("Sorry, an error occured. Please ty again later");
    }
    
});

exports.deleteTutorial = asyncHandler(async(req, res) => {
    const {id} = req.params;
    const tutorial = await Tutorial.findByPk(id);
    if(!tutorial){
        res.status(404);
        throw new Error("Sorry, Tutorial not found");
    }
    const removeTutorial = tutorial.destroy();
    if(removeTutorial){
        return res.status(200).json({message: "Tutorial Deleted successfully"});
    }else{
        res.status(500);
        throw new Error("Sorry, an error occured, please try again later");
    }

})