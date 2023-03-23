
interface AuthAction {
    type: string;
    payload?: string;
}

export type Action = AuthAction // | SomeAction....