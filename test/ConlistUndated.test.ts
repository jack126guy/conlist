import ConlistUndated from '../src/components/ConlistUndated.astro';
import { demoEvents } from '../src/demo-events';
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
});
