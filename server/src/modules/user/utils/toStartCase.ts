export const toStartCase = (name: string) =>
	name
		.split(" ")
		.filter((word) => word !== "")
		.map((word) => {
			return word
				.trim()
				.split("")
				.map((char, i) => (i === 0 ? char.toUpperCase() : char))
				.join("");
		})
		.join(" ");
