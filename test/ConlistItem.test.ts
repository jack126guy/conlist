import ConlistItem from '../src/components/ConlistItem.astro';
import { type Event, type Location } from '../src/event';
import { renderToFragment } from './render';
import { describe, it, expect } from 'vitest';

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

describe('ConlistItem', () => {
	it('renders section element', async () => {
		const fragment = await renderToFragment(ConlistItem, componentProps);

		const rootElement = fragment(':root');
		expect(rootElement.prop('tagName')).to.equal('SECTION');
		expect(rootElement.hasClass('conlist-item')).to.be.true;
		expect(rootElement.data('status')).to.equal(event.status);
		expect(rootElement.data('genre')).to.equal(event.genre);
	});

	it('renders heading', async () => {
		const fragment = await renderToFragment(ConlistItem, componentProps);

		const heading = fragment(componentProps.heading);
		expect(heading).to.have.lengthOf(1);
		expect(heading.text()).to.equal(event.name);
	});

	it('renders genre', async () => {
		const fragment = await renderToFragment(ConlistItem, componentProps);

		const genre = fragment('.conlist-genre');
		expect(genre.text()).to.contain(event.genre);
	});

	it('does not render absent genre', async () => {
		const eventNoGenre: Event = {
			...componentProps.event,
			genre: undefined,
		};
		const props = { ...componentProps, event: eventNoGenre };

		const fragment = await renderToFragment(ConlistItem, props);

		const genre = fragment('.conlist-genre');
		expect(genre).to.have.lengthOf(0);
	});

	it('does not render attending status', async () => {
		const fragment = await renderToFragment(ConlistItem, componentProps);

		const status = fragment('.conlist-status');
		expect(status).to.have.lengthOf(0);
	});

	it('renders non-attending status', async () => {
		const eventNonAttending = {
			...componentProps.event,
			status: 'Tentative',
		};
		const props = { ...componentProps, event: eventNonAttending };

		const fragment = await renderToFragment(ConlistItem, props);

		const status = fragment('.conlist-status');
		expect(status).to.have.lengthOf(1);
		expect(status.text()).to.contain(eventNonAttending.status);
	});

	it('renders extra tags', async () => {
		const fragment = await renderToFragment(ConlistItem, componentProps);

		const extraTags = fragment('.conlist-extra-tag');
		expect(extraTags).to.have.lengthOf(event.extraTags.length);
		extraTags.each((i, tagElement) => {
			const extraTag = fragment(tagElement);
			expect(extraTag.text()).to.contain(event.extraTags[i]);
			expect(extraTag.data('tag')).to.equal(event.extraTags[i]);
		});
	});

	it('renders notes', async () => {
		const fragment = await renderToFragment(ConlistItem, componentProps);

		const notes = fragment('.conlist-notes');
		expect(notes.text()).to.contain(event.notes);
	});

	it('does not render absent notes', async () => {
		const eventNoNotes: Event = {
			...componentProps.event,
			notes: undefined,
		};
		const props = { ...componentProps, event: eventNoNotes };

		const fragment = await renderToFragment(ConlistItem, props);

		const genre = fragment('.conlist-note');
		expect(genre).to.have.lengthOf(0);
	});

	it('renders dates', async () => {
		const dateFormat = (startDate: Date, endDate: Date) =>
			`${startDate} --- ${endDate}`;
		const props = { ...componentProps, dateFormat };
		const fragment = await renderToFragment(ConlistItem, props);

		const date = fragment('.conlist-date');
		expect(date).to.have.lengthOf(1);
		expect(date.text()).to.contain(
			dateFormat(event.startDate, event.endDate)
		);
	});

	it('does not render absent dates', async () => {
		const eventNoNotes: Event = {
			...componentProps.event,
			startDate: undefined,
			endDate: undefined,
		};
		const props = { ...componentProps, event: eventNoNotes };

		const fragment = await renderToFragment(ConlistItem, props);

		const date = fragment('.conlist-date');
		expect(date).to.have.lengthOf(0);
	});

	it('renders location', async () => {
		const locationFormat = (location: Location) =>
			`${location.venue} --- ${location.locality}`;
		const props = { ...componentProps, locationFormat };
		const fragment = await renderToFragment(ConlistItem, props);

		const location = fragment('.conlist-location');
		expect(location).to.have.lengthOf(1);
		expect(location.text()).to.contain(locationFormat(event.location));
	});

	it('does not render absent location', async () => {
		const eventNoLocation: Event = {
			...componentProps.event,
			location: undefined,
		};
		const props = { ...componentProps, event: eventNoLocation };

		const fragment = await renderToFragment(ConlistItem, props);

		const location = fragment('.conlist-location');
		expect(location).to.have.lengthOf(0);
	});
});
