import type { CreateUserAttrs } from '$services/types';
import { genId } from '$services/utils';
import { client } from '$services/redis';
import { usersKey, usernamesKey, usernamesUniqueKey } from '$services/keys';

export const getUserByUsername = async (username: string) => {
	const decId = await client.zScore(usernamesKey(), username);
	if (!decId) {
		throw new Error('User does not exist');
	}

	const id = decId.toString(16);
	const user = await client.hGetAll(usersKey(id));
	if (!Object.keys(user).length) {
		throw new Error('User not found');
	}

	return deserialize(id, user);
};

export const getUserById = async (id: string) => {
	const user = await client.hGetAll(usersKey(id));

	if (!Object.keys(user).length) {
		return null;
	}

	return deserialize(id, user);
};

export const createUser = async (attrs: CreateUserAttrs) => {
	const id = genId();

	const exists = await client.sIsMember(usernamesUniqueKey(), attrs.username);
	if (exists) {
		throw new Error('Username is taken');
	}

	await client.hSet(usersKey(id), serialize(attrs));
	await client.sAdd(usernamesUniqueKey(), attrs.username);
	await client.zAdd(usernamesKey(), {
		value: attrs.username,
		score: parseInt(id, 16)
	});

	return id;
};

const serialize = (user: CreateUserAttrs) => {
	return {
		username: user.username,
		password: user.password
	};
};

const deserialize = (id: string, user: { [key: string]: string }) => {
	return {
		id,
		username: user.username,
		password: user.password
	};
};
