import data from './db.json' assert { type: 'json' };

/**
 * @param services {{id: string, name: string}[]} List of services to check the uniqueness by id field
 * @returns {{ duplicates: [{ id: string, names: [string]} ]}}
 */
function checkUniqueness(services) {
	const map = {};

	for (const service of services) {
		map[service.id] = [ ...(map[service.id] || []), service.name ];
	}

	const duplicates = [];

	for (const key of Object.keys(map)) {
		if (map[key].length > 1) {
			duplicates.push({
				id: key,
				names: map[key].map(name => `"${name}"`),
			});
		}
	}

	return ({ duplicates });
}

/**
 * @param result {{ duplicates: [{ id: string, names: [string]} ]}}
 */
function throwDuplicationError(result) {
	const message = result.duplicates
		.map((current) => `id: ${current.id} \nnames: ${current.names.join(', ')}`)
		.join('\n\n');

	throw new Error(`Found duplicates in db.json: \n${message}`);
}

/**
 * Main function to check db data.
 */
function checkDb(){
	const result = checkUniqueness(data);

	if (result.duplicates.length) {
		throwDuplicationError(result);
	}
}

checkDb();