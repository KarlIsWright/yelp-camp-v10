var 
Campground 		=	require("../models/campground"),
express 		=	require("express"),
Comment 		=	require("../models/comment"),
router			=	express.Router(),
User 			=	require("../models/user"),

/*'index.js' is a special name for the Express Module, 
wherein we need only specify the dir and index.js is automatically assumed
to be required.
Basically INDEX is a special name, where we don't need to specify it.
*/

middleware		=	require("../middleware");

//-------------------------------------------------------------------------------------------------
// INDEX - SHOW ALL DATA
//-------------------------------------------------------------------------------------------------
router.get("/", function(req,res){
		console.log("---------------------------------------------------------------------------");
		console.log("current user is, " + req.user);
		// GET ALL CAMPGROUNDS FROM DB
		Campground.find({}, function(err, allCampgrounds){
			if(err){
			console.log(err);
		} else {
		// Note that, {currentUser: req.user} is also passed by the app.use function defined earlier.			
			res.render("campgrounds/index", {campgrounds:allCampgrounds});
		}
	});
	
});
//-------------------------------------------------------------------------------------------------
// CREATE - ADD NEW DATA TO DB
//-------------------------------------------------------------------------------------------------
router.post("/", middleware.isLoggedIn, function(req,res){
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name:name, image:image, description:desc, author:author}
	console.log("---------------------------------------------------------------------------");
	console.log("current user is, " + req.user.username);

	// CREATE A NEW CAMPGROUND AND SAVE TO DB
	Campground.create(newCampground, function(err, newCreatedCampground){
			if(err){
			console.log(err);
		} else {
			// redirect back to campgrounds page
			res.redirect("/campgrounds");
			console.log(newCreatedCampground);
		}
	});
});
//-------------------------------------------------------------------------------------------------
// NEW - ADD NEW CAMPGROUND ROUTE TO DB
//-------------------------------------------------------------------------------------------------
router.get("/new", middleware.isLoggedIn, function(req,res){
	res.render("campgrounds/new");
});


//-------------------------------------------------------------------------------------------------
// SHOW - SHOWS MORE INFO ABOUT ONE CAMPGROUND
//-------------------------------------------------------------------------------------------------
router.get("/:id", function(req, res){
	//find campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			console.log("---------------------------------------------------------------------------");
			console.log("Name: " + foundCampground.name);
			console.log("Comments: " + foundCampground.comments);			
			//render the show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});			
			// Note that, {currentUser: req.user} is also passed by the app.use function defined earlier.
		}
	});
});

//-------------------------------------------------------------------------------------------------
// EDIT CAMPGROUND ROUTE
//-------------------------------------------------------------------------------------------------
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
			Campground.findById(req.params.id, function(err, foundCampground){
					res.render("campgrounds/edit", {campground: foundCampground});	
			});
});

//-------------------------------------------------------------------------------------------------
// UPDATE CAMPGROUND ROUTE
//-------------------------------------------------------------------------------------------------
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
	// find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			console.log(err)
			res.redirect("/campgrounds");
		} else {
			// redirectback to the campground
			res.redirect("/campgrounds/" + req.params.id);
		}
	});	
});

//-------------------------------------------------------------------------------------------------
// DESTROY CAMPGROUND ROUTE
//-------------------------------------------------------------------------------------------------
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});





module.exports = router;