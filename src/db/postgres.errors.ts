interface PgError extends Error {
    code: string
}

export function isPgError(err: unknown): err is PgError {
    return err instanceof Error && "code" in err
}

export const PG_ERROR = {
    UNIQUE_CONSTRAINT_VIOLATED: '23505'
}