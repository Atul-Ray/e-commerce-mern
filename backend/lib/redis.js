import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();


export const redis = new Redis(process.env.UPSTASH_REDIS_URL);

// Example usage
// redis.set('key', 'value')
//   .then(() => redis.get('key'))
//   .then(value => {
//     console.log(value); // Output: value
//   })
//   .catch(err => {
//     console.error('Error:', err);
//   });
