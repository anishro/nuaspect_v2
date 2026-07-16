# Google Workspace content setup

This site pulls three sections' content live from Google Sheets, and submits
both the contact form and the "Write to Us" newsletter pill straight into
Google Forms — the latter also triggers an automatic welcome email. No
backend, no code changes needed to update content going forward — just edit
the Sheet, or submit the linked Form.

## How it works (and why it's private)

A Google Form writes rows into a linked Google Sheet. Instead of exposing that
Sheet publicly (which would let anyone with the link open it directly and see
every row/column), each Sheet gets a small **Google Apps Script Web App**
bound to it. The script runs *as you*, the sheet owner, so it can read a
completely private spreadsheet — and it only ever returns the JSON you tell it
to return. The Sheet itself never needs "Anyone with the link" sharing turned on.

The site fetches that Apps Script URL on every page load, so edits to the
Sheet (or new Form submissions) show up as soon as you refresh.

Copy `.env.example` to `.env` in `nuaspect_v2/` and fill in the values as you go.
Restart `npm run dev` after editing `.env` (Vite only reads it on startup).

**Ready-to-import files** are in [`google-sheets-templates/`](google-sheets-templates/):
- `knowledge-hub.csv`, `academy.csv` — headers + a few example rows to replace with real content.
- `quiz.csv` — headers pre-filled with the site's real 13 questions, so importing it preserves the existing quiz exactly.
- `apps-script.gs` — the read-only content endpoint script, referenced in steps 1–3 below, ready to paste in.
- `newsletter-welcome-apps-script.gs` — the write-side welcome-email trigger script for section 5 below.

To import a CSV as its own new Google Sheet: Google Sheets → File → Import →
Upload → select the CSV → "Insert new sheet(s)".

---

## 1. Knowledge Hub

**Create the Sheet:**
1. In Google Sheets, create a new spreadsheet named e.g. "NuAspect – Knowledge Hub".
2. First row (headers, case-insensitive):
   `title | category | summary | body | link | date`
   - `summary` is the short teaser shown on the card in the grid.
   - `body` is the **full article text**, shown when someone clicks the card
     to read it. Separate paragraphs with a blank line (in Google Sheets/Forms,
     press Enter twice, or Alt+Enter for a line break within the cell) — the
     site splits on blank lines automatically.
   - `link` is optional: an external URL (e.g. a PDF, Google Doc, or another
     site) shown as a secondary "View External Source" button inside the
     reader. Leave it blank if the article's full text lives entirely in `body`.
   - `date` is optional, freeform text (e.g. "Jan 2026").
3. Add one row per article. The full article appears on the site itself —
   no separate hosting needed.

**Create the Form (optional, for non-technical editors):**
1. Google Forms → New Form → add questions matching the columns above: Title
   (short answer), Category (short answer), Summary (short answer), Body
   (paragraph — this is where the full article gets typed), Link (short
   answer, optional), Date (short answer, optional).
2. Responses tab → green Sheets icon → "Create spreadsheet" (or link the one
   you already made) — form submissions now append rows automatically.
3. Anyone with edit access to the Form can publish a new article this way —
   no spreadsheet editing required.

**Add the Apps Script:**
1. Open the Sheet → Extensions → Apps Script.
2. Replace the default code with:
   ```javascript
   function doGet(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
     var values = sheet.getDataRange().getValues();
     var headers = values[0].map(function (h) { return String(h).trim().toLowerCase(); });
     var rows = values.slice(1).map(function (row) {
       var record = {};
       headers.forEach(function (header, i) {
         record[header] = row[i] == null ? '' : String(row[i]);
       });
       return record;
     });
     return ContentService
       .createTextOutput(JSON.stringify(rows))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
3. Deploy → New deployment → type **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click Deploy, authorize it (it's your own script, so this is just a Google
   permission prompt, not a third-party grant), and copy the **Web app URL**
   (ends in `/exec`).
5. Set in `.env`:
   ```
   VITE_KNOWLEDGE_HUB_ENDPOINT_URL="https://script.google.com/macros/s/XXXX/exec"
   ```
6. **Sheet sharing:** leave it as the default (private/restricted to you) —
   the Web App is the only public surface. Do not turn on link-sharing for the Sheet itself.

---

## 2. Academy (courses)

**Create the Sheet** with headers:
`title | category | description | youtube`

- `youtube` accepts a full `https://www.youtube.com/watch?v=...` URL, a
  `youtu.be/...` short link, or just the raw video ID — all are parsed correctly.
