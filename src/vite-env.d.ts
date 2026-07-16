/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KNOWLEDGE_HUB_ENDPOINT_URL?: string;
  readonly VITE_ACADEMY_ENDPOINT_URL?: string;
  readonly VITE_QUIZ_ENDPOINT_URL?: string;
  readonly VITE_CONTACT_FORM_ACTION_URL?: string;
  readonly VITE_CONTACT_FORM_NAME_ENTRY?: string;
  readonly VITE_CONTACT_FORM_EMAIL_ENTRY?: string;
  readonly VITE_CONTACT_FORM_MESSAGE_ENTRY?: string;
  readonly VITE_NEWSLETTER_FORM_ACTION_URL?: string;
  readonly VITE_NEWSLETTER_FORM_EMAIL_ENTRY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
