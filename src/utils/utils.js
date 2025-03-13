export const isOrDefault = (value, predicate, defaultValue, clb) => {
	if (predicate(value)) return value;

	clb && clb();
 
	return defaultValue;
}

export const oneOf = (...args) => value => args.includes(value);

export const not = predicate => value => !predicate(value);

export const numberOrNull = value => isNaN(value) ? null : value;

export const parseJson = json => {
	try {
		return JSON.parse(json);
	} catch (_) {
		return json;
	}
}