import ConlistSummary from '../src/components/ConlistSummary.astro';
import { demoEvents } from './demo-events';
import { renderToFragment } from './render';
import { describe, it, beforeAll, expect } from 'vitest';
import { type CheerioAPI } from 'cheerio';

describe('ConlistSummary', () => {
	const componentProps = {
		events: demoEvents,
		dateCutoff: new Date('2012-01-01'),
	};
	let fragment: CheerioAPI;

	beforeAll(async () => {
		fragment = await renderToFragment(ConlistSummary, componentProps);
	});

	it('renders list element', () => {
		const rootElement = fragment(':root');
		expect(rootElement.prop('tagName')).to.equal('UL');
		expect(rootElement.hasClass('conlist-summary')).to.be.true;
	});

	it('renders series items', () => {
		const series = [...new Set(demoEvents.map((e) => e.series))].sort();

		fragment('li').each((i, itemElement) => {
			const item = fragment(itemElement);

			const seriesName = item.find('.conlist-summary-series');
			expect(seriesName.text()).to.equal(series[i]);
		});
	});

	it('renders events in series', () => {
		const series = [...new Set(demoEvents.map((e) => e.series))].sort();
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

		fragment('li').each((i, itemElement) => {
			const item = fragment(itemElement);

			const expectedSpecifiers = sortedEvents
				.filter((e) => e.series === series[i])
				.map((e) => e.specifier);
			const events = item.find('.conlist-summary-event');
			const actualSpecifiers = events
				.toArray()
				.map((e) => fragment(e).text());
			expect(actualSpecifiers).to.deep.equal(expectedSpecifiers);

			const expectedText = `${series[i]}: ${expectedSpecifiers.join(', ')}`;
			const normalizedText = item.text().replace(/\s+/g, ' ').trim();
			expect(normalizedText).to.equal(expectedText);
		});
	});
});
