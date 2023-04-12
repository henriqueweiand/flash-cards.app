import { DocumentReference } from "firebase/firestore";

interface StsTokenManager {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
}

export interface UserProps {
    uid: string;
    email: string;
    name?: string;
    emailVerified: boolean;
    stsTokenManager: StsTokenManager;
    createdAt: string;
    lastLoginAt: string;
}

export class User {
    private props: UserProps;

    constructor(props: UserProps) {
        this.props = props;
    }

    getUID() {
        return this.props.uid;
    }

    getEmail() {
        return this.props.email;
    }

    getName() {
        return this.props.name;
    }

    getAccessToken() {
        return this.props.stsTokenManager.accessToken;
    }

    updateProps(updatedProps: Partial<UserProps>): void {
        Object.assign(this.props, updatedProps);
    }

    toObject(): UserProps {
        return this.props;
    }
}