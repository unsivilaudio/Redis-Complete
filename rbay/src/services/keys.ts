export const pageCacheKey = (id: string) => `pagecache#${id}`;
export const sessionsKey = (sessionId: string) => `sessions#${sessionId}`;

export const usersKey = (userId: string) => `users#${userId}`;
export const usernamesUniqueKey = () => `usernames:unique`;
export const userLikesKey = (userId: string) => `users:likes#${userId}`;
export const usernamesKey = () => 'usernames';

export const itemsKey = (itemId: string) => `items#${itemId}`;
export const itemsByViewsKey = () => 'items:views';
export const itemsByEndingAtKey = () => 'items:endingAt';
export const itemsViewsKey = (itemId: string) => `items:views#${itemId}`;
export const bidHistoryKey = (itemId: string) => `history#${itemId}`;
