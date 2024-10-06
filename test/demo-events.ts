import { type Event } from '../src/event';

export const demoEvents: Event[] = [
	{
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
	},
	{
		name: 'XYZConf 2010',
		startDate: new Date('2010-06-01'),
		endDate: new Date('2010-06-03'),
		location: {
			venue: 'Springfield Convention Center',
			locality: 'Springfield, USA',
		},
		series: 'XYZConf',
		specifier: '2010',
		status: 'Not Attending',
		notes: 'Canceled appearance due to unforeseen circumstances',
		extraTags: ['Special Guest'],
	},
	{
		name: 'Examples and Hypotheticals Week 2011',
		startDate: new Date('2011-01-24'),
		endDate: new Date('2011-01-28'),
		location: {
			venue: 'Hotel California',
			locality: 'Los Angeles, California, USA',
		},
		series: 'Examples and Hypotheticals Week',
		specifier: '2011',
		genre: 'Example',
		status: 'Attending',
	},
	{
		name: 'XYZConf 2011',
		startDate: new Date('2011-05-31'),
		endDate: new Date('2011-06-02'),
		location: {
			venue: 'Springfield Convention Center',
			locality: 'Springfield, USA',
		},
		series: 'XYZConf',
		specifier: '2011',
		status: 'Attending',
	},
	{
		name: '2012 National Example Convention',
		startDate: new Date('2012-10-04'),
		endDate: new Date('2012-10-06'),
		location: {
			venue: 'Smith Hotel',
			locality: 'Springfield, USA',
		},
		series: 'National Example Convention',
		specifier: '2012',
		genre: 'Example',
		status: 'Attending',
	},
	{
		name: 'Examples and Hypotheticals Week 2012',
		startDate: new Date('2012-01-23'),
		endDate: new Date('2012-01-27'),
		location: {
			venue: 'Hotel California',
			locality: 'Los Angeles, California, USA',
		},
		series: 'Examples and Hypotheticals Week',
		specifier: '2011',
		genre: 'Example',
		status: 'Attending',
	},
	{
		name: 'NexYZConf 1',
		location: {
			venue: 'Springfield Convention Center',
			locality: 'Springfield, USA',
		},
		series: 'NexYZConf',
		specifier: '1',
		status: 'Tentative',
		notes: 'Dates TBA',
	},
];
