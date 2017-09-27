var 
Campground 		=	require("../models/campground"),
passport		=	require("passport"),
express 		=	require("express"),
Comment 		=	require("../models/comment"),
router			=	express.Router(),
User 			=	require("../models/user");

/*'index.js' is a special name for the Express Module, 
wherein we need only specify the dir and index.js is automatically assumed
to be required.
Basically INDEX is a special name, where we don't need to specify it.
*/

middleware		=	require("../middleware");


//-------------------------------------------------------------------------------------------------
// 								ROUTES
//-------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------
// ROOT ROUTE
//-------------------------------------------------------------------------------------------------
router.get("/", function(req,res){
	// Note that, {currentUser: req.user} is also passed by the app.use function defined earlier.
	res.render("landing");
});


//-------------------------------------------------------------------------------------------------
//						 	AUTH ROUTES
//-------------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------
// REGISTER FORM ROUTE
//-------------------------------------------------------------------------------------------------
router.get("/register", function(req, res){
	// Note that, {currentUser: req.user} is also passed by the app.use function defined earlier.
	res.render("register")
});

//-------------------------------------------------------------------------------------------------
// SIGNUP ROUTE
//-------------------------------------------------------------------------------------------------
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log("---------------------------------------------------------------------------");
			console.log(err);
			console.log(req.body.username);			
			// The method below works better than req.flash and is less buggy.			
			return res.render("register", {"error": err.message});			
		} 
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome " + req.body.username);
			res.redirect("/campgrounds");			
		});
	});
});

//-------------------------------------------------------------------------------------------------
// SHOW LOGIN FORM
//-------------------------------------------------------------------------------------------------
router.get("/login", function(req, res){
	res.render("login");
});

//-------------------------------------------------------------------------------------------------
// HANDLING LOGIN LOGIC
//-------------------------------------------------------------------------------------------------
router.post('/login', passport.authenticate('local', 
	{
	successRedirect: '/campgrounds',
	failureRedirect: '/login' 
	}), 
	function(req, res){
		console.log(req.user.username);
	});

//-------------------------------------------------------------------------------------------------
// LOGOUT ROUTE
//-------------------------------------------------------------------------------------------------
router.get("/logout", middleware.isLoggedIn, function(req, res){
	req.logout();
	req.flash("success", "Goodbye!")	
	res.redirect("/campgrounds");
});


module.exports = router;