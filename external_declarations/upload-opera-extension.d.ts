declare module 'upload-opera-extension' {
    interface IUploadOperaExtensionOptions {
        email: string;
        password: string;
        extensionId: string;
        zipPath: string;
    }

    function uploadOperaExtension(options: IUploadOperaExtensionOptions): Promise<any>;

    // noinspection JSUnusedGlobalSymbols
    export = uploadOperaExtension;
}
