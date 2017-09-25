/**
 * 
 */
 //-------------------------------------------------------------------------------------------------
 // DEFINE REQUIREMENTS
 //-------------------------------------------------------------------------------------------------
var mongoose 	= require("mongoose"),
Campground 		= require("./models/campground"),
Comment      	= require("./models/comment");

//-------------------------------------------------------------------------------------------------
// DEFINE SEED VARIABLE
//-------------------------------------------------------------------------------------------------
var data = [
	{
	name: "Cloud's Rest",
	image: "https://static1.squarespace.com/static/5346a846e4b0101b157468cf/t/58acd66ad1758e55955e6f66/1487725442505/",
	description: "Lorem ipsum dolor sit amet, ad sea graeci dictas, eum nostrum persecuti no. Pri ut quas iriure concludaturque, no eos nostro vocent. Usu abhorreant expetendis disputando ei, in augue argumentum reprehendunt his. Per ad offendit insolens vituperatoribus, in vim atomorum intellegam, nam ipsum feugait et. Nec moderatius intellegebat id.  Per at alii iracundia, posse intellegam eos ei, ne mei veritus perfecto electram. Ei has nominavi maiestatis. Cu mel ocurreret honestatis, no eum luptatum elaboraret. Et duo option referrentur, quo solet oratio detraxit an, nonumes omittam consectetuer his et. Ea mollis blandit usu, vix theophrastus mediocritatem ex.  Brute ludus pro cu, ut insolens cotidieque vix. Ne blandit accumsan antiopam eos. Vis ex populo option. No tantas disputationi sit.  Est id porro latine partiendo, mea ut probo vituperatoribus. Nonumes suscipit partiendo ius no, in vis dolorum facilis accusamus. Has et gubergren consequat, his ex porro phaedrum invenire. Duo legere consectetuer ex. Ei vix tation constituam definitionem, sit at utinam dolores concludaturque, tollit quidam nec ea.  Est deleniti invenire in, putant vocibus oporteat sit at, vide saperet urbanitas vix id. Cum atqui quando euismod et, id pri delectus sadipscing. Per eruditi dignissim theophrastus in. Mollis senserit vituperata vel ex, pri dicam suscipit ea, eum te nullam feugiat. Inani torquatos ex nam, et has etiam iisque recusabo."
	},
	{
	name: "Squirrle Cabin",
	image: "http://i.imgur.com/7rBChAx.jpg",
	description: "Lorem ipsum dolor sit amet, ad sea graeci dictas, eum nostrum persecuti no. Pri ut quas iriure concludaturque, no eos nostro vocent. Usu abhorreant expetendis disputando ei, in augue argumentum reprehendunt his. Per ad offendit insolens vituperatoribus, in vim atomorum intellegam, nam ipsum feugait et. Nec moderatius intellegebat id.  Per at alii iracundia, posse intellegam eos ei, ne mei veritus perfecto electram. Ei has nominavi maiestatis. Cu mel ocurreret honestatis, no eum luptatum elaboraret. Et duo option referrentur, quo solet oratio detraxit an, nonumes omittam consectetuer his et. Ea mollis blandit usu, vix theophrastus mediocritatem ex.  Brute ludus pro cu, ut insolens cotidieque vix. Ne blandit accumsan antiopam eos. Vis ex populo option. No tantas disputationi sit.  Est id porro latine partiendo, mea ut probo vituperatoribus. Nonumes suscipit partiendo ius no, in vis dolorum facilis accusamus. Has et gubergren consequat, his ex porro phaedrum invenire. Duo legere consectetuer ex. Ei vix tation constituam definitionem, sit at utinam dolores concludaturque, tollit quidam nec ea.  Est deleniti invenire in, putant vocibus oporteat sit at, vide saperet urbanitas vix id. Cum atqui quando euismod et, id pri delectus sadipscing. Per eruditi dignissim theophrastus in. Mollis senserit vituperata vel ex, pri dicam suscipit ea, eum te nullam feugiat. Inani torquatos ex nam, et has etiam iisque recusabo."
	},
	{
	name: "Miner's Canyon",
	image: "http://i.imgur.com/veatX2V.jpg",
	description: "Lorem ipsum dolor sit amet, ad sea graeci dictas, eum nostrum persecuti no. Pri ut quas iriure concludaturque, no eos nostro vocent. Usu abhorreant expetendis disputando ei, in augue argumentum reprehendunt his. Per ad offendit insolens vituperatoribus, in vim atomorum intellegam, nam ipsum feugait et. Nec moderatius intellegebat id.  Per at alii iracundia, posse intellegam eos ei, ne mei veritus perfecto electram. Ei has nominavi maiestatis. Cu mel ocurreret honestatis, no eum luptatum elaboraret. Et duo option referrentur, quo solet oratio detraxit an, nonumes omittam consectetuer his et. Ea mollis blandit usu, vix theophrastus mediocritatem ex.  Brute ludus pro cu, ut insolens cotidieque vix. Ne blandit accumsan antiopam eos. Vis ex populo option. No tantas disputationi sit.  Est id porro latine partiendo, mea ut probo vituperatoribus. Nonumes suscipit partiendo ius no, in vis dolorum facilis accusamus. Has et gubergren consequat, his ex porro phaedrum invenire. Duo legere consectetuer ex. Ei vix tation constituam definitionem, sit at utinam dolores concludaturque, tollit quidam nec ea.  Est deleniti invenire in, putant vocibus oporteat sit at, vide saperet urbanitas vix id. Cum atqui quando euismod et, id pri delectus sadipscing. Per eruditi dignissim theophrastus in. Mollis senserit vituperata vel ex, pri dicam suscipit ea, eum te nullam feugiat. Inani torquatos ex nam, et has etiam iisque recusabo."
	}
];

