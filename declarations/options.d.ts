export interface IOperaAddonsUploadOptions {
    /**
     * Your extension id in Opera Addons.
     * The extension ID can be found by inspecting the URL of the extension in the developer dashboard.
     */
    extensionId: string;
    /**
     * Email used to log in
     */
    email: string;
    /**
     * Password used to log in
     */
    password: string;
}
