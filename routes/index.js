var 
Campground 		=	require("../models/campground"),
passport		=	require("passport"),
express 		=	require("express"),
Comment 		=	require("../models/comment"),
router			=	express.Router(),
User 			=	require("../models/user");

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
			console.log(req.body.password);
			return res.render("register");
		} 
		passport.authenticate("local")(req, res, function(){
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
	}), function(req, res){
			console.log(req.user.username);	
		});

//-------------------------------------------------------------------------------------------------
// LOGOUT ROUTE
//-------------------------------------------------------------------------------------------------
router.get("/logout", isLoggedIn, function(req, res){
	req.logout();
	res.redirect("/campgrounds");
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