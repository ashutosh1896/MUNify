const express = require('express');
const router = express.Router({ mergeParams: true });
const Conference = require("../models/conference.js");
const wrapAsync = require('../util/wrapAsync.js');
const ExpressError = require('../util/ExpressError.js');

//index
router.get("/", wrapAsync( async (req,res)=>{
 const allConferences = await Conference.find({});
 res.render("./conferences/index.ejs",{allConferences})
}));

//new route
router.get("/new",(req,res)=>{
    res.render("conferences/new.ejs");
});

//create route
router.post("/", wrapAsync( async (req,res)=>{
    const newConference = new Conference(req.body.conference);
    await newConference.save();
    res.redirect("/conferences");
}));

//edit route
router.get("/:id/edit", wrapAsync( async (req,res)=>{
    let{id} = req.params;
    const conference = await Conference.findById(id);
    // if(!listing){
    //     req.flash("error", "Listing does not exist");
    //     return res.redirect("/listings");
    // }
    res.render("conferences/edit.ejs",{conference});
}));

//update route
router.put("/:id", wrapAsync( async (req,res)=>{
    let{id} = req.params;
    await Conference.findByIdAndUpdate(id, {...req.body.conference});
    res.redirect(`/conferences/${id}`);
}));

//show route
router.get("/:id", wrapAsync(async (req,res)=>{
    let{id}= req.params;
    const conference = await Conference.findById(id);
    // if(!conference){
    //     req.flash("error", "Listing does not exist");
    //     return res.redirect("/listings");
    // }
    res.render("conferences/show.ejs",{conference});
}));



//delete route
router.delete("/:id", wrapAsync( async (req,res)=>{
    let{id} = req.params;
    let deletedConference = await Conference.findByIdAndDelete(id);
    res.redirect("/conferences");
}));

module.exports = router;