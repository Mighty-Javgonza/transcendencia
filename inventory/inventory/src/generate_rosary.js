export default function generate_rosary(targets, sender, owner, admins) {
	return (
	{
		"item_type": "rosary",
		"image": "rosario.png",
		"owner_options": [
			{ "text": "Elevate low member", "action": "make_admin"},
			{ "text": "Lessen high member", "action": "unmake_admin"},
			{ "text": "Forget", "action": "destroy_chat"},
		],
		"admin_options": [
			{ "text": "Alienate member", "action": "kick_member"},
			{ "text": "Securize", "action":"add_password"},
		],
		"options": [
			{"text": "Send message", "action": "send_message"},
			{"text": "View messages", "action": "view_messages"},
			{"text": "Ignore relation", "action": "ban"},
			{"text": "Observe members", "action": "display_members"},
			{"text": "Close", "action": "close_drop"}
		],
		"target": targets,
		"sender": sender,
		"owner": owner,
		"admins": admins,
		"glow": false,
		"description": "A close remainder of the most important thing in life. It has a faint glow. You are able to distinguish a vaguely human form inside of it. Someone important to you. If you listen attentively a voice seems to be coming out of it."
	}
	);
}
