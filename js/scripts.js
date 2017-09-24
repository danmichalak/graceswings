// Misc functions and events
function getShipNote(char1, char2) {
	
	// Compiles a list of possible shippinh messages based on the two random characters

	var str = new Array();

	if (char1["shortName"] == char2["shortName"]) {
		
		str.push("Looks like we have a narcissist here...");
		str.push("Mirror, mirror, on the wall...");

	} else if (matchEither(char1, char2, "shortName", "jim")) {
		str.push("How would that even WORK!?");

		if (matchEither(char1, char2, "gender", "f")) {
			str.push("A private screening of Fisherman's Wife, and Fisherman's Wife II: The Re-Tentacling");
			str.push("I've seen enough hentai to know where this is going!");

			if (matchEither(char1, char2, "shortName", "nadia")) {
				str.push("I can't get you out of my head...");
			}
		}

	// "Incest check"
	} else if (matchEither(char1, char2, "shortName", "nadia") && matchEither(char1, char2, "shortName", "nikail")) {
		str.push("Ooof, getting a little Game of Thrones over here...");
	} else {

		// Specific characters and specific pairings
		if (matchEither(char1, char2, "shortName", "nadia")) {
			str.push("Out of all the ghosts, only you can be my boo...");

			if (matchEither(char1, char2, "shortName", "josephine")) {
				str.push("I think of all the education that I missed, but then my homework was never quite like this!");
			}

			if (matchEither(char1, char2, "shortName", "malcolm")) {
				str.push("Fuck that guy, but also FUCK that guy. You feel?");
				str.push("What are you gonna do? Tell my fortune?");
			}

			if (matchEither(char1, char2, "shortName", "jax")) {
				str.push("Tall nerds");
			}

			if (matchEither(char1, char2, "shortName", "adele")) {
				str.push("Ship Name: #2Spooky");
			}

			if (matchEither(char1, char2, "shortName", "adder")) {
				str.push("Ship Name: Groupies");
			}
		}

		if (matchEither(char1, char2, "shortName", "josephine")) {
			if (matchEither(char1, char2, "group", "Vampires")) {
				str.push("I think this is a violation of the Sanguine Pact...");
			}
		}

		if (matchEither(char1, char2, "shortName", "malcolm")) {
				if (matchEither(char1, char2, "shortName", "layla")) {
					str.push("Ship Name: Synergy");
				}
			}

		if (matchEither(char1, char2, "shortName", "jax")) {
			str.push("Kiss me, I'm irish.");

			if (matchEither(char1, char2, "shortName", "zeke")) {
				str.push("Guy love! That's all it is! Guy love! He's mine, I'm his!");
			}

			if (matchEither(char1, char2, "shortName", "tohane")) {
				str.push("He offhandedly called her cute once, that means it's CANON");
			}
		}

		if (matchEither(char1, char2, "shortName", "tohane") || matchEither(char1, char2, "shortName", "trish")) {
			str.push("It seems you're suffering from a lack of vitamin ME");
			str.push("Is your name Flecainide? Because I think you just made my heart skip a beat...");
			str.push("Are you a pulmonary embolism? Because I can't breathe when I'm around you...");
			str.push("Are you my Appendix? Because I have a funny feeling in my stomach that makes me feel like I should take you out...");
			str.push("My sudden protracted cardiac arrhythmia makes me think I'm falling for you...");
			str.push("How about we ditch this joint and go study some anatomy?");

			if (matchEither(char1, char2, "shortName", "tohane") && matchEither(char1, char2, "shortName", "zeke")) {
				str.push("Smol nerds");
			}

			if (!matchEither(char1, char2, "shortName", "nadia")) {
				str.push("Does your left eye hurt? Cause you've been looking right all day...");
			}
		}

		if (matchEither(char1, char2, "shortName", "adele")) {
			if (matchEither(char1, char2, "shortName", "adder")) {
				str.push("COCAINE AND SPEED METAL");
			}
		}

		if (matchEither(char1, char2, "shortName", "adder")) {
			str.push("Smash the state, but baby, don’t smash my heart.");

			if (matchEither(char1, char2, "shortName", "lily")) {
				str.push("Ship Name: Punk/Rock");
			}
		}

		if (matchEither(char1, char2, "shortName", "lily")) {
			str.push("Stone-cold sexy!");
		}

		if (matchEither(char1, char2, "shortName", "nick")) {
			str.push("I already know your fortune and I’m in your future...");
		}

		if (matchEither(char1, char2, "shortName", "layla")) {
			if (matchEither(char1, char2, "shortName", "badru")) {
				str.push("Power couple of the millenium!");
				str.push("Looks like those 6000 years of couples counseling really paid off!");
			} else {
				str.push("Don't tell Badru!");
			}
		}

		if (matchEither(char1, char2, "shortName", "badru")) {
			if (matchEither(char1, char2, "shortName", "layla")) {
				str.push("Don't tell Layla!");
			}
		}

		if (matchBoth(char1, char2, "gender", "f") || matchBoth(char1, char2, "gender", "m")) {
			str.push("Sounds gay. I'M IN");

			if (matchBoth(char1, char2, "gender", "f")) {
				str.push("But that's FORBIDDEN love!");
				str.push("Girls can't love girls!");
			}
		}

		if (matchBoth(char1, char2, "group", "Sera Corp")) {
			str.push("Can I file a workplace safety report? Because I think I just fell for you...");

			if ((matchEither(char1, char2, "shortName", "malcolm") && !matchEither(char1, char2, "shortName", "zielkman")) ||
				(matchEither(char1, char2, "shortName", "zielkman") && !matchEither(char1, char2, "shortName", "malcolm"))) {
				str.push("S-Senpai, I...");
			}
		}

		if (matchBoth(char1, char2, "group", "Vampires")) {
			str.push("Does that coffin have room for two?");
			str.push("You wanna go out for a bite?");
		
			if ((matchEither(char1, char2, "shortName", "layla") && !matchEither(char1, char2, "shortName", "badru")) ||
				(matchEither(char1, char2, "shortName", "badru") && !matchEither(char1, char2, "shortName", "layla"))) {
				str.push("S-Senpai, I...");
			}
		}

	}

	// Returns a specific messages if the character pairing has no associated messages
	// Otherwise, returns a random message based on the pairing

	if (str.length == 0) {
		return "Nothing here yet...";
	} else {
		var rand = Math.floor(Math.random() * str.length);
		return str[rand];
	}
}

// Function to check if one character has a matching value to one of their properties (name, group, etc)
// This works well with nesting / operators
// For example, checking if one character's name is Nadia and one character's name is Adele
function matchEither(char1, char2, attr, val) {
	if (char1[attr] == val || char2[attr] == val) {
		return true;
	} else {
		return false;
	}
}

// Function to check if both character has a matching value to one of their properties (name, group, etc)
function matchBoth(char1, char2, attr, val) {
	if (char1[attr] == val && char2[attr] == val) {
		return true;
	} else {
		return false;
	}
}