- Upload/host your course videos on YouTube (unlisted is fine — that still embeds).

**Form:** same pattern as Knowledge Hub — a Form with matching questions, linked
to this Sheet, so course additions don't require touching the spreadsheet directly.

**Apps Script:** identical script as above (Extensions → Apps Script → same
`doGet` code → Deploy as Web App → Execute as Me → Anyone).

**Connect:**
```
VITE_ACADEMY_ENDPOINT_URL="https://script.google.com/macros/s/XXXX/exec"
```

---

## 3. Assessment Quiz

**Create the Sheet** with headers:
`id | category | question | optiona | optionb | optionc | optiond | correctkey`

- `id` is a number (question order).
- `correctkey` is one of `a`, `b`, `c`, `d` — must match one of the option columns.
- All four options aren't required; at least 2 must be filled.

**Form:** a Form with Short Answer (id, correctkey) and Paragraph (question,
optiona–optiond) questions, linked to this Sheet, lets you add/update quiz
questions without opening the spreadsheet.

**Apps Script:** same script and deployment steps as above.

**Connect:**
```
VITE_QUIZ_ENDPOINT_URL="https://script.google.com/macros/s/XXXX/exec"
```

If this endpoint is empty, unreachable, or not yet configured, the site
automatically falls back to the bundled question set in `src/questions.ts` —
the quiz never breaks. Note: as with the original hardcoded quiz, the correct
answer key is visible to anyone who inspects the site's network traffic — this
endpoint is for easy editing, not for tamper-proofing the quiz.

---

## 4. Contact form

Unlike the sections above, Contact submits directly into a Google Form's own
submit endpoint (no Apps Script involved) — the site just POSTs into it using
a form styled to match the rest of the site. This is write-only from the
visitor's side, so there's no exposure to worry about here: the linked
response Sheet can stay completely private since the site never reads it.

1. Create a Google Form with three questions, **in this order**: Name (short
   answer), Email (short answer), Message (paragraph).
2. Open the live form and view its page source (or browser dev tools → Inspect). Find:
   - The `<form action="https://docs.google.com/forms/d/e/XXXXX/formResponse" ...>`
     tag — copy that full `action` URL.
   - Each question's input has `name="entry.123456789"` — copy the entry ID for
     Name, Email, and Message respectively.
3. Set in `.env`:
   ```
   VITE_CONTACT_FORM_ACTION_URL="https://docs.google.com/forms/d/e/XXXXX/formResponse"
   VITE_CONTACT_FORM_NAME_ENTRY="entry.111111111"
   VITE_CONTACT_FORM_EMAIL_ENTRY="entry.222222222"
   VITE_CONTACT_FORM_MESSAGE_ENTRY="entry.333333333"
   ```
4. Responses appear in the Form's own "Responses" tab. Link it to a Sheet
   there if you want spreadsheet form / email notifications (Responses tab →
   ⋮ menu → "Get email notifications for new responses").

Until these four variables are all set, the Contact page shows its existing
"Under Construction" message instead of a broken form.

---

## 5. "Write to Us" newsletter signup (with an automatic welcome email)

This is the small email pill near the bottom of the Home page. Like Contact,
it POSTs directly into a Google Form (write-only, no Apps Script needed for
the site to read anything back) — but the linked Sheet also gets a **second**,
different kind of Apps Script: instead of a `doGet` read endpoint, it's a
**trigger** that fires on every new submission and emails the signer a fixed
welcome message via `GmailApp`.

