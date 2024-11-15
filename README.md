# Conlist

Conlist is a set of [Astro](https://astro.build/) components for presenting a list of appearances at conferences, conventions, and other similar events.

## Requirements

Conlist is written for Astro 4.

## Usage

Conlist provides separate components to present lists of events by date, either past events, future vents, or undated events (e.g., upcoming events whose dates are to be determined).

```
---
import { ConlistFuture, ConlistPast, ConlistUndated } from '@halfgray/conlist';

const events = [
	// ...
];
const dateCutoff = new Date();
const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: 'short' });
const locationFormat = (location) => location.locality; // Example format, supposing that the locality is more important
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

In addition, each list component has an `empty-message` slot to optionally display a message if no events are presented through that component.

The `ConlistItem` component can be used directly to render a single event:

```
---
import { ConlistItem } from '@halfgray/conlist';

const event = { /* ... */ };
const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: 'short' });
const locationFormat = (location) => location.locality;
---

<ConlistItem
	event={event}
	heading="h1"
	dateFormat={dateFormat}
	locationFormat={locationFormat}
/>
```

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

### Custom Styles

Conlist includes a minimal set of styles, but additional styles can be defined. Each part has a class for easy selection in CSS.

One area you may wish to customize is colors for extra tags, as they do not have any special colors defined by default:

```
.conlist-extra-tag {
	background-color: #ccc; /* Set a background color for all extra tags */
}
.conlist-extra-tag[data-tag='Special Guest'] {
	background-color: #8f8; /* Set a background color for a specific extra tag */
}
```

Classes include:

* **conlist-item**: The entire event; element has `data-genre` and `data-status` attributes for more specific customization
* **conlist-name**: Event name
* **conlist-genre**: Genre
* **conlist-status**: Status indication
* **conlist-extra-tag**: Extra tag; element has `data-tag` attribute for more specific customization
* **conlist-notes**: Additional remarks
* **conlist-date**: Dates
* **conlist-location**: Location

## License

Conlist is available under the MIT License. Refer to `LICENSE.txt` for details.
