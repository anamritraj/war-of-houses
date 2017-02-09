export class User{
	ec_id:string;
	name: string;
	house_name: string;
	food:number;
	gold:number;
	wood:number;
	turns:number;
	army:number;
	artillary:number;
	wall:number;
	attack:number;
	defence:number;
	fb_access_token: string;
	can_be_attacked:number;
	last_turn_refreshed:number;

	constructor(){
		this.ec_id = null;
		this.house_name = null;
		this.name = null;
		this.food = null;
		this.gold = null;
		this.wood = null;
		this.turns = null;
		this.army = null;
		this.artillary = null;
		this.wall = null;
		this.attack = null;
		this.defence = null;
		this.fb_access_token = null;
		this.can_be_attacked = null;
		this.last_turn_refreshed = null;
	}
};