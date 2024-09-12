import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { type AstroComponentFactory } from 'astro/runtime/server/index.js';
import { load, type CheerioAPI } from 'cheerio';

export async function renderToFragment(
	component: AstroComponentFactory,
	props?: Record<string, unknown>,
	slots?: Record<string, unknown>
): Promise<CheerioAPI> {
	const container = await AstroContainer.create();
	const rendered = await container.renderToString(component, {
		props,
		slots,
	});
	return load(rendered, null, false);
}
