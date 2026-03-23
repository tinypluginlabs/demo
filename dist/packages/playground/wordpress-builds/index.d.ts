export { getWordPressModuleDetails } from './wordpress/get-wordpress-module-details';
export { getWordPressModule } from './wordpress/get-wordpress-module';
export { getSqliteDriverModule, LatestSqliteDriverVersion, } from './sqlite-database-integration/get-sqlite-driver-module';
export { getSqliteDriverModuleDetails } from './sqlite-database-integration/get-sqlite-driver-module-details';
import MinifiedWordPressVersions from './wordpress/wp-versions.json';
export { MinifiedWordPressVersions };
export declare const MinifiedWordPressVersionsList: string[];
export declare const LatestMinifiedWordPressVersion: string;
export declare function wpVersionToStaticAssetsDirectory(wpVersion: string): string | undefined;
