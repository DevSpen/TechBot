import { ApplicationCommandRegistry, Command, CommandOptions } from '@sapphire/framework';
import type { CommandInteraction } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { fetch, FetchResultTypes } from '@sapphire/fetch';
import { isNullOrUndefined } from '@sapphire/utilities';
import { generateEmbed } from '../../lib/helpers/embed';

@ApplyOptions<CommandOptions>({
	name: 'cat',
	description: 'Shows a cute cat image.',
	detailedDescription: 'cat'
})
export default class CatCommand extends Command {
	public override async chatInputRun(interaction: CommandInteraction) {
		const cat = (await fetch<Cat[]>('https://api.thecatapi.com/v1/images/search', FetchResultTypes.JSON))[0];
		const catEmbed = generateEmbed('Cat', '', 'BLUE', {
			image: {
				url: cat.url,
				height: cat.height,
				width: cat.width
			}
		});

		if (!isNullOrUndefined(cat.breeds) && cat.breeds.length > 0) {
			catEmbed.setFooter({
				text: `Breed: ${cat.breeds[0].name}\nLife Span: ${cat.breeds[0].life_span}\nTemperament: ${cat.breeds[0].temperament}`
			});
		}

		return interaction.reply({ embeds: [catEmbed] });
	}

	public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand((builder) => builder.setName(this.name).setDescription(this.description), {
			idHints: ['944645460482723881']
		});
	}
}

type Cat = {
	breeds?: BreedsEntityCat[] | null;
	id: string;
	url: string;
	width: number;
	height: number;
};
type BreedsEntityCat = {
	weight: WeightCat;
	id: string;
	name: string;
	cfa_url: string;
	vetstreet_url: string;
	vcahospitals_url: string;
	temperament: string;
	origin: string;
	country_codes: string;
	country_code: string;
	description: string;
	life_span: string;
	indoor: number;
	lap: number;
	alt_names: string;
	adaptability: number;
	affection_level: number;
	child_friendly: number;
	cat_friendly: number;
	energy_level: number;
	grooming: number;
	health_issues: number;
	intelligence: number;
	shedding_level: number;
	social_needs: number;
	stranger_friendly: number;
	vocalisation: number;
	experimental: number;
	hairless: number;
	natural: number;
	rare: number;
	rex: number;
	suppressed_tail: number;
	short_legs: number;
	wikipedia_url: string;
	hypoallergenic: number;
	reference_image_id: string;
};
type WeightCat = {
	imperial: string;
	metric: string;
};
