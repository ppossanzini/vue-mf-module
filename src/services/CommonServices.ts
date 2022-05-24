import MessageService from "@/helpers/MessageService";

export function commonService() {

    async function getLabelFor(key: string, defaultString: string) {
        return await MessageService.Instance.ask('GET_LABEL_FOR', key, defaultString);
    }

    async function getUser() {
        return await MessageService.Instance.ask('GET_USER');
    }

    async function getPermissions(key: string): Promise<boolean> {
        return await MessageService.Instance.ask('GET_PERMISSIONS', key);
    }

    return {
        getLabelFor,
        getUser,
        getPermissions
    }
}