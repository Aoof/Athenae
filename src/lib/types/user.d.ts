export type UserData = {
    preferences: Record<string, string> | {
        language: string;
    };
}
