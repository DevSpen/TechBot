import { ApplyOptions } from '@sapphire/decorators';
import { ApplicationCommandRegistry, Command, CommandOptions } from '@sapphire/framework';
import { randomUnitInterval, addToWallet, randomInt } from '#lib/helpers';

import type { CommandInteraction } from 'discord.js';

const items = [
	'Rusty Sword',
	'Rusty Axe',
	'Rusty Pickaxe',
	'Rusty Hammer',
	'Rusty Hoe',
	'Rusty Shovel',
	'Carrot',
	'Great Depression Potato',
	'Spen',
	'Haider',
	'Morty',
	'Portal Gun',
	'Portal Gun (Charged)'
];

@ApplyOptions<CommandOptions>({
	name: 'search',
	description: 'Searches for items on the ground.'
})
export class SearchCommand extends Command {
	public override async chatInputRun(interaction: CommandInteraction): Promise<any> {
		await interaction.reply('Searching...');

		if (randomUnitInterval() > 0.5) return interaction.editReply('You found nothing.');

		const item = items.randomElement();
		// generate random amount of money no greater than 150
		const money = randomInt(30, 150);

		await addToWallet(interaction.user, money);
		return interaction.editReply(`You found ${item} and **$${money.toLocaleString()}** coins!`);
	}

	public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand((builder) => builder.setName(this.name).setDescription(this.description), {
			idHints: ['977784300915265597']
		});
	}
}
