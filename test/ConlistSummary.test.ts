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

		const series = Array.from(
			new Set(demoEvents.map((e) => e.series))
		).sort();
		fragment('li').each((i, item) => {
			expect(fragment(item).text()).to.have.string(`${series[i]}: `);
		});
	});
});
