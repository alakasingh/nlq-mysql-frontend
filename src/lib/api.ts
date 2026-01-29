export interface DatabaseConfig {
    host: string;
    user: string;
    password?: string;
    database: string;
}

export interface QueryResult {
    sql: string;
    results: {
        columns: string[];
        data: any[];
    };
}

const API_BASE_URL = 'http://localhost:8000/api'; // Standard FastAPI port

export const api = {
    connect: async (config: DatabaseConfig) => {
        const response = await fetch(`${API_BASE_URL}/connect`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to connect to database');
        }
        return response.json();
    },

    executeQuery: async (question: string, db_schema: any, db_credentials: DatabaseConfig) => {
        const response = await fetch(`${API_BASE_URL}/query`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                question,
                db_schema,
                db_credentials
            }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Query execution failed');
        }
        return response.json() as Promise<QueryResult>;
    },
};
