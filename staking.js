//VARIABLES
var hit_chance = 0.5;
var max_turns = 10;	
var player_score = 0;
var computer_score = 0;

//OBJECTS
var player = {
	name: "Jón Bjarni",
	health: 99,
	damage: Damage(0, 20),
	chance_on_hit: Math.random(),
	gold: 1000,
	skill_points: 10
}

var minion = {
	name: "Minion level 1",
	health: 99,
	damage: Damage(0, 20),
	chance_on_hit: Math.random()
}

var Troll = {
	name: "Troll level 1",
	health: 99,
	damage: Damage(0, 20),
	chance_on_hit: Math.random()
}

var Giant = {
	name: "Giant level 3",
	health: 99,
	damage: Damage(0, 20),
	chance_on_hit: Math.random()
}
//FUNCTIONS

function Damage(min, max){
	return Math.floor(Math.random() * (max - min) + min);
}

function TakeTurn(){
	max_turns -= 1;
	player.damage = Damage(0, 20);
	player.chance_on_hit = Math.random();
	minion.damage = Damage(0, 20);
	minion.chance_on_hit = Math.random();
	UpdateScreen();
}

function UpdateScreen(){
	$(".turns_left").text("Turns left:  " + max_turns);
	if(max_turns > 0){
		if(player.chance_on_hit > hit_chance){
			minion.health = minion.health - player.damage;
			var p_combat_log = "You did " + player.damage + " damage to the computer!"
			$(".theGame .player_log").text(p_combat_log);
			$(".theGame .stats .computer_stats").text("Computer health: " + minion.health);
		}else{
			$(".theGame .player_log").text("You missed, you do no damage!");
		}

		if(minion.chance_on_hit > hit_chance){
			player.health = player.health - minion.damage;
			var c_combat_log = "The computer did " + minion.damage + " damage to you!";
			$(".theGame .computer_log").text(c_combat_log);
			$(".theGame .stats .player_stats").text("Your health: " + player.health);
		}else{
			$(".theGame .computer_log").text("The computer missed, you take no damage!");
		}
	}else{
		$("#play").toggle();
		$(".theGame").hide();
		$(".game_over").show();
	}
}

function init(){
	$(".theGame .stats .player_stats").text("Your health: " + player.health);
	$(".theGame .stats .computer_stats").text("Computer health " + minion.health);
	$(".board .info .versus .player").text(player.name);
	$(".board .info .versus .oppenent").text(minion.name);
	$(".turns_left").text("Turns left: " + max_turns);
}

//MAIN
$(document).ready(function(){
	init();
	$("#play").on("click", function(){
		TakeTurn();
	});
});//