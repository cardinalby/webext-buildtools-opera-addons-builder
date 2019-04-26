import { BaseBuildResult, BasicTypeBuildAsset } from 'webext-buildtools-utils';

export class OperaAddonsUploadedExtIdAsset extends BasicTypeBuildAsset<string> {}

export class OperaAddonsUploadBuildResult extends BaseBuildResult<{
    uploadedExt?: OperaAddonsUploadedExtIdAsset;
    }>
{
}
