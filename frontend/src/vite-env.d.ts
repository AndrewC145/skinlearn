/// <reference types="vite/client"/>
interface ImportMetaEnv {
  VITE_API_URL;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
