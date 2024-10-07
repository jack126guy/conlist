import ConlistFuture from '../src/components/ConlistFuture.astro';
import { demoEvents } from './demo-events';
import { renderToFragment } from './render';
import { describe, it, expect } from 'vitest';

const componentProps = {
	events: demoEvents,
	dateCutoff: new Date('2012-01-01'),
	eventHeading: 'h1',
};

describe('ConlistFuture', () => {
	it('renders future events', async () => {
		const fragment = await renderToFragment(ConlistFuture, componentProps);

		const futureEvents = demoEvents.filter(
			(e) => e.startDate && e.startDate >= componentProps.dateCutoff
		);
		futureEvents.sort((a, b) => (a.startDate! > b.startDate! ? 1 : -1));
		const eventHeadings = fragment(componentProps.eventHeading);
		expect(eventHeadings).to.have.lengthOf(futureEvents.length);
		eventHeadings.each((i, headingElement) => {
			const heading = fragment(headingElement);
			expect(heading.text()).to.equal(futureEvents[i]!.name);
		});
	});

	it('renders empty message', async () => {
		const props = { ...componentProps, events: [] };
		const slots = { 'empty-message': 'No future events' };

		const fragment = await renderToFragment(ConlistFuture, props, slots);

		expect(fragment.text()).to.contain(slots['empty-message']);
	});

	it('does not render empty message with future events', async () => {
		const slots = { 'empty-message': 'No future events' };

		const fragment = await renderToFragment(
			ConlistFuture,
			componentProps,
			slots
		);

		expect(fragment.text()).to.not.contain(slots['empty-message']);
	});
});
