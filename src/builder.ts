import uploadOperaExtension = require('upload-opera-extension');
import { ISimpleBuilder } from 'webext-buildtools-builder-types';
import { AbstractSimpleBuilder } from 'webext-buildtools-utils';
import { IOperaAddonsUploadOptions } from '../declarations/options';
import { OperaAddonsUploadBuildResult, OperaAddonsUploadedExtIdAsset } from './buildResult';

// noinspection JSUnusedGlobalSymbols
/**
 * ISimpleBuilder wrapper around upload-opera-extension
 */
export class OperaAddonsUploadBuilder
    extends AbstractSimpleBuilder<IOperaAddonsUploadOptions, OperaAddonsUploadBuildResult>
    implements ISimpleBuilder<OperaAddonsUploadBuildResult>
{
    public static readonly TARGET_NAME = 'opera-addons-upload';

    protected _inputZipFilePath?: string;
    protected _uploadedExtRequired: boolean = false;

    public getTargetName(): string {
        return OperaAddonsUploadBuilder.TARGET_NAME;
    }

    // noinspection JSUnusedGlobalSymbols
    public setInputZipFilePath(filePath: string): this {
        this._inputZipFilePath = filePath;
        return this;
    }

    // noinspection JSUnusedGlobalSymbols
    public requireUploadedExt(): this {
        this._uploadedExtRequired = true;
        return this;
    }

    public async build(): Promise<OperaAddonsUploadBuildResult> {
        this.validateOptions();

        if (!this._inputZipFilePath) {
            throw new Error('Input zip file path is not set');
        }

        const result = new OperaAddonsUploadBuildResult();
        if (!this._uploadedExtRequired) {
            this._logWrapper.warn('Output is not required, do nothing');
            return result;
        }

        await uploadOperaExtension({
            extensionId: this._options.extensionId,
            email: this._options.email,
            password: this._options.password,
            zipPath: this._inputZipFilePath
        });
        result.getAssets().uploadedExt = new OperaAddonsUploadedExtIdAsset(this._options.extensionId);

        return Promise.resolve(result);
    }

    protected validateOptions() {
        const missedFields = ['extensionId', 'email', 'password']
            .filter(field => typeof (this._options as any)[field] !== 'string')
            .map(field => `'${field}'`);

        if (missedFields.length > 0) {
            throw Error('Missed options fields: ' + missedFields.join(', '));
        }
    }
}
