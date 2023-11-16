export default function generate_broken_rosary(targets, sender, owner, admins) {
	return ({
		"item_type": "broken_rosary",
		"image": "rosario_broken.png",
		"options": [
			{"text": "Reunite", "action":"unban"},
			{"text": "Close", "action": "close_drop"}
		],
		"target": targets,
		"sender": sender,
		"owner": owner,
		"admins": admins,
		"glow": false,
		"description": "A close remainder of the most important thing in life. It has a faint glow. You are able to distinguish a vaguely human form inside of it. Someone important to you. If you listen attentively a voice seems to be coming out of it."
	});
}
