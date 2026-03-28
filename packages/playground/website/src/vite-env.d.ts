/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_CAN_SAVE?: 'no';
	readonly VITE_CAN_INSTALL?: 'no';
	readonly VITE_CAN_EDIT?: 'no';
	readonly VITE_CAN_EDIT_DATABASE?: 'no';
	readonly VITE_GOOGLE_ANALYTICS_ID?: string;
	readonly VITE_DEVCONTAINER?: 'true';
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
