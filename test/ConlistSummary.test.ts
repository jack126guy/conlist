import ConlistSummary from '../src/components/ConlistSummary.astro';
import { demoEvents } from './demo-events';
import { renderToFragment } from './render';
import { describe, it, expect } from 'vitest';

const componentProps = {
	events: demoEvents,
	dateCutoff: new Date('2012-01-01'),
};

describe('ConlistSummary', () => {
	it('renders summary', async () => {
		const fragment = await renderToFragment(ConlistSummary, componentProps);

		expect(fragment('ul')).to.have.lengthOf(1);

		const sortedEvents = [...demoEvents].sort((a, b) => {
			if (!a.startDate && !b.startDate) {
				return 0;
			} else if (!a.startDate) {
				return 1;
			} else if (!b.startDate) {
				return -1;
			} else {
				return a.startDate > b.startDate ? 1 : -1;
			}
		});
		const series = [...new Set(demoEvents.map((e) => e.series))].sort();
		fragment('li').each((i, item) => {
			const eventSpecifiers = sortedEvents
				.filter((e) => e.series === series[i])
				.map((e) => e.specifier);
			const expectedText = `${series[i]}: ${eventSpecifiers.join(', ')}`;
			const normalizedText = fragment(item)
				.text()
				.replace(/\s+/g, ' ')
				.trim();
			expect(normalizedText).to.equal(expectedText);
		});
	});
});
