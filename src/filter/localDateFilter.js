export function localDateFilter(inputDate, currentLanguage) {
	let date = new Date(inputDate);
	let options = { year: 'numeric', month: 'long', day: 'numeric' };

	return date.toLocaleDateString(currentLanguage, options);
}