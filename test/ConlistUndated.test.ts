import ConlistUndated from '../src/components/ConlistUndated.astro';
import { demoEvents } from './demo-events';
import { renderToFragment } from './render';
import { describe, it, expect } from 'vitest';

const componentProps = { events: demoEvents, eventHeading: 'h1' };

describe('ConlistUndated', () => {
	it('renders undated events', async () => {
		const fragment = await renderToFragment(ConlistUndated, componentProps);

		const undatedEvents = demoEvents.filter((e) => !e.startDate);
		const eventHeadings = fragment(componentProps.eventHeading);
		expect(eventHeadings).to.have.lengthOf(undatedEvents.length);
		eventHeadings.each((i, headingElement) => {
			const heading = fragment(headingElement);
			expect(heading.text()).to.equal(undatedEvents[i]!.name);
		});
	});

	it('renders empty message', async () => {
		const props = { ...componentProps, events: [] };
		const slots = { 'empty-message': 'No undated events' };

		const fragment = await renderToFragment(ConlistUndated, props, slots);

		expect(fragment.text()).to.contain(slots['empty-message']);
	});

	it('does not render empty message with undated events', async () => {
		const slots = { 'empty-message': 'No undated events' };

		const fragment = await renderToFragment(
			ConlistUndated,
			componentProps,
			slots
		);

		expect(fragment.text()).to.not.contain(slots['empty-message']);
	});
});
