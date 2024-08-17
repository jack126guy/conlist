import { type Location } from './event';

export type DateFormat =
	| Intl.DateTimeFormat
	| ((startDate: Date, endDate?: Date) => string);

export type LocationFormat = (location: Location) => string;

const defaultDateFormat = new Intl.DateTimeFormat(undefined, {
	dateStyle: 'long',
	timeZone: 'UTC',
});

function defaultLocationFormat({ venue, locality }: Location): string {
	if (venue && locality) {
		return `${venue} (${locality})`;
	} else if (venue) {
		return venue;
	} else if (locality) {
		return locality;
	} else {
		return '';
	}
}

export function formatDate(
	dateFormat: DateFormat | undefined,
	startDate: Date,
	endDate: Date | undefined
): string {
	if (typeof dateFormat === 'function') {
		return dateFormat(startDate, endDate);
	} else {
		const resolvedDateFormat = dateFormat || defaultDateFormat;
		return endDate
			? resolvedDateFormat.formatRange(startDate, endDate)
			: resolvedDateFormat.format(startDate);
	}
}

export function formatLocation(
	locationFormat: LocationFormat | undefined,
	location: Location
) {
	const resolvedLocationFormat = locationFormat || defaultLocationFormat;
	return resolvedLocationFormat(location);
}
