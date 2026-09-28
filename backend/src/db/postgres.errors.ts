export const PG_ERROR = {
    UNIQUE_CONSTRAINT_VIOLATED: '23505'
}

export function isPgError(err: unknown): err is PgError {
    return err instanceof Error && "code" in err
}

interface PgError extends Error {
    code: string
}