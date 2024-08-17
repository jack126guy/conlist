export interface Event {
	name: string;
	startDate?: Date;
	endDate?: Date;
	location?: Location;
	series: string;
	specifier: string;
	genre?: string;
	status: string;
	notes?: string;
	extraTags?: string[];
}

export interface Location {
	venue?: string;
	locality?: string;
}

export function getEventsByYear(
	sortedEvents: (Event & { startDate: Date })[]
): { year: number; events: Event[] }[] {
	const eventsByYear: { year: number; events: Event[] }[] = [];
	let currentYear: { year: number; events: Event[] } | null = null;
	sortedEvents.forEach((e) => {
		if (currentYear?.year !== e.startDate.getFullYear()) {
			if (currentYear !== null) {
				eventsByYear.push(currentYear);
			}
			currentYear = { year: e.startDate.getFullYear(), events: [] };
		}
		currentYear.events.push(e);
	});
	if (currentYear !== null) {
		eventsByYear.push(currentYear);
	}
	return eventsByYear;
}
