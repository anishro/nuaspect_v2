/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Central place for every Google content source the site reads from or writes to.
 * See GOOGLE_SETUP.md for how to create and wire each one up.
 * All values come from .env (Vite only exposes vars prefixed with VITE_).
 *
 * Knowledge Hub / Academy / Quiz are read through a Google Apps Script Web App
 * bound to each Sheet, NOT the Sheet's public CSV export — this lets the Sheet
 * itself stay fully private while the script exposes only the JSON it chooses to.
 */

export const googleSources = {
  knowledgeHub: {
    endpointUrl: import.meta.env.VITE_KNOWLEDGE_HUB_ENDPOINT_URL as string | undefined,
  },
  academy: {
    endpointUrl: import.meta.env.VITE_ACADEMY_ENDPOINT_URL as string | undefined,
  },
  quiz: {
    endpointUrl: import.meta.env.VITE_QUIZ_ENDPOINT_URL as string | undefined,
  },
  contactForm: {
    // The "action" URL of the Google Form, with /viewform swapped for /formResponse
    actionUrl: import.meta.env.VITE_CONTACT_FORM_ACTION_URL as string | undefined,
    // entry.XXXXXXXXX field IDs, found by inspecting the published form's HTML
    nameEntryId: import.meta.env.VITE_CONTACT_FORM_NAME_ENTRY as string | undefined,
    emailEntryId: import.meta.env.VITE_CONTACT_FORM_EMAIL_ENTRY as string | undefined,
    messageEntryId: import.meta.env.VITE_CONTACT_FORM_MESSAGE_ENTRY as string | undefined,
  },
  newsletter: {
    // The "Write to Us" pill on the Home page. Same POST-into-a-Form pattern as
    // Contact; the linked Sheet has an Apps Script trigger that emails a fixed
    // welcome template back to each new signup (see GOOGLE_SETUP.md).
    actionUrl: import.meta.env.VITE_NEWSLETTER_FORM_ACTION_URL as string | undefined,
    emailEntryId: import.meta.env.VITE_NEWSLETTER_FORM_EMAIL_ENTRY as string | undefined,
  },
};