1. Create a Google Form with a single question: **Email** (short answer,
   required — turn on "Response validation → Text → Email address" for
   basic format checking).
2. Responses tab → green Sheets icon → "Create spreadsheet" to link a Sheet.
3. Open the live form → view page source / Inspect → find the same two things
   as Contact: the `action="…/formResponse"` URL, and the `entry.XXXXXXX` ID
   for the Email question.
4. Set in `.env`:
   ```
   VITE_NEWSLETTER_FORM_ACTION_URL="https://docs.google.com/forms/d/e/XXXXX/formResponse"
   VITE_NEWSLETTER_FORM_EMAIL_ENTRY="entry.444444444"
   ```
5. **(Optional but recommended)** In Google Workspace Admin Console →
   Directory → Users → the account that will own this script → User
   information → Add alternate email → `noreply@nuaspect.in`. This lets the
   welcome email be sent "from" that address instead of a personal one — a
   Workspace alias works immediately as a "from" address, no separate
   Gmail-side verification email needed. Skip this step (and remove the
   `from` line in the script) if you'd rather send from your normal address
   for now.
6. On the linked Sheet → Extensions → Apps Script → paste in
   [`newsletter-welcome-apps-script.gs`](google-sheets-templates/newsletter-welcome-apps-script.gs).
   It defines one function, `sendWelcomeEmail`, with the subject/body for the
   welcome email — edit that text directly in the script to change what people
   receive (same message goes to everyone, no personalization beyond the email
   address itself).
7. Left sidebar clock icon ("Triggers") → **Add Trigger** →
   - Function: `sendWelcomeEmail`
   - Event source: **From form**
   - Event type: **On form submit**
   - Save, then authorize when prompted (this grants the script permission to
     send mail as you — it's your own script, not a third-party app).
8. Test it: submit the live Form yourself once, then check the Sent folder of
   the Gmail account that owns the script — `GmailApp` logs a copy there, so
   you can confirm the send actually happened before checking the recipient's
   inbox/spam.

Until both `.env` variables are set, the pill falls back to its original
cosmetic-only behavior (shows "Subscribed" locally, sends nothing).

**Why GmailApp and not MailApp:** an earlier version of this script used
`MailApp.sendEmail`, which also works, but gives no visible trail — no Sent
folder entry, and Apps Script's Executions log will show "completed
successfully" even if the message is later silently dropped somewhere
downstream (an org's outbound mail policy, aggressive spam filtering on the
receiving end, etc.), making it hard to tell your script from a delivery
problem. `GmailApp` gives you a Sent-folder receipt as a debugging anchor.

**Note on sending limits:** `GmailApp`/`MailApp` share Gmail's daily sending
quota — around 1,500 emails/day on a Google Workspace account (100/day on a
free personal Gmail account), which is far more than enough for a signup
pill, but worth knowing if this ever gets unexpectedly popular.

---

## Notes

- None of this requires enabling any Google Cloud API or OAuth beyond the
  one-time "authorize this script" prompt when you deploy each Apps Script —
  that's Google confirming the script (which you wrote) can access your own
  Sheet, not a third-party integration.
- Because Apps Script Web App URLs are shipped in the client bundle, treat
  them as public endpoints: only return fields you're fine with anyone
  fetching. Don't add extra columns with anything sensitive (internal notes,
  submitter emails, etc.) to a Sheet that's read through one of these scripts.
- Want to hide draft content? Add a `published` column (TRUE/FALSE) to a
  sheet and filter rows for it in the Apps Script before returning them —
  a one-line addition to the `rows` mapping above.
- If a deployment gets accidentally left as "Execute as: User accessing the
  web app" instead of "Me", requests will fail since anonymous visitors don't
  have access to your Sheet — double check that setting if a section stays
  stuck on its placeholder/loading state.
