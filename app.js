var express     = require("express"),
    ip 			= require("ip"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");
//-------------------------------------------------------------------------------------------------
// DECLARE ROUTES FROM ROUTES FOLDER AS VARS TO IMPORT DOWN BELOW
//-------------------------------------------------------------------------------------------------
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index"); // AKA authRoutes for authentication & misc...

//-------------------------------------------------------------------------------------------------
// CONNECT TO MONGO DB
//-------------------------------------------------------------------------------------------------
mongoose.connect('mongodb://localhost/yelp_camp_v10', {
	useMongoClient: true
});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//-------------------------------------------------------------------------------------------------
// REPLACE OLD DB DATA WITH FRESH SEED DATA
//-------------------------------------------------------------------------------------------------
// modified to wipe out all campgrounds & comments from db
// seedDB();

//-------------------------------------------------------------------------------------------------
// PASSPORT CONFIGURATION
//-------------------------------------------------------------------------------------------------
app.use(require("express-session")({
	secret: "Winston stared at the telescreen.",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// the following will pass the variable {currentUser: req.user} to every ejs route called
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});


//-------------------------------------------------------------------------------------------------
// IMPORT ROUTES IN ROUTES FOLDER
//-------------------------------------------------------------------------------------------------


app.use("/", indexRoutes);
// adding "/campgrounds" will insert /campgrounds before all the routes declared in the campgroundRoutes file.
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



//-------------------------------------------------------------------------------------------------
// START SERVER
//-------------------------------------------------------------------------------------------------
app.listen(3000, ip.loopback(), function(){
	console.log("YelpCamp Server listening on " + ip.loopback()  + ":" + 3000);
});