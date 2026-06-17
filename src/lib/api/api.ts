export default class APIClient {
    /* Standardizes the interfacing with the api
     * This is a mock that is meant to be replaced when we actually create the api.
     * So, this keeps the v1.0 static
     */

    static async get(endpoint: string, options?: { lang: 'en' | 'fr' }) {
        try {
            switch (endpoint) {
                default: 
                    break;
            }
        } catch(error) {
            console.error(`API GET error on ${endpoint}:`, error);
            throw error;
        }
    }
}
