import { User } from '../types';

const FAKE_LATENCY = 500; // 0.5 seconds

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// This service simulates a backend API.
// In a real application, these functions would make network requests to a backend (like Firebase).

interface GoogleProfile {
    id: string; // This will be the unique Google ID
    username: string;
}

/**
 * Finds a user by their Google ID, or creates a new one if they don't exist.
 * @param profile The user's Google profile information.
 * @returns A Promise that resolves to the User object.
 */
export const findOrCreateUser = async (profile: GoogleProfile): Promise<User> => {
    await delay(FAKE_LATENCY);
    console.log(`[API] Finding or creating user for ID: ${profile.id}`);
    const userKey = `defitUser_${profile.id}`;
    const storedUser = localStorage.getItem(userKey);
    
    if (storedUser) {
        console.log(`[API] User found: ${profile.username}`);
        return JSON.parse(storedUser);
    }

    console.log(`[API] New user. Creating profile for: ${profile.username}`);
    const newUser: User = {
        id: profile.id,
        username: profile.username,
        progress: {
            completedChallenges: [],
            points: 0,
            badges: [],
        },
    };
    localStorage.setItem(userKey, JSON.stringify(newUser));
    return newUser;
};


/**
 * Updates a user's data in the storage.
 * @param user The complete user object to save.
 * @returns A Promise that resolves when the operation is complete.
 */
export const saveUser = async (user: User): Promise<void> => {
    await delay(FAKE_LATENCY / 2); // Saving is usually faster
    console.log(`[API] Saving user data for: ${user.username} (ID: ${user.id})`);
    // Save the user data against their unique ID
    localStorage.setItem(`defitUser_${user.id}`, JSON.stringify(user));
    // Also update the "session" user
    localStorage.setItem('defitUser', JSON.stringify(user));
    console.log(`[API] User data saved for: ${user.username}`);
};
