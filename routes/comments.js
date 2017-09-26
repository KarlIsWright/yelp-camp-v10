var 
Campground 		=	require("../models/campground"),
express 		=	require("express"),
Comment 		=	require("../models/comment"),
router			=	express.Router({mergeParams: true}),
User 			=	require("../models/user"),

/*'index.js' is a special name for the Express Module, 
wherein we need only specify the dir and index.js is automatically assumed
to be required.
Basically INDEX is a special name, where we don't need to specify it.
*/

middleware		=	require("../middleware");


//-------------------------------------------------------------------------------------------------
// 							COMMENTS ROUTES
//-------------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------
// NEW COMMENT SUBMITION PAGE
//-------------------------------------------------------------------------------------------------

// "/campgrounds/:id/comments" - is prepended in the app.js file
router.get("/new", middleware.isLoggedIn, function(req, res){
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
router.post("/", middleware.isLoggedIn, function(req,res){
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
// EDIT COMMENT ROUTE
//-------------------------------------------------------------------------------------------------
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");					
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});	
		}
	});
});


//-------------------------------------------------------------------------------------------------
// UPDATE COMMENT ROUTE
//-------------------------------------------------------------------------------------------------
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	// find and update the correct comment
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			console.log(err)
			res.redirect("back");
		} else {
			// redirectback to the campground
			res.redirect("/campgrounds/" + req.params.id);
		}
	});	
});

//-------------------------------------------------------------------------------------------------
// DESTROY COMMENT ROUTE
//-------------------------------------------------------------------------------------------------
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			console.log(err)
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});



module.exports = router;