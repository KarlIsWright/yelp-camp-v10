var 
Campground 		=	require("../models/campground"),
express 		=	require("express"),
Comment 		=	require("../models/comment"),
router			=	express.Router(),
User 			=	require("../models/user");

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
router.post("/", isLoggedIn, function(req,res){
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
router.get("/new", isLoggedIn, function(req,res){
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
router.get("/:id/edit", isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err)
			res.redirect("/campgrounds")
		} else {
			res.render("campgrounds/edit", {campground: foundCampground});
		}
	});	
});

//-------------------------------------------------------------------------------------------------
// UPDATE CAMPGROUND ROUTE
//-------------------------------------------------------------------------------------------------
router.put("/:id", function(req,res){
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
// MIDDLEWARE
//-------------------------------------------------------------------------------------------------
// 'next' is the function to be called after this middleware runs.
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		// escape the function by executing next.
		return next();
	}
	res.redirect("/login");
};

module.exports = router;