/*
THE SEEDDB FUNCTION REMOVES ALL EXISTING CAMPGROUNDS,

Campground.remove({}, | first input {} is blank because we're not inputing anything.


HOWEVER, WE ALSO WANT SEEDB TO CREATE NEW CAMPGROUNDS.

Campground.create(seed,

THE ONLY WAY TO ENSURE THAT THE CREATE FUNCTION RUNS JUST AFTER THE REMOVE FUNCTION, IS TO PLACE
THE CREATE FUNCTION INSIDE OF THE CALLBACK FOR THE REMOVE FUNCTION.

ie. Campground.create (seed, CALL-BACK-GOES-HERE)
*/

//-------------------------------------------------------------------------------------------------
// CALL MAIN FUNCTION
//-------------------------------------------------------------------------------------------------
function seedDB(){
//-------------------------------------------------------------------------------------------------
// REMOVE ALL CAMPGROUNDS & COMMENTS
//-------------------------------------------------------------------------------------------------
// Meet the new boss, same as the old boss
Campground.remove({}, function (err){
	if(err){
		console.log(err)
		
	} else {
	console.log("----------------------------------------------------------------------------");
	console.log("removed campgrounds!");
	Comment.remove({}, function(err){
		if(err){
			console.log(err)	
		} else {
			console.log("----------------------------------------------------------------------------");
			console.log("removed comments!");
		}
		})
	};
});
};



// This is the old code
/*Campground.remove({}, function (err){
	if(err){
		console.log(err)
		
	} else {
	console.log("removed campgrounds!");
	Comment.remove({}, function(err){
		if(err){
			console.log(err)	
		} else {
			console.log("------------------------------------------------------------------------------------");
			console.log("removed comments!");
			//-------------------------------------------------------------------------------------------------
			// ADD A FEW CAMPGROUNDS
			//-------------------------------------------------------------------------------------------------
			data.forEach(function(seed){
				Campground.create(seed, function(err, campground){
					if(err){
						console.log(err)
					} else {
						console.log("------------------------------------------------------------------------------------");
						console.log("Added a new campground.")
						//-------------------------------------------------------------------------------------------------
						// ADD A NEW COMMENT
						//-------------------------------------------------------------------------------------------------
						Comment.create(
							{
								text: "Boooooooooring!",
								author: "Homer Simpson"
							}, function(err, comment){
								if(err) {
									console.log(err);
								} else {
									// IN THIS COMMAND WE ADD A NEW PROPERTY, comments, TO THE CAMPGROUND OBJECT IN MONGODB
									campground.comments.push(comment); 
									campground.save();
									console.log("------------------------------------------------------------------------------------");
									console.log("Created a new comment.");
								}

							});
					}
				});	
			});

		}
		
	});

		}
	});
};*/

//-------------------------------------------------------------------------------------------------
// RETURN MAIN FUNCTION RESULTS BACK TO APP.JS
//-------------------------------------------------------------------------------------------------
module.exports = seedDB;