
//-------------------------------------------------------------------------------------------------
// REQUIRED VARS
//-------------------------------------------------------------------------------------------------

var 
Campground 		=	require("../models/campground"),
Comment 		=	require("../models/comment");


//-------------------------------------------------------------------------------------------------
// MIDDLEWARE OBJ VARIABLE
//-------------------------------------------------------------------------------------------------

var middlewareObj = {};


//-------------------------------------------------------------------------------------------------
// MIDDLEWARE
//-------------------------------------------------------------------------------------------------


middlewareObj.checkCampgroundOwnership = function(req, res, next) {
		if(req.isAuthenticated()){

			Campground.findById(req.params.id, function(err, foundCampground){
				if(err){					
					console.log(err)
					res.redirect("back");
				} else {
					// does this user own the campground?
					console.log("WE USE .equals (a mongoose function) to compare values because,"); 
					console.log("author.id = String, & user._id = Value");
					console.log("While in the console they look identical, in fact, they are not, because they are");
					console.log("different TYPES of data.");
					console.log("foundCampground.author.id.equals(req.user._id)");
					console.log("foundCampground.author.id = " + foundCampground.author.id);
					console.log("req.user._id              = " + req.user._id);
					if(foundCampground.author.id.equals(req.user._id)) {
						// 'next' is the function to be called after this middleware runs.
						next();	
					} else {						
						console.log("---------------------------------------------------------------------------");
						console.log("YOU DO NOT HAVE PERMISSION TO DO THAT!");
						res.redirect("back");
					}
					
				}
			});	

	} else {
		console.log("---------------------------------------------------------------------------");
		console.log("YOU NEED TO BE LOGGED IN TO DO THAT!!!");
		res.redirect("back");
	}	
};


middlewareObj.checkCommentOwnership = function(req, res, next) {
		if(req.isAuthenticated()){

			Comment.findById(req.params.comment_id, function(err, foundComment){
				if(err){					
					console.log(err)
					res.redirect("back");
				} else {
					// does this user own the comment?
					console.log("WE USE .equals (a mongoose function) to compare values because,"); 
					console.log("author.id = String, & user._id = Value");
					console.log("While in the console they look identical, in fact, they are not, because they are");
					console.log("different TYPES of data.");
					console.log("foundCampground.author.id.equals(req.user._id)");
					console.log("foundCampground.author.id = " + foundComment.author.id);
					console.log("req.user._id              = " + req.user._id);
					if(foundComment.author.id.equals(req.user._id)) {
						// 'next' is the function to be called after this middleware runs.
						next();	
					} else {						
						console.log("---------------------------------------------------------------------------");
						console.log("YOU DO NOT HAVE PERMISSION TO DO THAT!!!");
						res.redirect("back");
					}
					
				}
			});	

	} else {
		console.log("---------------------------------------------------------------------------");
		console.log("YOU NEED TO BE LOGGED IN TO DO THAT!!!");
		res.redirect("back");
	}	
};


//  Check to see if user is logged in.
middlewareObj.isLoggedIn = function (req, res, next){
	if(req.isAuthenticated()){
		// escape the function by executing next.
		return next();
	}
	res.redirect("/login");
};

module.exports = middlewareObj