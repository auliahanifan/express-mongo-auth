import { LRUCache } from 'typescript-lru-cache';
import { UserInput } from "../../dtos/inputs/user.input";
import { UserOutput } from "../../dtos/outputs/user.output";
import { UserAccessor } from "../api/user.api.accessor";

export class UserLruCacheAccessor implements UserAccessor {
    private _accessor: UserAccessor;
    private _cache: LRUCache<String, Object>;

    constructor(userAccessor: UserAccessor) {
        this._accessor = userAccessor;
        this._cache = new LRUCache<String, Object>({
            maxSize: 1000,
            entryExpirationTimeInMS: 50000,
            onEntryEvicted: ({ key, value, isExpired }) =>
              console.log(`Entry with key ${key} and value ${value} was evicted from the cache. Expired: ${isExpired}`),
            onEntryMarkedAsMostRecentlyUsed: ({ key, value }) =>
              console.log(`Entry with key ${key} and value ${value} was just marked as most recently used.`)
          });
    }

    async getAll(): Promise<UserOutput[]> {
        let userOutput = this._cache.get('getAll');

        if (!userOutput) {
            const outputs = await this._accessor.getAll();
            this._cache.set('getAll', outputs);
        }
        
        return this._cache.get('getAll') as UserOutput[];
    }

    async getOne(username: String): Promise<UserOutput> {
        let userOutput = this._cache.get(`un-${username}`);

        if (!userOutput) {
            const output = await this._accessor.getOne(username);
            this._cache.set(`un-${username}`, output);
        }
        
        return this._cache.get(`un-${username}`) as UserOutput;
    }

    async updateOne(input: UserInput): Promise<UserOutput> {
        this._cache.delete('getAll');
        this._cache.delete(`un-${input.username}`);
        return await this._accessor.updateOne(input);
    }

    async insertOne(input: UserInput): Promise<void> {
        this._cache.delete('getAll');
        return await this._accessor.insertOne(input);;
    }

    async deleteOne(username: String): Promise<void> {
        this._cache.delete('getAll');
        this._cache.delete(`un-${username}`);
        return await this._accessor.deleteOne(username);
    }
}