export declare class HumanizerPerson {
    /**
     *
     * @param lastName
     * @param firstName
     * @param patronymic
     * @param substitutes
     * @returns
     */
    static getLastNameWithInitials(lastName: string | null, firstName: string | null, patronymic: string | null, substitutes?: Array<string | null>): string;
    /**
     *
     * @param firstName
     * @param patronymic
     * @param substitutes
     * @returns
     */
    static getNameWithPatronymic: (firstName: string | null, patronymic: string | null, substitutes?: Array<string | null>) => string;
    /**
     *
     * @param lastName
     * @param firstName
     * @param patronymic
     * @param substitutes
     * @returns
     */
    static getFullName(lastName: string | null, firstName: string | null, patronymic: string | null, substitutes?: Array<string | null>): string;
}
