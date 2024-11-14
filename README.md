# Conlist

Conlist is a set of [Astro](https://astro.build/) components for presenting a list of appearances at conferences, conventions, and other similar events.

## Requirements

Conlist is written for Astro 4.

## Usage

Conlist provides separate components to present lists of events by date, either past events, future vents, or undated events (e.g., upcoming events whose dates are to be determined).

```
---
import { ConlistFuture } from '@halfgray/conlist';

const events = [
	// ...
];
const dateCutoff = new Date();
const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: 'short' });
const locationFormat = (location) => location.locality; // Suppose that the locality is more important
---

<h1>Future Events</h1>
<ConlistFuture
	events={events}
	dateCutoff={dateCutoff}
	eventHeading="h2"
	dateFormat={dateFormat}
	locationFormat={locationFormat}
/>

<h1>Past Events</h1>
<ConlistPast
	events={events}
	dateCutoff={dateCutoff}
	yearHeading="h2"
	eventHeading="h3"
	dateFormat={dateFormat}
	locationFormat={locationFormat}
/>

<h1>Undated Events</h1>
<ConlistUndated
	events={events}
	eventHeading="h2"
	locationFormat={locationFormat}
/>
```

The list components take the following props:

* **events**: Array of event objects (refer to the following section for the format of the events)
* **dateCutoff**: (ConlistPast and ConlistFuture only) Date separating past and future events. The start date is used to make the separation, and a start date that exactly matches the cutoff is considered "future." (There is currently no concept of a "present" event.)
* **eventHeading**: HTML element name (string) or Astro component for the headings. The heading will contain the name of the event.
* **yearHeading**: (ConlistPast only) HTML element name (string) or Astro component for grouping events by year
* **dateFormat**: (ConlistPast and ConlistFuture only; optional) Function taking two arguments (start and end dates) and returning a string representation of the date or date range, or alternatively an `Intl.DateTimeFormat`. The default is an `Intl.DateTimeFormat` for the default locale using the "long" date style.
* **locationFormat**: (Optional) Function taking a location object and returning a string representation of the location. The default is "Venue (Locality)" (assuming both are provided).

### Event Format

Conlist components take an array of event objects, where each object follows the following format:

```
{
	// Name of event
	name: 'Examples and Hypotheticals Week 2010',

	// Dates (end date is optional; only a start date indicates a one-day event)
	startDate: new Date('2010-01-25'),
	endDate: new Date('2010-01-29'),

	// Location
	location: {
		// Specific location such as a conference center or hotel
		venue: 'Hotel California',
		// City, town, or other locality
		locality: 'Los Angeles, California, USA',
	},

	// Name of a overarching group of events, such as for recurring events
	series: 'Examples and Hypotheticals Week',

	// Indicator to distinguish this event within the series
	specifier: '2010',

	// Type of event (specific industry, community, theme, etc.)
	genre: 'Example',

	// One of "Attending", "Tentative", or "Not Attending"; can be used to note cancelled appearances
	status: 'Attending',

	// Additional remarks about the appearance
	notes: 'Presenting a special session on creating examples',

	// Short remarks to highlight; presented alongside the genre
	extraTags: ['Special Guest'],
}
```

## License

Conlist is available under the MIT License. Refer to `LICENSE.txt` for details.
