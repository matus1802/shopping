import { makeVar } from '@apollo/client';

export const httpToken = makeVar<string | null>(null);
