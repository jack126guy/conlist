import ConlistPast from '../src/components/ConlistPast.astro';
import { demoEvents } from './demo-events';
import { renderToFragment } from './render';
import { describe, it, expect, assert } from 'vitest';

const componentProps = {
	events: demoEvents,
	dateCutoff: new Date('2012-01-01'),
	yearHeading: 'h1',
	eventHeading: 'h2',
};

describe('ConlistPast', () => {
	it('renders past events', async () => {
		const fragment = await renderToFragment(ConlistPast, componentProps);

		const pastEvents = demoEvents.filter(
			(e) => e.startDate && e.startDate < componentProps.dateCutoff
		);
		pastEvents.sort((a, b) => (a.startDate! < b.startDate! ? 1 : -1));
		const eventHeadings = fragment(componentProps.eventHeading);
		expect(eventHeadings).to.have.lengthOf(pastEvents.length);
		const headings = fragment(
			`${componentProps.yearHeading},${componentProps.eventHeading}`
		);
		let currentYear = 0;
		let currentEventIndex = 0;
		headings.each((_, headingElement) => {
			const heading = fragment(headingElement);
			const headingTag = heading.prop('tagName')!.toLowerCase();
			if (headingTag === componentProps.yearHeading) {
				currentYear = Number(heading.text());
			} else if (headingTag === componentProps.eventHeading) {
				const currentEvent = pastEvents[currentEventIndex]!;
				expect(currentEvent.startDate!.getFullYear()).to.equal(
					currentYear
				);
				expect(heading.text()).to.equal(currentEvent.name);
				currentEventIndex++;
			} else {
				assert.fail(`Unrecognized element ${heading.prop('tagName')}`);
			}
		});
	});
});
