export default function generate_pearl(sender, target) {
	return (
	{
		"item_type": "pearl",
		"image": "perla.png",
		"options": [
			{"text": "Send message", "action": "send_message"},
			{"text": "View messages", "action": "view_messages"},
			{"text": "Abandon relation", "action": "ban"},
			{"text": "Securize", "action":"add_password"},
			{"text": "Close", "action": "close_drop"}
		],
		"target": target,
		"sender": sender,
		"glow": false,
		"description": "A close remainder of the most important thing in life. It has a faint glow. You are able to distinguish a vaguely human form inside of it. Someone important to you. If you listen attentively a voice seems to be coming out of it."
	}
	);
}
