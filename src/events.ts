import type { IMessage, IRole, ISocketConnection, IInstanceStatus, IUser, UserStatus } from '@jindun.chat/core-typings';

type ClientAction = 'inserted' | 'updated' | 'removed' | 'changed';

export type EventSignatures = {
	'accounts.login': (info: { userId: string; connection: ISocketConnection }) => void;
	'accounts.logout': (info: { userId: string; connection: ISocketConnection }) => void;
	'socket.connected': (connection: ISocketConnection) => void;
	'socket.disconnected': (connection: ISocketConnection) => void;
	'user.forceLogout': (uid: string) => void;
	'watch.roles'(
		data:
			| { clientAction: Exclude<ClientAction, 'removed'>; role: IRole }
			| {
					clientAction: 'removed';
					role: {
						_id: string;
						name: string;
					};
			  },
	): void;
	'watch.instanceStatus'(data: {
		clientAction: ClientAction;
		data?: undefined | Partial<IInstanceStatus>;
		diff?: undefined | Record<string, any>;
		id: string;
	}): void;
	'stream'([streamer, eventName, payload]: [string, string, any[]]): void;
	'presence.status'(data: {
		user: Pick<IUser, '_id' | 'username' | 'status' | 'statusText' | 'name' | 'roles'>;
		previousStatus: UserStatus | undefined;
	}): void;
	'watch.messages'(data: { message: IMessage }): void;
};
