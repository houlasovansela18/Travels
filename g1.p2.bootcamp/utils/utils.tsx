function shuffleArray(array: any[]) {
	let curId = array.length;
	// There remain elements to shuffle
	while (0 !== curId) {
		// Pick a remaining element
		let randId = Math.floor(Math.random() * curId);
		curId -= 1;
		// Swap it with the current element.
		let tmp = array[curId];
		array[curId] = array[randId];
		array[randId] = tmp;
	}
	return array;
}
const discord = "https://discord.gg/zN8jNpEaEr";
export { shuffleArray, discord };
