export const escapeTag = (text: string) => {
	var charsToReplace: any = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&#34;",
	};
	const fixedText = text.replace(/[&<>"]/g, (tag) => {
		return charsToReplace[tag] || tag;
	});
	return fixedText;
};
