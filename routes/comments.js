var 
Campground 		=	require("../models/campground"),
express 		=	require("express"),
Comment 		=	require("../models/comment"),
router			=	express.Router({mergeParams: true}),
User 			=	require("../models/user");

//-------------------------------------------------------------------------------------------------
// COMMENTS ROUTES
//-------------------------------------------------------------------------------------------------

// "/campgrounds/:id/comments" - is prepended in the app.js file
router.get("/new", isLoggedIn, function(req, res){
	// find campground by id
	console.log(req.params.id);
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
			// Note that, {currentUser: req.user} is also passed by the app.use function defined earlier.
		}
	});	
});

//-------------------------------------------------------------------------------------------------
// COMMENTS CREATE
//-------------------------------------------------------------------------------------------------
router.post("/", isLoggedIn, function(req,res){
	//lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds")
		} else {
			console.log("---------------------------------------------------------------------------");
			console.log(req.params.id);
			console.log(req.body.comment);
			//create new comment
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					// add username and id to comment
					console.log("---------------------------------------------------------------------------");
					console.log("New comment from user, " + req.user.username);					
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					console.log(comment);
					//connect new comment to campground					
					console.log("---------------------------------------------------------------------------");					
					campground.comments.push(comment);					
					campground.save();
					console.log(campground.comments);
					//redirect campground show page
					res.redirect('/campgrounds/'+ campground._id)					
				}				
			});
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