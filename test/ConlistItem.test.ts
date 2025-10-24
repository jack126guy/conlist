import ConlistItem from '../src/components/ConlistItem.astro';
import { type Event, type Location } from '../src/event';
import { renderToFragment } from './render';
import { describe, it, beforeAll, expect } from 'vitest';
import { type CheerioAPI } from 'cheerio';

describe('ConlistItem', () => {
	const event = {
		name: 'Examples and Hypotheticals Week 2010',
		startDate: new Date('2010-01-25'),
		endDate: new Date('2010-01-29'),
		location: {
			venue: 'Hotel California',
			locality: 'Los Angeles, California, USA',
		},
		series: 'Examples and Hypotheticals Week',
		specifier: '2010',
		genre: 'Example',
		status: 'Attending',
		notes: 'This is a test.',
		extraTags: ['Test', 'Testing'],
	} satisfies Event;
	const componentProps = { event, heading: 'h1' };
	let fragment: CheerioAPI;

	beforeAll(async () => {
		fragment = await renderToFragment(ConlistItem, componentProps);
	});

	it('renders section element', async () => {
		const rootElement = fragment(':root');
		expect(rootElement.prop('tagName')).to.equal('SECTION');
		expect(rootElement.hasClass('conlist-item')).to.be.true;
		expect(rootElement.data('status')).to.equal(event.status);
		expect(rootElement.data('genre')).to.equal(event.genre);
	});

	it('renders heading', () => {
		const heading = fragment(componentProps.heading);
		expect(heading).to.have.lengthOf(1);
		expect(heading.text()).to.equal(event.name);
	});

	it('renders genre', () => {
		const genre = fragment('.conlist-genre');
		expect(genre.text()).to.contain(event.genre);
	});

	it('does not render absent genre', async () => {
		const eventNoGenre: Event = {
			...componentProps.event,
			genre: undefined,
		};
		const props = { ...componentProps, event: eventNoGenre };

		const fragmentNoGenre = await renderToFragment(ConlistItem, props);

		const genre = fragmentNoGenre('.conlist-genre');
		expect(genre).to.have.lengthOf(0);
	});

	it('does not render attending status', () => {
		const status = fragment('.conlist-status');
		expect(status).to.have.lengthOf(0);
	});

	it('renders non-attending status', async () => {
		const eventNonAttending = {
			...componentProps.event,
			status: 'Tentative',
		};
		const props = { ...componentProps, event: eventNonAttending };

		const fragmentNonAttending = await renderToFragment(ConlistItem, props);

		const status = fragmentNonAttending('.conlist-status');
		expect(status).to.have.lengthOf(1);
		expect(status.text()).to.contain(eventNonAttending.status);
	});

	it('renders extra tags', () => {
		const extraTags = fragment('.conlist-extra-tag');
		expect(extraTags).to.have.lengthOf(event.extraTags.length);
		extraTags.each((i, tagElement) => {
			const extraTag = fragment(tagElement);
			expect(extraTag.text()).to.contain(event.extraTags[i]);
			expect(extraTag.data('tag')).to.equal(event.extraTags[i]);
		});
	});

	it('renders notes', () => {
		const notes = fragment('.conlist-notes');
		expect(notes.text()).to.contain(event.notes);
	});

	it('does not render absent notes', async () => {
		const eventNoNotes: Event = {
			...componentProps.event,
			notes: undefined,
		};
		const props = { ...componentProps, event: eventNoNotes };

		const fragmentNoNotes = await renderToFragment(ConlistItem, props);

		const genre = fragmentNoNotes('.conlist-note');
		expect(genre).to.have.lengthOf(0);
	});

	it('renders dates', async () => {
		const dateFormat = (startDate: Date, endDate: Date) =>
			`${startDate} --- ${endDate}`;
		const props = { ...componentProps, dateFormat };
		const fragmentDateFormat = await renderToFragment(ConlistItem, props);

		const date = fragmentDateFormat('.conlist-date');
		expect(date).to.have.lengthOf(1);
		expect(date.text()).to.contain(
			dateFormat(event.startDate, event.endDate)
		);
	});

	it('does not render absent dates', async () => {
		const eventNoDates: Event = {
			...componentProps.event,
			startDate: undefined,
			endDate: undefined,
		};
		const props = { ...componentProps, event: eventNoDates };

		const fragmentNoDates = await renderToFragment(ConlistItem, props);

		const date = fragmentNoDates('.conlist-date');
		expect(date).to.have.lengthOf(0);
	});

	it('renders location', async () => {
		const locationFormat = (location: Location) =>
			`${location.venue} --- ${location.locality}`;
		const props = { ...componentProps, locationFormat };
		const fragmentLocFormat = await renderToFragment(ConlistItem, props);

		const location = fragmentLocFormat('.conlist-location');
		expect(location).to.have.lengthOf(1);
		expect(location.text()).to.contain(locationFormat(event.location));
	});

	it('does not render absent location', async () => {
		const eventNoLocation: Event = {
			...componentProps.event,
			location: undefined,
		};
		const props = { ...componentProps, event: eventNoLocation };

		const fragmentNoLoc = await renderToFragment(ConlistItem, props);

		const location = fragmentNoLoc('.conlist-location');
		expect(location).to.have.lengthOf(0);
	});
});
