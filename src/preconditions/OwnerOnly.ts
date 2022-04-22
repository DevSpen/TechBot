import { Precondition } from '@sapphire/framework';
import type { CommandInteraction } from 'discord.js';

export class OwnerOnlyPrecondition extends Precondition {
	public override async chatInputRun(interaction: CommandInteraction) {
		const OWNERS = process.env.OWNERS?.split(',') ?? [];
		return OWNERS.includes(interaction.user.id) ? this.ok() : this.error({ message: 'This command can only be used by the owner.' });
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		OwnerOnly: never;
	}
}
