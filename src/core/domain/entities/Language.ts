export interface LanguageProps {
    to: {
        name: string;
        code: string;
        language: string;
    },
    from: {
        name: string;
        code: string;
        language: string;
    }
}

export class Language {
    private props: LanguageProps;

    constructor(props: LanguageProps) {
        this.props = props;
    }

    updateProps(updatedProps: Partial<LanguageProps>): void {
        Object.assign(this.props, updatedProps);
    }

    toObject(): LanguageProps {
        return this.props;
    }
}